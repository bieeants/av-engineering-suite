import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/90 px-4 backdrop-blur md:px-6">
          <MobileNav />
          <div className="hidden text-sm text-muted-foreground lg:block">
            AV system design workspace
          </div>
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
