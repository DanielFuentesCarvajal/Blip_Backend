import mysql from 'mysql2/promise'; 

export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: 'sqlcommunity-jsanabriac54-b8ce.c.aivencloud.com',
        user: 'avnadmin',
        password: 'AVNS_ox4JqSQuNT9FIvpQBUJ',
        database: 'service2',
        port: 15709,
        connectTimeout: 20000,
    });

    return connection;
}
