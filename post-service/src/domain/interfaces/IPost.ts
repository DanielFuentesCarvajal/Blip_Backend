import Status from "../../util/StatusEnum";

export default interface IPost{
    id: number;
    idCommunity: number;
    idUser: number;
    tittle: string;
    body: string;
    postDate: Date;
    media:  string;
    status: Status;
}