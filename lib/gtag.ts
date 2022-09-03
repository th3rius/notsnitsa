export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!;

export interface Event {
  action: Gtag.EventNames | string;
  category?: string;
  label?: string;
  value: any;
}

export function pageview(url: string) {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
}

export function event({action, category, label, value}: Event) {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}
