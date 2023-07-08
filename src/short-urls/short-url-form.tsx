'use client';

import ShortUrlResult from './short-url-result';
import { createShortUrl } from './short-url-actions';
import FormControl from '@/form-items/form-control';
import FormLabel from '@/form-items/form-label';
import Input from '@/form-items/input';
import SubmitButton from '@/form-items/submit-button';
import { useFormAction } from '@/server-actions/server-action-hooks';
import FormErrorMessage from '@/form-items/form-error-message';
import { ShortUrlInput } from './short-url-utils';
import { ShortUrl } from '@prisma/client';

export default function ShortUrlForm() {
  const { data, error, fieldErrors, runAction, formRef } = useFormAction<
    ShortUrlInput,
    ShortUrl
  >(createShortUrl);

  return (
    <div className="flex flex-col gap-5">
      <form
        ref={formRef}
        className="flex flex-col gap-2"
        autoComplete="off"
        action={runAction}
      >
        <FormControl isRequired errorMessages={fieldErrors?.url}>
          <FormLabel>URL</FormLabel>
          <Input name="url" type="url" />
          <FormErrorMessage />
        </FormControl>
        <FormControl errorMessages={fieldErrors?.customAlias}>
          <FormLabel>Custom Alias (Optional)</FormLabel>
          <Input name="customAlias" autoCapitalize="off" />
          <FormErrorMessage />
        </FormControl>
        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </form>
      <ShortUrlResult shortUrl={data} error={error} />
    </div>
  );
}
