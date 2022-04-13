import Web3Modal, { IProviderOptions } from "web3modal";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import { WalletAdapterInterface } from "../../types";

const providerOptions: IProviderOptions = {
  metamask: {
    id: "injected",
    name: "MetaMask",
    type: "injected",
    check: "isMetaMask",
  },
  walletlink: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "CoinbaseWallet",
      infuraId: process.env.INFURA_KEY,
    },
  },
} as unknown as IProviderOptions;

export const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  disableInjectedProvider: false,
  providerOptions,
  theme: {
    background: "rgb(34, 30, 66)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)",
  },
});

export async function build(
  account: string,
  connectWallet: () => void,
  disconnect: () => void
): Promise<WalletAdapterInterface<string>> {
  return {
    walletName: "Ethereum",

    disconnecting: true,

    publicKey: account ?? "",

    connecting: true,

    connected: account !== "",

    nativePublicKey: account,

    ready(): Promise<boolean> {
      return Promise.resolve(true);
    },

    connect(): Promise<void> {
      connectWallet();
      return Promise.resolve();
    },

    disconnect(): Promise<void> {
      localStorage.removeItem("wallet_type");
      localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
      disconnect();
      return Promise.resolve();
    },

    library: web3Modal.cachedProvider
      ? new ethers.providers.Web3Provider(await web3Modal.connect())
      : null,

    did: `did:ethr:${account}`,
  };
}
