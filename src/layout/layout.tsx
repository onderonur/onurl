import { APP_TITLE } from '@/common/common-utils';
import ExternalLink from '@/common/external-link';
import BaseLink from '@/common/base-link';
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai';

type LayoutProps = React.PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-2 px-4 flex items-center">
        <BaseLink href="/" className="font-black text-2xl text-primary-600">
          {APP_TITLE}
        </BaseLink>
        <div className="flex-grow" />
        <ExternalLink
          href="https://github.com/onderonur/onurl"
          aria-label="Check the source code on GitHub"
        >
          <AiOutlineGithub className="h-8 w-8" />
        </ExternalLink>
      </header>
      <main className="flex-1 mx-auto max-w-screen-md w-full p-4">
        {children}
      </main>
      <footer className="p-6 flex gap-2 justify-center">
        <ExternalLink
          href="https://linkedin.com/in/onderonur"
          aria-label="LinkedIn"
        >
          <AiOutlineLinkedin className="w-8 h-8" />
        </ExternalLink>
        <ExternalLink
          href="https://twitter.com/onderonur_"
          aria-label="Twitter"
        >
          <AiOutlineTwitter className="w-8 h-8" />
        </ExternalLink>
        <ExternalLink href="https://github.com/onderonur" aria-label="GitHub">
          <AiOutlineGithub className="w-8 h-8" />
        </ExternalLink>
      </footer>
    </div>
  );
}
