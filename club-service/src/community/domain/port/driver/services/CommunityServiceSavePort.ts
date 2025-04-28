import CommunityDataInterface from "../../../types/CommunityDataInterface";



export default interface CommunityServiceSavePort {
    save(communitySave: CommunityDataInterface): void;
    joinCommunity(user_id: number, community_id: number): Promise<void>;
    
    exitCommunity(user_id: number, community_id: number): Promise<void>;
    userInCommunity(user_id: number, community_id: number): Promise<boolean>;
}