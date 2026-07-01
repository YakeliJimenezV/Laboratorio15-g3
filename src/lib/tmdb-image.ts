export type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
export type BackdropSize = "w300" | "w780" | "w1280" | "original";

const TMDB_IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

export function getPosterUrl(
  path: string | null,
  size: PosterSize = "w500"
) {
  if (!path) return "/placeholder-poster.png";
  return `${TMDB_IMAGE_URL}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: BackdropSize = "w1280"
) {
  if (!path) return "/placeholder-backdrop.png";
  return `${TMDB_IMAGE_URL}/${size}${path}`;
}