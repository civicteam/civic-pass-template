import React from "react";
import { PublicKey } from "@solana/web3.js";
import { useSolanaWallet } from "../adapters/SolanaWalletAdapter";
import { WalletAdapterInterface } from "../types";
import { useEthereumWallet } from "../adapters/EthereumWalletAdapter";

/**
 * @name WalletSelectionModal
 * @description A modal that allows the user to select a chain and wallet to use.
 * @param {WalletAdapterInterface[]} wallets - The wallets to display.
 * @param {() => void} modalDismiss - Callback to close modal from parent component.
 */
function WalletSelectionModal({
  modalDismiss,
  setWallet,
}: {
  modalDismiss: () => void;
  setWallet: (provider: WalletAdapterInterface<string | PublicKey>) => void; // contains pointer to parent component's setWallet function
}): React.ReactElement {
  const solanaWallet = useSolanaWallet();

  const ethereumWallet = useEthereumWallet();

  const connectWallet = (
    provider: WalletAdapterInterface<string | PublicKey>
  ) => {
    setWallet(ethereumWallet);
    provider.connect().then(() => {
      modalDismiss();
      // We need this to retrace currently selected adapter for bootstrap on page refresh
      localStorage.setItem("wallet_type", provider.walletName);
    });
  };

  return (
    <div
      aria-labelledby="wallet-adapter-modal-title"
      aria-modal="true"
      className="wallet-adapter-modal wallet-adapter-modal-fade-in "
      role="dialog"
    >
      <div className="wallet-adapter-modal-container">
        <div className="wallet-adapter-modal-wrapper wallet-adapter-modal-wrapper-no-logo civic-card-background">
          <h1
            className="wallet-adapter-modal-title"
            id="wallet-adapter-modal-title"
          >
            Choose Network
          </h1>
          <button
            type="button"
            onClick={modalDismiss}
            className="wallet-adapter-modal-button-close"
          >
            <svg width="14" height="14">
              <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z" />
            </svg>
          </button>
          <ul className="wallet-adapter-modal-list">
            <li>
              <button
                className="wallet-adapter-button justify-between bg-black bg-opacity-50 hover:bg-opacity-20"
                onClick={() => {
                  connectWallet(solanaWallet);
                }}
                type="button"
              >
                Solana
                <img src="/logos/solana.svg" className="w-6" alt="eth" />
              </button>
            </li>
            <li>
              <button
                className="wallet-adapter-button justify-between bg-black bg-opacity-50 hover:bg-opacity-20"
                onClick={() => {
                  connectWallet(ethereumWallet);
                }}
                type="button"
              >
                Ethereum
                <img src="/logos/ethereum.svg" className="h-7" alt="eth" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="wallet-adapter-modal-overlay" />
    </div>
  );
}

export default WalletSelectionModal;
