import { ShortUrlInput } from '@/types';
import * as Yup from 'yup';
import validator from 'validator';
import { maxCustomAliasLength } from '@/constants';

export const shortUrlInputValidationSchema = Yup.object().shape<ShortUrlInput>({
  url: Yup.string()
    .label('URL')
    .required()
    .test(
      'is-url',
      ({ label }) => `${label} does not have a valid URL format`,
      (value) => (value ? validator.isURL(value) : true),
    )
    .trim(),
  customAlias: Yup.string()
    .label('Custom Alias')
    .max(maxCustomAliasLength)
    .trim(),
});
