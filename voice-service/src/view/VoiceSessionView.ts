import { Router } from 'express';
import VoiceSessionController from '../controller/VoiceSessionController';


export default class VoiceSessionView {
    public router: Router;

    constructor(
        private readonly voiceSessionController: VoiceSessionController,
      
    ) {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get('/sessions/:communityId', this.voiceSessionController.listVoiceSessions.bind(this.voiceSessionController));
        this.router.post('/sessions/:communityId/join',  this.voiceSessionController.joinVoiceSession.bind(this.voiceSessionController));
    }
}
