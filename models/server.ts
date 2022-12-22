import express, { Application } from "express";
import cors from "cors";
import authRoutes from "../routes/auth.routes";
import database from "../database/connection";
import sendEmail from "../helpers/sendEmail";

class Server {

    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middlewares();
        this.routes();

        this.dbConecction();

        // sendEmail();
    }

    //Conexión con la base de datos
    async dbConecction() {

        try {

            database.authenticate();
            
        } catch (error) {
            console.log(error);          
        }

    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Lecura del Body
        this.app.use( express.json() );
    }

    routes() {
        //Rutas de la aplicación
        this.app.use('/auth', authRoutes );
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);            
        })
    }

}

export default Server;