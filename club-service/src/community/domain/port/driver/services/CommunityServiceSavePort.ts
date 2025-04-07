import CommunityDataInterface from "../../../types/CommunityDataInterface";



export default interface CommunityServiceSavePort {
    save(communitySave: CommunityDataInterface): void;
    joinCommunity(user_id: number, community_id: number): Promise<void>;
}