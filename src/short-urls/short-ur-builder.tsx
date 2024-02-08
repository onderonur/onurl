'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { createShortUrl } from './short-url-actions';
import { ShortUrlForm } from './short-url-form';
import { ShortUrlResult } from './short-url-result';

export function ShortUrlBuilder() {
  const formRef = useRef<React.ElementRef<'form'>>(null);
  const [state, formAction] = useFormState(createShortUrl, null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-5">
      <ShortUrlForm
        ref={formRef}
        action={formAction}
        fieldErrors={state?.success ? null : state?.fieldErrors}
      />
      <ShortUrlResult
        shortUrl={state?.success ? state.data : null}
        error={state?.success ? null : state?.error}
      />
    </div>
  );
}
