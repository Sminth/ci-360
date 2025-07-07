"use client"

import { useState } from "react"
import { SidebarSimpleIcon } from "@phosphor-icons/react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { HistoryTrigger } from "@/app/components/history/history-trigger"
import { ButtonNewChat } from "@/app/components/layout/button-new-chat"
import { UserMenu } from "@/app/components/layout/user-menu"
import { ThemeToggle } from "@/app/components/layout/theme-toggle"
import { DialogPublish } from "./dialog-publish"
import { useUser } from "@/lib/user-store/provider"
import { useUserPreferences } from "@/lib/user-preference-store/provider"

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { preferences } = useUserPreferences()
  const isMultiModelEnabled = preferences.multiModelEnabled
  const isLoggedIn = !!user

  const handleClick = () => {
    console.log("MobileSidebar clicked!")
    setIsOpen(!isOpen)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden cursor-pointer"
          aria-label="Ouvrir la sidebar"
          onClick={handleClick}
        >
          <SidebarSimpleIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">CI-360</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          {isLoggedIn ? (
            <>
              {!isMultiModelEnabled && <DialogPublish />}
              <ButtonNewChat />
              <HistoryTrigger hasSidebar={true} />
              <div className="flex items-center gap-2 mt-auto">
                <ThemeToggle />
                <UserMenu />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 mt-auto">
              <ThemeToggle />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 