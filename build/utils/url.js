"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFcmMessage = void 0;
let getFcmMessage = (solanaPayUrl, userId) => {
    //get the users application token from database
    let appToken = 'flJ2SP6tTayIEyF6tupNjh:APA91bGvO9e_QsWrxt5YQw6xNwHZEENioSnRJWxcNn-fQnZ2STUdM1zZvu6HfcPjjBPUtK5fbgZ0__ZAz_ZU1P2kz2fIASR6JaiwFMnOsCAT-uOhfNHdCk9p1pGFRW2tGGmh31hCpU6P';
    let fcmMessage = {
        to: appToken,
        notification: {
            title: 'Payment Authentication Needed',
            body: 'Please accept or decline this transaction',
        },
        data: {
            screenToOpen: 'Spend',
            title: 'Payment Authentication',
            body: JSON.stringify({
                name: 'SolanaPay url',
                url: solanaPayUrl
            }),
        }
    };
    return fcmMessage;
};
exports.getFcmMessage = getFcmMessage;
