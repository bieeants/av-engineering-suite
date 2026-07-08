import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  badge?: string;
  title: string;
  description: string;
};

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3">
      {badge ? (
        <div>
          <Badge variant="accent">{badge}</Badge>
        </div>
      ) : null}
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
