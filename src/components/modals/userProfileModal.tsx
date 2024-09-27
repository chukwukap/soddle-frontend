import Image from "next/image";
import * as React from "react";
import Button2 from "@/components/ui/button2";
import { GameSession, GameSessionFromApi } from "@/types";
import { shortenAddress } from "@/lib/utils";
import { useRootStore } from "@/stores/storeProvider";
import Trapezoid from "../ui/trapezoid";

export default function UserProfileModal({
  gameSession,
}: {
  gameSession: GameSessionFromApi;
}) {
  const { ui } = useRootStore();

  const closeModal = ui((state) => state.closeModal);
  const handleShareOnX = () => {
    const tweetText = encodeURIComponent(
      `I solved the riddle in ${gameSession.startTime} seconds on Soddle! Can you beat my score? #Soddle #CryptoGame`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  if (!gameSession) return <div>No data</div>;
  return (
    <div className="w-full h-[80vh] max-w-[350px]  flex justify-center items-center z-50 text-white ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 382 588"
        className="w-full h-full absolute inset-0"
        stroke="#2A342A"
      >
        <path
          d="M-1624-633.26h-364.23v-570.23l16.78-16.77h364.22V-650Z"
          transform="translate(1988.72 1220.76)"
        />
      </svg>
      <div className="h-full  w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute  flex flex-col gap-3 justify-between  items-center pt-8 ">
        <Image
          src={"/user-icon.svg"}
          width={100}
          height={100}
          alt="user"
          className="rounded-full  border-2"
        />
        <h3 className="text-2xl font-bold">
          {" "}
          {shortenAddress(gameSession.player.toString())}
        </h3>
        <p className="text-xl text-center">
          “White knight of the crypto ecosystem, feared by scammers around the
          world.”
        </p>
        <Trapezoid className="w-[80%] h-[150px] flex flex-col text-[#39FF14] bg-gradient-to-r from-[rgba(1,52,1,0.5)] to-[rgba(17,20,17,0.5)]">
          <div className="w-full h-full flex flex-col gap-2 ">
            <h3 className="text-3xl self-center">
              {gameSession.game1Score} Points
            </h3>
            <div className="flex justify-between items-center gap-1">
              <div className="w-full h-full text-2xl  py-1 px-2 text-center bg-gradient-to-r from-[rgba(1,52,1,0.5)] to-[rgba(17,20,17,0.5)]">
                Rank 12{" "}
              </div>
              <div className="w-full h-full text-2xl  py-1 px-2 text-center bg-gradient-to-r from-[rgba(1,52,1,0.5)] to-[rgba(17,20,17,0.5)]">
                Top 5%
              </div>
            </div>
          </div>
        </Trapezoid>
        <div className="flex  justify-between items-center">
          <div className="text-sm px-2 py-1 bg-[#181716] border border-[#2A342A]">
            20 seconds
          </div>
          <div className="text-sm px-2 py-1 bg-[#181716] border border-[#2A342A] ">
            13 mistakes
          </div>
        </div>
        <div className="text-xl w-full h-52 flex items-center justify-center  bg-[#181716] border border-[#2A342A]">
          "I solved the riddle in 20 seconds."
        </div>
        <Button2
          className="text-black px-4 py-2 relative -top-8 max-w-[200px]"
          onClick={handleShareOnX}
        >
          Share on X
        </Button2>
        <Button2 className="relative -bottom-4" onClick={closeModal}>
          Continue{" "}
        </Button2>
      </div>
    </div>
  );
}
