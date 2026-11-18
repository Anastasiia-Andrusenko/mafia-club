import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import css from "./YouTubeFacade.module.css";

type YouTubeFacadeProps = {
  /** YouTube video id, e.g. "tUHAoshTRQ0". */
  videoId: string;
  /** Descriptive title: names the play button and the iframe once loaded. */
  title: string;
  /** Poster image, self-hosted (public/img/video/<id>.webp, 640x360). */
  poster: string;
  className?: string;
};

const EMBED_ORIGIN = "https://www.youtube-nocookie.com";
let preconnected = false;

/** Opens the connection to the player origin a moment before the click. */
const warmUpConnection = () => {
  if (preconnected || typeof document === "undefined") return;
  preconnected = true;
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = EMBED_ORIGIN;
  document.head.appendChild(link);
};

/**
 * Click-to-load YouTube embed. Until the visitor presses play only a poster
 * and a button are rendered: no iframe, no ~1 MB of YouTube JS, and no
 * third-party cookies. The player then loads from youtube-nocookie.com.
 */
const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({
  videoId,
  title,
  poster,
  className,
}) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The button unmounts on click; hand keyboard focus to the player.
  useEffect(() => {
    if (isPlaying) frameRef.current?.focus();
  }, [isPlaying]);

  const rootClass = `${css.root} ${className ?? ""}`;

  if (isPlaying) {
    return (
      <div className={rootClass}>
        <iframe
          ref={frameRef}
          className={css.frame}
          src={`${EMBED_ORIGIN}/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={rootClass}>
      <Image
        className={css.poster}
        src={poster}
        alt=""
        width={640}
        height={360}
        sizes="(max-width: 767px) 90vw, 560px"
      />
      <button
        type="button"
        className={css.play}
        onClick={() => setIsPlaying(true)}
        onPointerEnter={warmUpConnection}
        onFocus={warmUpConnection}
        aria-label={`${t.a11y.playVideo}: ${title}`}
      >
        <svg
          className={css.playIcon}
          viewBox="0 0 68 48"
          width="68"
          height="48"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className={css.playShape}
            d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
          />
          <path d="M45 24 27 14v20" fill="#fff" />
        </svg>
      </button>
    </div>
  );
};

export default YouTubeFacade;
