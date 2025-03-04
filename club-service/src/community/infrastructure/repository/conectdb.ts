import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: 'sql10.freesqldatabase.com',
        user: 'sql10765905',
        password: 'WghJVkdMjK',
        database: 'sql10765905',   
    });
    
    return connection; 
}
