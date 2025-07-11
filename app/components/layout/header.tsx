"use client"

import { HistoryTrigger } from "@/app/components/history/history-trigger"
import { AppInfoTrigger } from "@/app/components/layout/app-info/app-info-trigger"
import { ButtonNewChat } from "@/app/components/layout/button-new-chat"
import { UserMenu } from "@/app/components/layout/user-menu"
import { ThemeToggle } from "@/app/components/layout/theme-toggle"
import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import { ZolaIcon } from "@/components/icons/zola"
import { Button } from "@/components/ui/button"
import { APP_NAME } from "@/lib/config"
import { useUserPreferences } from "@/lib/user-preference-store/provider"
import { useUser } from "@/lib/user-store/provider"
import { Info, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react"
import Link from "next/link"
import { DialogPublish } from "./dialog-publish"
import Image from "next/image"
import { useSpeech } from "@/app/hooks/use-speech"
import { MobileMenu } from "./mobile-menu"
import { MobileSidebar } from "./mobile-sidebar"

export function Header({ hasSidebar }: { hasSidebar: boolean }) {
  const isMobile = useBreakpoint(768)
  const { user } = useUser()
  const { preferences } = useUserPreferences()
  const isMultiModelEnabled = preferences.multiModelEnabled
  const { isEnabled, toggle, isSupported } = useSpeech()

  const isLoggedIn = !!user

  return (
    <header className="h-app-header pointer-events-none fixed top-0 right-0 left-0 z-50 bg-white">
      <div className="relative mx-auto flex h-full max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <div className="-ml-0.5 flex flex-1 items-center gap-2 lg:-ml-2.5">
            <div className="flex flex-1 items-center gap-2">
              <Link
                href="/"
                className="pointer-events-auto inline-flex items-center text-xl font-medium tracking-tight"
              >
                <Image src="/logo2.png" alt="CI-360 Logo" width={114} height={114} priority />
              </Link>
              {/* Menu desktop */}
              <nav className="hidden md:flex gap-6 ml-6 pointer-events-auto">
                <Link href="https://ci-360-app.vercel.app/" className="cursor-pointer hover:text-primary">Services</Link>
                <Link href="/opportunities" className="cursor-pointer hover:text-primary">Opportunités</Link>
                {/* <Link href="/maps" className="cursor-pointer hover:text-primary">Maps</Link> */}
              </nav>
              {/* Menu mobile burger */}
              <div className="md:hidden ml-2 flex items-center gap-2 pointer-events-auto">
                {hasSidebar ? (
                  <MobileSidebar />
                ) : (
                <MobileMenu />
                )}
              </div>
            </div>
          </div>
          <div />
          {!isLoggedIn ? (
            <div className="pointer-events-auto flex flex-1 items-center justify-end gap-4">
              {isSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-background hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                  aria-label={isEnabled ? "Désactiver la synthèse vocale" : "Activer la synthèse vocale"}
                  onClick={toggle}
                >
                  {isEnabled ? <SpeakerHigh className="size-4" /> : <SpeakerSlash className="size-4" />}
                </Button>
              )}
              <ThemeToggle />
              <AppInfoTrigger
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                    aria-label={`About ${APP_NAME}`}
                  >
                    <Info className="size-4" />
                  </Button>
                }
              />
              {/* <Link
                href="/auth"
                className="font-base text-muted-foreground hover:text-foreground text-base transition-colors"
              >
                Login
              </Link> */}
            </div>
          ) : (
            <div className="pointer-events-auto flex flex-1 items-center justify-end gap-2">
              {isSupported && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-background hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                  aria-label={isEnabled ? "Désactiver la synthèse vocale" : "Activer la synthèse vocale"}
                  onClick={toggle}
                >
                  {isEnabled ? <SpeakerHigh className="size-4" /> : <SpeakerSlash className="size-4" />}
                </Button>
              )}
              <ThemeToggle />
              {!isMultiModelEnabled && <DialogPublish />}
              <ButtonNewChat />
              {!hasSidebar && <HistoryTrigger hasSidebar={hasSidebar} />}
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
