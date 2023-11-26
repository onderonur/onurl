import { URL_LIFETIME_IN_MINUTES } from '@/short-urls/short-url-utils';
import { APP_TITLE } from './common-utils';
import { UrlShortenerLogo } from './url-shortener-logo';

export function Hero() {
  return (
    <div>
      <div className="mb-4 h-56">
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
