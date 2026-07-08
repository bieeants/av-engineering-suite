import { PageHeader } from "@/components/shared/page-header";
import { LcdVideoWallCalculator } from "@/features/lcd-video-wall/components/lcd-video-wall-calculator";

export default function LcdVideoWallPage() {
  return (
    <>
      <PageHeader
        badge="Module 1"
        description="Calculate physical size, total resolution, aspect ratio, and panel count for tiled LCD video wall layouts."
        title="LCD Video Wall Calculator"
      />
      <LcdVideoWallCalculator />
    </>
  );
}
