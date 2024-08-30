"use client";
import * as React from "react";
import { ReactNode } from "react";

import Footer from "./footer";
import Header from "./header";
import Spinner from "../spinner";
import { useGameState } from "@/hooks/useGameState";
import { useRootStore } from "@/stores/storeProvider";
import UserProfileModal from "../userProfileModal";

export function MainLayout({ children }: { children: ReactNode }) {
  const { ui, game } = useRootStore();
  const isLoading = ui((state) => state.isLoading);
  const { setGameState, gameState, gameSession } = game((state) => ({
    setGameState: state.setGameState,
    gameState: state.gameState,
    gameSession: state.gameSession,
    setGameSession: state.setGameSession,
  }));

  const { fetchGameState } = useGameState();

  const { isModalOpen, openModal, modalContent } = ui((state) => ({
    isModalOpen: state.isModalOpen,
    modalContent: state.modalContent,
    openModal: state.openModal,
    closeModal: state.closeModal,
  }));

  React.useEffect(() => {
    const fetchGState = async () => {
      const gameState = await fetchGameState();
      if (gameState) {
        setGameState(gameState);
      }
    };
    fetchGState();
  }, [fetchGameState, setGameState]);

  // React.useEffect(() => {
  //   if (
  //     gameState?.currentCompetition.endTime &&
  //     gameState?.currentCompetition.endTime < Date.now() * 1000
  //   ) {
  //     openModal(<div>Competition ended</div>);
  //   }
  // }, [gameState, openModal]);

  React.useEffect(() => {
    if (
      // gameSession?.game1Completed &&
      false
      // gameSession?.game2Completed &&
      // gameSession?.game3Completed
    ) {
      openModal(<UserProfileModal gameSession={gameSession!} />);
    }
  }, [gameSession]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 ">
          <Spinner />
        </div>
      )}
      {isModalOpen && <PopUpWindowBg>{modalContent}</PopUpWindowBg>}
      <div className="min-h-screen flex flex-col text-white">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export function PopUpWindowBg({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 modal text-white">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      {/* <div className="relative bg-[#111411] border border-[#2A342A] p-6 rounded-lg max-w-md w-full"> */}
      <div className="relative p-6 max-w-md w-full">{children}</div>
    </div>
  );
}
/*
curl https://staging-rpc.dev2.eclipsenetwork.xyz -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"requestAirdrop", "params":["DWcQ72YcxVN783QVeLHeLoegELtjEdudEvdiTuBuM1Tm", 1000000000]}' */
