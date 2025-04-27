export default interface CommunityRouterExpressPort {
    getAllCommunity() : void
    save() : void
    getCommunityById() : void
    getAllCategory() : void
    getAllTags() : void
    joinCommunity() : void
    exitCommunity(): void
    getAllCommunitiesByUserId(): void
    userInCommunity(): void
}