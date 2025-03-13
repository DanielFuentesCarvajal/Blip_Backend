import { connectToDatabase } from './conectdb';

export default class SQLRep {
    
    private readonly queryGetComunidades = 'SELECT * FROM ClubView';

    private readonly queryInsertComunidad = 'CALL InsertCommunity(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    private readonly queryInsertCommunityTag = 'CALL InsertCommunityTag(?, ?)';

    private readonly queryDeleteComunidad = 'CALL DeleteComunidad(?)';
    private readonly queryUpdateComunidad = 'CALL UpdateComunidad(?, ?, ?, ?, ?)';
    private readonly queryGetComunidadById = 'CALL GetCommunityById(?);';
    private readonly queryGetTagsById = 'CALL GetCommunityTags(?);'

    private readonly queryGetCategoryById = 'CALL GetCategoryById(?)';

    private readonly queryGetCategories = 'SELECT * FROM category';
    private readonly queryGetTags = 'SELECT * FROM tags';

    constructor() {}

    public findAll = async () => {
        const conectionDB = await connectToDatabase();
        const [rows] = await conectionDB.execute(this.queryGetComunidades) as any[]; 
        return rows;
    }

    public save = async (
        nombre: string,
        descripcion: string,
        image: string | null,
        numeroMiembros: string,
        privacidad: string,
        fechaCreacion: string,
        creador: number,
        reglas: string,
        categoriaId: number,
        tags: number[] // Lista de IDs de tags
    ): Promise<number> => {
        const connectionDB = await connectToDatabase();
         // Iniciar transacción
    
        try {
            await connectionDB.beginTransaction();
    
            // Insertar la comunidad y obtener su ID
            const [result]: any = await connectionDB.execute(
                this.queryInsertComunidad, 
                [nombre, descripcion, image, parseFloat(numeroMiembros), privacidad, fechaCreacion, creador, reglas, categoriaId]
            );
    
            const communityId = result[0][0].community_id;
    
            // Insertar la relación con las tags
            for (const tagId of tags) {
                await connectionDB.execute(
                    this.queryInsertCommunityTag,
                    [communityId, tagId]
                );
            }
    
            await connectionDB.commit(); // Confirmar transacción
    
            console.log('Comunidad creada exitosamente con ID:', communityId);
            return communityId;
        } catch (error) {
            await connectionDB.rollback(); // Revertir cambios en caso de error
            console.error('Error al crear la comunidad:', error);
            throw new Error('Error al guardar la comunidad en la base de datos');
        } finally {
            
        }
    };
    

    public deleteById = async (id: number) => {
        const conectionDB = await connectToDatabase();
        const [result] = await conectionDB.execute(this.queryDeleteComunidad, [id]);
        console.log(`Comunidad con ID ${id} eliminada exitosamente`);
        return result;
    }

    public update = async (
        id: number,
        nombre: string,
        descripcion: string,
        fechaCreacion: string,
        creador: number
    ) => {
        console.log('Datos actualizados:', { id, nombre, descripcion, fechaCreacion, creador });
        const conectionDB = await connectToDatabase();
        await conectionDB.execute(this.queryUpdateComunidad, [id, nombre, descripcion, fechaCreacion, creador]);

        console.log('Comunidad actualizada exitosamente');
    }

    public getComunidadById = async (id: number) => {
        const conectionDB = await connectToDatabase();
        const [rows] = await conectionDB.execute(this.queryGetComunidadById, [id]) as any[];

        console.log('Comunidad con id obtenida exitosamente');
        console.log(rows)

        if (rows.length > 0) {
            console.log('Comunidad encontrada:', rows[0]);
            return rows[0];
        } else {
            console.log('No se encontró una comunidad con el ID proporcionado');
            return null;
        }
    }

    public getTagsById = async (id: number) => {
        const conectionDB = await connectToDatabase();
        const [rows] = await conectionDB.execute(this.queryGetTagsById, [id]) as any[]; 
        return rows;
    }

    public getCategoryById = async (id: number) => {
        const conectionDB = await connectToDatabase();
        const [rows] = await conectionDB.execute(this.queryGetCategoryById, [id]) as any[]; 
        return rows;
    }
    
    public getAllTags = async () => {
        const conectionDB = await connectToDatabase();
        const [rows] = await conectionDB.execute(this.queryGetTags) as any[]; 
        console.log('Tags obtenidas:', rows);

        return rows;
    }

    public getAllCategory = async () => {
        const conectionDB = await connectToDatabase();
        const [rows] = await conectionDB.execute(this.queryGetCategories) as any[]; 
        console.log('Categorias obtenidas:', rows);
        return rows;
    }

}
