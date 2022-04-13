import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { WalletAdapterInterface } from "../types";
import { build } from "./builders/solana";

export const SolanaWalletContext = createContext<
  WalletAdapterInterface<PublicKey>
>({} as WalletAdapterInterface<PublicKey>);

export function useSolanaWallet(): WalletAdapterInterface<PublicKey> {
  return useContext(SolanaWalletContext);
}

/**
 * SolanaWalletAdapter
 * The universal interface (WalletAdapterInterface) follows the WalletContextState
 * closely, so we can get away with spreading props and only extending where needed.
 *
 * @param children
 */
export function SolanaWalletAdapter({
  children,
}: {
  children: React.ReactChild;
}): React.ReactElement {
  const lowLevelWallet = useWallet();

  const buttonRef = React.useRef<HTMLDivElement>(null);

  const [adapter, setAdapter] = useState<WalletAdapterInterface<PublicKey>>(
    {} as WalletAdapterInterface<PublicKey>
  );

  useEffect(() => {
    if (lowLevelWallet) {
      const walletAdapter = build(lowLevelWallet, () => {
        (buttonRef.current?.children[0] as HTMLButtonElement).click();
      });
      setAdapter(walletAdapter);
    }
  }, [lowLevelWallet, lowLevelWallet.publicKey]);

  return (
    <SolanaWalletContext.Provider value={adapter}>
      <div ref={buttonRef}>
        <WalletMultiButton style={{ display: "none" }} />
      </div>
      {children}
    </SolanaWalletContext.Provider>
  );
}
