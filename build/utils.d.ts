import { Connection } from '@solana/web3.js';
export declare const RPC_ENDPOINT = "https://devnet.helius-rpc.com/?api-key=1ce851a8-f463-4114-b601-0ae950264e20";
export declare const getCardTokenMint: (userId: number) => Promise<string>;
export declare const getWalletAddress: (userId: number) => Promise<string>;
export declare const getVaultBalance: (connection: Connection, userId: number) => Promise<number>;
export declare const getVaultUsdcBalance: (connection: Connection, userId: number) => Promise<number>;
export declare const getSolanaPrice: () => Promise<any>;
