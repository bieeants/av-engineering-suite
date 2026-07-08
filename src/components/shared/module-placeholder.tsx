import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ModulePlaceholderProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  sections: string[];
};

export function ModulePlaceholder({
  icon: Icon,
  title,
  description,
  sections,
}: ModulePlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              className="rounded-md border bg-background p-4 text-sm font-medium"
              key={section}
            >
              {section}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
