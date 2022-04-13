import { PublicKey } from "@solana/web3.js";
import { Web3Provider } from "@ethersproject/providers";

export type WalletTypes = "Ethereum" | "Polygon" | "";

export type WalletAdapterInterface<T> = {
  walletName: WalletTypes;
  publicKey: string | null;
  nativePublicKey: T | null;
  connecting: boolean;
  connected: boolean;
  disconnecting: boolean;

  ready(): Promise<boolean>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  library: Web3Provider | null;
  did: string | Promise<string> | null;
};

export type MultiWalletConnectionInterface = {
  wallet: WalletAdapterInterface<PublicKey | string>;
  setWallet(wallet: WalletAdapterInterface<PublicKey | string>): void;
  selectChain(): void;
};
