"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function WelcomeScreen() {
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
    </motion.div>
  )
}
