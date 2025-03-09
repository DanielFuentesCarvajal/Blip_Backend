import Category from "../category/Category";
import Tags from "../tags/Tags";

export default abstract class abstractCommunity {
    public id : number
    public name: string
    public description: string
    public image: string
    public number_members: number
    public privacy: string
    public creation_date: string
    public list_members: string[]
    public creator: number;
    public category: Category
    public tags: Tags[]
    public rules: string


    constructor(communityAttributes: CommunityAttributes) {
        this.id = communityAttributes.id
        this.name = communityAttributes.name;
        this.description = communityAttributes.description;
        this.image = communityAttributes.image;
        this.number_members = communityAttributes.number_members;
        this.privacy = communityAttributes.privacy;
        this.creation_date = communityAttributes.creation_date;
        this.list_members = communityAttributes.list_members;
        this.creator = communityAttributes.creator;
        this.category = communityAttributes.category;
        this.tags = communityAttributes.tags;
        this.rules = communityAttributes.rules;
    }

    public abstract isNull: () => boolean
}

export interface CommunityAttributes {
     id : number,
     name: string,
     description: string,
     image: string,
     number_members: number,
     privacy: string,
     creation_date: string,
     list_members: string[],
     creator: number,
     category: Category,
     tags: Tags[],
     rules: string
}