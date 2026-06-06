// Types globaux pour fbq et ttq
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { page: () => void; track: (event: string, data?: unknown) => void };
  }
}

type EventParams = {
  value?: number;
  currency?: string;
  content_name?: string;
  content_ids?: string[];
};

export const trackPageView = () => {
  if (typeof window === "undefined") return;
  if (window.fbq) window.fbq("track", "PageView");
  if (window.ttq) window.ttq.page();
};

export const trackViewContent = (params?: EventParams) => {
  if (typeof window === "undefined") return;
  const data = {
    content_name: "باقة الحب",
    content_ids: ["pack-amour"],
    content_type: "product",
    value: 200,
    currency: "MAD",
    ...params,
  };
  if (window.fbq) window.fbq("track", "ViewContent", data);
  if (window.ttq) window.ttq.track("ViewContent", data);
};

export const trackInitiateCheckout = (params?: EventParams) => {
  if (typeof window === "undefined") return;
  const data = {
    content_name: "باقة الحب",
    content_ids: ["pack-amour"],
    value: 200,
    currency: "MAD",
    ...params,
  };
  if (window.fbq) window.fbq("track", "InitiateCheckout", data);
  if (window.ttq) window.ttq.track("InitiateCheckout", data);
};

export const trackPurchase = (params: EventParams & { value: number }) => {
  if (typeof window === "undefined") return;
  const data = {
    content_name: "باقة الحب",
    content_ids: ["pack-amour"],
    currency: "MAD",
    ...params,
  };
  if (window.fbq) window.fbq("track", "Purchase", data);
  if (window.ttq) window.ttq.track("CompletePayment", data);
};
