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
      'src',
      'lint-staged.config.mjs',
      'postcss.config.js',
      'prettier.config.js',
      'tailwind.config.ts',
    ],
  },
};

export default nextConfig;
