import { z } from "zod";

export const orderSchema = z.object({
  fullName: z.string()
    .min(3, "الاسم الكامل مطلوب (3 حروف على الأقل)")
    .max(100, "الاسم طويل بزاف"),

  cityAddress: z.string()
    .min(2, "المدينة مطلوبة")
    .max(300, "العنوان طويل بزاف"),

  phone: z.string()
    .regex(/^0[67]\d{8}$/, "رقم الهاتف لازم يبدأ بـ 06 أو 07 ويكون 10 أرقام")
    .length(10, "رقم الهاتف لازم يكون 10 أرقام"),

  offer: z.enum(["single", "double"], {
    error: "اختر العرض من فضلك",
  }),
});

export type OrderData = z.infer<typeof orderSchema>;

// Prix par offre
export const OFFERS = {
  single: { label: "باقة واحدة", price: 200, packs: 1 },
  double: { label: "باقتان", price: 300, packs: 2, oldPrice: 400, discount: 25 },
} as const;
