import type { Maybe } from '@/core/shared/shared.types';
import { createContext, use, useId } from 'react';
import { twMerge } from 'tailwind-merge';

type FormControlContextValue = {
  isRequired?: boolean;
  ids: {
    input: string;
    message: string;
  };
  errorMessages: Maybe<string[]>;
};

export const FormControlContext = createContext<FormControlContextValue | null>(
  null,
);

export function useFormControlContext() {
  const value = use(FormControlContext);
  if (!value) throw new Error('FormControlContext not found');
  return value;
}

type FormControlProps = Pick<
  FormControlContextValue,
  'isRequired' | 'errorMessages'
> & {
  children: React.ReactNode;
};

export function FormControl({
  errorMessages,
  children,
  ...rest
}: FormControlProps) {
  const id = useId();

  return (
    <FormControlContext
      value={{
        ...rest,
        errorMessages,
        ids: { input: id, message: `${id}-message` },
      }}
    >
      <div className="flex flex-col gap-1">{children}</div>
    </FormControlContext>
  );
}

type FormLabel = React.ComponentProps<'label'>;

export function FormLabel({ className, children, ...rest }: FormLabel) {
  const { ids, isRequired } = useFormControlContext();

  return (
    <label
      htmlFor={ids.input}
      className={twMerge('font-semibold text-slate-700', className)}
      {...rest}
    >
      {children} {isRequired ? <span className="text-error-600">*</span> : null}
    </label>
  );
}

export function FormErrorMessage() {
  const { ids, errorMessages } = useFormControlContext();

  if (!errorMessages?.length) return null;

  // TODO: Will check example aria attributes and html tags etc.
  // And will apply to all form items.
  // https://chakra-ui.com/docs/components/form-control#improvements-from-v1
  return (
    <div id={ids.message} className="text-error-600" aria-live="polite">
      {errorMessages.join(', ')}
    </div>
  );
}
