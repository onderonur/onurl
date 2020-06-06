import { NextApiHandler, NextApiRequest } from 'next';
import withDb from '@/api/middlewares/withDb';
import { nanoid } from 'nanoid';
import validator from 'validator';
import handleErrors from '@/api/middlewares/handleErrors';
import createError from '@/api/utils/createError';
import { isNonEmptyString, isAbsoluteUrl } from '@/utils';
import { URL_ALIAS_SIZE } from '@/constants';

const extractGetInput = (req: NextApiRequest) => {
  const { alias } = req.query;
  if (!isNonEmptyString(alias)) {
    throw createError(422, 'Invalid Alias');
  }
  return alias;
};

const extractPostInput = (req: NextApiRequest) => {
  let { url } = req.body;
  if (!isNonEmptyString(url)) {
    throw createError(422, 'Invalid URL');
  }
  url = url.trim();
  if (!validator.isURL(url)) {
    throw createError(422, 'Invalid URL');
  }
  // If we have no protocol, we add "http" prefix.
  // Otherwise, it redirects to "http://localhost:3000/<url>"
  // instead of "http(s)://<url>".
  if (!isAbsoluteUrl(url)) {
    url = `http://${url}`;
  }
  let { customAlias } = req.body;
  customAlias = customAlias.toString().trim();
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
      const alias = extractGetInput(req);
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
      const { url, customAlias } = extractPostInput(req);
      const shortened = new models.ShortUrl({
        url,
        alias: customAlias || nanoid(URL_ALIAS_SIZE),
      });
      await shortened.save();
      res.json(shortened);
      break;
    default:
      throw createError(405, 'Method Not Allowed');
  }
};

export default handleErrors(withDb(handler));
