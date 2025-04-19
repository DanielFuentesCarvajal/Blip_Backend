import Status from "../../util/StatusEnum";
import IPost from "../interfaces/IPost";

export default abstract class AbstractPost{
    protected  id: number;
    protected idCommunity: number;
    protected tittle: String;
    protected body: String;
    protected postDate: Date;
    protected media:  string;
    protected status: Status;

    constructor(interfacePost: IPost){
        this.id = interfacePost.id;
        this.idCommunity = interfacePost.idCommunity;
        this.tittle = interfacePost.tittle;
        this.body = interfacePost.body;
        this.postDate = interfacePost.postDate;
        this.media = interfacePost.media;
        this.status = interfacePost.status;
    }

    public abstract isNull(): boolean 

    //Getters y setters
    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public getIdCommunity(): number {
        return this.idCommunity;
    }
    public setIdCommunity(idCommunity: number): void {
        this.idCommunity = idCommunity;
    }
    public getTittle(): String {
        return this.tittle;
    }
    public setTittle(tittle: String): void {
        this.tittle = tittle;
    }
    public getBody(): String {
        return this.body;
    }
    public setBody(body: String): void {
        this.body = body;
    }
    public getPostDate(): Date {
        return this.postDate;
    }
    public setPostDate(postDate: Date): void {
        this.postDate = postDate;
    }
    public getMedia(): string {
        return this.media;
    }
    public setMedia(media: string): void {
        this.media = media;
    }
    public getStatus(): Status {
        return this.status;
    }
    public setStatus(status: Status): void {
        this.status = status;
    }
}