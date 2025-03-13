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
                category: community.category,
                rules: community.rules,
                owner: community.creator,
                members_number: community.number_members,
                creation_date: community.creation_date,
                image: community.image
            }
        })
        res.status(200).json(communityResponse)
    }

    public async save(_req: Request, res: Response): Promise<void> {
        try {
            const { name, descripcion, image, privacy, creation_date, creator_user, rules, category, tags } = _req.body;
    
            // Validar que todos los campos estén presentes
            if (!name || !descripcion || !image || !privacy || !creator_user || !rules || !category || !tags) {
                res.status(400).json({ error: "All fields are required: name, descripcion, image, privacy, creation_date, creator_user, rules, category, tags" });
                return;
            }
            let cre
            if (creation_date === undefined) {
                const today = new Date();
                cre = today.toISOString().split("T")[0];
                
            }else {
                cre = creation_date
            }
            const rulesString = Array.isArray(rules) ? rules.join(", ") : rules;
    
            // Guardar la comunidad si pasa la validación
            await this.communityUseCaseSave.save(name, descripcion, image, privacy, cre, creator_user, rulesString, category, tags);
            res.status(200).json({ message: "Community created successfully" });
    
        } catch (error) {
            console.error("Error creating community:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
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
            category: community.category,
            rules: community.rules,
            owner: community.creator,
            members_number: community.number_members,
            creation_date: community.creation_date,
            image: community.image
        }

        res.status(200).json(communityR);
    }

    public async getAllCategory(_req: Request, res: Response): Promise<void> {
        console.log('Im in the controller')
        const category = await this.communityUseCaseGet.getAllCategory()
        res.status(200).json(category)
    }

    public async getAllTags(_req: Request, res: Response): Promise<void> {
        console.log('Im in the controller')
        const tags = await this.communityUseCaseGet.getAllTags()
        res.status(200).json(tags)
    }

}