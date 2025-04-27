import Category from "../../../model/category/Category";
import Community from "../../../model/community/Community";
import Tags from "../../../model/tags/Tags";

export default interface CommunityUseCaseGetExpressPort {
    getAllCommunity() : Promise<Community[]>
    getCommunityById(id : string): Promise<Community>
    getAllCategory() : Promise<Category[]>
    getAllTags() : Promise<Tags[]>
    
    getAllCommunitiesByUserId(user_id: number): Promise<Community[]>
}