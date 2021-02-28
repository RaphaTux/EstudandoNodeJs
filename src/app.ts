import "reflect-metadata"
import express, { request, response } from "express";
import creaeConnection from "./database"

// rotas
import {router} from "./routes"
import { createConnection } from "typeorm";

createConnection();
const app = express();

app.use(express.json())

app.use(router);  

export {app}