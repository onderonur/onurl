import FormControl from '@/form-items/form-control';
import FormLabel from '@/form-items/form-label';
import Input from '@/form-items/input';
import SubmitButton from '@/form-items/submit-button';
import FormErrorMessage from '@/form-items/form-error-message';
import type { FieldErrors } from '@/server-actions/server-action-types';
import type { ShortUrlInput } from './short-url-utils';
import type { Maybe } from '@/common/common-types';
import { forwardRef } from 'react';

type ShortUrlFormProps = {
  action: React.FormHTMLAttributes<HTMLFormElement>['action'];
  fieldErrors: Maybe<FieldErrors<ShortUrlInput>>;
};

const ShortUrlForm = forwardRef<React.ElementRef<'form'>, ShortUrlFormProps>(
  function ShortUrlForm({ action, fieldErrors }, ref) {
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
  },
);

export default ShortUrlForm;
