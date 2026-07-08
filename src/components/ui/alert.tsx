import * as React from "react";

import { cn } from "@/lib/utils";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "rounded-lg border bg-card p-4 text-sm text-card-foreground",
      className,
    )}
    ref={ref}
    role="alert"
    {...props}
  />
));
Alert.displayName = "Alert";

export { Alert };
