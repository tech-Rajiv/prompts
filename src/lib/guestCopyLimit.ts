export const GUEST_COPY_LIMIT = 5;

const STORAGE_KEY = 'pfy_guest_copies_used';

export function getCopiesUsed(): number {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(STORAGE_KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, GUEST_COPY_LIMIT);
}

export function getCopiesRemaining(): number {
  return Math.max(0, GUEST_COPY_LIMIT - getCopiesUsed());
}

export function recordGuestCopy(): number {
  const used = Math.min(getCopiesUsed() + 1, GUEST_COPY_LIMIT);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(used));
  }
  return getCopiesRemaining();
}
