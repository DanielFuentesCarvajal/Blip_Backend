import Repository2 from "../../repository/RepositoryInterface2";
import CategoryDataInterface from "../../types/CategoryDataInterface";
import TagDataInterface from "../../types/TagDataInterface";

export default interface ITagRepository extends Repository2<string, TagDataInterface> {
    getCategoryById(id: string): Promise<CategoryDataInterface>;
    getAllCategory() : Promise<CategoryDataInterface[]>
    
}