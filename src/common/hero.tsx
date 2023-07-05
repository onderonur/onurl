import { URL_LIFETIME_IN_MINUTES } from '@/short-urls/short-url-utils';
import { APP_TITLE } from './common-utils';
import UrlShortenerLogo from './url-shortener-logo';

export default function Hero() {
  return (
    <div>
      <div className="h-56 mb-4">
        <UrlShortenerLogo />
      </div>
      <div className="text-center font-semibold text-text-700">
        <h1 className="sr-only">{APP_TITLE}</h1>
        <p>
          <span className="text-primary-600">{APP_TITLE}</span> is an open
          source URL shortener demo.
        </p>
        <p>
          Since this is a demo application, shortened URLs will be active for{' '}
          {URL_LIFETIME_IN_MINUTES} minutes only.
        </p>
      </div>
    </div>
  );
}
