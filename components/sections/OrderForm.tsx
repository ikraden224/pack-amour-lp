"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m, useInView } from "framer-motion";
import { ShieldCheck, Truck, Gift, Check, Loader2 } from "lucide-react";
import { orderSchema, OrderData, OFFERS } from "@/lib/schemas/order";
import { pack } from "@/lib/data/product";
import { content } from "@/lib/data/content";
import { trackInitiateCheckout } from "@/lib/analytics/events";

// ── Field helper ────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-bold" style={{ color: "var(--noir)", fontSize: "14px" }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="font-medium" style={{ color: "var(--rouge)", fontSize: "13px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Input styles ─────────────────────────────────────────────────────────────
const inputBase =
  "w-full rounded-lg border px-4 py-3 font-medium outline-none transition-all " +
  "focus:ring-2 focus:ring-[#8B1A1F] focus:border-[#8B1A1F]";
const inputStyle = { fontSize: "16px", borderColor: "#E5E5E5", color: "var(--noir)", backgroundColor: "#FFFFFF" };
const inputErr   = { ...inputStyle, borderColor: "#8B1A1F" };

// ── Sub-features récap ───────────────────────────────────────────────────────
const subFeatures = [
  { icon: ShieldCheck, label: content.whyUs[0].title },
  { icon: Truck,       label: "توصيل 24-48 ساعة" },
  { icon: Gift,        label: "مغلفة وجاهزة للهدية" },
];

