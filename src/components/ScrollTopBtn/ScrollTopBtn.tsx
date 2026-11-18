import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import css from "./ScrollTopBtn.module.css";

/** Pixels of scroll movement ignored as jitter when reading the direction. */
const DIRECTION_THRESHOLD = 6;
/** The button fades away after this long without scrolling. */
const IDLE_HIDE_MS = 2500;
/** Hide while the footer covers more than this share of the viewport. */
const FOOTER_COVER_RATIO = 0.25;

/**
 * "Back to top" button with smart visibility, so it never sits on top of the
 * content the visitor is reading:
 *  - hidden for the first screen of the page;
 *  - appears only on scroll-UP (the intent to go back), hides on scroll-down;
 *  - fades out after a short idle time (stays while hovered / focused);
 *  - steps aside when the footer fills the screen (it holds the contacts);
 *  - sits at the safe-area corner, clear of the centred loading indicator.
 * State only changes when visibility flips, so scrolling does not re-render.
 */
const ScrollTopBtn = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const engaged = useRef(false); // pointer over / keyboard focus on the button
  const idleTimer = useRef<number | undefined>(undefined);

  const scheduleIdleHide = useCallback(() => {
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      if (!engaged.current) setIsVisible(false);
    }, IDLE_HIDE_MS);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const footerCoversScreen = () => {
      const footer = document.getElementById("footer");
      if (!footer) return false;
      const { top } = footer.getBoundingClientRect();
      const covered = (window.innerHeight - top) / window.innerHeight;
      return covered > FOOTER_COVER_RATIO;
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < DIRECTION_THRESHOLD) return;
      lastY = y;

      if (y < window.innerHeight || footerCoversScreen()) {
        window.clearTimeout(idleTimer.current);
        setIsVisible(false);
      } else if (delta < 0) {
        setIsVisible(true);
        scheduleIdleHide();
      } else if (!engaged.current) {
        setIsVisible(false);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer.current);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [scheduleIdleHide]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const engage = () => {
    engaged.current = true;
    window.clearTimeout(idleTimer.current);
  };
  const release = () => {
    engaged.current = false;
    scheduleIdleHide();
  };

  return (
    <button
      type="button"
      className={`${css.wrapper} ${isVisible ? css.show : ""}`}
      onClick={scrollToTop}
      onPointerEnter={engage}
      onPointerLeave={release}
      onFocus={engage}
      onBlur={release}
      aria-label={t.a11y.scrollTop}
      // Not focusable / announced while it is faded out.
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={isVisible ? undefined : true}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
};

export default ScrollTopBtn;
