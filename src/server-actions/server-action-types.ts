import { Maybe } from '@/common/common-types';
import { z } from 'zod';

export type ServerActionResult<Input, Data> = {
  data: Maybe<Data>;
  error: Maybe<string>;
  fieldErrors: Maybe<z.typeToFlattenedError<Input>['fieldErrors']>;
};

export type FieldErrors<Input> = z.typeToFlattenedError<Input>['fieldErrors'];
