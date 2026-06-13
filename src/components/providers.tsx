"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class" // toggles `light` / `dark` on <html> → matches @custom-variant
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange // no color flash when toggling
    >
      {children}
    </ThemeProvider>
  );
}
