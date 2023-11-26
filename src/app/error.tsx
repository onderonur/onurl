// Error boundaries must be Client Components:
// https://nextjs.org/docs/app/building-your-application/routing/error-handling#error-boundaries
'use client';
import { Alert } from '@/common/alert';

export default function ErrorPage() {
  return <Alert type="error" message="Something went wrong" />;
}
