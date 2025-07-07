"use client"

import Link from "next/link"
import { useState } from "react"
import { List } from "@phosphor-icons/react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    console.log("MobileMenu clicked!")
    setIsOpen(!isOpen)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden cursor-pointer"
          aria-label="Ouvrir le menu"
          onClick={handleClick}
        >
          <List className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu de navigation</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-6">
          <Link 
            href="/" 
            className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Accueil
          </Link>
          <Link 
            href="https://ci-360-app.vercel.app/" 
            className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="/opportunities" 
            className="flex items-center px-4 py-3 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Opportunités
          </Link>
         
        </div>
      </SheetContent>
    </Sheet>
  )
} 