import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { pack } from "@/lib/data/product";
import PurchaseTracker from "@/components/analytics/PurchaseTracker";

export default function MerciPage({
  searchParams,
}: {
  searchParams: { orderId?: string; total?: string };
}) {
  const waMessage = encodeURIComponent("سلام، بغيت معلومات على باقة الحب");
  const waHref    = `https://wa.me/${pack.whatsapp.replace("+", "")}?text=${waMessage}`;
  const totalVal  = searchParams.total ? Number(searchParams.total) : 200;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "var(--ivory)" }}
    >
      {/* Fire Purchase pixel */}
      <PurchaseTracker value={totalVal} />

      <div
        className="w-full max-w-md text-center rounded-2xl shadow-xl p-8 md:p-12"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Icône succès */}
        <div className="flex justify-center mb-5">
          <CheckCircle2 size={64} style={{ color: "var(--rouge)" }} strokeWidth={1.5} />
        </div>

        {/* Titre */}
        <h1
          className="font-black mb-2"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)", color: "var(--noir)", fontWeight: 900 }}
        >
          شكرا على ثقتك!
        </h1>

        {/* Sub */}
        <p className="font-bold mb-4" style={{ color: "var(--rouge)", fontSize: "17px" }}>
          تم استلام طلبك بنجاح
        </p>

        {/* Order ID */}
        {searchParams.orderId && (
          <p
            className="mb-4 font-medium rounded-lg px-4 py-2 inline-block"
            style={{
              backgroundColor: "var(--ivory)",
              color: "var(--neutral-700)",
              fontSize: "13px",
              fontFamily: "monospace",
            }}
          >
            رقم الطلب : {searchParams.orderId}
          </p>
        )}

        {/* Message */}
        <p
          className="mb-8 font-medium leading-relaxed"
          style={{ color: "rgba(10,10,10,0.65)", fontSize: "15px" }}
        >
          غادي نتواصلو معاك في أقرب وقت لتأكيد التفاصيل والتوصيل
        </p>

        {/* Séparateur */}
        <div
          className="mx-auto mb-8 h-px"
          style={{ width: "40%", backgroundColor: "var(--gold)" }}
        />

        {/* Boutons */}
        <div className="flex flex-col gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg py-3 font-black transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#25D366", color: "#FFFFFF", fontSize: "15px", fontWeight: 900 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            تواصل معنا على واتساب
          </a>

          <Link
            href="/"
            className="rounded-lg py-3 font-bold transition-opacity hover:opacity-70"
            style={{ color: "var(--neutral-400)", fontSize: "14px" }}
          >
            ← الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
