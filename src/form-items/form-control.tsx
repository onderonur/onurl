import type { Maybe } from '@/common/common-types';
import { createContext, useContext, useId } from 'react';
import { twMerge } from 'tailwind-merge';

export type FormControlContextValue = {
  isRequired?: boolean;
  ids: {
    input: string;
    message: string;
  };
  errorMessages: Maybe<string[]>;
};

const FormControlContext = createContext<FormControlContextValue>(
  {} as FormControlContextValue,
);

export function useFormControl() {
  return useContext(FormControlContext);
}

type FormControlProps = React.PropsWithChildren<
  Pick<FormControlContextValue, 'isRequired' | 'errorMessages'>
>;

export function FormControl({
  errorMessages,
  children,
  ...rest
}: FormControlProps) {
  const id = useId();

  return (
    <FormControlContext.Provider
      value={{
        ...rest,
        errorMessages,
        ids: { input: id, message: `${id}-message` },
      }}
    >
      <div className="flex flex-col gap-1">{children}</div>
    </FormControlContext.Provider>
  );
}

type FormLabel = React.ComponentProps<'label'>;

export function FormLabel({ className, children, ...rest }: FormLabel) {
  const { ids, isRequired } = useFormControl();

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
  const { ids, errorMessages } = useFormControl();

  if (!errorMessages?.length) {
    return null;
  }

  // TODO: Will check example aria attributes and html tags etc.
  // And will apply to all form items.
  // https://chakra-ui.com/docs/components/form-control#improvements-from-v1
  return (
    <div id={ids.message} className="text-error-600" aria-live="polite">
      {errorMessages.join(', ')}
    </div>
  );
}
