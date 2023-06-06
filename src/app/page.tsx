import ClaimAmount from '@/components/ClaimAmount';
import ClaimButton from '@/components/ClaimButton';

export default async function Home() {
  return (
    <main>
      <ClaimAmount />
      <ClaimButton />
    </main>
  );
}
