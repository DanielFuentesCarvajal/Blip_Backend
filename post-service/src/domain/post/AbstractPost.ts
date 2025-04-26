import Status from "../../util/StatusEnum";
import IPost from "../interfaces/IPost";

export default abstract class AbstractPost{
    protected  id: number;
    protected idCommunity: number;
    protected idUser: number;
    protected tittle: string;
    protected body: string;
    protected postDate: Date;
    protected media:  string;
    protected status: Status;

    constructor(interfacePost: IPost){
        this.id = interfacePost.id;
        this.idCommunity = interfacePost.idCommunity;
        this.idUser = interfacePost.idUser;
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
    public getIdUser(): number {
        return this.idUser;
    }
    public setIdUser(idUser: number): void {
        this.idUser = idUser;
    }
    public getTittle(): string {
        return this.tittle;
    }
    public setTittle(tittle: string): void {
        this.tittle = tittle;
    }
    public getBody(): string {
        return this.body;
    }
    public setBody(body: string): void {
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