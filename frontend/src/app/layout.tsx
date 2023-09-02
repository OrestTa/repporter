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
        
        <div class="nav">
          <div class="menu">
            <a href="/about">
              <p>Why?</p>
            </a>
            <a href="https://github.com/0xkkonrad/repporter/">
              <p>Repo</p>
            </a>
          </div>
        </div>

        <div class="hero">
          <div class="hero-text">
            <h1>Repporter</h1>
            <p>Rep your port repo port lorem ipsum.</p>
            <div class="buttons">
              <a class="button primary" href="/verify" target="_blank">
                Verify
              </a>
              <a class="button secondary" href="/dashboard" target="_blank">
                Dashboard
              </a>
            </div>

            <Providers>
              <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
              <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
              />
            </Providers>
          </div>
          <div class="blob-cont">
            <div class="yellow blob"></div>
            <div class="red blob"></div>
            <div class="green blob"></div>
          </div>
        </div>
      </body>
    </html>
  );
}
