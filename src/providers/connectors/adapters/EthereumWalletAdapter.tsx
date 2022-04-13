import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { ethers } from "ethers";
import { build, web3Modal } from "./builders/ethereum";
import { WalletAdapterInterface } from "../types";

export const ethereumWalletContext = createContext<
  WalletAdapterInterface<string>
>({} as WalletAdapterInterface<string>);

export function useEthereumWallet(): WalletAdapterInterface<string> {
  return useContext(ethereumWalletContext);
}

export function EthereumWalletAdapter({
  children,
}: {
  children: React.ReactChild;
}): React.ReactElement {
  const [account, setAccount] = useState<string>();
  const [adapter, setAdapter] = useState<WalletAdapterInterface<string>>(
    {} as WalletAdapterInterface<string>
  );

  const connectWallet = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();
      const lib = new ethers.providers.Web3Provider(provider);
      const accounts = await lib?.listAccounts();
      if (accounts) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      // Fail Silently
    }
  }, []);

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    setAccount("");
  };

  useEffect(() => {
    (async () => {
      setAdapter(await build(account ?? "", connectWallet, disconnect));
    })();
  }, [account, connectWallet]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      (async () => {
        await connectWallet();
      })();
    }
  }, [connectWallet]);

  return React.createElement(
    ethereumWalletContext.Provider,
    { value: adapter },
    children
  );
}
