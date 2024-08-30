"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SalmonWalletAdapter } from "@solana/wallet-adapter-wallets";
import { SnapWalletAdapter } from "@drift-labs/snap-wallet-adapter";

import { ReactNode, useMemo } from "react";
import { useEclipseCluster } from "@/hooks/useEclipseCluster";
import { ReactQueryProvider } from "./reactQueryProvider";

require("@solana/wallet-adapter-react-ui/styles.css");

export function SolanaProviders({ children }: { children: ReactNode }) {
  const { endpoint, cluster } = useEclipseCluster();

  const wallets = useMemo(
    () => [
      new SalmonWalletAdapter({ network: cluster.network }),
      new SnapWalletAdapter(),
    ],
    [cluster]
  );

  return (
    <ReactQueryProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ReactQueryProvider>
  );
}
