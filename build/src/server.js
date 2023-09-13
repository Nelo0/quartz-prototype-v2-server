"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const balance_1 = require("../utils/balance");
const pay_1 = require("@solana/pay");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const url_1 = require("../utils/url");
var FCM = require('fcm-node');
var serverKey = 'AAAAU4oYkts:APA91bEtoOdO75uTHC_3PaYUjUTyaIYzjJRZtxxIGShTnx5zSksEZClUQ0lyTEu4l86yg2Y57cmXD-wlcKj2s9j1k-z0up7ZyppcJLvkG8GNRqiKtdiZkh4D3aFKtkicevsChnc_H1qc';
var fcm = new FCM(serverKey);
let connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'), 'confirmed');
let main = () => __awaiter(void 0, void 0, void 0, function* () {
    let userId = 1;
    let transactionAmount = 2;
    let canAfford = yield (0, balance_1.checkCanAfford)(connection, transactionAmount, userId);
    if (canAfford) {
        console.log("transaction not accepted: Insufficent funds");
        return;
    }
    console.log('💰 Create a payment request link \n');
    const recipient = balance_1.QUARTZ_SPEND_ADDRESS;
    let amount = new bignumber_js_1.default(transactionAmount);
    const reference = new web3_js_1.Keypair().publicKey;
    const label = 'Impala';
    const message = `Impala - €${transactionAmount}`;
    const splToken = balance_1.USDC_MINT_ADDRESS;
    const url = (0, pay_1.encodeURL)({ recipient, amount, splToken, reference, label, message });
    let fcmMessage = (0, url_1.getFcmMessage)(url, userId);
    //sends notification with transaction to user to accept a payment
    fcm.send(fcmMessage, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!" + err);
            console.log("Respponse:! " + response);
        }
        else {
            // showToast("Successfully sent with response");
            console.log("Successfully sent with response: ", response);
        }
    });
});
main();
