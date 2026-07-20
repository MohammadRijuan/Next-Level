import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
const port = 3000;

import { Pool } from "pg";

// connect neon db through installing npm i --save-dev @types/pg
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_wQWZuq9rR7Nv@ep-calm-brook-aveydmjk-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});
// initialize the database
const initDb = async () => {
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
initDb();

app.use(express.json());
// for getting text
app.use(express.text());
// for getting unicode
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  //   res.send('Hello World!')
  res.status(200).json({
    message: "server is running",
    author: "Rijuan",
  });
});

app.post("/api/users", async (req: Request, res: Response) => {
  //   console.log(req.body);

  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO USERS(name,email,password,age) VALUES($1,$2,$3,$4)
    RETURNING * `,
      [name, email, password, age],
    );

    // console.log(result)

    res.status(201).json({
      message: "user created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

// get all users

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM USERS`);
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

// single user
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
    SELECT * FROM USERS WHERE id=$1`,
      [id],
    );

    if(result.rows.length === 0){
      res.status(404).json({
      success: false,
      message: "user not found",
      data:{}
    });
    }



    res.status(200).json({
      success: true,
      message: "single user retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }

});


// update user
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        password = $2,
        age = $3,
        is_active = $4
      WHERE id = $5
      RETURNING *;
      `,
      [name, password, age, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
