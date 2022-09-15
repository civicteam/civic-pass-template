import { Keypair, PublicKey } from '@solana/web3.js';
import { GatewayProvider, useGateway, IdentityButton, GatewayStatus } from '@civic/solana-gateway-react';

const env = {
  gatekeeperNetwork: new PublicKey('ni1jXzPTq1yTqo67tUmVgnp22b1qGAAZCtPmHtskqYG'),
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
  const { gatekeeperNetwork, stage, clusterUrl } = env;
  return (
      <GatewayProvider
          wallet={dummyWallet}
          gatekeeperNetwork={gatekeeperNetwork}
          clusterUrl={clusterUrl}>
        <IdentityComponent/>
      </GatewayProvider>
  )
};

export default CivicIdentityButton;