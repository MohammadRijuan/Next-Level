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
        EMAIL VARCHAR(50) NOT NULL,
        PASSWORD VARCHAR(100) NOT NULL,
        AGE INT,
        IS_ACTIVE BOOLEAN DEFAULT TRUE,
        CREATED_AT TIMESTAMP DEFAULT NOW(),
        UPDATED_AT TIMESTAMP DEFAULT NOW()
    );
`);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
initDb()

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

app.post("/", async (req: Request, res: Response) => {
  //   console.log(req.body);

  const body = req.body;
  res.status(201).json({
    message: "server is created",
    data: body,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
