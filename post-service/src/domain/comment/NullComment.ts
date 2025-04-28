import Status from "../../util/StatusEnum";
import NullPost from "../post/NullPost";
import AbstractComment from "./AbstractComment";

export default class NullComment extends AbstractComment{
    constructor() {
        super({
            id: 0,
            idUser: 0,
            parentPost: new NullPost(),
            text: "",
            image: "",
            date: new Date(),
            status: Status.deleted,
            parentComment: new NullComment(),
        });
    }

    public isNull(): boolean {
        return true;
    }
}