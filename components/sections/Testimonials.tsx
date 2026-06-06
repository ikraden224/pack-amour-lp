"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { content } from "@/lib/data/content";
import { testimonials } from "@/lib/data/testimonials";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--ivory)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">

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
              color: "var(--noir)",
            }}
          >
            {/* "شهادة بعض " noir + "زبنائنا" rouge + " الكرام" noir */}
            <span>{"شهادة بعض "}</span>
            <span style={{ color: "var(--rouge)" }}>{"زبنائنا"}</span>
            <span>{" الكرام"}</span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
            className="font-medium"
            style={{
              color: "rgba(10,10,10,0.6)",
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
              letterSpacing: "0.05em",
            }}
          >
            {content.testimonials.subtitle}
          </m.p>
        </div>

        {/* Grille 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <m.div
              key={t.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 16px 40px rgba(0,0,0,0.14)",
                transition: { duration: 0.3 },
              }}
              className="overflow-hidden rounded-2xl shadow-md"
              style={{
                backgroundColor: "#FFFFFF",
                outline: "1px solid rgba(201,169,97,0.2)",
                outlineOffset: "-1px",
              }}
            >
              {/* Screenshot WhatsApp — contenu unique */}
              <div className="aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={t.image}
                  alt="شهادة عميل"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
