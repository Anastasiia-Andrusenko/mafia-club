import { useEffect, useState } from "react";

/**
 * Tracks a CSS media query and keeps following it while the window is
 * resized. Returns `false` on the server and for the first client render (so
 * hydration matches the server HTML), then the real value.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
};
