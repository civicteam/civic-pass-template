import { Keypair, PublicKey } from '@solana/web3.js';
import { GatewayProvider, useGateway, IdentityButton, GatewayStatus } from '@civic/solana-gateway-react';

const env = {
  prod: {
    gatekeeperNetwork: new PublicKey('ni1jXzPTq1yTqo67tUmVgnp22b1qGAAZCtPmHtskqYG'),
  },
  test: {
    gatekeeperNetwork: new PublicKey('tniC2HX5yg2yDjMQEcUo1bHa44x9YdZVSqyKox21SDz'),
    clusterUrl: 'https://api.devnet.solana.com',
    stage: 'preprod',
  }
};

const userKeypair = Keypair.generate();

const dummyWallet = {
  publicKey: userKeypair.publicKey,
  signTransaction: async (tx) => {
    tx.sign(userKeypair);
    return tx;
  }
};

function IdentityComponent() {
  const { gatewayToken, gatewayStatus } = useGateway();
  return (
    <>
      <IdentityButton />
      <br/>
      <small>Gateway status: <b>{GatewayStatus[gatewayStatus]}</b></small>
      {gatewayToken && <small>Gateway token: <b>{gatewayToken?.publicKey.toBase58()}</b></small>}
    </>
  )
};

function CivicIdentityButton() {
  const { gatekeeperNetwork, stage, clusterUrl } = env.prod;
  return (
    <GatewayProvider 
      wallet={dummyWallet} 
      gatekeeperNetwork={gatekeeperNetwork}
      stage={stage}
      clusterUrl={clusterUrl}>
      <IdentityComponent/>
    </GatewayProvider>
  )
};

export default CivicIdentityButton;