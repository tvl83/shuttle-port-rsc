"use client";

import {
  CosmostationProvider,
  KeplrProvider,
  LeapCosmosProvider,
  MetamaskProvider,
  MobileCosmostationProvider,
  MobileKeplrProvider,
  MobileLeapCosmosProvider,
  MobileMetamaskProvider, MobileTerraStationProvider,
  ShuttleProvider,
  TerraStationProvider,
  XDEFICosmosProvider,
  XDefiProvider
} from "@delphi-labs/shuttle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  OSMOSIS_MAINNET,
  MARS_MAINNET,
  TERRA_MAINNET,
  TERRA_TESTNET,
  MIGALOO_MAINNET
} from "@/config/networks";
import Header from "@/components/Header";

import "./globals.css";

const providers = [
  new XDefiProvider({
    networks: [TERRA_MAINNET],
  }),
  new XDEFICosmosProvider({
    networks: [OSMOSIS_MAINNET, MARS_MAINNET],
  }),
  new CosmostationProvider({
    networks: [OSMOSIS_MAINNET, TERRA_MAINNET],
  }),
  new LeapCosmosProvider({
    networks: [OSMOSIS_MAINNET, TERRA_MAINNET],
  }),
  new TerraStationProvider({
    networks: [OSMOSIS_MAINNET, MARS_MAINNET, TERRA_MAINNET, TERRA_TESTNET,MIGALOO_MAINNET],
  }),
  new KeplrProvider({
    networks: [
      OSMOSIS_MAINNET,
      MARS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET,
      MIGALOO_MAINNET
    ],
  })
];

const mobileProviders = [
  new MobileKeplrProvider({
    networks: [
      MIGALOO_MAINNET,
      OSMOSIS_MAINNET,
      MARS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET
    ],
  }),
  new MobileLeapCosmosProvider({
    networks: [
      OSMOSIS_MAINNET,
      MARS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET
    ],
  }),
  new MobileCosmostationProvider({
    networks: [
      OSMOSIS_MAINNET,
      MARS_MAINNET,
      TERRA_MAINNET,
      TERRA_TESTNET
    ],
  }),
  new MobileTerraStationProvider({
    networks: [TERRA_MAINNET, TERRA_TESTNET,MIGALOO_MAINNET],
                                 })
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <ShuttleProvider
          mobileProviders={mobileProviders}
          providers={providers}
          persistent
        >
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
          </QueryClientProvider>
        </ShuttleProvider>
      </body>
    </html>
  );
}
