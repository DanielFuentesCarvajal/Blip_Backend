import Repository2 from "../../repository/RepositoryInterface2";
import TagDataInterface from "../../types/TagDataInterface";

export default interface ITagRepository extends Repository2<string, TagDataInterface> {
    
}