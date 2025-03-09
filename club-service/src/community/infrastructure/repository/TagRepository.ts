import ITagRepository from "../../domain/port/driven/TagRepositoryPort";
import TagDataInterface from "../../domain/types/TagDataInterface";
import SQLRep from "./SQLRep";

export default class TagRepository implements ITagRepository {

    private readonly sqlRep : SQLRep
    
    constructor() {
        this.sqlRep = new SQLRep()      
    }

    findAll = async (): Promise<TagDataInterface[]> => {
        return [{idTags: 0, nametag: ''}]  
    }

    findById = async (id: string): Promise<TagDataInterface[]> => {
        const tagsFromDB = await this.sqlRep.getTagsById(parseFloat(id));
    
        console.log('imprimimos en el findById DEL REPO');
        console.log(tagsFromDB);
    
        // Acceder al primer elemento del array
        const resultArray = Array.isArray(tagsFromDB[0]) ? tagsFromDB[0] : tagsFromDB;
    
        return resultArray.map((tags: any) => ({
            idTags: tags.idtags,
            nametag: tags.nametag
        }));
    };

    save = (item: TagDataInterface): void => {
        //this.sqlRep.save(item.name, item.description, item.image, item.privacy, item.creation_date, item.creator_id, item.community_rules)
          console.log(item)  
    }

     update = async (id: string, item: TagDataInterface): Promise<void> => {
        if (id == '0' || item == undefined) return
    }
    
    
    delete = async(id: string): Promise<boolean> => {        
        console.log(id)
        return true // falta implementar si si está la cita borrar
    }   
   


}