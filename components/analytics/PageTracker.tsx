"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/analytics/events";

export default function PageTracker() {
  useEffect(() => {
    const timer = setTimeout(() => {
      trackViewContent();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
