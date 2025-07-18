"use client"

import { Header } from "@/app/components/layout/header"
import { AppSidebar } from "@/app/components/layout/sidebar/app-sidebar"
import { useUserPreferences } from "@/lib/user-preference-store/provider"
import { SidebarProvider } from "@/components/ui/sidebar"

export function LayoutApp({ children }: { children: React.ReactNode }) {
  const { preferences } = useUserPreferences()
  const hasSidebar = preferences.layout === "sidebar"

  return (
    <SidebarProvider defaultOpen>
      <div className="bg-background flex h-dvh w-full overflow-hidden" suppressHydrationWarning>
        {hasSidebar && <AppSidebar />}
        <main className="@container relative h-dvh w-0 flex-shrink flex-grow overflow-y-auto">
          <Header hasSidebar={hasSidebar} />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
