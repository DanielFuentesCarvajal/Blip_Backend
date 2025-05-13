import { AccessToken } from 'livekit-server-sdk';

export default class LiveKitService {
    constructor(
        private readonly apiKey: string,
        private readonly apiSecret: string,
        public readonly url: string
    ) {}

    public createToken(identity: string, roomName: string): Promise<string> {
        const token = new AccessToken(this.apiKey, this.apiSecret, { identity });
        token.addGrant({ roomJoin: true, room: roomName });
        return token.toJwt();
    }
}
