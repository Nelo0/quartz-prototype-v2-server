import { PublicKey, Connection } from '@solana/web3.js';
export declare const RPC_ENDPOINT = "https://devnet.helius-rpc.com/?api-key=1ce851a8-f463-4114-b601-0ae950264e20";
export declare const QUARTZ_SPEND_ADDRESS: PublicKey;
export declare const USDC_MINT_ADDRESS: PublicKey;
export declare const getCardTokenMint: (userId: number) => Promise<string>;
export declare function checkCanAfford(connection: Connection, amount: number, userId: number): Promise<boolean>;
