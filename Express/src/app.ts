import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

// import config from "./config";
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import CookieParser from "cookie-parser"
import cors from "cors"

import fs from "fs"
import logger from "./middleware/logger";
import globalErrorHandler from "./errorHandler/ErrorHandler";



app.use(CookieParser());
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

// profile 
app.use('/api/profile',profileRoute)

// authentication
app.use('/api/auth',authRoute)


// custom middleware - logger middleware
app.use(logger);

// cors

const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));





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




// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
