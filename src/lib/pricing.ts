/**
 * Genera un precio simulado y consistente para una película,
 * basado en su id de TMDB (mismo id siempre da el mismo precio).
 */
export function getTicketPrice(movieId: number): number {
  const MIN_PRICE = 15;
  const MAX_PRICE = 35;
  const range = MAX_PRICE - MIN_PRICE;

  const pseudoRandom = (movieId * 9301 + 49297) % 233280;
  const normalized = pseudoRandom / 233280;

  return Math.round(MIN_PRICE + normalized * range);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(amount);
}