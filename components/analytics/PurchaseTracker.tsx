"use client";

import { useEffect } from "react";
import { trackPurchase } from "@/lib/analytics/events";

export default function PurchaseTracker({ value }: { value: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      trackPurchase({ value, currency: "MAD" });
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  return null;
}
