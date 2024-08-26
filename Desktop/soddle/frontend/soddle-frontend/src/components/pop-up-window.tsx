import Trapezoid from "@/app/play/_components/trapezoid";
import Image from "next/image";
import * as React from "react";
import Button2 from "./ui/button2";

export default function PopUpWindow({ open }: { open: boolean }) {
  if (open) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
        <div className="w-full h-full absolute inset-0 ">
          <Image
            src={"/user-image.svg"}
            width={300}
            height={300}
            alt="user"
            className="rounded-full"
          />
          <h3>John Doe</h3>
          <p>
            “White knight of the crypto ecosystem, feared by scammers around the
            world.”
          </p>
          <Trapezoid className="w-full h-[70px] text-[#39FF14]">
            <h3>750 Points</h3>
            <div className="flex justify-between items-center">
              <div className="w-full h-full bg-white/50 rounded-full py-1 px-2">
                Rank 12{" "}
              </div>
              <div className="w-full h-full bg-white/50 rounded-full py-1 px-2">
                Top 5%
              </div>
            </div>
          </Trapezoid>
          <div className="flex justify-between items-center">
            <div className="text-sm px-2 py-1 bg-[#181716] border border-[#2A342A]">
              20 seconds
            </div>
            <div className="text-sm px-2 py-1 bg-[#181716] border border-[#2A342A] ">
              13 mistakes
            </div>
          </div>
          <div className="text-sm w-full h-52 bg-[#181716] border border-[#2A342A]">
            “I solved the riddle in 20 seconds.”
          </div>
          <button className="bg-[#39FF14] text-black px-4 py-2 relative -top-10">
            Share on X
          </button>
          <Button2>Continue </Button2>
        </div>
      </div>
    );
  }
  return <></>;
}
