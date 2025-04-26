import Type from "../../util/TypeEnum";
import Comment from "../comment/Comment";
import ILike from "../interfaces/ILike";
import Post from "../post/AbstractPost";

export default abstract class AbstractLike{
    protected id: number;
    protected comment: Comment;
    protected post: Post;
    protected idUser: number;
    protected like: boolean;
    protected type: Type;
    
    constructor(likeInterface: ILike){
        this.id = likeInterface.id;
        this.comment = likeInterface.comment;
        this.post = likeInterface.post;
        this.idUser = likeInterface.idUser;
        this.like = likeInterface.like;
        this.type = likeInterface.type;
    }

    public abstract isNull(): boolean

    //Getters y setters
    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public getComment(): Comment {
        return this.comment;
    }
    public setComment(comment: Comment): void {
        this.comment = comment;
    }
    public getPost(): Post {
        return this.post;
    }
    public setPost(post: Post): void {
        this.post = post;
    }
    public getIdUser(): number {
        return this.idUser;
    }
    public setIdUser(idUser: number): void {
        this.idUser = idUser;
    }
    public getLike(): boolean {
        return this.like;
    }
    public setLike(like: boolean): void {
        this.like = like;
    }
    public getType(): Type {
        return this.type;
    }
    public setType(type: Type): void {
        this.type = type;
    }

}