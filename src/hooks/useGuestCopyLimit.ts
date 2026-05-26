'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  GUEST_COPY_LIMIT,
  getCopiesRemaining,
  recordGuestCopy,
} from '@/lib/guestCopyLimit';

export function useGuestCopyLimit() {
  const [copiesRemaining, setCopiesRemaining] = useState(GUEST_COPY_LIMIT);

  useEffect(() => {
    setCopiesRemaining(getCopiesRemaining());
  }, []);

  const tryCopy = useCallback(
    (text: string, onSuccess: (text: string) => void, onRequireLogin: () => void) => {
      const remaining = getCopiesRemaining();
      if (remaining <= 0) {
        setCopiesRemaining(0);
        onRequireLogin();
        return;
      }

      navigator.clipboard?.writeText(text).catch(() => {});
      recordGuestCopy();
      const next = getCopiesRemaining();
      setCopiesRemaining(next);
      onSuccess(text);
    },
    [],
  );

  const isCopyLocked = copiesRemaining <= 0;

  return { copiesRemaining, isCopyLocked, tryCopy };
}
