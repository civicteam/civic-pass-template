import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PublicKey } from "@solana/web3.js";

import {
  MultiWalletConnectionInterface,
  WalletAdapterInterface,
} from "../types";

import WalletSelectionModal from "../components/WalletSelectionModal";
import { useSolanaWallet } from "../adapters/SolanaWalletAdapter";
import { useEthereumWallet } from "../adapters/EthereumWalletAdapter";

export const XChainWalletContext =
  createContext<MultiWalletConnectionInterface>(
    {} as MultiWalletConnectionInterface
  );

export function useMultiWallet(): MultiWalletConnectionInterface {
  return useContext(XChainWalletContext);
}

export function XChainWalletProvider({
  children,
}: {
  children: React.ReactChild;
}): React.ReactElement {
  const [connectingWallet, setConnectingWallet] = useState<boolean>(false);

  const [wallet, setWallet] = useState<
    WalletAdapterInterface<string | PublicKey>
  >({} as WalletAdapterInterface<string | PublicKey>);

  const solanaWalletProvider = useSolanaWallet();
  const ethereumWalletProvider = useEthereumWallet();

  const selectChain = () => setConnectingWallet(true);

  const currentWallet = localStorage.getItem("wallet_type");

  const selected: WalletAdapterInterface<string | PublicKey> =
    currentWallet === "Ethereum"
      ? ethereumWalletProvider
      : solanaWalletProvider;

  const value = useMemo(
    () => ({
      wallet,
      setWallet,
      selectChain,
    }),
    [wallet]
  );

  useEffect(() => {
    setWallet(selected);
  }, [setWallet, selected, currentWallet, wallet]);

  const fetchWalletSetter = () => {
    return (passedWallet: WalletAdapterInterface<string | PublicKey>) => {
      setConnectingWallet(false);
      setWallet(passedWallet);
    };
  };

  return (
    <XChainWalletContext.Provider value={value}>
      {connectingWallet && (
        <WalletSelectionModal
          setWallet={fetchWalletSetter()}
          modalDismiss={() => setConnectingWallet(false)}
        />
      )}
      {children}
    </XChainWalletContext.Provider>
  );
}
