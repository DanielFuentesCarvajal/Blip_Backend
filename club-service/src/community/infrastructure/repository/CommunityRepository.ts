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
        console.log(comunidadesFromDB)
        return comunidadesFromDB.map((comunidad: any) => ({
            id: comunidad.idCommunity,
            name: comunidad.name, 
            description: comunidad.descripcion, 
            members_number: comunidad.number_members, 
            privacy: comunidad.privacidad,
            creation_date: comunidad.creation_date, // Fecha de creación
            creator_id: comunidad.creator_id, // ID del creador
            community_rules: comunidad.community_rules // Reglas de la comunidad
        }));
    }
    

    findById = (id: string): Promise<CommunityDataInterface> => {
        const communityFromDB = this.sqlRep.getComunidadById(parseFloat(id))   
        return communityFromDB
    }

    save = (item: CommunityDataInterface): void => {
        this.sqlRep.save(item.name, item.description, item.image, item.privacy, item.creation_date, item.creator_id, item.community_rules)
        
    }

    

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