import { Connection, PublicKey } from "@solana/web3.js";

import {
  getHashedName,
  getNameAccountKey,
  NameRegistryState,
} from "@bonfida/spl-name-service";

export default async function fetchSNSPublicKeyForDomain(
  connection: Connection,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle: string
): Promise<PublicKey> {
  const updateDomainName = handle.trim().replace(/\.sol$/i, "");
  const hashedName = await getHashedName(updateDomainName);

  const SOL_TLD_AUTHORITY = new PublicKey(
    "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
  );

  const domainKey = await getNameAccountKey(
    hashedName,
    undefined,
    SOL_TLD_AUTHORITY
  );
  const registry = await NameRegistryState.retrieve(connection, domainKey);

  if (registry.nftOwner !== undefined) {
    return registry.nftOwner;
  }
  throw Error("error");
}
