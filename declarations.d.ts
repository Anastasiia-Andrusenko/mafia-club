declare module "\*.css";
declare module "\*.scss";

interface Window {
  gtag?: (
    command: string,
    targetIdAction: string | Date,
    params?: Record<string, unknown>,
  ) => void;
  dataLayer?: unknown[];
}
