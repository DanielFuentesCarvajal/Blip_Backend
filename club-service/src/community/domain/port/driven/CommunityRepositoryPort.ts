import Repository from "../../repository/RepositoryInterface";
import CommunityDataInterface from "../../types/CommunityDataInterface";

export default interface ICommunityRepository extends Repository<string, CommunityDataInterface> {

}