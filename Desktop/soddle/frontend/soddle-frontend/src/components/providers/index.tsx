"use client";
import * as React from "react";
import { SolanaProviders } from "./solana-providers";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProviders>
      {children}
      <Toaster />
    </SolanaProviders>
  );
}
