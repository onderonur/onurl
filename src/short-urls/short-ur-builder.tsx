'use client';

import ShortUrlResult from './short-url-result';
import { createShortUrl } from './short-url-actions';
import ShortUrlForm from './short-url-form';
import { useFormState } from 'react-dom';
import { useEffect, useRef } from 'react';

export default function ShortUrlBuilder() {
  const formRef = useRef<HTMLFormElement>(null);
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
