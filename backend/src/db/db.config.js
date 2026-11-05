import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();
const db=mysql.createPool({
    host:process.env.HOST || '127.0.0.1',
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
});
export const safeExcute =async (query,params)=>{
    const rows = await db.execute(query, params);
    return rows;
}
export default db;