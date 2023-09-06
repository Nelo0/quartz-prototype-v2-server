var FCM = require('fcm-node');
var serverKey = 'AAAAU4oYkts:APA91bEtoOdO75uTHC_3PaYUjUTyaIYzjJRZtxxIGShTnx5zSksEZClUQ0lyTEu4l86yg2Y57cmXD-wlcKj2s9j1k-z0up7ZyppcJLvkG8GNRqiKtdiZkh4D3aFKtkicevsChnc_H1qc';
var fcm = new FCM(serverKey);

var message = {
    to: 'enQbqDxAQYqFzM-qIsvktz:APA91bEMHJ8_NrQcHTpmL70eFS7Kw5CFqUPUC6fTWAQq1EFSikDyVRuoT_ZrJvENoxSrIrF_6f-kC9JqS7fSXNn1DP3FT8eysnPOGXINllYjvwtca5EDg3_EmiTSCNSpxM4OepvHECjm',
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

fcm.send(message, function (err: any, response: any) {
    if (err) {
        console.log("Something has gone wrong!" + err);
        console.log("Respponse:! " + response);
    } else {
        // showToast("Successfully sent with response");
        console.log("Successfully sent with response: ", response);
    }

});