
import ITagRepository from "../../domain/port/driven/TagRepositoryPort";
import TagRepository from "../repository/TagRepository";

export default class SQLRepositryTagFactory {
    public static readonly create = (): ITagRepository => {
        return new TagRepository()
    }
}