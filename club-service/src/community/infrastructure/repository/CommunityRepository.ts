import ICommunityRepository from "../../domain/port/driven/CommunityRepositoryPort";
import CommunityDataInterface from "../../domain/types/CommunityDataInterface";
import SQLRep from "./SQLRep";

export default class CommunityRepository implements ICommunityRepository {
    
    private readonly sqlRep : SQLRep

    constructor() {
        this.sqlRep = new SQLRep()
    }

    findAll = async (): Promise<CommunityDataInterface[]> => {
        const comunidadesFromDB = await this.sqlRep.findAll();
        return comunidadesFromDB.map((comunidad: any) => ({
            community_id: comunidad.community_id,
            name: comunidad.name, 
            description: comunidad.description, 
            members_number: comunidad.memberCount, 
            privacy: comunidad.visibility,
            creation_date: comunidad.creation_date, // Fecha de creación
            creator_id: comunidad.owner, // ID del creador
            community_rules: comunidad.rules, // Reglas de la comunidad
            category: comunidad.category,
            image: comunidad.image,
            tags: []
        }));
    }

    findById = async (id: string): Promise<CommunityDataInterface> => {
        const communityFromDB = await this.sqlRep.getComunidadById(parseFloat(id))

        console.log('============la creation===============')
        console.log( communityFromDB[0].creation_date)
        console.log('=================================')

        const communityR = {
            community_id: communityFromDB[0].community_id,
            name: communityFromDB[0].name, 
            description: communityFromDB[0].description, 
            members_number: communityFromDB[0].memberCount, 
            privacy: communityFromDB[0].visibility,
            creation_date: communityFromDB[0].creation_date, // Fecha de creación
            creator_id: communityFromDB[0].owner, // ID del creador
            community_rules: communityFromDB[0].rules, // Reglas de la comunidad
            category: communityFromDB[0].category,
            image: communityFromDB[0].image,
            tags: []
        }
        return communityR
    }

    save = (item: CommunityDataInterface): void => {
        this.sqlRep.save(
            item.name, 
            item.description, 
            item.image, 
            item.members_number.toString(), // Convertir a string porque el procedimiento lo espera como VARCHAR(45)
            item.privacy, 
            item.creation_date, 
            item.creator_id, 
            item.community_rules, 
            item.category, // Convertir a número (asumiendo que `category` es un ID numérico en la base de datos)
            item.tags // Lista de IDs de tags
        );
    };
    
    update = async (id: string, item: CommunityDataInterface): Promise<void> => {
        if(!item.name || !item.description || !item.creation_date || !item.creator_id) return
        this.sqlRep.update(parseFloat(id), item.name, item.description , item.creation_date, item.creator_id)
    }

    delete = async(id: string): Promise<boolean> => {
        console.log('estamos en delete del repository')
        console.log(id)
        this.sqlRep.deleteById(parseFloat(id))
        return true // falta implementar si si está la cita borrar
    }
}