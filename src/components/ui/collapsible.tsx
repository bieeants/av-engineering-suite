"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Collapsible({
  className,
  ...props
}: React.HTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn("group", className)} {...props} />;
}

function CollapsibleTrigger({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary
      className={cn(
        "cursor-pointer list-none rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden",
        className,
      )}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)} {...props} />;
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
