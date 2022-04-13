/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Transaction, PublicKey, Connection } from "@solana/web3.js";
import {
  BaseWalletAdapter,
  SendTransactionOptions,
  Wallet,
} from "@solana/wallet-adapter-base";

class DemoWalletAdapter extends BaseWalletAdapter {
  connecting = false;

  get publicKey(): PublicKey {
    return new PublicKey("BdnZRVycP2Hh3SB87jtusoQ6FQQ1XetUh68WWjaA8bxr");
  }

  async ready(): Promise<boolean> {
    return true;
  }

  get connected(): boolean {
    return true;
  }

  async connect(): Promise<void> {
    // NOP
  }

  async disconnect(): Promise<void> {
    // NOP
  }

  async sendTransaction(
    _transaction: Transaction,
    _connection: Connection,
    _options?: SendTransactionOptions
  ): Promise<string> {
    return "OK";
  }
}

export const getDemoWallet = (): Wallet => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  name: "DemoWallet",
  url: "",
  icon: "",
  adapter: new DemoWalletAdapter(),
});
