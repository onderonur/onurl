import type { z } from 'zod';

export type FieldErrors<Input> = z.ZodFormattedError<Input>;

export type ServerActionState<Input = unknown, Data = unknown> =
  | { status: 'idle' }
  | { status: 'success'; data: Data }
  | {
      status: 'error';
      error?: string;
      fieldErrors?: FieldErrors<Input>;
      formData: FormData;
    };
