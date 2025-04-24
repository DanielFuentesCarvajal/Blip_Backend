require('dotenv').config(); 
const mysql = require('mysql2');

export default class DatabaseConnection {
    private connection

    constructor() {
        const connectionConfig = {
            host: process.env["DB_HOST"] ?? "localhost",
            user: process.env["DB_USER"] ?? "admin",
            password: process.env["DB_PASSWORD"] ?? "",
            database: process.env["DB_NAME"] ?? "database",
            port: parseInt(process.env["DB_PORT"] ?? "1080"),
        };

        //TODO: borrar esto
        console.log('Configuración de la conexión:', {
            host: connectionConfig.host,
            user: connectionConfig.user,
            database: connectionConfig.database,
            port: connectionConfig.port,
        });

        this.connection = mysql.createConnection(connectionConfig);
    }

    connect() {
        return new Promise((resolve, reject) => {
        this.connection.connect((error: Error) => {
            if (error) {
            console.error('Error al conectar a la base de datos:', error);
            reject(error);
            } else {
            resolve(this.connection);
            }
        });
        });
    }

    disconnect() {
        return new Promise<void>((resolve, reject) => {
        this.connection.end((error: Error) => {
            if (error) {
            console.error('Error al cerrar la conexión:', error);
            reject(error);
            } else {
            console.log('Conexión a MySQL cerrada.');
            resolve();
            }
        });
        });
    }

    query(sql: any, params: any[] = []): Promise<any[]> {
        return new Promise((resolve, reject) => {
        this.connection.query(sql, params, (error: Error, results: any) => {
            if (error) {
            console.error('Error en la consulta:', error);
            reject(error);
            } else {
            resolve(results);
            }
        });
        });
    }
}