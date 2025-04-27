import { Request, Response } from 'express';
import VoiceSessionModel from '../model/VoiceSessionModel';
import LiveKitService from '../config/LiveKitService';


export default class VoiceSessionController {
    constructor(
        private readonly voiceSessionModel: VoiceSessionModel,
        private readonly livekitService: LiveKitService
    ) {}

    public async listVoiceSessions(req: Request, res: Response): Promise<void> {
        const { communityId } = req.params;

        if (!communityId) {
            res.status(400).json({ message: 'Falta communityId' });
            return;
        }

        try {
            const sessions = await this.voiceSessionModel.getVoiceSessionsByCommunity(Number(communityId));
            res.status(200).json({ sessions });
        } catch (error) {
            res.status(500).json({ message: 'Error obteniendo sesiones', error });
        }
    }

    public async joinVoiceSession(req: Request, res: Response): Promise<void> {
        const { communityId } = req.params;
        const userId = req.body.userId; 

        if (!communityId || !userId) {
            res.status(400).json({ message: 'Faltan parámetros' });
            return;
        }

        try {
            const roomName = `community_${communityId}`;

            
            await this.voiceSessionModel.createVoiceSession(Number(communityId), roomName);

            const token = this.livekitService.createToken(userId.toString(), roomName);

            res.status(200).json({ token, roomName, livekitUrl: this.livekitService.url });
        } catch (error) {
            res.status(500).json({ message: 'Error al unirse a la sala', error });
        }
    }
}
