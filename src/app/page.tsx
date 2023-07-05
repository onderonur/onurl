import Hero from '@/common/hero';
import ShortUrlForm from '@/short-urls/short-url-form';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <Hero />
      <ShortUrlForm />
    </div>
  );
}
