import { redirect } from 'next/navigation';

export default function Home() {
  // Bypass login for now - redirect straight to dashboard
  redirect('/dashboard');
}
