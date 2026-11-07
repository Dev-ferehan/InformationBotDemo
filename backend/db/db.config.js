import mysql from 'mysql2/promise'
import dotenv from'dotenv'
dotenv.config()
export const db=mysql.createPool({
    database:process.env.DB_NAME,
    user:process.env.USER,
    password:process.env.DB_PASS,
    host:process.env.HOST  || localhost,
    port:process.env.DB_PORT
})

const ensureParams = params => {
    if (params === undefined || params === null) {
      throw new Error('SQL parameters are required');
    }
    const isArray = Array.isArray(params);
    const isObject = !isArray && typeof params === 'object';
    if (!isArray && !isObject) {
      throw new Error('SQL parameters must be an array or object');
    }
  };
  
  export const safeExecute = async (sql, params) => {
    if (typeof sql !== 'string' || sql.trim().length === 0) {
      throw new Error('SQL query must be a non-empty string');
    }
    ensureParams(params);
    const [result] = await db.execute(sql, params);
    return result;
  };
