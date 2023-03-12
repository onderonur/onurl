'use client';

import Button from '@/common/Button';
import { Maybe } from '@/common/CommonTypes';
import FormControl from '@/forms/FormControl';
import FormLabel from '@/forms/FormLabel';
import Input from '@/forms/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShortUrl } from '@prisma/client';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { goTry } from 'go-try';
import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { defaultShortUrlInput, shortUrlInputSchema } from './ShortUrlUtils';
import ShortUrlResult from './ShortUrlResult';
import FormErrorMessage from '@/forms/FormErrorMessage';

type State = {
  data: Maybe<ShortUrl>;
  error: Maybe<string>;
};

type Action =
  | { type: 'request' }
  | { type: 'success'; response: AxiosResponse }
  | { type: 'error'; error: unknown };

const doRequest = (): Action => ({
  type: 'request',
});

const doSuccess = (response: AxiosResponse): Action => ({
  type: 'success',
  response,
});

const doError = (error: unknown): Action => ({
  type: 'error',
  error,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'request':
      return { ...state, data: undefined, error: undefined };
    case 'success':
      return { ...state, data: action.response.data };
    case 'error': {
      const { error } = action;

      let errorMessage = 'An unknown error occured';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (isAxiosError(error)) {
        errorMessage = error.response?.data.message ?? errorMessage;
      }

      return {
        ...state,
        error: errorMessage,
      };
    }
    default:
      throw new Error();
  }
};

const initialState: State = {
  data: undefined,
  error: undefined,
};

export default function ShortUrlForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: defaultShortUrlInput,
    resolver: zodResolver(shortUrlInputSchema),
  });

  const { data, error } = state;
  const url = data?.url;
  const alias = data?.alias;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shortenedUrl = alias ? `${baseUrl}/${alias}` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex flex-col gap-2"
        noValidate
        onSubmit={handleSubmit(async (values) => {
          dispatch(doRequest());
          const [err, response] = await goTry(() =>
            axios.post('/api/shorturl', values),
          );

          if (err) {
            dispatch(doError(err));
            return;
          }

          dispatch(doSuccess(response));
          reset();
        })}
      >
        <FormControl isRequired isInvalid={!!formState.errors.url}>
          <FormLabel>URL</FormLabel>
          <Input {...register('url')} />
          <FormErrorMessage error={formState.errors.url} />
        </FormControl>
        <FormControl isInvalid={!!formState.errors.customAlias}>
          <FormLabel>Custom Alias (Optional)</FormLabel>
          <Input {...register('customAlias')} />
          <FormErrorMessage error={formState.errors.customAlias} />
        </FormControl>
        <div className="flex justify-end">
          <Button type="submit" isLoading={formState.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
      <ShortUrlResult url={url} shortenedUrl={shortenedUrl} error={error} />
    </div>
  );
}
