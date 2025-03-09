import Community from "../../../model/community/Community";

export default interface CommunityUseCaseGetExpressPort {
    getAllCommunity() : Promise<Community[]>
    getCommunityById(id : string): Promise<Community>
}