import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/shared/SmoothScrollProvider";
import MotionProvider from "@/components/shared/MotionProvider";
import ShellWrapper from "@/components/shared/ShellWrapper";
import Pixels from "@/components/analytics/Pixels";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pack-amour-lp.vercel.app"),
  title: "باقة الحب — هدية تبقى في القلب | CHICCADEAU",
  description:
    "اطلب باقة الحب الفاخرة من ChicCadeau — ساعة، سلسلة، خاتم، وأساور فعلبة هدية واحدة مغلفة وجاهزة للتقديم. الدفع عند الاستلام. توصيل 24-48 ساعة في جميع المدن المغربية.",
  keywords: [
    "باقة الحب", "هدية", "بيجو", "كادو",
    "Pack Amour", "ChicCadeau", "هدية للمرأة", "Cadeau Maroc", "COD Maroc",
  ],
  authors: [{ name: "ChicCadeau" }],
  openGraph: {
    type: "website",
    locale: "ar_MA",
    url: "https://pack-amour-lp.vercel.app",
    siteName: "ChicCadeau",
    title: "باقة الحب — هدية تبقى في القلب",
    description: "هدية فاخرة مغلفة جاهزة للتقديم. الدفع عند الاستلام. توصيل سريع.",
    images: [
      {
        url: "/images/pack-amour/01-hero.webp",
        width: 1200,
        height: 630,
        alt: "باقة الحب — Pack Amour",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "باقة الحب — هدية تبقى في القلب",
    description: "هدية فاخرة مغلفة جاهزة للتقديم. الدفع عند الاستلام.",
    images: ["/images/pack-amour/01-hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://pack-amour-lp.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="ar">
      <body
        className={`${tajawal.variable} font-tajawal`}
        style={{
          fontWeight: 700,
          backgroundColor: "var(--ivory)",
          color: "var(--noir)",
        }}
      >
        <Pixels />
        <MotionProvider>
          <SmoothScrollProvider>
            <ShellWrapper>{children}</ShellWrapper>
          </SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
