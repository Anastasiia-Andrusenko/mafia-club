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

// `import animation from "@/lotties/load.json?dotlottie"` is unpacked by
// scripts/dotlottie-loader.cjs (see next.config.mjs) into plain Lottie JSON.
declare module "*?dotlottie" {
  const animationData: Record<string, unknown>;
  export default animationData;
}
