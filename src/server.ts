import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { RPC_ENDPOINT, getCardTokenMint, getSolanaPrice, getVaultBalance, getVaultUsdcBalance } from "./utils";

var FCM = require('fcm-node');
var serverKey = 'AAAAU4oYkts:APA91bEtoOdO75uTHC_3PaYUjUTyaIYzjJRZtxxIGShTnx5zSksEZClUQ0lyTEu4l86yg2Y57cmXD-wlcKj2s9j1k-z0up7ZyppcJLvkG8GNRqiKtdiZkh4D3aFKtkicevsChnc_H1qc';
var fcm = new FCM(serverKey);


let connection = new Connection(RPC_ENDPOINT);

async function checkCanAfford (amount: number, userId: number) {
    let userBalance;

    let cardTokenMint = await getCardTokenMint(userId);
    if (cardTokenMint === 'native_sol') {
        userBalance = await getVaultBalance(connection, userId)
        userBalance = await getSolanaPrice() * userBalance;
    } else {
        //USDC
        userBalance = await getVaultUsdcBalance(connection, userId)
    }
    console.log("Vault of mint: ", cardTokenMint, " Balance: ", userBalance);

    if (userBalance > amount) {
        return true;
    }
    else {
        return false
    }
}


let message = {
    to: 'flJ2SP6tTayIEyF6tupNjh:APA91bGvO9e_QsWrxt5YQw6xNwHZEENioSnRJWxcNn-fQnZ2STUdM1zZvu6HfcPjjBPUtK5fbgZ0__ZAz_ZU1P2kz2fIASR6JaiwFMnOsCAT-uOhfNHdCk9p1pGFRW2tGGmh31hCpU6P',
    notification: {
        title: 'Payment Authentication Needed',
        body: 'Please accept or decline this pending transaction',
    },

    data: { //you can send only notification or only data(or include both)
        screenToOpen: 'Spend',
        title: 'Payment Authentication',
        body: JSON.stringify({
            name: 'SolanaPay url',
            url: 'http://dummysolanapay.com',
            timeSent: '22:12',
        }),
    }
};

let main = async () => {
    let canAfford = await checkCanAfford(7, 1);
    if (canAfford!) {
        console.log("transaction not accepted: Insufficent funds");
        return
    }
    //sends notification with transaction to user to accept a payment
    fcm.send(message, function (err: any, response: any) {
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

