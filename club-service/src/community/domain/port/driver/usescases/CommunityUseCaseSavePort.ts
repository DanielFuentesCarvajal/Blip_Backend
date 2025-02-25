export default interface CommunityUseCaseSavePort {
    save (
        name: string,
        descripcion: string,
        image: string | null,
        privacidad: string,
        creation_date: string,
        creator_user: number,
        rules: string
    ): Promise<void>
}