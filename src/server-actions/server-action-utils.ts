import { goTry } from 'go-try';
import { ZodError, z } from 'zod';
import { ServerActionResult } from './server-action-types';

export const createAction =
  <InputSchema, Data>(action: (formData: FormData) => Promise<Data>) =>
  async (
    formData: FormData,
  ): Promise<ServerActionResult<InputSchema, Data>> => {
    const [error, data] = await goTry<Data>(() => action(formData));

    const actionErrors = formatActionError<InputSchema>(error);

    return {
      data,
      error: actionErrors?.error,
      fieldErrors: actionErrors?.fieldErrors,
    };
  };

export function formatActionError<InputSchema>(error: unknown) {
  if (!error) {
    return null;
  }

  const ZodErrorSchema = z.instanceof(ZodError<InputSchema>);
  const zodErrorResult = ZodErrorSchema.safeParse(error);

  if (zodErrorResult.success) {
    const { fieldErrors } = zodErrorResult.data.formErrors;
    return { error: null, fieldErrors };
  }

  const ErrorSchema = z.instanceof(Error);
  const errorResult = ErrorSchema.safeParse(error);

  if (errorResult.success) {
    return { error: errorResult.data.message, fieldErrors: null };
  }

  return { error: 'Something went wrong', fieldErrors: null };
}
