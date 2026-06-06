"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { ShieldCheck, Truck, Gift } from "lucide-react";
import { pack } from "@/lib/data/product";
import { content } from "@/lib/data/content";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const fadeDown = (delay: number) => ({
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

const subFeatures = [
  { icon: ShieldCheck, label: content.whyUs[0].title },
  { icon: Truck, label: "توصيل 24-48 ساعة" },
  { icon: Gift, label: "مغلفة بأيدنا" },
];

function handleScrollToForm() {
  document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center pt-12 pb-0 md:pt-20 lg:pt-28"
      style={{ backgroundColor: "var(--rouge)" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

          {/* ── Colonne TEXTE ─────────────────────────────────────────── */}
          <div className="flex-1 text-center md:text-start flex flex-col items-center md:items-start gap-0">

            {/* Eyebrow — brand */}
            <m.p
              {...fadeDown(0)}
              className="mb-4 uppercase tracking-[0.25em] text-xs font-bold"
              style={{ color: "var(--gold)", fontSize: "12px" }}
            >
              {content.brand}
            </m.p>

            {/* Titre principal avec split or / ivoire */}
            <h1
              className="leading-[0.95] font-black"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 900 }}
            >
              {/* "باقة ال" en or */}
              <m.span
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" as const }}
                style={{ color: "var(--gold)", display: "inline" }}
              >
                {"باقة ال"}
              </m.span>
              {/* "حب" en ivoire */}
              <m.span
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" as const }}
                style={{ color: "var(--ivory)", display: "inline" }}
              >
                {"حب"}
              </m.span>
            </h1>

            {/* Tagline */}
            <m.p
              {...fadeUp(0.4)}
              className="mt-4 font-medium"
              style={{ color: "var(--ivory)", opacity: 0.9, fontSize: "18px" }}
            >
              {pack.tagline}
            </m.p>

            {/* Bloc prix */}
            <m.div
              {...fadeUp(0.8)}
              className="mt-6 flex flex-row items-baseline justify-center md:justify-start"
            >
              {/* Prix actuel uniquement */}
              <span
                className="font-black"
                style={{ color: "var(--gold)", fontSize: "clamp(2.8rem, 6vw, 3.75rem)", fontWeight: 900, lineHeight: 1 }}
              >
                {pack.price} درهم
              </span>
            </m.div>

            {/* CTA principal */}
            <m.div {...fadeUp(1.0)} className="mt-7">
              <m.button
                onClick={handleScrollToForm}
                className="rounded font-black cursor-pointer"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--noir)",
                  padding: "16px 48px",
                  fontSize: "16px",
                  fontWeight: 900,
                  border: "none",
                }}
                whileHover={{ scale: 1.03, backgroundColor: "var(--gold-soft)" }}
                transition={{ duration: 0.2 }}
              >
                {content.cta.primary} →
              </m.button>
            </m.div>

            {/* Sub-features */}
            <m.div
              className="mt-8 flex flex-row flex-wrap gap-6 justify-center md:justify-start"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15, delayChildren: 1.3 } },
              }}
            >
              {subFeatures.map(({ icon: Icon, label }) => (
                <m.div
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
                  }}
                  className="group flex items-center gap-2 cursor-default"
                >
                  <Icon
                    size={16}
                    className="transition-colors duration-200 group-hover:text-[#D9BC7A]"
                    style={{ color: "var(--gold)", flexShrink: 0 }}
                  />
                  <span
                    className="text-sm font-medium transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: "var(--ivory)", opacity: 0.75 }}
                  >
                    {label}
                  </span>
                </m.div>
              ))}
            </m.div>
          </div>

          {/* ── Colonne IMAGE ─────────────────────────────────────────── */}
          <div className="flex-1 w-full md:max-w-[480px]">
            <m.div
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" as const }}
              className="relative w-full"
              whileHover={{ scale: 1.02, transition: { duration: 0.6 } }}
            >
              <Image
                src={pack.images[0]}
                alt="باقة الحب — هدية فاخرة من ChicCadeau"
                width={1000}
                height={1000}
                priority
                className="rounded-2xl shadow-2xl object-cover w-full ring-1"
                style={{
                  aspectRatio: "1 / 1",
                  outline: "1px solid rgba(201,169,97,0.3)",
                  outlineOffset: "-1px",
                }}
              />
            </m.div>
          </div>

        </div>
      </div>
    </section>
  );
}
