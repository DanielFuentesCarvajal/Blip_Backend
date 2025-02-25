import { connectToDatabase } from './conectdb';

export default class SQLRep {
    
    private readonly queryGetComunidades = 'SELECT * FROM community';
    private readonly queryInsertComunidad = 'CALL InsertCommunity(?, ?, ?, ?, ?, ?, ?)';
    private readonly queryDeleteComunidad = 'CALL DeleteComunidad(?)';
    private readonly queryUpdateComunidad = 'CALL UpdateComunidad(?, ?, ?, ?, ?)';
    private readonly queryGetComunidadById = 'SELECT * FROM comunidades WHERE idcomunidad = ?';

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
        privacidad: string,
        fechaCreacion: string,
        creador: number,
        reglas: string
    ) => {
        try {
            const connectionDB = await connectToDatabase();
            await connectionDB.execute(this.queryInsertComunidad, [
                nombre,
                descripcion,
                image,
                privacidad,
                fechaCreacion,
                creador,
                reglas
            ]);

            console.log('Comunidad creada exitosamente');
        } catch (error) {
            console.error('Error al crear la comunidad:', error);
        }
    }



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

        if (rows.length > 0) {
            console.log('Comunidad encontrada:', rows[0]);
            return rows[0];
        } else {
            console.log('No se encontró una comunidad con el ID proporcionado');
            return null;
        }
    }
}
