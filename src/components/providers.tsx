"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class" // toggles `light` / `dark` on <html> → matches @custom-variant
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange // no color flash when toggling
    >
      <SmoothScroll />
      {children}
    </ThemeProvider>
  );
}
