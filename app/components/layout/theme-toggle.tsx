"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="bg-background hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
        aria-label="Toggle theme"
      >
        <Sun className="size-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-background hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  )
} 