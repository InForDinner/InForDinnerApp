export interface Secrets {
    sessionSecret: string;
    google: {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
    };
}
