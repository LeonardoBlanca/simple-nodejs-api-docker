import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config()

// Iniciando o express
const app = express()

//Colocando o cors dentro do express
app.use(cors())

// Entender o formato JSON
app.use(express.json())

routes(app);

app.listen(3001);
console.log("Servidor iniciou")