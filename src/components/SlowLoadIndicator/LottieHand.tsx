import { useEffect, useRef } from "react";
// lottie-web's light build: SVG renderer only, no expression engine. This
// module (and the animation JSON below) only ever lives in a lazily loaded
// chunk, never in the initial bundle.
import lottie from "lottie-web/build/player/lottie_light";
// The local dotLottie asset, unpacked to plain JSON at build time.
import animationData from "@/lotties/load.json?dotlottie";

type LottieHandProps = {
  className?: string;
  /** Called once the SVG has been created, so the caller can swap its fallback out. */
  onReady?: () => void;
};

// A frame where the hand is clearly visible, used as the still image when the
// visitor prefers reduced motion.
const STILL_FRAME = 22;

const LottieHand: React.FC<LottieHandProps> = ({ className, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animation = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: !reduceMotion,
      autoplay: !reduceMotion,
      animationData,
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
    });

    if (reduceMotion) animation.goToAndStop(STILL_FRAME, true);
    onReady?.();

    return () => animation.destroy();
    // `onReady` is intentionally not a dependency: the animation must be
    // created exactly once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={className} aria-hidden="true" />;
};

export default LottieHand;
