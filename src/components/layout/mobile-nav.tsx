"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Button
        aria-label="Open navigation"
        onClick={() => setIsOpen(true)}
        size="icon"
        type="button"
        variant="outline"
      >
        <Menu />
      </Button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="h-full w-80 max-w-[86vw] border-r bg-card shadow-lg">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Boxes className="size-5" />
                </div>
                <span className="text-sm font-semibold">AV Display Calculator</span>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                size="sm"
                type="button"
                variant="ghost"
              >
                Close
              </Button>
            </div>
            <nav className="space-y-1 p-3">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    className={cn(
                      "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                      isActive && "bg-muted text-foreground",
                    )}
                    href={item.href}
                    key={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="size-4" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
