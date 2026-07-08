import {
  Building2,
  Grid3X3,
  LayoutDashboard,
  PanelTop,
  Settings,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "LCD Video Wall",
    href: "/lcd-video-wall",
    icon: Grid3X3,
  },
  {
    title: "LED Display",
    href: "/led-display",
    icon: PanelTop,
  },
  {
    title: "Meeting Rooms",
    href: "/meeting-room",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;
