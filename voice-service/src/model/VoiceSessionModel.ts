import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import VoiceSession from '../types/VoiceSession';

export default class VoiceSessionModel {
    private readonly jsonPath = path.join(__dirname, '../../src/database/voice_sessions.json');

    public async getVoiceSessionsByCommunity(communityId: number): Promise<VoiceSession[]> {
        const data = await readFile(this.jsonPath, 'utf-8');
        const sessions: VoiceSession[] = JSON.parse(data);
        return sessions.filter(session => session.communityId === communityId && session.isActive);
    }

    public async createVoiceSession(communityId: number, livekitRoomName: string): Promise<VoiceSession> {
        const data = await readFile(this.jsonPath, 'utf-8');
        const sessions: VoiceSession[] = JSON.parse(data);

        const newSession: VoiceSession = {
            id: sessions.length + 1,
            communityId,
            isActive: true,
            livekitRoomName,
            createdAt: new Date().toISOString()
        };

        sessions.push(newSession);

        await writeFile(this.jsonPath, JSON.stringify(sessions, null, 2));
        return newSession;
    }
}
