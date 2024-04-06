'use client';

import Button from '@/components/button/button';
import { SessionProvider, signIn, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div>
      <Button onClick={signIn}>Login</Button>
      {status}
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
