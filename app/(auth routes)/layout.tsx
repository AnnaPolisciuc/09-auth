'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.refresh(); 
      setLoading(false); 
    }, 0);
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}
