import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { ZodError } from "zod";
import { orderSchema, OFFERS } from "@/lib/schemas/order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = orderSchema.parse(body);
    const offerDetails = OFFERS[validated.offer];

    const orderId   = `ORDER-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const webhookPayload = {
      orderId,
      timestamp,
      fullName:    validated.fullName,
      phone:       validated.phone,
      cityAddress: validated.cityAddress,
      offer:       offerDetails.label,  // "باقة واحدة" ou "باقتان"
      quantity:    offerDetails.packs,  // 1 ou 2 (nombre de packs)
      packs:       offerDetails.packs,  // gardé pour compat ancien script
      unitPrice:   200,                 // prix unitaire de référence
      total:       offerDetails.price,  // 200 ou 300 (total à encaisser)
      currency:    "MAD",
      source:      "pack-amour-lp",
    };

    console.log("📦 Nouvelle commande :", webhookPayload);

    // waitUntil garantit que la promise continue après le return (Vercel serverless)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      waitUntil(
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(webhookPayload),
          signal: AbortSignal.timeout(15000),
        })
          .then((res) => {
            if (res.ok) {
              console.log("✅ Webhook OK — orderId:", orderId);
            } else {
              console.error("⚠️ Webhook non-OK:", res.status, "— orderId:", orderId);
            }
          })
          .catch((err) => {
            console.error("⚠️ Webhook échoué:", err, "— orderId:", orderId);
          })
      );
    } else {
      console.warn("⚠️ GOOGLE_SHEETS_WEBHOOK_URL non configurée");
    }

    // Retour IMMÉDIAT au client (le webhook continue via waitUntil)
    return NextResponse.json(
      { success: true, orderId, message: "تم استلام طلبك بنجاح" },
      { status: 200 }
    );

  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("❌ Erreur API orders :", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ، حاول مرة أخرى" },
      { status: 500 }
    );
  }
}
