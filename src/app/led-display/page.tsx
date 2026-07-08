import { PanelTop } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export default function LedDisplayPage() {
  return (
    <>
      <PageHeader
        badge="Planned module"
        description="The LED calculator route is ready for cabinet sizing, pixel pitch, and environment-specific display workflows."
        title="LED Display Calculator"
      />
      <ModulePlaceholder
        description="Business logic will be added in a later increment."
        icon={PanelTop}
        sections={[
          "Pixel pitch inputs",
          "Cabinet dimensions",
          "Cabinet count",
          "Indoor / outdoor mode",
          "Native resolution results",
          "Physical size results",
        ]}
        title="Module structure prepared"
      />
    </>
  );
}
