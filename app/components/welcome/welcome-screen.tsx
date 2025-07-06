"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function WelcomeScreen() {
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const router = useRouter()

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4 py-4 text-center"
    >
      {/* Logo animé avec rotation et pulsation */}
      <motion.div
        className="relative h-14 w-14"
        style={{
          transform: `rotate(${rotation}deg) scale(${scale})`,
          transition: "transform 0.6s ease-in-out",
        }}
      >
        <Image
          src="/logo.png"
          alt="CI-360 Logo"
          width={56}
          height={56}
          priority
        />
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold tracking-tight"
      >
        Bienvenue sur <span className="text-green-600">CI-360</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-md px-4 text-sm text-muted-foreground"
      >
        Votre assistant numérique intelligent pour trouver facilement les opportunités d'emploi, de formation, de financement, de bourses ou de stages en Côte d'Ivoire.
      </motion.p>

      {/* Bouton Opportunités avec style glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 flex flex-col gap-3"
      >
        <button
          onClick={() => alert("La fonctionnalité des opportunités est en cours de développement. Merci de votre patience!")}
          className="glassmorphism-button flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500/30 to-green-600/30 px-8 py-3 text-lg font-medium text-white backdrop-blur-md transition-all hover:scale-105 hover:shadow-lg"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          Découvrir les opportunités
        </button>
      </motion.div>

      {/* Ajout de styles CSS pour le glassmorphisme */}
      <style jsx global>{`
        .glassmorphism-button {
          background: rgba(22, 163, 74, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
        }
      `}</style>
    </motion.div>
  )
}
