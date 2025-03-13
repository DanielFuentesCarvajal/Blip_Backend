import Category from "../../domain/model/category/Category";
import Community from "../../domain/model/community/Community";
import Tags from "../../domain/model/tags/Tags";
import ICommunityRepository from "../../domain/port/driven/CommunityRepositoryPort";
import ITagRepository from "../../domain/port/driven/TagRepositoryPort";
import CommunityServiceGetPort from "../../domain/port/driver/services/CommunityServiceGetPort";

export default class CommunityServiceGet implements CommunityServiceGetPort {

    constructor(
        private readonly communityRepository: ICommunityRepository,
        private readonly tagRepository: ITagRepository      
    ){
        console.log(this.tagRepository)
    } 


    public getAllCommunity = async (): Promise<Community[]> => {
        const sqlCommunity = await this.communityRepository.findAll();
    
        const communitys = await Promise.all(
            sqlCommunity.map(async (community) => {
                // Obtener las etiquetas (tags) de la comunidad
                const tags = await this.tagRepository.findById(community.community_id.toString());
                console.log('Tags obtenidos antes del map:', tags);
                if (!tags || tags.length === 0) {
                console.warn(`No se encontraron tags para la comunidad con ID ${community.community_id}`);
                }

                const category = await this.tagRepository.getCategoryById(community.category.toString());
                return new Community({
                    id: community.community_id,
                    name: community.name,
                    description: community.description,
                    image: community.image || '', 
                    number_members: community.members_number,
                    privacy: community.privacy,
                    creation_date: community.creation_date,
                    list_members: [],
                    creator: community.creator_id,
                    category: new Category(category.idcategory.toString(), category.category, category.icon, category.color),
                    tags: await Promise.all(tags.map(async (tag) => new Tags(tag.idTags.toString(), tag.nametag, tag.color))),// Se aplica Promise.all aquí también
                    rules: this.parseRules(community.community_rules)
                });
            })
        );
        return communitys;
    };

    public getCommunityById = async (communityId: string): Promise<Community> => {
        const sqlCommunity = await this.communityRepository.findById(communityId);
        
        const tags = await this.tagRepository.findById(sqlCommunity.community_id.toString());
            //console.log('Tags obtenidos antes del map:', tags);
            if (!tags || tags.length === 0) {
            console.warn(`No se encontraron tags para la comunidad con ID ${sqlCommunity.community_id}`);
        }

        const category = await this.tagRepository.getCategoryById(sqlCommunity.category.toString());

        const community = new Community({
            id: sqlCommunity.community_id,
            name: sqlCommunity.name,
            description: sqlCommunity.description,
            image: sqlCommunity.image || '', 
            number_members: sqlCommunity.members_number,
            privacy: sqlCommunity.privacy,
            creation_date: sqlCommunity.creation_date,
            list_members: [],
            creator: sqlCommunity.creator_id,
            category: new Category(category.idcategory.toString(), category.category, category.icon, category.color),
            tags: await Promise.all(tags.map(async (tag) => new Tags(tag.idTags.toString(), tag.nametag, tag.color))),// Se aplica Promise.all aquí también
            rules: this.parseRules(sqlCommunity.community_rules)
        })
        return community;
    }    

    private parseRules(rules: string): string[] {
        return rules.split(",").map(rule => rule.trim());
    }


}