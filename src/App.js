import './App.css';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl  } from "@solana/web3.js";
import { getPhantomWallet, getSolletWallet } from "@solana/wallet-adapter-wallets";
import Gateway from "./GatewayOwnerSigns";
import { EthereumWalletAdapter } from './providers/connectors/adapters/EthereumWalletAdapter';
import { SolanaWalletAdapter } from './providers/connectors/adapters/SolanaWalletAdapter';
import { XChainWalletProvider } from './providers/connectors/providers/XChainWalletProvider';
import WalletConnectionToggle from './WalletConnectionToggle';

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolletWallet({ network }),
    ],
    [network]
  );

  return (
    <div className="App">
      <header className="App-header">
        <WalletProvider wallets={wallets} autoConnect>
          <ConnectionProvider endpoint={endpoint}>
              <WalletModalProvider>
                <SolanaWalletAdapter>
                  <EthereumWalletAdapter>
                    <XChainWalletProvider>
                        <WalletConnectionToggle/>
                        {/* <Gateway /> */}
                    </XChainWalletProvider>
                  </EthereumWalletAdapter>
                </SolanaWalletAdapter>
              </WalletModalProvider>
            </ConnectionProvider>
          </WalletProvider>
      </header>
    </div>
  );
}

export default App;
