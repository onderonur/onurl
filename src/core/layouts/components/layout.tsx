import { APP_TITLE } from '@/core/shared/utils';
import { ExternalLink } from '@/core/ui/components/external-link';
import { NextLink } from '@/core/ui/components/next-link';
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineX } from 'react-icons/ai';
import { SiBluesky } from 'react-icons/si';

const footerLinks = [
  {
    href: 'https://github.com/onderonur',
    ariaLabel: 'GitHub',
    icon: AiOutlineGithub,
  },
  {
    href: 'https://linkedin.com/in/onderonur/',
    ariaLabel: 'LinkedIn',
    icon: AiOutlineLinkedin,
  },
  {
    href: 'https://bsky.app/profile/onderonur.bsky.social',
    ariaLabel: 'Bluesky',
    icon: SiBluesky,
  },
  {
    href: 'https://x.com/onderonur_',
    ariaLabel: 'X',
    icon: AiOutlineX,
  },
];

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center px-4 py-2">
        <NextLink href="/" className="text-primary-600 text-2xl font-black">
          {APP_TITLE}
        </NextLink>
        <div className="grow" />
        <ExternalLink
          href="https://github.com/onderonur"
          aria-label="Check the source code on GitHub"
        >
          <AiOutlineGithub className="size-8" />
        </ExternalLink>
      </header>
      <main className="mx-auto w-full max-w-screen-sm flex-1 p-4">
        {children}
      </main>
      <footer className="flex justify-center gap-2 p-6">
        {footerLinks.map((link) => {
          return (
            <ExternalLink
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
            >
              <link.icon className="size-8" />
            </ExternalLink>
          );
        })}
      </footer>
    </div>
  );
}
