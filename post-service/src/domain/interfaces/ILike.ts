import Type from "../../util/TypeEnum";
import Comment from "../comment/Comment";
import Post from "../post/AbstractPost";


export default interface ILike{
    id: number;
    comment: Comment;
    post: Post;
    idUser: number;
    like: boolean;
    type: Type;
}