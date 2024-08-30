"use client";
import * as React from "react";
import { SolanaProviders } from "./solanaProviders";
import { Toaster } from "sonner";

import { RootStoreProvider } from "@/stores/storeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProviders>
      <RootStoreProvider>
        <Toaster />
        {children}
      </RootStoreProvider>
    </SolanaProviders>
  );
}
