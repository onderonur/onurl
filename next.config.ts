import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // We set image as `unoptimized` to not exceed the
    // fair usage policy of vercel about image optimization.
    // https://vercel.com/docs/platform/fair-use-policy
    // https://nextjs.org/docs/app/api-reference/components/image#unoptimized
    unoptimized: true,
  },
  eslint: {
    // To make `next lint` check files and folders besides the default folders (`src`, `app` etc.):
    // https://nextjs.org/docs/app/building-your-application/configuring/eslint#linting-custom-directories-and-files
    dirs: [
      'config',
      'src',
      'eslint.config.mjs',
      'lint-staged.config.mjs',
      'next.config.ts',
      'postcss.config.mjs',
      'prettier.config.mjs',
      'tailwind.config.ts',
    ],
  },
};

export default nextConfig;
