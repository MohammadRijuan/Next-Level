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
        PASSWORD TEXT NOT NULL,
        AGE INT,
        IS_ACTIVE BOOLEAN DEFAULT TRUE,
        CREATED_AT TIMESTAMP DEFAULT NOW(),
        UPDATED_AT TIMESTAMP DEFAULT NOW()
    );
`);

    await pool.query(
      `
  CREATE TABLE IF NOT EXISTS profiles(
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

  bio TEXT,
  address TEXT,
  phone VARCHAR(15),
  gender VARCHAR(10),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
  )
  `,
    );

    console.log("database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
