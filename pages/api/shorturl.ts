import { NextApiHandler, NextApiRequest } from 'next';
import withDb from '@/api/middlewares/withDb';
import { nanoid } from 'nanoid';
import handleErrors from '@/api/middlewares/handleErrors';
import createError from '@/api/utils/createError';
import { urlAliasLength } from '@/constants';
import { shortUrlInputValidationSchema } from '@/utils/validationSchemas';
import * as Yup from 'yup';
import { parse } from 'uri-js';

const getInputValidationSchema = Yup.object().shape({
  alias: Yup.string().label('Alias').required().trim(),
});

const extractGetInput = async (req: NextApiRequest) => {
  try {
    await getInputValidationSchema.validate(req.query);
  } catch (err) {
    throw createError(422, err.message);
  }
  const { alias } = req.query;
  if (typeof alias !== 'string') {
    throw createError(422, 'Invalid URL');
  }
  return alias;
};

// https://stackoverflow.com/a/19709846
const isAbsoluteUrl = (url: string) => {
  if (url.startsWith('//')) {
    return true;
  }

  const uri = parse(url);
  return !!uri.scheme;
};

const extractPostInput = async (req: NextApiRequest) => {
  try {
    await shortUrlInputValidationSchema.validate(req.body);
  } catch (err) {
    throw createError(422, err.message);
  }
  let { url } = req.body;
  url = url.trim();
  // If we have no protocol, we add "http" prefix.
  // Otherwise, it redirects to "http://localhost:3000/<url>"
  // instead of "http(s)://<url>".
  if (!isAbsoluteUrl(url)) {
    url = `http://${url}`;
  }
  let { customAlias } = req.body;
  customAlias = customAlias.trim();
  customAlias = encodeURIComponent(customAlias);
  return { url, customAlias };
};

const handler: NextApiHandler = async (req, res) => {
  const models = req.models;
  if (!models) {
    throw createError(500, 'Could not find db connection');
  }
  switch (req.method) {
    case 'GET':
      const alias = await extractGetInput(req);
      const shortUrl = await models.ShortUrl.findOneAndUpdate(
        { alias },
        { $inc: { clicks: 1 } },
        // To get the updated doc
        { new: true },
      );
      if (!shortUrl) {
        throw createError(404, 'URL not found');
      }
      res.json(shortUrl);
      break;
    case 'POST':
      const { url, customAlias } = await extractPostInput(req);
      const shortened = new models.ShortUrl({
        url,
        alias: customAlias || nanoid(urlAliasLength),
      });
      await shortened.save();
      res.json(shortened);
      break;
    default:
      throw createError(405, 'Method Not Allowed');
  }
};

export default handleErrors(withDb(handler));
