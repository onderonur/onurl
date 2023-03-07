import { GetServerSideProps, NextPage } from 'next';
import { Box, CircularProgress } from '@mui/material';
import { Alert } from '@mui/material';
import connectToDb from '@/db/connectToDb';
import { isShortUrlExpired } from '@/short-url/ShortUrlUtils';

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

export const getServerSideProps: GetServerSideProps<AliasViewProps> = async (
  context,
) => {
  const { alias } = context.query;

  if (typeof alias !== 'string') {
    return {
      props: {
        error: 'Invalid URL alias',
      },
    };
  }

  const prisma = await connectToDb();

  const shortUrl = await prisma.shortUrl.findFirst({
    where: { alias },
  });

  if (!shortUrl) {
    return {
      props: {
        error: 'URL not found',
      },
    };
  }

  if (isShortUrlExpired(shortUrl)) {
    return {
      props: {
        error: 'URL is expired',
      },
    };
  }

  await prisma.shortUrl.update({
    where: { alias },
    data: { clicks: shortUrl.clicks + 1 },
  });

  return {
    redirect: {
      destination: shortUrl.url,
      permanent: true,
    },
  };
};

export default AliasView;
