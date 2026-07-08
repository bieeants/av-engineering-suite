import { Settings } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        badge="Configuration"
        description="A future home for defaults, product database connections, user preferences, and export settings."
        title="Settings"
      />
      <ModulePlaceholder
        description="Settings are intentionally minimal while the calculator modules are being built."
        icon={Settings}
        sections={[
          "Measurement defaults",
          "Theme behavior",
          "Project storage",
          "Product data",
          "Export options",
          "User access",
        ]}
        title="Settings architecture prepared"
      />
    </>
  );
}
