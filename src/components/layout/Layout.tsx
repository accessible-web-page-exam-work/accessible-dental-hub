import React from "react";
import { SkipLink } from "@/components/accessibility/SkipLink";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToHash } from "@/components/ScrollToHash";

interface LayoutProps {
  children: React.ReactNode;
  minimalHeader?: boolean;
}

export function Layout({ children, minimalHeader = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink targetId="main-content" />
      <Header minimal={minimalHeader} />
      <ScrollToHash />
      <main id="main-content" className="flex-1" tabIndex={-1} role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
