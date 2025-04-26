import Status from "../../util/StatusEnum";
import IComment from "../interfaces/IComment";
import Post from "../post/Post";
import Comment from "./Comment";

export default abstract class AbstractComment{
    protected id: number;
    protected idUser: number;
    protected parentPost: Post;
    protected text: String;
    protected image: String;
    protected date: Date;
    protected status: Status;
    protected parentComment: Comment;

    constructor(commentInterface: IComment){
        this.id = commentInterface.id;
        this.idUser = commentInterface.idUser;
        this.parentPost = commentInterface.parentPost;
        this.text = commentInterface.text;
        this.image = commentInterface.image;
        this.date = commentInterface.date;
        this.status = commentInterface.status;
        this.parentComment = commentInterface.parentComment;
    }

    public abstract isNull(): boolean

    //getters y setters
    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public getIdUser(): number {
        return this.idUser;
    }
    public setIdUser(idUser: number): void {
        this.idUser = idUser;
    }
    public getParentPost(): Post {
        return this.parentPost;
    }
    public setParentPost(parentPost: Post): void {
        this.parentPost = parentPost;
    }
    public getText(): String {
        return this.text;
    }
    public setText(text: String): void {
        this.text = text;
    }
    public getImage(): String {
        return this.image;
    }
    public setImage(image: String): void {
        this.image = image;
    }
    public getDate(): Date {
        return this.date;
    }
    public setDate(date: Date): void {
        this.date = date;
    }
    public getStatus(): Status {
        return this.status;
    }
    public setStatus(status: Status): void {
        this.status = status;
    }
    public getParentComment(): Comment {
        return this.parentComment;
    }
    public setParentComment(parentComment: Comment): void {
        this.parentComment = parentComment;
    }
    
   
}