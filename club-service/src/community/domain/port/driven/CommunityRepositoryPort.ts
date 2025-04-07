import Repository from "../../repository/RepositoryInterface";
import CommunityDataInterface from "../../types/CommunityDataInterface";

export default interface ICommunityRepository extends Repository<string, CommunityDataInterface> {
    joinCommunity(user_id: number, community_id: number): Promise<void>;
}