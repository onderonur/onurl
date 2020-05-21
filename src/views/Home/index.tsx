import React, { useCallback, useReducer } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { isServer, trimString } from '@/utils';
import { Formik, Form, FormikConfig } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  useClipboard,
  Text,
  Stack,
  Box,
} from '@chakra-ui/core';
import { Maybe } from '@/types';
import BaseInput from '@/components/BaseInput';
import { ShortUrlData } from '@/api/models/ShortUrl';
import UrlShortenerSvg from './components/UrlShortenerSvg';
import ExternalLink from '@/components/ExternalLink';
import { MAX_CUSTOM_ALIAS_LENGTH } from '@/constants';
import validator from 'validator';

type OnSubmit<FormValues> = FormikConfig<FormValues>['onSubmit'];

interface UrlFormValues {
  url: string;
  customAlias?: string;
}

const INITIAL_VALUES: UrlFormValues = {
  url: '',
  customAlias: '',
};

const VALIDATION_SCHEMA = Yup.object().shape<UrlFormValues>({
  url: Yup.string()
    .label('URL')
    .required()
    .test('is-url', 'This is not a valid URL', (value) =>
      value ? validator.isURL(value) : true,
    )
    .transform(trimString),
  customAlias: Yup.string()
    .label('Custom Alias')
    .max(MAX_CUSTOM_ALIAS_LENGTH)
    .transform(trimString),
});

interface State {
  data: Maybe<ShortUrlData>;
  error: Maybe<string>;
}

type Action =
  | { type: 'request' }
  | { type: 'success'; response: AxiosResponse }
  | { type: 'error'; error: AxiosError };

const doRequest = (): Action => ({
  type: 'request',
});

const doSuccess = (response: AxiosResponse): Action => ({
  type: 'success',
  response,
});

const doError = (error: AxiosError): Action => ({ type: 'error', error });

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'request':
      return { ...state, data: undefined, error: undefined };
    case 'success':
      return { ...state, data: action.response.data };
    case 'error':
      return { ...state, error: action.error.response?.data };
    default:
      throw new Error();
  }
};

const INITIAL_STATE: State = {
  data: undefined,
  error: undefined,
};

const HomeView = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleSubmit = useCallback<OnSubmit<UrlFormValues>>(
    async (values, formikHelpers) => {
      dispatch(doRequest());
      try {
        const response = await axios.post('/api/shorturl', values);
        dispatch(doSuccess(response));
        formikHelpers.resetForm();
      } catch (error) {
        dispatch(doError(error));
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
    [],
  );

  const { data } = state;
  const url = data?.url;
  const alias = data?.alias;
  const origin = isServer()
    ? process.env.NEXT_PUBLIC_BASE_URL
    : window.location.origin;
  const shortenedUrl = alias ? `${origin}/${alias}` : null;

  const { onCopy, hasCopied } = useClipboard(shortenedUrl);

  const error = state.error;

  return (
    <>
      <Box flex={1} height="200px">
        <UrlShortenerSvg />
      </Box>
      <Formik<UrlFormValues>
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <>
              <Form noValidate>
                <BaseInput
                  name="url"
                  label="URL"
                  isRequired
                  leftIcon="link"
                  autoFocus
                />
                <BaseInput name="customAlias" label="Custom Alias (Optional)" />
                <Flex justify="flex-end" mt={4}>
                  <Button
                    variantColor="purple"
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                  >
                    Submit
                  </Button>
                </Flex>
              </Form>
              <Stack spacing={2} marginY={1}>
                {(data || error) && (
                  <Alert status={error ? 'error' : 'success'} marginY={2}>
                    <AlertIcon />
                    <AlertTitle>
                      {error || 'Your new URL has been created successfully!'}
                    </AlertTitle>
                  </Alert>
                )}
                {url && (
                  <Text fontSize="lg">
                    <Text as="span" fontWeight="bold">
                      Old URL:
                    </Text>{' '}
                    <ExternalLink href={url}>{url}</ExternalLink>
                  </Text>
                )}
                {url && (
                  <Text fontSize="lg">
                    <Text as="span" fontWeight="bold">
                      Old URL Length:
                    </Text>{' '}
                    {url.length} characters
                  </Text>
                )}
                {shortenedUrl && (
                  <Stack spacing={0}>
                    <Flex alignItems="center">
                      <Text fontSize="lg" isTruncated>
                        <Text as="span" fontWeight="bold">
                          New URL:
                        </Text>{' '}
                        <ExternalLink href={shortenedUrl} marginRight={2}>
                          {shortenedUrl}
                        </ExternalLink>
                      </Text>
                      <Button leftIcon="copy" onClick={onCopy}>
                        {hasCopied ? 'Copied' : 'Copy'}
                      </Button>
                    </Flex>
                    <Text fontSize="sm">
                      Click the link to open it in a new tab
                    </Text>
                  </Stack>
                )}
                {shortenedUrl && (
                  <Text fontSize="lg">
                    <Text as="span" fontWeight="bold">
                      New URL Length:
                    </Text>{' '}
                    {shortenedUrl.length} characters
                  </Text>
                )}
              </Stack>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default HomeView;
