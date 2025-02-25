import mysql from 'mysql2/promise';

export async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: 'sql10.freesqldatabase.com',
        user: 'sql10764568',       
        password: '6TYWGGJi7d',
        database: 'sql10764568',    
    });
    
    return connection; 
}
