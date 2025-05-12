import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'todolist',
    waitForConnections: true,
    connectionLimit: 10,
})