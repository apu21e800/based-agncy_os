export function parsePrice(value: string) {
  const parsed = Number(value.replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}
