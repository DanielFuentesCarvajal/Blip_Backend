import Status from "../../util/StatusEnum";
import Comment from "../comment/Comment";
import Post from "../post/AbstractPost";

export default interface IComment{
    id: number;
    idUser: number;
    parentPost: Post;
    text: String;
    image: String;
    date: Date;
    status: Status;
    parentComment: Comment;
}