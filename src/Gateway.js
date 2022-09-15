import React from 'react';
import { PublicKey } from '@solana/web3.js';
import { GatewayProvider, useGateway, GatewayStatus } from '@civic/solana-gateway-react';
import { useWallet } from '@solana/wallet-adapter-react';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const env = {
    gatekeeperNetwork: new PublicKey('ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6'),
    clusterUrl: 'https://api.mainnet-beta.solana.com',
    cluster: 'mainnet-beta',
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
    const { gatekeeperNetwork, cluster, clusterUrl } = env;
    console.log(`publicKey:${publicKey}`);
    return (
        <GatewayProvider
            wallet={wallet}
            gatekeeperNetwork={gatekeeperNetwork}
            cluster={cluster}
            clusterUrl={clusterUrl}>
            { publicKey && <RequestGatewayToken /> }
        </GatewayProvider>
    )
}

export default Gateway;
