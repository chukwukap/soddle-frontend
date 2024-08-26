"use client";
import { ConnectWalletButton } from "@/components/connect-button";
import Container from "@/components/layout/container";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function LandingPage() {
  return (
    <Container className="flex-grow flex items-center justify-center ">
      <ConnectWalletButton />
    </Container>
  );
}

export default LandingPage;
