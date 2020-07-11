import mongoose from 'mongoose';
import { BaseDocumentData } from './types';
import { maxCustomAliasLength } from '@/constants';
import uniqueValidator from 'mongoose-unique-validator';

interface ShortUrlFields {
  url: string;
  alias: string;
  clicks: number;
}

export type ShortUrlData = BaseDocumentData & ShortUrlFields;

type ShortUrlDocument = mongoose.Document & ShortUrlFields;

const shortUrlSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    alias: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: maxCustomAliasLength,
    },
    clicks: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

// To have a custom error message when unique validation fails.
shortUrlSchema.plugin(uniqueValidator, {
  message: '"{VALUE}" is already in use. Please use another {PATH}.',
});

// For "Cannot overwrite model once compiled" error:
// https://hoangvvo.com/blog/migrate-from-express-js-to-next-js-api-routes/
const ShortUrl =
  (mongoose.models.ShortUrl as mongoose.Model<ShortUrlDocument>) ||
  mongoose.model<ShortUrlDocument>('ShortUrl', shortUrlSchema);

export default ShortUrl;
