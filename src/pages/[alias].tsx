import { NextPage } from 'next';
import { Maybe } from '@/common/CommonTypes';
import { ServerResponse } from 'http';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import { IS_SERVER } from '@/common/CommonUtils';
import { isAxiosError } from '@/error-handling/ErrorHandlingUtils';

interface RedirectOptions {
  replace: boolean;
}

const pageRedirect = (
  res: Maybe<ServerResponse>,
  location: string,
  { replace }: RedirectOptions,
) => {
  if (IS_SERVER) {
    // A 301 redirect means that the page has permanently moved to a new location.
    // A 302 redirect means that the move is only temporary. Search engines need
    // to figure out whether to keep the old page, or replace it with the one
    // found at the new location.
    res?.writeHead(302, {
      Location: location,
    });
    res?.end();
  } else {
    // https://nextjs.org/docs/api-reference/next/router
    // You don't need to use Router for external URLs,
    // window.location is better suited for those cases.
    if (replace) {
      window.location.replace(location);
    } else {
      window.location.href = location;
    }
  }
};

interface AliasViewProps {
  error?: string;
}

const AliasView: NextPage<AliasViewProps> = ({ error }) => {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
};

// Tried this with "getServerSideProps" too.
// When the user directly opens this page, there are no problems.
// But when user redirects to this page from another page in the app,
// some CORS error is happening while redirecting the request.
// "getServerSideProps" runs twice and in the end we increase "clicks"
// twice. So, we are using "getInitialProps" for a while.
AliasView.getInitialProps = async ({ res, query }) => {
  const { alias } = query;
  let error;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/shorturl?alias=${alias}`,
    );
    const { data } = response;
    const { url } = data;
    pageRedirect(res, url, { replace: true });
  } catch (err) {
    let statusCode = 500;
    let message = 'An unknown error occured';
    if (isAxiosError(err)) {
      const data = err.response?.data;
      if (data) {
        // eslint-disable-next-line prefer-destructuring
        statusCode = data.statusCode;
        // eslint-disable-next-line prefer-destructuring
        message = data.message;
      }
    }
    error = `${statusCode}: ${message}`;
    return { error };
  }
  return {};
};

export default AliasView;
