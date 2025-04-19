import ILike from "../interfaces/ILike";
import AbstractLike from "./AbstractLike";

export default class Like extends AbstractLike{
    constructor(likeInterface: ILike){
        super(likeInterface);
    }

    public isNull(): boolean {
        return false;
    }

}