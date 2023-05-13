import { Maybe } from '@/common/common-types';
import { z } from 'zod';

export type ServerActionResult<InputSchema, Data> = {
  data: Maybe<Data>;
  error: Maybe<string>;
  fieldErrors: Maybe<z.typeToFlattenedError<InputSchema>['fieldErrors']>;
};

export type FieldErrors<InputSchema> =
  z.typeToFlattenedError<InputSchema>['fieldErrors'];
