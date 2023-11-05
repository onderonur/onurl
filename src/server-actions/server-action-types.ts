import type { z } from 'zod';

export type FieldErrors<Input> = z.ZodFormattedError<Input>;

export type ServerActionResult<Input, Data> =
  | { success: true; data: Data }
  | {
      success: false;
      error?: string;
      fieldErrors?: FieldErrors<Input>;
    };
