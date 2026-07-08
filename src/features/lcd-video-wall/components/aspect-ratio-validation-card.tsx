import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import type { AspectRatioValidation } from "../types";

type AspectRatioValidationCardProps = {
  validation: AspectRatioValidation;
};

const severityStyles = {
  success: {
    alert: "border-green-500/40 bg-green-500/10 text-green-50",
    icon: "text-green-400",
    iconComponent: CheckCircle2,
  },
  warning: {
    alert: "border-yellow-500/50 bg-yellow-500/10 text-yellow-50",
    icon: "text-yellow-400",
    iconComponent: AlertTriangle,
  },
  error: {
    alert: "border-red-500/50 bg-red-500/10 text-red-50",
    icon: "text-red-400",
    iconComponent: XCircle,
  },
};

export function AspectRatioValidationCard({
  validation,
}: AspectRatioValidationCardProps) {
  const styles = severityStyles[validation.severity];
  const Icon = styles.iconComponent;

  return (
    <Alert className={styles.alert}>
      <div className="flex gap-3">
        <Icon className={`mt-0.5 size-5 shrink-0 ${styles.icon}`} />
        <div>
          <p className="font-medium">{validation.title}</p>
          <p className="mt-1 text-muted-foreground">{validation.description}</p>
        </div>
      </div>
    </Alert>
  );
}
