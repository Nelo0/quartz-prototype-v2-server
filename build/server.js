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
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("./utils");
var FCM = require('fcm-node');
var serverKey = 'AAAAU4oYkts:APA91bEtoOdO75uTHC_3PaYUjUTyaIYzjJRZtxxIGShTnx5zSksEZClUQ0lyTEu4l86yg2Y57cmXD-wlcKj2s9j1k-z0up7ZyppcJLvkG8GNRqiKtdiZkh4D3aFKtkicevsChnc_H1qc';
var fcm = new FCM(serverKey);
let connection = new web3_js_1.Connection(utils_1.RPC_ENDPOINT);
function checkCanAfford(amount, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let userBalance;
        let cardTokenMint = yield (0, utils_1.getCardTokenMint)(userId);
        if (cardTokenMint === 'native_sol') {
            userBalance = yield (0, utils_1.getVaultBalance)(connection, userId);
            userBalance = (yield (0, utils_1.getSolanaPrice)()) * userBalance;
        }
        else {
            //USDC
            userBalance = yield (0, utils_1.getVaultUsdcBalance)(connection, userId);
        }
        console.log("Vault of mint: ", cardTokenMint, " Balance: ", userBalance);
        if (userBalance > amount) {
            return true;
        }
        else {
            return false;
        }
    });
}
let main = () => __awaiter(void 0, void 0, void 0, function* () {
    let canAfford = yield checkCanAfford(7, 1);
    console.log(canAfford);
});
main();
var message = {
    to: 'flJ2SP6tTayIEyF6tupNjh:APA91bGvO9e_QsWrxt5YQw6xNwHZEENioSnRJWxcNn-fQnZ2STUdM1zZvu6HfcPjjBPUtK5fbgZ0__ZAz_ZU1P2kz2fIASR6JaiwFMnOsCAT-uOhfNHdCk9p1pGFRW2tGGmh31hCpU6P',
    notification: {
        title: 'Payment Authentication Needed',
        body: 'Please accept or decline this pending transaction',
    },
    data: {
        screenToOpen: 'Spend',
        title: 'Payment Authentication',
        body: JSON.stringify({
            name: 'SolanaPay url',
            url: 'http://dummysolanapay.com',
            timeSent: '22:12',
        }),
    }
};
// fcm.send(message, function (err: any, response: any) {
//     if (err) {
//         console.log("Something has gone wrong!" + err);
//         console.log("Respponse:! " + response);
//     } else {
//         // showToast("Successfully sent with response");
//         console.log("Successfully sent with response: ", response);
//     }
// });
