import express from "express";
import dotenv from "dotenv";
import AppDataSource from "./appDataSource";
import { Article } from "./entity/article";
import articleRouter from "./routes/articleRoute";

dotenv.config;

const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
// const appDataSource = AppDataSource

// app.get("/", (req, res) => {
//     res.send("Express + TypeScript Server");
// });

//Endpoints
app.use('/', articleRouter)

app.listen(port, () => {
    console.log("[server]: Server is running at http://localhost:4000");
})