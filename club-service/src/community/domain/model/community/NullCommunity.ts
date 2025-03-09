import NullCategory from "../category/NullCategory";
import NullTag from "../tags/NullTags";
import abstractCommunity from "./AbstractCommunity";

export default class NullCommunity extends abstractCommunity {
    constructor() {
        super({
            id : 0,
            name: 'Unknown',
            description: 'No description',
            image: 'no-image.png',
            number_members: 0,
            privacy: 'private',
            creation_date: '01/01/2001',
            list_members: [],
            creator: 0,
            category: new NullCategory(),
            tags: [new NullTag()],
            rules: 'NN'
            }
        );
    }

    public isNull = (): boolean => {
        return true;
    };
}