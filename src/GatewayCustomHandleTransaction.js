import React from 'react';
import { PublicKey, clusterApiUrl, Connection } from '@solana/web3.js';
import { GatewayProvider, useGateway, GatewayStatus } from '@civic/solana-gateway-react';
import { useWallet } from '@solana/wallet-adapter-react';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const env = {
  prod: {
    gatekeeperNetwork: new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6'),
    clusterUrl: 'https://api.mainnet-beta.solana.com',
    cluster: 'mainnet-beta'
  },
  test: {
    gatekeeperNetwork: new PublicKey('tigoYhp9SpCDoCQmXGj2im5xa3mnjR1zuXrpCJ5ZRmi'),
    clusterUrl: 'https://api.devnet.solana.com',
    cluster: 'devnet',
    stage: 'preprod',
  }
};

function RequestGatewayToken() {
  const { gatewayStatus,requestGatewayToken, gatewayToken } = useGateway();
  return (
      <>
          <div>Wallet adapter connected</div>
          <div>Pass status: {GatewayStatus[gatewayStatus]}</div>
          <br />
          <button type='submit' onClick={requestGatewayToken}>Request Pass</button>
          <br />
          <div>Pass: {gatewayToken?.publicKey.toBase58()}</div>
      </>
  )
}

const requiresSignature = (transaction, wallet) => {
  return transaction.signatures.find(sig => sig.publicKey.equals(wallet.publicKey)) !== undefined;
}

/** A sample demonstrating how to provide a custom implementation for handle transaction */
function GatewayCustomHandleTransaction() {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { gatekeeperNetwork, stage, cluster, clusterUrl } = env.prod;
  return (
    <GatewayProvider
      wallet={wallet}
      gatekeeperNetwork={gatekeeperNetwork}
      stage={stage}
      handleTransaction={async (transaction) => {
        // Provide a custom implementation to sign and send the transaction
        const endpoint = clusterApiUrl(cluster);
        const connection = new Connection(endpoint, 'confirmed');
        const signature = requiresSignature(transaction, wallet)
          ? await wallet.sendTransaction(transaction, connection)
          : await connection.sendRawTransaction(transaction.serialize());

        const result = await connection.confirmTransaction(signature, 'processed');
        console.log(result);
      }}
      cluster={cluster}
      clusterUrl={clusterUrl}>
        { publicKey && <RequestGatewayToken /> }
    </GatewayProvider>
  )
}

export default GatewayCustomHandleTransaction;
