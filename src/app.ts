import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";
import { routes } from "./routes/index.route";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT;
const connection = mysql.createConnection(process.env.DATABASE_URL || "");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("connection", connection);
app.use("/", routes);
app.listen(port, () => {
  connection.connect();
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
