"use client";

import { pack } from "@/lib/data/product";
import { content } from "@/lib/data/content";

export default function StickyCTA() {
  const handleClick = () => {
    const el = document.getElementById("order-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed bottom-0 start-0 end-0 z-40 md:hidden flex items-center justify-between px-4 pt-3 pb-5"
      style={{ backgroundColor: "var(--rouge)" }}
    >
      {/* Prix — côté gauche logique (visuellement à droite en RTL) */}
      <span
        className="font-black leading-none"
        style={{ color: "var(--gold)", fontWeight: 900, fontSize: "22px" }}
      >
        {pack.price} درهم
      </span>

      {/* Bouton CTA — côté droit logique (visuellement à gauche en RTL) */}
      <button
        onClick={handleClick}
        className="rounded-lg px-5 py-2.5 text-base font-black transition-opacity active:opacity-80"
        style={{
          backgroundColor: "var(--gold)",
          color: "var(--noir)",
          fontWeight: 900,
        }}
      >
        {content.cta.primary} ←
      </button>
    </div>
  );
}
