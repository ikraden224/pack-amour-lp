"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/shared/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import StickyCTA from "@/components/ui/StickyCTA";

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMerci = pathname === "/merci";

  return (
    <>
      <main>{children}</main>
      {!isMerci && <Footer />}
      {!isMerci && <WhatsAppFloat />}
      {!isMerci && <StickyCTA />}
    </>
  );
}
