import NullCategory from "../category/NullCategory";
import NullCreatorUser from "../creator/NullCreator";
import NullRule from "../rules/NullRules";
import NullTag from "../tags/NullTags";
import abstractCommunity from "./AbstractCommunity";

export default class NullCommunity extends abstractCommunity {
    constructor() {
        super({
            name: 'Unknown',
            description: 'No description',
            image: 'no-image.png',
            number_members: 0,
            privacy: 'private',
            creation_date: '01/01/2001',
            list_members: [],
            creator: new NullCreatorUser(),
            category: new NullCategory(),
            tags: [new NullTag()],
            rules: [new NullRule()]
            }
        );
    }

    public isNull = (): boolean => {
        return true;
    };
}