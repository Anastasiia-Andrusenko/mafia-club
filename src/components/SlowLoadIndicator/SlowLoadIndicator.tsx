import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "@/hooks/useTranslation";
import css from "./SlowLoadIndicator.module.css";

/** A client-side route change must stall this long before the hint appears. */
export const ROUTE_GRACE_MS = 700;
/** A page still busy loading (after first paint) must stall this long first. */
export const INITIAL_GRACE_MS = 2000;
/** Once shown, stay up at least this long so it never just flashes. */
const MIN_VISIBLE_MS = 500;
/** Delay after `load` before the Lottie chunk is warmed up in idle time. */
const WARM_UP_DELAY_MS = 3000;

type HandProps = { className?: string; onReady?: () => void };

// The lottie-web player + animation live in this lazily imported module, so
// none of it is part of the initial bundle.
const loadLottieHand = () => import("./LottieHand");

/**
 * A small, non-blocking "still loading" hint.
 *
 * Nothing is rendered (and nothing is downloaded) unless a load actually
 * stalls: it shows only if a route transition is still pending after
 * ROUTE_GRACE_MS, or if the document is still loading INITIAL_GRACE_MS after
 * hydration. It never delays paint, never captures pointer events and is a
 * polite live region for assistive tech.
 *
 * A CSS spinner is shown instantly; the local Lottie (src/lotties/load.json)
 * fades in over it as soon as its chunk is available.
 */
const SlowLoadIndicator: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [Hand, setHand] = useState<ComponentType<HandProps> | null>(null);
  const [handReady, setHandReady] = useState(false);

  // --- Trigger: only when something really stalls --------------------------
  useEffect(() => {
    let showTimer: number | undefined;
    let hideTimer: number | undefined;
    let shownAt = 0;

    const scheduleShow = (delay: number) => {
      window.clearTimeout(showTimer);
      showTimer = window.setTimeout(() => {
        window.clearTimeout(hideTimer);
        shownAt = performance.now();
        setVisible(true);
      }, delay);
    };

    const settle = () => {
      window.clearTimeout(showTimer);
      if (!shownAt) return;
      const remaining = MIN_VISIBLE_MS - (performance.now() - shownAt);
      hideTimer = window.setTimeout(
        () => {
          shownAt = 0;
          setVisible(false);
        },
        Math.max(0, remaining),
      );
    };

    const onRouteStart = (_url: string, { shallow }: { shallow: boolean }) => {
      if (!shallow) scheduleShow(ROUTE_GRACE_MS);
    };

    router.events.on("routeChangeStart", onRouteStart);
    router.events.on("routeChangeComplete", settle);
    router.events.on("routeChangeError", settle);

    if (document.readyState !== "complete") {
      scheduleShow(INITIAL_GRACE_MS);
      window.addEventListener("load", settle, { once: true });
    }

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("load", settle);
      router.events.off("routeChangeStart", onRouteStart);
      router.events.off("routeChangeComplete", settle);
      router.events.off("routeChangeError", settle);
    };
  }, [router.events]);

  // --- Lottie: fetch on demand, warm up in idle time on healthy networks ----
  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const constrained =
      connection?.saveData ||
      (connection?.effectiveType && connection.effectiveType !== "4g");
    if (constrained) return;

    let timer: number | undefined;
    const warmUp = () => {
      timer = window.setTimeout(() => {
        const idle = window.requestIdleCallback ?? ((cb: () => void) => cb());
        idle(() => void loadLottieHand().catch(() => undefined));
      }, WARM_UP_DELAY_MS);
    };

    if (document.readyState === "complete") warmUp();
    else window.addEventListener("load", warmUp, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", warmUp);
    };
  }, []);

  useEffect(() => {
    if (!visible || Hand) return;
    let active = true;
    loadLottieHand()
      .then((mod) => active && setHand(() => mod.default))
      // Offline / chunk failure: the CSS spinner simply stays.
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [visible, Hand]);

  useEffect(() => {
    if (!visible) setHandReady(false);
  }, [visible]);

  return (
    <div className={css.root} role="status" aria-live="polite">
      {visible && (
        <div className={css.card}>
          <div className={css.icon}>
            <span
              className={`${css.ring} ${handReady ? css.ringHidden : ""}`}
              aria-hidden="true"
            />
            {Hand && (
              <Hand
                className={`${css.lottie} ${handReady ? css.lottieReady : ""}`}
                onReady={() => setHandReady(true)}
              />
            )}
          </div>
          <span className={css.label}>{t.a11y.loading}</span>
        </div>
      )}
    </div>
  );
};

export default SlowLoadIndicator;
