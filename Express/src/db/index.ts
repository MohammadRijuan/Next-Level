import { Pool } from "pg";
import config from "../config";


// connect neon db through installing npm i --save-dev @types/pg

export const pool = new Pool({
  connectionString: config.connection_string,
  
});
// initialize the database
export const initDb = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS USERS (
        ID SERIAL PRIMARY KEY,
        NAME VARCHAR(20),
        EMAIL VARCHAR(50) UNIQUE NOT NULL,
        PASSWORD VARCHAR(100) NOT NULL,
        AGE INT,
        IS_ACTIVE BOOLEAN DEFAULT TRUE,
        CREATED_AT TIMESTAMP DEFAULT NOW(),
        UPDATED_AT TIMESTAMP DEFAULT NOW()
    );
`);
    console.log("database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};