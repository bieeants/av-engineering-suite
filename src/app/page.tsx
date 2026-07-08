import Link from "next/link";
import { Building2, Grid3X3, PanelTop } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const modules = [
  {
    title: "LCD Video Wall Calculator",
    description: "Plan tiled LCD display walls by panel size, bezel, and layout.",
    href: "/lcd-video-wall",
    icon: Grid3X3,
    status: "Implemented",
  },
  {
    title: "LED Display Calculator",
    description: "Prepare cabinet-based LED display sizing and resolution tools.",
    href: "/led-display",
    icon: PanelTop,
    status: "Planned",
  },
  {
    title: "Meeting Room Recommendation",
    description: "Structure room guidance for presentation and control spaces.",
    href: "/meeting-room",
    icon: Building2,
    status: "Planned",
  },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        badge="Workspace"
        description="A production-ready foundation for AV calculators, recommendations, exports, saved projects, and future product data."
        title="Display engineering dashboard"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Link href={module.href} key={module.href}>
              <Card className="h-full transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-md border px-2 py-1 text-xs text-muted-foreground">
                      {module.status}
                    </span>
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-primary">
                    Open module
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}
