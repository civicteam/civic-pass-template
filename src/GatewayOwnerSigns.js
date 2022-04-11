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

function GatewayOwnerSigns() {
  // const wallet = useWallet();
  let wallet = new Wallet('0x7e03b5a475104e97c1795887b6e972efab0ac7c87b1aa003daa119a99a20deca', getDefaultProvider())
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
