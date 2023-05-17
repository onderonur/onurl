import { useRef, useState } from 'react';
import { Maybe } from '../common/common-types';
import { FieldErrors, ServerActionResult } from './server-action-types';

export function useFormAction<Input, Data>(
  action: (formData: FormData) => Promise<ServerActionResult<Input, Data>>,
) {
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<Maybe<Data>>(null);
  const [error, setError] = useState<Maybe<string>>(null);
  const [fieldErrors, setFieldErrors] =
    useState<Maybe<FieldErrors<Input>>>(null);

  return {
    formRef,
    data,
    error,
    fieldErrors,
    runAction: async (formData: FormData) => {
      setData(null);
      setError(null);
      setFieldErrors(null);

      const { data, error, fieldErrors } = await action(formData);

      if (error || fieldErrors) {
        setError(error);
        setFieldErrors(fieldErrors);
        return;
      }

      formRef.current?.reset();
      setData(data);
      return data;
    },
  };
}
