import Spinner from "@/components/spinner";
import dynamic from "next/dynamic";

const GamePageClient = dynamic(() => import("./_components/game-page-client"), {
  ssr: false,
  loading: () => <Spinner className="h-screen w-screen fixed top-0 left-0" />,
});

export default function GamePage() {
  return <GamePageClient />;
}
