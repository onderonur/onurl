'use client';

import { ShortUrl } from '@prisma/client';
import ShortUrlResult from './short-url-result';
import { ShortUrlInput } from './short-url-utils';
import { createShortUrl } from './short-url-actions';
import { useFormAction } from '@/server-actions/server-action-hooks';
import ShortUrlForm from './short-url-form';

export default function ShortUrlBuilder() {
  const { data, error, fieldErrors, runAction, formRef } = useFormAction<
    ShortUrlInput,
    ShortUrl
  >(createShortUrl);

  return (
    <div className="flex flex-col gap-5">
      <ShortUrlForm
        ref={formRef}
        action={runAction}
        fieldErrors={fieldErrors}
      />
      <ShortUrlResult shortUrl={data} error={error} />
    </div>
  );
}
