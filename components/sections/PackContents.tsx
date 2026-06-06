"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { pack } from "@/lib/data/product";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function PackContents() {
  return (
    <section
      id="pack-contents"
      className="pt-8 md:pt-12 pb-20 md:pb-28"
      style={{ backgroundColor: "var(--rouge)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* Séparateur or — coupure visuelle depuis le Hero */}
        <m.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="mx-auto mb-10 md:mb-14 h-[2px] w-20 origin-center rounded-full"
          style={{ backgroundColor: "var(--gold)" }}
        />

        {/* En-tête */}
        <div className="text-center mb-10 md:mb-14">
          <m.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="font-black"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              lineHeight: 1.1,
              fontWeight: 900,
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ color: "var(--ivory)" }}>شنو كاين </span>
            <span style={{ color: "var(--gold)" }}>فالباقة</span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
            className="font-medium"
            style={{
              color: "rgba(248,240,227,0.7)",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
            }}
          >
            6 قطع فعلبة هدية واحدة
          </m.p>
        </div>

        {/* Grille des cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {pack.contents.map((item, i) => (
            <m.div
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                transition: { duration: 0.3 },
              }}
              className="overflow-hidden rounded-xl shadow-lg flex flex-col"
              style={{
                backgroundColor: "var(--ivory)",
                outline: "1px solid rgba(201,169,97,0.3)",
                outlineOffset: "-1px",
              }}
            >
              {/* Photo */}
              <div className="aspect-square w-full overflow-hidden">
                <Image
                  src={item.photo}
                  alt={item.shortTitle}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Titre court */}
              <div className="flex-1 p-4 flex items-center justify-center">
                <p
                  className="text-center font-bold leading-[1.4] line-clamp-3"
                  style={{
                    color: "var(--noir)",
                    fontSize: "clamp(0.8125rem, 1.5vw, 0.9375rem)",
                  }}
                >
                  {item.shortTitle}
                </p>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
