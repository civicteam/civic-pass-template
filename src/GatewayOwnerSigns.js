import React from 'react';
import { PublicKey, clusterApiUrl, Connection } from '@solana/web3.js';
import { GatewayProvider, useGateway, GatewayStatus } from '@civic/solana-gateway-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet } from 'ethers';
import { getDefaultProvider } from '@ethersproject/providers';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const env = {
  prod: {
    gatekeeperNetwork: new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6'),
  },
  test: {
    gatekeeperNetwork: new PublicKey('tigoYhp9SpCDoCQmXGj2im5xa3mnjR1zuXrpCJ5ZRmi'),
    clusterUrl: 'https://api.devnet.solana.com',
    stage: 'dev',
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

// {
//   address: '0x48f40CAd38d190Fa8D40B2D1ccA60288B56aa0eD',
//   publicKey: '0x0439b31d2cb1e24fcc3ef8a8d023684023f94714b2025540e1f40cd61e12e6f10fbc5040dbb91e73ce7362b4811cd31a3b3ae19d43baa71f058a1a57fa9c720822',
//   privateKey: '0x1c52d1576f2a70d281b7352758999d9a5791868fc882808f45d585427df6a0e9'
// }

function GatewayOwnerSigns() {
  const wallet = useWallet();
  //let wallet = new Wallet('0x1c52d1576f2a70d281b7352758999d9a5791868fc882808f45d585427df6a0e9', getDefaultProvider('ropsten', {infura: 'fce19fa62f5242ad927f7be541f89e83'}))
  console.log(wallet);
  const { publicKey } = wallet;
  const { gatekeeperNetwork, stage, clusterUrl } = env.test;
  return (
    <GatewayProvider
      wallet={wallet}
      gatekeeperNetwork={gatekeeperNetwork}
      stage={stage}
      broadcastTransaction={false}
      handleTransaction={async (transaction) => {
        const endpoint = clusterApiUrl('devnet');
        const connection = new Connection(endpoint, 'confirmed');
        const signature = requiresSignature(transaction, wallet)
          ? await wallet.sendTransaction(transaction, connection)
          : await connection.sendRawTransaction(transaction.serialize());

        const result = await connection.confirmTransaction(signature, 'processed');
        console.log(result);
      }}
      clusterUrl={clusterUrl}>
        { publicKey && <RequestGatewayToken /> }
    </GatewayProvider>
  )
}

export default GatewayOwnerSigns;
