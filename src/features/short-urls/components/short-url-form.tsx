import type { FieldErrors } from '@/core/actions/actions.types';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@/core/forms/components/form-control';
import { Input } from '@/core/forms/components/input';
import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Maybe } from '@/core/shared/shared.types';
import { forwardRef } from 'react';
import type { ShortUrlInput } from '../short-urls.schemas';

type ShortUrlFormProps = {
  action: React.FormHTMLAttributes<HTMLFormElement>['action'];
  fieldErrors: Maybe<FieldErrors<ShortUrlInput>>;
};

export const ShortUrlForm = forwardRef<
  React.ElementRef<'form'>,
  ShortUrlFormProps
>(function ShortUrlForm({ action, fieldErrors }, ref) {
  return (
    <form
      ref={ref}
      className="flex flex-col gap-2"
      autoComplete="off"
      action={action}
    >
      <FormControl isRequired errorMessages={fieldErrors?.url?._errors}>
        <FormLabel>URL</FormLabel>
        <Input name="url" type="url" />
        <FormErrorMessage />
      </FormControl>
      <FormControl errorMessages={fieldErrors?.customAlias?._errors}>
        <FormLabel>Custom Alias (Optional)</FormLabel>
        <Input name="customAlias" autoCapitalize="off" />
        <FormErrorMessage />
      </FormControl>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
});
