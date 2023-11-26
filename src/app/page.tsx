import { Hero } from '@/common/hero';
import { ShortUrlBuilder } from '@/short-urls/short-ur-builder';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <Hero />
      <ShortUrlBuilder />
    </div>
  );
}
