import Category from "../../domain/model/category/Category";
import Community from "../../domain/model/community/Community";
import NullCommunity from "../../domain/model/community/NullCommunity";
import Tags from "../../domain/model/tags/Tags";
import CommunityServiceGetPort from "../../domain/port/driver/services/CommunityServiceGetPort";
import CommunityUseCaseGetExpressPort from "../../domain/port/driver/usescases/CommunityUseCaseGetExpressPort";

export default class implements CommunityUseCaseGetExpressPort {

    constructor(
        private readonly communityGetServicePort: CommunityServiceGetPort,
    ){}

    public getAllCommunity = async (): Promise<Community[]> => { 
        const communityData = await this.communityGetServicePort.getAllCommunity();
        if(communityData.length > 0) {
            return communityData;
        }
        return [new NullCommunity()]
    }

    public getCommunityById = async (id: string): Promise<Community> => {
        const communityData = await this.communityGetServicePort.getCommunityById(id);
        return communityData;   
    }

    public async getAllCategory(): Promise<Category[]> {
        const categoryData = await this.communityGetServicePort.getAllCategory();
        return categoryData; 
    }

    public async getAllTags(): Promise<Tags[]> {
        const tagsData = await this.communityGetServicePort.getAllTags();
        return tagsData;
    }


}

