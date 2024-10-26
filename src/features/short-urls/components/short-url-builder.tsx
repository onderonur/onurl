'use client';

import { ShortUrlForm } from '@/features/short-urls/components/short-url-form';
import { ShortUrlResult } from '@/features/short-urls/components/short-url-result';
import { createShortUrl } from '@/features/short-urls/short-urls.actions';
import { useActionState } from 'react';

export function ShortUrlBuilder() {
  const [state, formAction] = useActionState(createShortUrl, null);

  return (
    <div className="flex flex-col gap-5">
      <ShortUrlForm
        action={formAction}
        fieldErrors={state?.success ? null : state?.fieldErrors}
        previousFormData={state?.success ? null : state?.formData}
      />
      <ShortUrlResult
        shortUrl={state?.success ? state.data : null}
        error={state?.success ? null : state?.error}
      />
    </div>
  );
}
