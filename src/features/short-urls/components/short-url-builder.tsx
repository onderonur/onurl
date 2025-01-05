'use client';

import { createShortUrl } from '@/features/short-urls/actions';
import { ShortUrlForm } from '@/features/short-urls/components/short-url-form';
import { ShortUrlResult } from '@/features/short-urls/components/short-url-result';
import { useActionState } from 'react';

export function ShortUrlBuilder() {
  const [state, formAction] = useActionState(createShortUrl, {
    status: 'idle',
  });

  return (
    <div className="flex flex-col gap-5">
      <ShortUrlForm
        action={formAction}
        fieldErrors={state.status === 'error' ? state.fieldErrors : null}
        previousFormData={state.status === 'error' ? state.formData : null}
      />
      <ShortUrlResult
        shortUrl={state.status === 'success' ? state.data : null}
        error={state.status === 'error' ? state.error : null}
      />
    </div>
  );
}
