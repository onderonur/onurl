import { APP_TITLE } from '@/core/shared/utils';
import { BaseLink } from '@/core/ui/components/base-link';
import { ExternalLink } from '@/core/ui/components/external-link';
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from 'react-icons/ai';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center px-4 py-2">
        <BaseLink href="/" className="text-2xl font-black text-primary-600">
          {APP_TITLE}
        </BaseLink>
        <div className="flex-grow" />
        <ExternalLink
          href="https://github.com/onderonur/onurl"
          aria-label="Check the source code on GitHub"
        >
          <AiOutlineGithub className="size-8" />
        </ExternalLink>
      </header>
      <main className="mx-auto w-full max-w-screen-sm flex-1 p-4">
        {children}
      </main>
      <footer className="flex justify-center gap-2 p-6">
        <ExternalLink
          href="https://linkedin.com/in/onderonur"
          aria-label="LinkedIn"
        >
          <AiOutlineLinkedin className="size-8" />
        </ExternalLink>
        <ExternalLink
          href="https://twitter.com/onderonur_"
          aria-label="Twitter"
        >
          <AiOutlineTwitter className="size-8" />
        </ExternalLink>
        <ExternalLink href="https://github.com/onderonur" aria-label="GitHub">
          <AiOutlineGithub className="size-8" />
        </ExternalLink>
      </footer>
    </div>
  );
}
