import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { QUARTZ_SPEND_ADDRESS, USDC_MINT_ADDRESS, checkCanAfford } from "../utils/balance";
import { encodeURL, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';
import { getFcmMessage } from "../utils/message";

var FCM = require('fcm-node');
var serverKey = 'AAAAU4oYkts:APA91bEtoOdO75uTHC_3PaYUjUTyaIYzjJRZtxxIGShTnx5zSksEZClUQ0lyTEu4l86yg2Y57cmXD-wlcKj2s9j1k-z0up7ZyppcJLvkG8GNRqiKtdiZkh4D3aFKtkicevsChnc_H1qc';
var fcm = new FCM(serverKey);


let connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

let main = async () => {
    let userId = 1;
    let transactionAmount = 2

    //checks if the user can afford the transaction
    let canAfford = await checkCanAfford(connection, transactionAmount, userId);

    if (canAfford!) {
        console.log("transaction not accepted: Insufficent funds");
        return
    }

    //creates a payment link
    console.log('💰 Create a payment request link \n');
    const recipient = QUARTZ_SPEND_ADDRESS
    let amount = new BigNumber(transactionAmount);
    const reference = new Keypair().publicKey;
    const label = 'Impala';
    const message = `Impala - €${transactionAmount}`;
    const splToken = USDC_MINT_ADDRESS;
    const url = encodeURL({ recipient, amount, splToken, reference, label, message });

    //creates the fcm message
    let fcmMessage = getFcmMessage(url, userId);

    //sends notification with transaction to user to accept a payment
    fcm.send(fcmMessage, function (err: any, response: any) {
        if (err) {
            console.log("Something has gone wrong!" + err);
            console.log("Respponse:! " + response);
        } else {
            // showToast("Successfully sent with response");
            console.log("Successfully sent with response: ", response);
        }

    });
}

main();

