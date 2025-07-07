"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  FacebookLogo, 
  TwitterLogo, 
  LinkedinLogo, 
  WhatsappLogo, 
  TelegramLogo, 
  Copy,
  Check,
  Share
} from "@phosphor-icons/react"
import { useState } from "react"

interface ShareButtonProps {
  content: string
}

export function ShareButton({ content }: ShareButtonProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Limiter la longueur du contenu pour éviter les problèmes de partage
  const truncateContent = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const shortContent = truncateContent(content)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ci360.ci'

  const shareData = {
    title: "CI-360 - Opportunités Côte d'Ivoire",
    text: shortContent,
    url: currentUrl
  }

  const platforms = [
    {
      name: "Facebook",
      icon: FacebookLogo,
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shortContent)}`
        window.open(url, '_blank', 'width=600,height=400')
      }
    },
    {
      name: "Twitter",
      icon: TwitterLogo,
      color: "bg-sky-500 hover:bg-sky-600",
      onClick: () => {
        // Twitter limite à 280 caractères, on doit être plus court
        const twitterText = truncateContent(content, 150)
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(currentUrl)}`
        window.open(url, '_blank', 'width=600,height=400')
      }
    },
    {
      name: "LinkedIn",
      icon: LinkedinLogo,
      color: "bg-blue-700 hover:bg-blue-800",
      onClick: () => {
        // LinkedIn ne supporte pas le texte dans l'URL, seulement l'URL
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
        window.open(url, '_blank', 'width=600,height=400')
      }
    },
    {
      name: "WhatsApp",
      icon: WhatsappLogo,
      color: "bg-green-600 hover:bg-green-700",
      onClick: () => {
        const message = `${shortContent}\n\nDécouvrez plus d'opportunités sur CI-360: ${currentUrl}`
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
      }
    },
    {
      name: "Telegram",
      icon: TelegramLogo,
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => {
        const message = `${shortContent}\n\nDécouvrez plus d'opportunités sur CI-360: ${currentUrl}`
        const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
      }
    }
  ]

  const copyToClipboard = async () => {
    try {
      const fullText = `${content}\n\nSource: CI-360 - ${currentUrl}`
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const shareNative = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator && navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Error sharing:', err)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="hover:bg-accent/60 text-muted-foreground hover:text-foreground flex size-7.5 items-center justify-center rounded-full bg-transparent transition"
          aria-label="Partager"
          type="button"
          onClick={() => setOpen(true)}
        >
          <Share className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager cette réponse</DialogTitle>
          <DialogDescription>
            Partagez cette information utile avec vos amis et votre réseau
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {platforms.map((platform) => (
              <Button
                key={platform.name}
                variant="outline"
                className={`flex items-center gap-2 ${platform.color} text-white border-0`}
                onClick={platform.onClick}
              >
                <platform.icon className="size-4" />
                {platform.name}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="size-4 mr-2" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" />
                  Copier le texte
                </>
              )}
            </Button>
            
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={shareNative}
              >
                Partager
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 