import Category from "../../../model/category/Category";
import Community from "../../../model/community/Community";
import Tags from "../../../model/tags/Tags";

export default interface CommunityServiceGetPort {
    getAllCommunity(): Promise<Community[]>;
    getCommunityById(communityId: string): Promise<Community>;
    getAllCategory() : Promise<Category[]>
    getAllTags() : Promise<Tags[]>

}