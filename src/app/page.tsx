import { Hero } from '@/core/ui/components/hero';
import { ShortUrlBuilder } from '@/features/short-urls/components/short-url-builder';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <Hero />
      <ShortUrlBuilder />
    </div>
  );
}
