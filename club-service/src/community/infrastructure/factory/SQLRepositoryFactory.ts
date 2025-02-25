import ICommunityRepository from "../../domain/port/driven/CommunityRepositoryPort";
import CommunityRepository from "../repository/CommunityRepository";

export default class SQLRepositryFactory {
    public static readonly create = (): ICommunityRepository => {
        return new CommunityRepository()
    }
}