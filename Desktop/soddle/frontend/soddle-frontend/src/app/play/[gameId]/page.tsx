import { fetchKOLs } from "@/lib/fns/fetchers";
import GamePageClient from "./client";

export default async function GamePage({
  params,
}: {
  params: { gameId: string };
}) {
  const gameId = parseInt(params.gameId);
  console.log("gameId", gameId);
  const kols = await fetchKOLs();
  console.log("fetched kols", kols);
  return <GamePageClient gameId={gameId} kols={kols} />;
}
