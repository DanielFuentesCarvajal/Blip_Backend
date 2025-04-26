import IPostRepository from "../../repository/interfaces/IPostRepository";
import PostRepository from "../../repository/PostRepository";

export default class PostRepositoryFactory {
    public static readonly create = (): IPostRepository => {
        return new PostRepository();
    }
}