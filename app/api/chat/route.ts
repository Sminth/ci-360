import { SYSTEM_PROMPT_DEFAULT } from "@/lib/config"
import { getAllModels } from "@/lib/models"
import { getProviderForModel } from "@/lib/openproviders/provider-map"
import type { ProviderWithoutOllama } from "@/lib/user-keys"
import { Attachment } from "@ai-sdk/ui-utils"
import { Message as MessageAISDK, streamText, ToolSet } from "ai"
import {
  incrementMessageCount,
  logUserMessage,
  storeAssistantMessage,
  validateAndTrackUsage,
} from "./api"
import { createErrorResponse, extractErrorMessage } from "./utils"
// import { opportunitiesTool } from "@/lib/tools/opportunities-tool"
import { getCachedOpportunities } from "@/lib/services/opportunities-api"

export const maxDuration = 60

type ChatRequest = {
  messages: MessageAISDK[]
  chatId: string
  userId: string
  model: string
  isAuthenticated: boolean
  systemPrompt: string
  enableSearch: boolean
  message_group_id?: string
}

// Fonction pour enrichir le prompt avec les données d'opportunités
async function enrichSystemPrompt(basePrompt: string): Promise<string> {
  try {
    const opportunities = await getCachedOpportunities()
    
    if (opportunities.length === 0) {
      return basePrompt + "\n\nNOTE: Aucune donnée d'opportunité disponible actuellement."
    }

    // Formater les opportunités pour l'IA
    const formattedOpportunities = opportunities.map(opp => ({
      titre: opp.opportunite,
      type: opp.type,
      localisation: opp.localisation,
      secteur: opp.secteur_dactivite,
      cible: opp.cible,
      description: opp.description,
      conditions: opp.conditions,
      contacts: opp.contacts_de_la_structure,
      liens: opp.liens,
      date_expiration: opp.date_dexpiration,
      source: opp.source
    }))

    const opportunitiesData = JSON.stringify(formattedOpportunities, null, 2)

    return basePrompt + `

DONNÉES D'OPPORTUNITÉS ACTUELLES (${opportunities.length} opportunités disponibles) :
${opportunitiesData}

INSTRUCTIONS IMPORTANTES :
1. RÉPONDS TOUJOURS EN UTILISANT CES DONNÉES RÉELLES
2. Si tu trouves des opportunités pertinentes, présente-les avec détails
3. Si tu ne trouves pas d'opportunités correspondantes, dis-le clairement
4. Ne redirige vers /opportunities QUE si l'utilisateur demande plus d'options
5. Donne toujours les contacts et liens quand disponibles
6. Mentionne les dates d'expiration importantes
7. RESTE DANS LE CADRE DES OPPORTUNITÉS EN CÔTE D'IVOIRE
8. Si la question sort du cadre, guide poliment vers des sujets pertinents

EXEMPLES DE RÉPONSES :
- "J'ai trouvé X opportunités correspondant à votre demande..."
- "Malheureusement, je n'ai pas trouvé d'opportunités correspondant exactement à votre demande dans mes données actuelles. Vous pouvez consulter la page /opportunities pour plus d'options avec des filtres visuels."
- "Voici les opportunités disponibles : [liste détaillée avec contacts]"

CADRE D'ATTRIBUTIONS :
Tu es spécialisé dans les opportunités en Côte d'Ivoire ET TOUT CE QUI AIDE À SAISIR CES OPPORTUNITÉS. Tu peux aider avec la rédaction de CV, lettres de motivation, préparation d'entretiens, montage de projets, procédures administratives, etc. Si une question sort de ce cadre, informe poliment l'utilisateur et guide-le vers des sujets pertinents.`
  } catch (error) {
    console.error('Erreur lors de la récupération des opportunités:', error)
    return basePrompt + "\n\nNOTE: Erreur lors de la récupération des données d'opportunités."
  }
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      chatId,
      userId,
      model,
      isAuthenticated,
      systemPrompt,
      enableSearch,
      message_group_id,
    } = (await req.json()) as ChatRequest

    if (!messages || !chatId || !userId) {
      return new Response(
        JSON.stringify({ error: "Error, missing information" }),
        { status: 400 }
      )
    }

    const supabase = await validateAndTrackUsage({
      userId,
      model,
      isAuthenticated,
    })

    // Increment message count for successful validation
    if (supabase) {
      await incrementMessageCount({ supabase, userId })
    }

    const userMessage = messages[messages.length - 1]

    if (supabase && userMessage?.role === "user") {
      await logUserMessage({
        supabase,
        userId,
        chatId,
        content: userMessage.content,
        attachments: userMessage.experimental_attachments as Attachment[],
        model,
        isAuthenticated,
        message_group_id,
      })
    }

    const allModels = await getAllModels()
    const modelConfig = allModels.find((m) => m.id === model)

    if (!modelConfig || !modelConfig.apiSdk) {
      throw new Error(`Model ${model} not found`)
    }

    const baseSystemPrompt = systemPrompt || SYSTEM_PROMPT_DEFAULT
    const effectiveSystemPrompt = await enrichSystemPrompt(baseSystemPrompt)

    let apiKey: string | undefined
    if (isAuthenticated && userId) {
      const { getEffectiveApiKey } = await import("@/lib/user-keys")
      const provider = getProviderForModel(model)
      apiKey =
        (await getEffectiveApiKey(userId, provider as ProviderWithoutOllama)) ||
        undefined
    }

    const result = streamText({
      model: modelConfig.apiSdk(apiKey, { enableSearch }),
      system: effectiveSystemPrompt,
      messages: messages,
      tools: {} as ToolSet,
      maxSteps: 10,
      onError: (err: unknown) => {
        console.error("Streaming error occurred:", err)
        // Don't set streamError anymore - let the AI SDK handle it through the stream
      },

      onFinish: async ({ response }) => {
        if (supabase) {
          await storeAssistantMessage({
            supabase,
            chatId,
            messages:
              response.messages as unknown as import("@/app/types/api.types").Message[],
            message_group_id,
            model,
          })
        }
      },
    })

    return result.toDataStreamResponse({
      sendReasoning: true,
      sendSources: true,
      getErrorMessage: (error: unknown) => {
        console.error("Error forwarded to client:", error)
        return extractErrorMessage(error)
      },
    })
  } catch (err: unknown) {
    console.error("Error in /api/chat:", err)
    const error = err as {
      code?: string
      message?: string
      statusCode?: number
    }

    return createErrorResponse(error)
  }
}
