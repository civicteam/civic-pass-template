import { WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { XChainWalletProvider } from "./XChainWalletProvider";
import { SolanaWalletAdapter } from "../adapters/SolanaWalletAdapter";
import { EthereumWalletAdapter } from "../adapters/EthereumWalletAdapter";

/**
 * WalletConnectionProvider: Bootstraps the underlying wallet providers
 * required by the wallet adapters/translators and injects them into the context.
 *
 * @param children
 */
function WalletConnectionProvider({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element {
  const network = WalletAdapterNetwork.Devnet;
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolletWallet({ network })],
    [network]
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <SolanaWalletAdapter>
          <EthereumWalletAdapter>
            <XChainWalletProvider>{children}</XChainWalletProvider>
          </EthereumWalletAdapter>
        </SolanaWalletAdapter>
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default WalletConnectionProvider;
