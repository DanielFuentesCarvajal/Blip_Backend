import NullCategory from "../../domain/model/category/NullCategory";
import Community from "../../domain/model/community/Community";
import NullCreatorUser from "../../domain/model/creator/NullCreator";
import NullRule from "../../domain/model/rules/NullRules";
import NullTag from "../../domain/model/tags/NullTags";
import ICommunityRepository from "../../domain/port/driven/CommunityRepositoryPort";
import CommunityServiceGetPort from "../../domain/port/driver/services/CommunityServiceGetPort";


export default class CommunityServiceGet implements CommunityServiceGetPort {

    constructor(private readonly communityRepository: ICommunityRepository){
    } 

    public getAllCommunity = async (): Promise<Community[]> => {
        const sqlCommunity = await this.communityRepository.findAll();

        console.log(sqlCommunity)

        const communitys = sqlCommunity.map((community) => {
            return new Community(
                {
                    name: community.name,
                    description: community.description,
                    image: '',
                    number_members: community.members_number,
                    privacy: community.privacy,
                    creation_date: community.creation_date,
                    list_members: [],
                    creator: new NullCreatorUser(),
                    category: new NullCategory(),
                    tags: [new NullTag()],
                    rules: [new NullRule()]
                }
            )
        })
        return Promise.resolve(communitys)
    }
}