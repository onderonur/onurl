import React, { useContext, useId } from 'react';

export type FormControlContextValue = {
  isRequired?: boolean;
  isInvalid?: boolean;
  ids: {
    input: string;
    message: string;
  };
};

const FormControlContext = React.createContext({} as FormControlContextValue);

export function useFormControl() {
  return useContext(FormControlContext);
}

type FormControlProviderProps = React.PropsWithChildren<
  Pick<FormControlContextValue, 'isInvalid' | 'isRequired'>
>;

export default function FormControlProvider({
  children,
  ...rest
}: FormControlProviderProps) {
  const id = useId();

  return (
    <FormControlContext.Provider
      value={{ ...rest, ids: { input: id, message: `${id}-message` } }}
    >
      {children}
    </FormControlContext.Provider>
  );
}
