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
    return new PublicKey("EkZt4q3uTT6TxxbiGQWS26nsNVJuRRfHbvZVk4vqsRfw");
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

export const getDemoWalletWithProfile = (): Wallet => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  name: "DemoWallet2",
  url: "",
  icon: "",
  adapter: new DemoWalletAdapter(),
});
