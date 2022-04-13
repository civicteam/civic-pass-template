import React, { useEffect, useState } from "react";
import { useMultiWallet } from "./providers/connectors/providers/XChainWalletProvider";

function WalletConnectionToggle(): React.ReactElement {
  const { wallet, selectChain } = useMultiWallet();
  const [clickedConnect, setClickConnected] = useState(false);

  useEffect(() => {
    if (clickedConnect) {
      new Promise<void>((resolve, reject) => {
        if (wallet.connected) {
          resolve();
        }
        if (wallet.disconnecting) {
          reject();
        }
      })
    }
  }, [clickedConnect, wallet]);

  const disconnectClick = () => {
    wallet.disconnect();
  };

  return (
    <>
      {wallet.connected &&
        <button
        type="button"
        onClick={disconnectClick}
        className="civic-wallet-adapter-button border-box rounded-lg rounded-3xl border-[2px] bg-black bg-opacity-25 py-3 px-4 text-white"
        >
        Disconnect Wallet
        </button>
      }
      {!wallet.connected && (
        <button
          type="button"
          onClick={() => {
            selectChain();
            setClickConnected(true);
          }}
          className="civic-wallet-adapter-button border-box rounded-lg rounded-3xl border-[2px] bg-black bg-opacity-25 py-3 px-4 text-white"
        >
          Connect Wallet
        </button>
      )}

      {wallet.connected &&
        <>
          <h3>Connected</h3>
          <p>{wallet.publicKey}</p>
        </>
      }
      {!wallet.connected && (
        <h3>Disconnected</h3>
      )}
    </>
  );
}

export default WalletConnectionToggle;
