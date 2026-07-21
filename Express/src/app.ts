import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

// import config from "./config";
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";



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


// user route
app.use('/api/users',userRoute)




// delete user
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      RETURNING *;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



export default app;
