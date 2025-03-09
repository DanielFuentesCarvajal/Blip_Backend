import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: 'sqlcommunity-jsanabriac54-b8ce.c.aivencloud.com',
        user: 'avnadmin',
        password: 'AVNS_ox4JqSQuNT9FIvpQBUJ',
        database: 'service2',
        port: 15709,  // Asegúrate de que es el puerto correcto
        connectTimeout: 20000, // Aumenta el tiempo de espera a 20 segundos
    });

    return connection;
}
