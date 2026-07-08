"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes } from "lucide-react";

import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r bg-card lg:sticky lg:top-0 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b px-6">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Boxes className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">AV Display Calculator</p>
            <p className="text-xs text-muted-foreground">Engineering tools</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground",
                )}
                href={item.href}
                key={item.href}
              >
                <Icon className="size-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-4 text-xs leading-5 text-muted-foreground">
          Built for sales engineering, presales design, and AV specification
          workflows.
        </div>
      </div>
    </aside>
  );
}
