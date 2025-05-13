// src/express/Server.ts
import express, { Application } from "express";
import cors from "cors";

// Views
import VoiceSessionView from "../view/VoiceSessionView";

// Controllers
import VoiceSessionController from "../controller/VoiceSessionController";

// Models
import VoiceSessionModel from "../model/VoiceSessionModel";

// Config (LiveKit token generator)
import LiveKitService from "../config/LiveKitService";

export default class Server {

    private readonly app: Application;
    private readonly voiceSessionView: VoiceSessionView;

    constructor() {
        this.app = express();

        const voiceSessionModel = new VoiceSessionModel();
        const livekitService = new LiveKitService('a','a','a'); 
        const voiceSessionController = new VoiceSessionController(voiceSessionModel, livekitService); 

        this.voiceSessionView = new VoiceSessionView(voiceSessionController);

        this.config();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.routes();
    }

    private routes(): void {
        this.app.use('/voice', this.voiceSessionView.router);
    }

    public start(): void {
        const PORT = process.env['PORT'] ?? 3000;
        const HOST = process.env['HOST'] ?? 'localhost';

        this.app.listen(PORT, () => {
            console.log(`✅ Server running at http://${HOST}:${PORT}`);
        });
    }
}
