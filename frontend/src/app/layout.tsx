"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Domine } from "next/font/google";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import Providers from "./Providers";

const chains = [arbitrum, mainnet, polygon];

const projectId = process.env.WC_PROJECT_ID ?? "";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const domine = Domine({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">


      <body className={domine.className}>
        <Providers>
          <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </Providers>

        


      </body>
    </html>
  );
}
