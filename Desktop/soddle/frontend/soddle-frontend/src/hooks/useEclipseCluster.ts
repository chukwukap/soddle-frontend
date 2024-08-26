"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useState, useMemo } from "react";

export const ECLIPSE_CLUSTERS = {
  mainnet: {
    name: "Eclipse Mainnet",
    endpoint: "https://mainnetbeta-rpc.eclipse.xyz",
    network: WalletAdapterNetwork.Mainnet,
    explorer: "https://explorer.eclipse.xyz", // Replace with actual mainnet explorer URL when available
  },
  testnet: {
    name: "Eclipse Testnet",
    endpoint: "https://testnet.dev2.eclipsenetwork.xyz",
    network: WalletAdapterNetwork.Testnet,
    explorer: "https://explorer.dev2.eclipsenetwork.xyz",
  },
  devnet: {
    name: "Eclipse Devnet2",
    endpoint: "https://staging-rpc.dev2.eclipsenetwork.xyz",
    network: WalletAdapterNetwork.Devnet,
    explorer: "https://explorer.dev.eclipsenetwork.xyz",
  },
};

export function useEclipseCluster() {
  const [cluster, setCluster] = useState(ECLIPSE_CLUSTERS.devnet);

  const endpoint = useMemo(() => cluster.endpoint, [cluster]);

  return {
    cluster,
    endpoint,
    setCluster: (name: keyof typeof ECLIPSE_CLUSTERS) =>
      setCluster(ECLIPSE_CLUSTERS[name]),
  };
}
