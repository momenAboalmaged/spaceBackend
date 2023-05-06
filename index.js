import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

import express from "express";
import { globalError } from "./src/services/asyncHandler.js";
import * as indexRouter from "./src/modules/index.route.js";
import connection from "./Database/connection.js";

const app = express();


app.use(express.json());
app.use(cors({}))

//setUp API Routing
app.get('/',(req,res)=>{
    res.send("<h1> Home Page </h1>")
})


app.use(`${process.env.baseURL}/user`, indexRouter.userRouter);
app.use(`${process.env.baseURL}/auth`, indexRouter.authRouter);
app.use(`${process.env.baseURL}/workingSpace`, indexRouter.workingSpaceRouter);
app.use(`${process.env.baseURL}/room`, indexRouter.roomRouter);
app.use(`${process.env.baseURL}/booking`, indexRouter.bookingRouter);
app.use(`${process.env.baseURL}/favorite`, indexRouter.favoriteRouter);

app.use("*", (req, res, next) => {
  res.send("In-valid Routing Plz check url  or  method");
});

app.use(globalError);

connection();
app.listen(3000, () => {
  console.log("Server is running");
});
