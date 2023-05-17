import { useId } from 'react';
import { createSafeContext } from '@/common/safe-context';
import { Maybe } from '@/common/common-types';

export type FormControlContextValue = {
  isRequired?: boolean;
  ids: {
    input: string;
    message: string;
  };
  errorMessages: Maybe<string[]>;
};

export const [FormControlContext, useFormControl] =
  createSafeContext<FormControlContextValue>({
    displayName: 'FormControlContext',
  });

type FormControlProviderProps = React.PropsWithChildren<
  Pick<FormControlContextValue, 'isRequired' | 'errorMessages'>
>;

export default function FormControlProvider({
  children,
  errorMessages,
  ...rest
}: FormControlProviderProps) {
  const id = useId();

  return (
    <FormControlContext.Provider
      value={{
        ...rest,
        errorMessages,
        ids: { input: id, message: `${id}-message` },
      }}
    >
      {children}
    </FormControlContext.Provider>
  );
}
