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
                id : community.id,
                name: community.name,
                description: community.description,
                tags: community.tags,
                privacy: community.privacy,
                category: community.category.getName(),
                rules: community.rules,
                owner: community.creator,
                members_number: community.number_members,
                image: community.image
            }
        })
        res.status(200).json(communityResponse)
    }

    public async save(_req: Request, res: Response): Promise<void> {
        const { name, descripcion, image, privacy, creation_date, creator_user, rules, category, tags } = _req.body;
        await this.communityUseCaseSave.save(name, descripcion, image, privacy, creation_date, creator_user, rules,category, tags);
        res.status(200).json({ message: 'Community created successfully' });
    }

    public async getCommunityById(req: Request, res: Response): Promise<void> {
        let id = req.params['id']
        id = id + ''
        console.log(id)
        const community = await this.communityUseCaseGet.getCommunityById(id)
        console.log(community)

        const communityR = {
            id : community.id,
            name: community.name,
            description: community.description,
            tags: community.tags,
            privacy: community.privacy,
            category: community.category.getName(),
            rules: community.rules,
            owner: community.creator,
            members_number: community.number_members,
            image: community.image
        }

        res.status(200).json(communityR);
    }

}