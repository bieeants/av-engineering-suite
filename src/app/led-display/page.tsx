import { PageHeader } from "@/components/shared/page-header";
import { LedDisplayCalculator } from "@/features/led/components/led-display-calculator";

export default function LedDisplayPage() {
  return (
    <>
      <PageHeader
        badge="Module 2"
        description="Quickly size an LED display from width, height, pixel pitch, and environment, with advanced cabinet tools tucked away when needed."
        title="LED Display Calculator"
      />
      <LedDisplayCalculator />
    </>
  );
}
