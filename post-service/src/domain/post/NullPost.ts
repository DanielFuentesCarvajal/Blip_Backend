import Status from "../../util/StatusEnum";
import AbstractPost from "./AbstractPost";

export default class NullPost extends AbstractPost{
    constructor(){
        super({
            id: 0,
            idCommunity: 0,
            idUser: 0,
            tittle: "",
            body: "",
            postDate: new Date(),
            media: "",
            status: Status.deleted
        });
    }

    public override isNull = (): boolean => true

    public override setId(_id: number): void {
        return
    }

    public override setIdCommunity(_idCommunity: number): void {
        return
    }
    public override setTittle(_tittle: String): void {
        return
    }
    public override setBody(_body: String): void {
        return
    }
    public override setPostDate(_postDate: Date): void {
        return
    }
    public override setMedia(_media: string): void {
        return
    }
    public override setStatus(_status: Status): void {
        return
    }
}