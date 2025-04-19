import Status from "../../util/StatusEnum";

export default interface IPost{
    id: number;
    idCommunity: number;
    idUser: number;
    tittle: String;
    body: String;
    postDate: Date;
    media:  string;
    status: Status;
}