// ── Composant principal ──────────────────────────────────────────────────────
export default function OrderForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track InitiateCheckout une seule fois quand la section devient visible
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.3 });
  useEffect(() => {
    if (isInView) trackInitiateCheckout();
  }, [isInView]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { offer: "single" },
  });

  const selectedOffer = watch("offer");
  const currentPrice  = OFFERS[selectedOffer]?.price ?? 200;

  const onSubmit = async (data: OrderData) => {
    setSubmitError(null);
    try {
      const res  = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        router.push(`/merci?orderId=${json.orderId}&total=${currentPrice}`);
      } else {
        setSubmitError("حدث خطأ، حاول مرة أخرى");
      }
    } catch {
      setSubmitError("حدث خطأ في الاتصال، تحقق من الإنترنت وحاول مجددا");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="order-form"
      className="py-16 md:py-24"
      style={{ backgroundColor: "var(--rouge)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* ── En-tête ── */}
        <div className="text-center mb-10 md:mb-14">
          <m.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="font-black"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.1, fontWeight: 900, marginBottom: "0.5rem" }}
          >
            <span style={{ color: "var(--ivory)" }}>{"اطلب باقة الحب "}</span>
            <span style={{ color: "var(--gold)" }}>{"دابا"}</span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" as const }}
            className="font-medium"
            style={{ color: "rgba(248,240,227,0.7)", fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)" }}
          >
            عمر الفورمولير ونتواصلو معاك
          </m.p>
        </div>

        {/* ── Grid 5 colonnes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start">

          {/* ── Récap pack (2/5) ── */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="lg:col-span-2 lg:sticky lg:top-8"
          >
            <div className="rounded-2xl p-6 flex flex-col items-center gap-4" style={{ backgroundColor: "var(--ivory)" }}>
              {/* Photo */}
              <div className="w-full overflow-hidden rounded-xl">
                <Image
                  src={pack.images[0]}
                  alt="باقة الحب"
                  width={500}
                  height={500}
                  className="w-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
              </div>
              {/* Nom + tagline */}
              <div className="text-center">
                <p className="font-black" style={{ fontSize: "28px", color: "var(--noir)", fontWeight: 900 }}>
                  {pack.nameAr}
                </p>
                <p className="font-medium" style={{ fontSize: "14px", color: "rgba(10,10,10,0.6)" }}>
                  {pack.tagline}
                </p>
              </div>
              {/* Prix de base */}
              <p className="font-black" style={{ fontSize: "36px", color: "var(--rouge)", fontWeight: 900, lineHeight: 1 }}>
                {pack.price} درهم
              </p>
              <div className="w-full h-px" style={{ backgroundColor: "rgba(201,169,97,0.3)" }} />
              {/* Sub-features */}
              <div className="w-full flex flex-col gap-2.5">
                {subFeatures.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                    <span className="font-medium" style={{ fontSize: "13px", color: "var(--neutral-700)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </m.div>

          {/* ── Formulaire (3/5) ── */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl p-6 md:p-8 shadow-xl" style={{ backgroundColor: "#FFFFFF" }}>

              {/* Erreur submission */}
              {submitError && (
                <div
                  className="mb-5 rounded-lg px-4 py-3 font-medium text-center"
                  style={{ backgroundColor: "#FEE2E2", color: "var(--rouge)", fontSize: "14px" }}
                >
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">

                {/* ── Sélecteur d'offre ── */}
                <div>
                  <p className="font-bold mb-3" style={{ color: "var(--noir)", fontSize: "14px" }}>
                    اختر عرضك
                  </p>
                  <div className="grid grid-cols-2 gap-3">

                    {/* Card باقة واحدة */}
                    <label
                      className="relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200"
                      style={{
                        borderColor: selectedOffer === "single" ? "var(--gold)" : "#E5E5E5",
                        backgroundColor: selectedOffer === "single" ? "#FFF8E8" : "#FAF6F2",
                        boxShadow: selectedOffer === "single" ? "0 0 0 3px rgba(201,169,97,0.2)" : "none",
                      }}
                    >
                      <input
                        type="radio"
                        value="single"
                        className="sr-only"
                        {...register("offer")}
                      />
                      <p className="font-bold" style={{ fontSize: "15px", color: "var(--noir)" }}>
                        باقة واحدة
                      </p>
                      <p className="font-black mt-1" style={{ fontSize: "22px", color: "var(--gold)", fontWeight: 900, lineHeight: 1.1 }}>
                        200 درهم
                      </p>
                      <p className="font-medium mt-0.5" style={{ fontSize: "12px", color: "rgba(10,10,10,0.5)" }}>
                        للهدية الواحدة
                      </p>
                    </label>

                    {/* Card باقتان */}
                    <label
                      className="relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200"
                      style={{
                        borderColor: selectedOffer === "double" ? "var(--gold)" : "#E5E5E5",
                        backgroundColor: selectedOffer === "double" ? "#FFF8E8" : "#FAF6F2",
                        boxShadow: selectedOffer === "double" ? "0 0 0 3px rgba(201,169,97,0.2)" : "none",
                      }}
                    >
                      <input
                        type="radio"
                        value="double"
                        className="sr-only"
                        {...register("offer")}
                      />
                      {/* Badge -25% (RTL : visuellement en haut à gauche) */}
                      <span
                        className="absolute top-2 end-2 font-bold rounded-md px-2 py-0.5"
                        style={{
                          fontSize: "11px",
                          backgroundColor: "var(--rouge)",
                          color: "var(--ivory)",
                        }}
                      >
                        -25%
                      </span>
                      <p className="font-bold" style={{ fontSize: "15px", color: "var(--noir)" }}>
                        باقتان
                      </p>
                      <p className="font-black mt-1" style={{ fontSize: "22px", color: "var(--gold)", fontWeight: 900, lineHeight: 1.1 }}>
                        300 درهم
                      </p>
                      <p className="font-medium line-through" style={{ fontSize: "12px", color: "rgba(10,10,10,0.4)" }}>
                        بدل 400 درهم
                      </p>
                      <p className="font-bold mt-0.5" style={{ fontSize: "12px", color: "var(--rouge)" }}>
                        وفر 100 درهم
                      </p>
                    </label>

                  </div>
                  {errors.offer && (
                    <p className="mt-1.5 font-medium" style={{ color: "var(--rouge)", fontSize: "13px" }}>
                      {errors.offer.message}
                    </p>
                  )}
                </div>

                {/* ── الاسم الكامل ── */}
                <Field label="الاسم الكامل" error={errors.fullName?.message}>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="مثلا : أحمد العلوي"
                    className={inputBase + " text-right"}
                    style={errors.fullName ? inputErr : inputStyle}
                    dir="rtl"
                  />
                </Field>

                {/* ── المدينة والعنوان ── */}
                <Field label="المدينة والعنوان الكامل" error={errors.cityAddress?.message}>
                  <textarea
                    {...register("cityAddress")}
                    rows={3}
                    placeholder="مثلا : الدار البيضاء، حي السلام، زنقة 5، رقم 12"
                    className={inputBase + " text-right resize-none"}
                    style={errors.cityAddress ? inputErr : inputStyle}
                    dir="rtl"
                  />
                </Field>

                {/* ── رقم الهاتف ── */}
                <Field label="رقم الهاتف" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    type="tel"
                    inputMode="tel"
                    placeholder="06XXXXXXXX"
                    className={inputBase}
                    style={errors.phone ? inputErr : inputStyle}
                    dir="ltr"
                  />
                </Field>

                {/* ── Bouton submit ── */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-lg flex items-center justify-center gap-2 font-black transition-opacity"
                  style={{
                    padding: "16px",
                    fontSize: "16px",
                    fontWeight: 900,
                    backgroundColor: "var(--gold)",
                    color: "var(--noir)",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.65 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>أرسل الطلب — {currentPrice} درهم</span>
                    </>
                  )}
                </button>

                {/* Note COD */}
                <p className="text-center font-medium" style={{ fontSize: "12px", color: "var(--neutral-400)" }}>
                  هدية ومغلفة جاهزة للتقديم — الدفع عند الإستلام
                </p>

              </form>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
