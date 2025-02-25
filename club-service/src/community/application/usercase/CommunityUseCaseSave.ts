import CommunityServiceSavePort from "../../domain/port/driver/services/CommunityServiceSavePort";
import CommunityUseCaseSavePort from "../../domain/port/driver/usescases/CommunityUseCaseSavePort";

export default class CommunityUseCaseSave implements CommunityUseCaseSavePort{

    constructor(private readonly communityServiceSave : CommunityServiceSavePort) {}

    public save = async (
        name: string,
        description: string,
        image: string ,
        privacy: string,
        creation_date: string,
        creator_id: number,
        community_rules: string
    ): Promise<void> => {
        console.log('estamos en use case')
        console.log(name, description, image, privacy, creation_date, creator_id, community_rules);
        
       
        this.communityServiceSave.save({
            id: 0,
            name: name,
            description: description, 
            image: image,
            members_number: 0, // Número de miembros
            privacy: privacy,// Estado de la comunidad (PUBLICO, PRIVADO)
            creation_date: creation_date, // Fecha de creación
            creator_id: creator_id,// ID del creador
            community_rules: community_rules    
        });
    };

}