import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { WalletAdapterInterface } from "../../types";
import constructDidFromPublicKey from "../../../../constructDidFromPublicKey";

export function build(
  lowLevelWallet: WalletContextState,
  connect: () => void
): WalletAdapterInterface<PublicKey> {
  return {
    ...(lowLevelWallet as unknown as WalletAdapterInterface<PublicKey>),

    connect: async () => {
      connect();
    },

    publicKey: lowLevelWallet.publicKey?.toBase58() ?? "",

    nativePublicKey: lowLevelWallet.publicKey,

    did: constructDidFromPublicKey(lowLevelWallet.publicKey?.toBase58() ?? ""),

    disconnect(): Promise<void> {
      localStorage.removeItem("wallet_type");
      return lowLevelWallet.disconnect();
    },
  };
}
