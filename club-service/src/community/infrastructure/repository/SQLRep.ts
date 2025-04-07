import { connectToDatabase } from './conectdb';

export default class SQLRep {

    private readonly queryGetComunidades = 'SELECT * FROM ClubView';
    private readonly queryInsertComunidad = 'CALL InsertCommunity(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    private readonly queryInsertCommunityTag = 'CALL InsertCommunityTag(?, ?)';
    private readonly queryDeleteComunidad = 'CALL DeleteComunidad(?)';
    private readonly queryUpdateComunidad = 'CALL UpdateComunidad(?, ?, ?, ?, ?)';
    private readonly queryGetComunidadById = 'CALL GetCommunityById(?)';
    private readonly queryGetTagsById = 'CALL GetCommunityTags(?)';
    private readonly queryGetCategoryById = 'CALL GetCategoryById(?)';
    private readonly queryGetCategories = 'SELECT * FROM category';
    private readonly queryGetTags = 'SELECT * FROM tags';

    constructor() {}

    public findAll = async () => {
        try {
            const conectionDB = await connectToDatabase();
            const [rows] = await conectionDB.execute(this.queryGetComunidades) as any[];
            await conectionDB.end();
            return rows;
        } catch (error) {
            console.error('Error al obtener comunidades:', error);
            return null;
        }
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
        tags: number[]
    ): Promise<number | null> => {
        try {
            const connectionDB = await connectToDatabase();
            await connectionDB.beginTransaction();

            const [result]: any = await connectionDB.execute(
                this.queryInsertComunidad,
                [nombre, descripcion, image, parseFloat(numeroMiembros), privacidad, fechaCreacion, creador, reglas, categoriaId]
            );

            const communityId = result[0][0].community_id;

            for (const tagId of tags) {
                await connectionDB.execute(this.queryInsertCommunityTag, [communityId, tagId]);
            }

            await connectionDB.commit();
            await connectionDB.end();
            console.log('Comunidad creada exitosamente con ID:', communityId);
            return communityId;
        } catch (error) {
            console.error('Error al crear la comunidad:', error);
            return null;
        }
    }

    public deleteById = async (id: number) => {
        try {
            const conectionDB = await connectToDatabase();
            const [result] = await conectionDB.execute(this.queryDeleteComunidad, [id]);
            await conectionDB.end();
            console.log(`Comunidad con ID ${id} eliminada exitosamente`);
            return result;
        } catch (error) {
            console.error('Error al eliminar la comunidad:', error);
            return null;
        }
    }

    public update = async (
        id: number,
        nombre: string,
        descripcion: string,
        fechaCreacion: string,
        creador: number
    ) => {
        try {
            const conectionDB = await connectToDatabase();
            await conectionDB.execute(this.queryUpdateComunidad, [id, nombre, descripcion, fechaCreacion, creador]);
            await conectionDB.end();
            console.log('Comunidad actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar la comunidad:', error);
        }
    }

    public getComunidadById = async (id: number) => {
        try {
            const conectionDB = await connectToDatabase();
            const [rows]: any = await conectionDB.execute(this.queryGetComunidadById, [id]);
            await conectionDB.end();
            return rows[0] || null;
        } catch (error) {
            console.error('Error al obtener comunidad por ID:', error);
            return null;
        }
    }

    public getTagsById = async (id: number) => {
        try {
            const conectionDB = await connectToDatabase();
            const [rows] = await conectionDB.execute(this.queryGetTagsById, [id]) as any[];
            await conectionDB.end();
            return rows;
        } catch (error) {
            console.error('Error al obtener tags por ID:', error);
            return null;
        }
    }

    public getCategoryById = async (id: number) => {
        try {
            const conectionDB = await connectToDatabase();
            const [rows] = await conectionDB.execute(this.queryGetCategoryById, [id]) as any[];
            await conectionDB.end();
            return rows;
        } catch (error) {
            console.error('Error al obtener categoría por ID:', error);
            return null;
        }
    }

    public getAllTags = async () => {
        try {
            const conectionDB = await connectToDatabase();
            const [rows] = await conectionDB.execute(this.queryGetTags) as any[];
            await conectionDB.end();
            console.log('Tags obtenidas:', rows);
            return rows;
        } catch (error) {
            console.error('Error al obtener tags:', error);
            return null;
        }
    }

    public getAllCategory = async () => {
        try {
            const conectionDB = await connectToDatabase();
            const [rows] = await conectionDB.execute(this.queryGetCategories) as any[];
            await conectionDB.end();
            console.log('Categorias obtenidas:', rows);
            return rows;
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            return null;
        }
    }

    private readonly queryJoinCommunity = 'CALL InsertUserCommunity(?, ?)';

public joinCommunity = async (userId: number, communityId: number): Promise<void> => {
    const connectionDB = await connectToDatabase();
    if (!connectionDB) return;

    try {
        await connectionDB.execute(this.queryJoinCommunity, [userId, communityId]);
    } catch (error) {
        console.error('Error al unir usuario a la comunidad:', error);
        throw error;
    } finally {
        await connectionDB.end();
    }
}

}
