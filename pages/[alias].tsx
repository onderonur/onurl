import axios from 'axios';
import { pageRedirect, isAbsoluteUrl } from '@/utils';
import AliasView from '@/views/Alias';

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
    let { url } = data;
    // "https" prefix is required.
    // Otherwise, it redirects to "http://localhost:3000/<url>"
    // instead of "https://<url>".
    if (!isAbsoluteUrl(url)) {
      url = 'https://' + url;
    }
    pageRedirect(res, url, { replace: true });
  } catch (err) {
    const { response } = err;
    error = `${response.status}: ${response.data}`;
    return { error };
  }
  return {};
};

export default AliasView;
