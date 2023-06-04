import { Swap } from "@/components/Swap";

export default async function Home() {
  // const response = await fetch(
  //   "https://evilinsult.com/generate_insult.php?lang=en&type=json"
  // );
  // const json = (await response.json()) as InsultResponse;

  return (
    <main>
      <Swap />
    </main>
  );
}
