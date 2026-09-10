import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <div>Done</div>;
}

export default function TestLoading() {
  return (
    <Suspense>
      <SlowComponent />
    </Suspense>
  );
}
