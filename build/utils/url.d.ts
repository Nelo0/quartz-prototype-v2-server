export declare let getFcmMessage: (solanaPayUrl: URL, userId: number) => {
    to: string;
    notification: {
        title: string;
        body: string;
    };
    data: {
        screenToOpen: string;
        title: string;
        body: string;
    };
};
