'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  GUEST_COPY_LIMIT,
  getCopiesRemaining,
  recordGuestCopy,
} from '@/lib/guestCopyLimit';

export function useGuestCopyLimit() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const [copiesRemaining, setCopiesRemaining] = useState(GUEST_COPY_LIMIT);

  useEffect(() => {
    setCopiesRemaining(getCopiesRemaining());
  }, []);

  const tryCopy = useCallback(
    (text: string, onSuccess: (text: string) => void, onRequireLogin: () => void) => {
      // Signed-in users copy without any limit.
      if (isAuthenticated) {
        navigator.clipboard?.writeText(text).catch(() => {});
        onSuccess(text);
        return;
      }

      const remaining = getCopiesRemaining();
      if (remaining <= 0) {
        setCopiesRemaining(0);
        onRequireLogin();
        return;
      }

      navigator.clipboard?.writeText(text).catch(() => {});
      recordGuestCopy();
      setCopiesRemaining(getCopiesRemaining());
      onSuccess(text);
    },
    [isAuthenticated],
  );

  // Authenticated users are never locked and have no remaining-count badge.
  const unlimited = isAuthenticated;
  const isCopyLocked = !isAuthenticated && copiesRemaining <= 0;

  return { copiesRemaining, isCopyLocked, unlimited, tryCopy };
}
