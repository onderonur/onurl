import type { FieldErrors } from '@/core/actions/types';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@/core/forms/components/form-control';
import { Input } from '@/core/forms/components/input';
import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Maybe } from '@/core/shared/types';
import Form from 'next/form';
import type { ShortUrlInput } from '../schemas';

type ShortUrlFormProps = {
  action: NonNullable<React.FormHTMLAttributes<HTMLFormElement>['action']>;
  fieldErrors: Maybe<FieldErrors<ShortUrlInput>>;
  previousFormData: Maybe<FormData>;
};

export function ShortUrlForm({
  action,
  fieldErrors,
  previousFormData,
}: ShortUrlFormProps) {
  return (
    <Form action={action} className="flex flex-col gap-2" autoComplete="off">
      <FormControl isRequired errorMessages={fieldErrors?.url?._errors}>
        <FormLabel>URL</FormLabel>
        <Input
          name="url"
          type="url"
          defaultValue={previousFormData?.get('url')?.toString() ?? ''}
        />
        <FormErrorMessage />
      </FormControl>
      <FormControl errorMessages={fieldErrors?.customAlias?._errors}>
        <FormLabel>Custom Alias (Optional)</FormLabel>
        <Input
          name="customAlias"
          autoCapitalize="off"
          defaultValue={previousFormData?.get('customAlias')?.toString() ?? ''}
        />
        <FormErrorMessage />
      </FormControl>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </Form>
  );
}
