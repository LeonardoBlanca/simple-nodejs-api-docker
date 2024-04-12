import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

// Iniciando o express
const app = express()

//Colocando o cors dentro do express
app.use(cors())

// Entender o formato JSON
app.use(express.json())

// require("../src/routes/index")(app);

app.listen(3001);
console.log("Servidor iniciou")