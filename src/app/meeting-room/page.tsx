import { Building2 } from "lucide-react";

import { ModulePlaceholder } from "@/components/shared/module-placeholder";
import { PageHeader } from "@/components/shared/page-header";

export default function MeetingRoomPage() {
  return (
    <>
      <PageHeader
        badge="Planned module"
        description="The recommendation route is ready for room dimensions, user count, use cases, and viewing guidance."
        title="Meeting Room Recommendation"
      />
      <ModulePlaceholder
        description="Recommendation rules will be added in a later increment."
        icon={Building2}
        sections={[
          "Room dimensions",
          "User count",
          "Use case selection",
          "Display type output",
          "Screen size output",
          "Viewing distance output",
        ]}
        title="Module structure prepared"
      />
    </>
  );
}
