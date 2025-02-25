import ICommunityRepository from "../../domain/port/driven/CommunityRepositoryPort";
import CommunityServiceSavePort from "../../domain/port/driver/services/CommunityServiceSavePort";
import CommunityDataInterface from "../../domain/types/CommunityDataInterface";


export default class CommunityServiceSave implements CommunityServiceSavePort{

    constructor(private readonly SQLCommunity: ICommunityRepository){}

    public save = async (communitySave: CommunityDataInterface): Promise<void> => {
        this.SQLCommunity.save(communitySave)
    }

}