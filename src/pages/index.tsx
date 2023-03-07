import { useReducer, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Maybe } from '@/common/CommonTypes';
import BaseTextField from '@/common/BaseTextField';
import UrlShortenerLogo from '@/common/UrlShortenerLogo';
import ExternalLink from '@/common/ExternalLink';
import ShareButtons from '@/social-share/ShareButtons';
import UrlQrCode from '@/qr-code/UrlQrCode';
import { Box, InputAdornment, Typography, Alert } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import BaseButton from '@/common/BaseButton';
import { Bold } from '@/common/StyleUtils';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { APP_TITLE } from '@/common/CommonUtils';
import {
  shortUrlInputSchema,
  URL_LIFETIME_IN_MINUTES,
} from '@/short-url/ShortUrlUtils';
import { Stack } from '@mui/material';
import { isAxiosError } from '@/error-handling/ErrorHandlingUtils';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShortUrl } from '@prisma/client';

const qrCodeSize = 256;

interface State {
  data: Maybe<ShortUrl>;
  error: Maybe<string>;
}

type Action =
  | { type: 'request' }
  | { type: 'success'; response: AxiosResponse }
  | { type: 'error'; error: AxiosError | Error };

const doRequest = (): Action => ({
  type: 'request',
});

const doSuccess = (response: AxiosResponse): Action => ({
  type: 'success',
  response,
});

const doError = (error: AxiosError | Error): Action => ({
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
      let errorMessage = error.message;
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

function HomeView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data } = state;
  const url = data?.url;
  const alias = data?.alias;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shortenedUrl = alias ? `${baseUrl}/${alias}` : null;

  const { error } = state;

  const [hasCopied, setHasCopied] = useState(false);

  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: shortUrlInputSchema.getDefault(),
    resolver: yupResolver(shortUrlInputSchema),
  });

  return (
    <Stack direction="column" spacing={4}>
      <Box sx={{ height: '200px' }}>
        <UrlShortenerLogo />
      </Box>
      <Typography
        textAlign="center"
        color={(theme) => theme.palette.primary.dark}
        maxWidth={(theme) => theme.breakpoints.values.sm}
        alignSelf="center"
      >
        {APP_TITLE} is an open source URL shortener demo.
        <br />
        Since this is a demo application, shortened URLs will be active for{' '}
        {URL_LIFETIME_IN_MINUTES} minutes only.
      </Typography>
      <form
        noValidate
        onSubmit={handleSubmit(async (values) => {
          dispatch(doRequest());
          try {
            const response = await axios.post('/api/shorturl', values);
            dispatch(doSuccess(response));
            reset();
          } catch (error) {
            dispatch(doError(error as Error));
          }
        })}
      >
        <Stack direction="column" spacing={2}>
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState }) => (
              <BaseTextField
                {...field}
                label="URL"
                required
                autoFocus
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="customAlias"
            control={control}
            render={({ field, fieldState }) => (
              <BaseTextField
                {...field}
                label="Custom Alias (Optional)"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BaseButton
              type="submit"
              color="primary"
              variant="contained"
              loading={formState.isSubmitting}
              disabled={!formState.isValid}
            >
              Submit
            </BaseButton>
          </Box>
        </Stack>
      </form>
      <Stack direction="column" spacing={2} sx={{ marginY: 1 }}>
        {(data || error) && (
          <Box sx={{ marginY: 2 }}>
            <Alert severity={error ? 'error' : 'success'}>
              {error || 'Your new URL has been created successfully!'}
            </Alert>
          </Box>
        )}
        {url && (
          <Box>
            <Typography noWrap>
              <Bold>Old URL:</Bold>{' '}
              <ExternalLink href={url} hasIcon>
                {url}
              </ExternalLink>
            </Typography>
            <Typography>
              <Bold>Old URL Length:</Bold> {url.length} characters
            </Typography>
          </Box>
        )}
        {shortenedUrl && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography noWrap>
                <Bold>New URL:</Bold>{' '}
                <ExternalLink href={shortenedUrl}>{shortenedUrl}</ExternalLink>
              </Typography>
              <Box sx={{ marginLeft: 1 }}>
                <CopyToClipboard
                  text={shortenedUrl}
                  onCopy={() => {
                    setHasCopied(true);
                    setTimeout(() => {
                      setHasCopied(false);
                    }, 2000);
                  }}
                >
                  <BaseButton
                    startIcon={<FileCopyOutlinedIcon />}
                    size="small"
                    variant="contained"
                  >
                    {hasCopied ? 'Copied' : 'Copy'}
                  </BaseButton>
                </CopyToClipboard>
              </Box>
            </Box>
            <Typography variant="subtitle2" color="textSecondary">
              Click the link to open it in a new tab
            </Typography>
            <Typography>
              <Bold>New URL Length:</Bold> {shortenedUrl.length} characters
            </Typography>
          </Box>
        )}
        {shortenedUrl && (
          <Box sx={{ maxWidth: qrCodeSize }}>
            <Typography>
              <Bold>QR Code:</Bold>
            </Typography>
            <UrlQrCode url={shortenedUrl} size={qrCodeSize} />
          </Box>
        )}
        <ShareButtons url={shortenedUrl} />
      </Stack>
    </Stack>
  );
}

export default HomeView;
