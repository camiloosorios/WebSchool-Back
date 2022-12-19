import dotenv from "dotenv";
import Server from "./models/server";

//Configurar dotenv
dotenv.config();

//Creamos nueva instancia del servidor
const server = new Server;

//Ejecutamos el servidor
server.listen();