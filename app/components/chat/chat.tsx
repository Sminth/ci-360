"use client"

import { ChatInput } from "@/app/components/chat-input/chat-input"
import { Conversation } from "@/app/components/chat/conversation"
import { useModel } from "@/app/components/chat/use-model"
import { useChatDraft } from "@/app/hooks/use-chat-draft"
import { useChats } from "@/lib/chat-store/chats/provider"
import { useMessages } from "@/lib/chat-store/messages/provider"
import { useChatSession } from "@/lib/chat-store/session/provider"
import { SYSTEM_PROMPT_DEFAULT } from "@/lib/config"
import { useUserPreferences } from "@/lib/user-preference-store/provider"
import { useUser } from "@/lib/user-store/provider"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useChatCore } from "./use-chat-core"
import { useChatOperations } from "./use-chat-operations"
import { useFileUpload } from "./use-file-upload"
import { useSpeech } from "@/app/hooks/use-speech"
import Image from "next/image"

const FeedbackWidget = dynamic(
  () => import("./feedback-widget").then((mod) => mod.FeedbackWidget),
  { ssr: false }
)

const DialogAuth = dynamic(
  () => import("./dialog-auth").then((mod) => mod.DialogAuth),
  { ssr: false }
)

export function Chat() {
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)

  // Animation de rotation lente
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Animation de pulsation
  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.1 : 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const { chatId } = useChatSession()
  const {
    createNewChat,
    getChatById,
    updateChatModel,
    bumpChat,
    isLoading: isChatsLoading,
  } = useChats()

  const currentChat = useMemo(
    () => (chatId ? getChatById(chatId) : null),
    [chatId, getChatById]
  )

  const { messages: initialMessages, cacheAndAddMessage } = useMessages()
  const { user } = useUser()
  const { preferences } = useUserPreferences()
  const { draftValue, clearDraft } = useChatDraft(chatId)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)
  const { speak, isEnabled, toggle, isSupported } = useSpeech()

  // Message de bienvenue automatique
  useEffect(() => {
    if (!hasShownWelcome && !chatId && initialMessages.length === 0) {
      const welcomeMessage = {
        id: 'welcome-message',
        content: "Bonjour ! Je suis CI-360, votre assistant numérique intelligent pour trouver facilement les opportunités d'emploi, de formation, de financement, de bourses ou de stages en Côte d'Ivoire. Comment puis-je vous aider aujourd'hui ?",
        role: 'assistant' as const,
        createdAt: new Date(),
      }
      
      // Ajouter le message avec un délai pour l'effet
      setTimeout(() => {
        cacheAndAddMessage(welcomeMessage)
        setHasShownWelcome(true)
        
        // Faire parler l'assistante
        speak(welcomeMessage.content)
      }, 1000)
    }
  }, [hasShownWelcome, chatId, initialMessages.length, cacheAndAddMessage])

  // File upload functionality
  const {
    files,
    setFiles,
    handleFileUploads,
    createOptimisticAttachments,
    cleanupOptimisticAttachments,
    handleFileUpload,
    handleFileRemove,
  } = useFileUpload()

  // Model selection
  const { selectedModel, handleModelChange } = useModel({
    currentChat: currentChat || null,
    user,
    updateChatModel,
    chatId,
  })

  // State to pass between hooks
  const [hasDialogAuth, setHasDialogAuth] = useState(false)
  const isAuthenticated = useMemo(() => !!user?.id, [user?.id])
  const systemPrompt = useMemo(
    () => user?.system_prompt || SYSTEM_PROMPT_DEFAULT,
    [user?.system_prompt]
  )

  // Chat operations (utils + handlers) - created first
  const { checkLimitsAndNotify, ensureChatExists, handleDelete, handleEdit } =
    useChatOperations({
      isAuthenticated,
      chatId,
      messages: initialMessages,
      selectedModel,
      systemPrompt,
      createNewChat,
      setHasDialogAuth,
      setMessages: () => {},
      setInput: () => {},
    })

  // Core chat functionality (initialization + state + actions)
  const {
    messages,
    input,
    status,
    stop,
    hasSentFirstMessageRef,
    isSubmitting,
    enableSearch,
    setEnableSearch,
    submit,
    handleSuggestion,
    handleReload,
    handleInputChange,
  } = useChatCore({
    initialMessages,
    draftValue,
    cacheAndAddMessage,
    chatId,
    user,
    files,
    createOptimisticAttachments,
    setFiles,
    checkLimitsAndNotify,
    cleanupOptimisticAttachments,
    ensureChatExists,
    handleFileUploads,
    selectedModel,
    clearDraft,
    bumpChat,
  })

  // Memoize the conversation props to prevent unnecessary rerenders
  const conversationProps = useMemo(
    () => ({
      messages,
      status,
      onDelete: handleDelete,
      onEdit: handleEdit,
      onReload: handleReload,
    }),
    [messages, status, handleDelete, handleEdit, handleReload]
  )

  // Memoize the chat input props
  const chatInputProps = useMemo(
    () => ({
      value: input,
      onSuggestion: handleSuggestion,
      onValueChange: handleInputChange,
      onSend: submit,
      isSubmitting,
      files,
      onFileUpload: handleFileUpload,
      onFileRemove: handleFileRemove,
      hasSuggestions:
        preferences.promptSuggestions && !chatId && messages.length === 0,
      onSelectModel: handleModelChange,
      selectedModel,
      isUserAuthenticated: isAuthenticated,
      stop,
      status,
      setEnableSearch,
      enableSearch,
    }),
    [
      input,
      handleSuggestion,
      handleInputChange,
      submit,
      isSubmitting,
      files,
      handleFileUpload,
      handleFileRemove,
      preferences.promptSuggestions,
      chatId,
      messages.length,
      handleModelChange,
      selectedModel,
      isAuthenticated,
      stop,
      status,
      setEnableSearch,
      enableSearch,
    ]
  )

  // Handle redirect for invalid chatId - only redirect if we're certain the chat doesn't exist
  // and we're not in a transient state during chat creation
  if (
    chatId &&
    !isChatsLoading &&
    !currentChat &&
    !isSubmitting &&
    status === "ready" &&
    messages.length === 0 &&
    !hasSentFirstMessageRef.current // Don't redirect if we've already sent a message in this session
  ) {
    return redirect("/")
  }

  const showOnboarding = !chatId && messages.length === 0

  return (
    <div
      className={cn(
        showOnboarding
          ? "flex flex-col items-center justify-center min-h-screen w-full px-4 bg-background"
          : "flex flex-col h-full w-full justify-end bg-background"
      )}
    >
      <DialogAuth open={hasDialogAuth} setOpen={setHasDialogAuth} />

      <AnimatePresence initial={false} mode="popLayout">
        {showOnboarding ? (
          <motion.div
            key="onboarding"
            className="flex flex-col items-center justify-center w-full max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout="position"
            layoutId="onboarding"
            transition={{
              layout: { duration: 0 },
            }}
          >
            <motion.div
              className="mx-auto mb-4 w-20 h-20 relative"
              style={{
                transform: `rotate(${rotation}deg) scale(${scale})`,
                transition: "transform 0.6s ease-in-out",
              }}
            >
              <Image
                src="/logo.png"
                alt="CI-360 Logo"
                width={80}
                height={80}
                priority
              />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-medium text-center mb-4">
              Comment puis-je vous aider <span className="text-green-600">aujourd'hui&nbsp;?</span>
            </h1>
            <p className="text-muted-foreground text-center text-base md:text-lg mb-8">
              Je suis CI-360, Votre assistant numérique intelligent pour trouver facilement les opportunités d'emploi, de formation, de financement, de bourses ou de stages en Côte d'Ivoire
            </p>
          </motion.div>
        ) : (
          <Conversation key="conversation" {...conversationProps} />
        )}
      </AnimatePresence>

      <motion.div
        className={cn(
          "relative inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl"
        )}
        layout="position"
        layoutId="chat-input-container"
        transition={{
          layout: {
            duration: messages.length === 1 ? 0.3 : 0,
          },
        }}
      >
        <ChatInput {...chatInputProps} />
      </motion.div>

      <FeedbackWidget authUserId={user?.id} />
    </div>
  )
}
