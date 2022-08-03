import React from 'react';
import { PublicKey } from '@solana/web3.js';
import { GatewayProvider, useGateway, GatewayStatus } from '@civic/solana-gateway-react';
import { useWallet } from '@solana/wallet-adapter-react';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const env = {
  prod: {
    gatekeeperNetwork: new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6'),
    clusterUrl: 'https://api.mainnet-beta.solana.com',
    cluster: 'mainnet-beta',
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

function Gateway() {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { gatekeeperNetwork, stage, cluster, clusterUrl } = env.prod;
  console.log(`publicKey:${publicKey}`);
  return (
    /* gatekeeperSendsTransaction disabled is the default behavior and the flag can be omitted */
    <GatewayProvider
      wallet={wallet}
      gatekeeperNetwork={gatekeeperNetwork}
      stage={stage}
      cluster={cluster}
      clusterUrl={clusterUrl}
      gatekeeperSendsTransaction={false}>
        { publicKey && <RequestGatewayToken /> }
    </GatewayProvider>
  )
}

export default Gateway;
