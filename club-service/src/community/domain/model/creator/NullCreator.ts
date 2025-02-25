import CreatorUser from "./Creator";

export default class NullCreatorUser extends CreatorUser {
    constructor() {
        super('Unknown', 'Unknown', 'Unknown', 'unknown@mail.com');
    }
}