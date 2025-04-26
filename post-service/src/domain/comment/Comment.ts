import IComment from "../interfaces/IComment";
import AbstractComment from "./AbstractComment";

export default class Comment extends AbstractComment
{
    constructor(commentInterface: IComment) {
        super(commentInterface);
    }

    public isNull(): boolean {
        return false;
    }
}