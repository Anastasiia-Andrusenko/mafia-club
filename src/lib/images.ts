/**
 * Gallery photos are stored twice (see scripts/generate-thumbs.mjs):
 *   `/images/<set>-large/<name>.webp`  full size, shown in the gallery modal
 *   `/images/<set>-thumb/<name>.webp`  640px preview, used by grids and strips
 */
export const toThumb = (largeSrc: string): string =>
  largeSrc.replace("-large/", "-thumb/");
