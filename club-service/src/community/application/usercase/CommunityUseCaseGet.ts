import Community from "../../domain/model/community/Community";
import NullCommunity from "../../domain/model/community/NullCommunity";
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
}

