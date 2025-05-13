export default interface CommunityUseCaseSavePort {
    save (
        //id
        name: string,
        descripcion: string,
        image: string | null,
        privacidad: string,
        creation_date: string,
        creator_user: number,
        rules: string,
        category: string,
        tags: number[]
    ): Promise<void>
    joinCommunity(user_id: number, community_id: number): Promise<void>;

    exitCommunity(user_id: number, community_id: number): Promise<void>;
    userInCommunity(user_id: number, community_id: number): Promise<boolean>;
}