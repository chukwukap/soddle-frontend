"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Button2 from "@/components/ui/button2";

export const ConnectWalletButton = () => {
  const { connected, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return (
    <Button2
      onClick={handleClick}
      backgroundColor="#181716"
      borderColor="#2FFF2B"
      className="w-full max-w-[150px] "
    >
      {connecting
        ? "Connecting..."
        : connected
        ? "Disconnect"
        : "Connect Wallet"}
    </Button2>
  );
};
