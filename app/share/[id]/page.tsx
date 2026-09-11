import { Suspense } from 'react';
import Loading from '@/app/loading';

async function SharedChat({ id }: { id: string }) {
  // data fetching will go here
  return <div>{id}</div>;
}

export default function SharePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      <SharedChat id={params.id} />
    </Suspense>
  );
}
