"use client";
import * as React from "react";
import { ReactNode } from "react";

import Footer from "./footer";
import Header from "./header";
import Spinner from "../spinner";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useRootStore } from "@/stores/rootStore";
import { useGameState, useSoddleProgram } from "@/hooks/useGameState";

export function MainLayout({ children }: { children: ReactNode }) {
  const { ui } = useRootStore();

  return (
    <>
      {ui.isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 ">
          <Spinner />
        </div>
      )}
      <div className="min-h-screen flex flex-col text-white">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </div>
    </>
  );
}

/*
curl https://staging-rpc.dev2.eclipsenetwork.xyz -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"requestAirdrop", "params":["DWcQ72YcxVN783QVeLHeLoegELtjEdudEvdiTuBuM1Tm", 1000000000]}' */
