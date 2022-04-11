import './App.css';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl  } from "@solana/web3.js";
import { getPhantomWallet, getSolletWallet } from "@solana/wallet-adapter-wallets";
import Gateway from "./GatewayOwnerSigns";

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
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <WalletMultiButton />
              <br />
              <WalletDisconnectButton />
              <br />
              <Gateway />
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </header>
    </div>
  );
}

export default App;
