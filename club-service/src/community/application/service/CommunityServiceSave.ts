import ICommunityRepository from "../../domain/port/driven/CommunityRepositoryPort";

import CommunityServiceSavePort from "../../domain/port/driver/services/CommunityServiceSavePort";
import CommunityDataInterface from "../../domain/types/CommunityDataInterface";


export default class CommunityServiceSave implements CommunityServiceSavePort{

    constructor(
        private readonly SQLCommunity: ICommunityRepository,
        
    ){}

public save = async (communitySave: CommunityDataInterface): Promise<void> => {
    console.log('estamos en serive')
    console.log(communitySave);
    this.SQLCommunity.save(communitySave);
}

async joinCommunity(user_id: number, community_id: number): Promise<void> {
    await this.SQLCommunity.joinCommunity(user_id, community_id);
}

async exitCommunity(user_id: number, community_id: number): Promise<void> {
    await this.SQLCommunity.exitCommunity(user_id, community_id);
}

async userInCommunity(user_id: number, community_id: number): Promise<boolean> {
    return await this.SQLCommunity.userInCommunity(user_id, community_id);
}




}