import { goTry } from 'go-try';
import { ZodError, z } from 'zod';
import { ServerActionResult } from './server-action-types';

export const createAction =
  <Input, Data>(action: (formData: FormData) => Promise<Data>) =>
  async (formData: FormData): Promise<ServerActionResult<Input, Data>> => {
    const [error, data] = await goTry<Data>(() => action(formData));

    const actionErrors = formatActionError<Input>(error);

    return {
      data,
      error: actionErrors?.error,
      fieldErrors: actionErrors?.fieldErrors,
    };
  };

function formatActionError<Input>(error: unknown) {
  if (!error) {
    return null;
  }

  const ZodErrorSchema = z.instanceof(ZodError<Input>);
  const zodErrorResult = ZodErrorSchema.safeParse(error);

  if (zodErrorResult.success) {
    const { fieldErrors } = zodErrorResult.data.formErrors;
    return { error: null, fieldErrors };
  }

  const ErrorSchema = z.instanceof(Error);
  const errorResult = ErrorSchema.safeParse(error);
  let errorMessage = 'Something went wrong';

  if (errorResult.success) {
    errorMessage = errorResult.data.message;
  }

  return { error: errorMessage, fieldErrors: null };
}
