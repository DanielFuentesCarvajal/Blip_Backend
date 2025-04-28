import IPost from "../interfaces/IPost";
import AbstractPost from "./AbstractPost";

export default class Post extends AbstractPost{
    constructor(post: IPost) {
        super(post);
    }

    public override isNull(): boolean {
        return false;
    }
}