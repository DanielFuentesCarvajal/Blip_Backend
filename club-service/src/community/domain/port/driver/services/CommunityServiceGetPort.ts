import Community from "../../../model/community/Community";

export default interface CommunityServiceGetPort {
    getAllCommunity(): Promise<Community[]>;
    getCommunityById(communityId: string): Promise<Community>;
}