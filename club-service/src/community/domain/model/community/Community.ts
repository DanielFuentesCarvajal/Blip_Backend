import abstractCommunity, { CommunityAttributes } from "./AbstractCommunity";

export default class Community extends abstractCommunity {
    
    constructor(communityAttributes: CommunityAttributes) {
        super(communityAttributes);
    }

    public isNull = (): boolean => {
        return false;
    };
}