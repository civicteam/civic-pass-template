import { Connection, PublicKey } from "@solana/web3.js";
import { ClusterType } from "@identity.com/sol-did-client";
import fetchSNSPublicKeyForDomain from "./fetchSNSPublicKeyForDomain";

const solanaNetworkPrefix =
  (process?.env?.REACT_APP_STAGE || "dev") === "prod" ? "" : "devnet:";

export default async function constructDidFromPublicKey(
  publicKey: string
): Promise<string> {
  if (!publicKey.startsWith("did:")) {
    try {
      // eslint-disable-next-line no-new
      new PublicKey(publicKey);
      return `did:sol:${solanaNetworkPrefix}${publicKey}`;
    } catch (e) {
      const connection = new Connection(
        solanaNetworkPrefix === "devnet:"
          ? ClusterType.mainnetBeta().solanaUrl()
          : ClusterType.mainnetBeta().solanaUrl()
      );
      try {
        const publicKeyForTwitterHandle = await fetchSNSPublicKeyForDomain(
          connection,
          publicKey
        );
        return `did:sol:${solanaNetworkPrefix}${publicKeyForTwitterHandle}`;
      } catch (err) {
        return publicKey;
      }
    }
  }
  return publicKey;
}
