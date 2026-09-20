import { connection } from "next/server";
import ThreadJourney from "@/components/ThreadJourney";
import { currentAge } from "./age";

export default async function Home() {
  await connection();
  return <ThreadJourney age={currentAge()} />;
}
