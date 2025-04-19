
import Type from "../../util/TypeEnum";
import NullComment from "../comment/NullComment";
import NullPost from "../post/NullPost";
import AbstractLike from "./AbstractLike";

export default class NullLike extends AbstractLike{

    constructor(){
        super({
            id: 0,
            comment: new NullComment(),
            post: new NullPost(),
            idUser: 0,
            like: false,
            type: Type.comment
        });
    }

    public isNull(): boolean {
        return true;
    }

}