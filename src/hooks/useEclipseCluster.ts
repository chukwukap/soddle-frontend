"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useState, useMemo } from "react";

export enum EclipseClusterName {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  DEVNET = "devnet",
}

export const ECLIPSE_CLUSTERS = {
  [EclipseClusterName.MAINNET]: {
    name: "Eclipse Mainnet",
    endpoint: "https://mainnetbeta-rpc.eclipse.xyz",
    network: WalletAdapterNetwork.Mainnet,
    explorer: "https://explorer.eclipse.xyz",
  },
  [EclipseClusterName.TESTNET]: {
    name: "Eclipse Testnet",
    endpoint: "https://testnet.dev2.eclipsenetwork.xyz",
    network: WalletAdapterNetwork.Testnet,
    explorer: "https://explorer.dev2.eclipsenetwork.xyz",
  },
  [EclipseClusterName.DEVNET]: {
    name: "Eclipse Devnet2",
    endpoint: "https://staging-rpc.dev2.eclipsenetwork.xyz",
    network: WalletAdapterNetwork.Devnet,
    explorer: "https://explorer.dev.eclipsenetwork.xyz",
  },
};

export function useEclipseCluster() {
  const [cluster, setCluster] = useState(
    ECLIPSE_CLUSTERS[EclipseClusterName.DEVNET]
  );

  const endpoint = useMemo(() => cluster.endpoint, [cluster]);

  return {
    cluster,
    endpoint,
    setCluster: (name: EclipseClusterName) =>
      setCluster(ECLIPSE_CLUSTERS[name]),
  };
}
