import { Request, Response } from 'express'
import CommunityControllerExpressPort from '../../../domain/port/driver/CommunityControllerExpressPort'
import CommunityUseCaseGetExpressPort from '../../../domain/port/driver/usescases/CommunityUseCaseGetExpressPort'
import CommunityUseCaseSavePort from '../../../domain/port/driver/usescases/CommunityUseCaseSavePort'



export default class CommunityController implements CommunityControllerExpressPort {

    constructor(
        private readonly communityUseCaseGet : CommunityUseCaseGetExpressPort,
        private readonly communityUseCaseSave : CommunityUseCaseSavePort
    ) {}

    public async getAllCommunity(_req: Request, res: Response): Promise<void> {
        const communitys = await this.communityUseCaseGet.getAllCommunity()
        const communityResponse = communitys.map((community) => {
            return {
                name: community.name,
                description: community.description,
                members_number: community.number_members,
                privacy: community.privacy,
            }
        })
        res.status(200).json(communityResponse)
    }

    public async save(_req: Request, res: Response): Promise<void> {
       
        const { name, descripcion, image, privacidad, creation_date, creator_user, rules } = _req.body;
        // Llamamos al caso de uso para guardar la comunidad
        await this.communityUseCaseSave.save(name, descripcion, image, privacidad, creation_date, creator_user, rules);
        res.status(200).json({ message: 'Community created successfully' });
    
    }

}