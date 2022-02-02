import './App.css';
import { PublicKey } from '@solana/web3.js';
import { Badge } from '@civic/solana-gateway-react';

const badgeConfig = {
  gatekeeperNetwork: new PublicKey('gatbGF9DvLAw3kWyn1EmH5Nh1Sqp8sTukF7yaQpSc71'),
  verifiedWalletAddress: new PublicKey('6GCiPi3gEGE6xeXw9T1SRP7tNWtJTAsEaY6wKyWyuCGG'),
};

function CivicBadge() {
  const { gatekeeperNetwork, verifiedWalletAddress } = badgeConfig;
  return (
    <div className="App">
      <header className="App-header">
        <h2>Civic Verified</h2>
        <Badge 
          gatekeeperNetwork={gatekeeperNetwork} 
          publicKey={verifiedWalletAddress} 
        />
      </header>
    </div>
  );
};

export default CivicBadge;
