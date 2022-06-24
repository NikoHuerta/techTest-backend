import express, { Application } from "express";
import cors from 'cors';

import { taskRoutes } from '../routes';
import { dbConnection } from '../db/config';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        task: '/api/task'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );
        //JSON BODY
        this.app.use(express.json());
        //PUBLIC FOLDER
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.task, taskRoutes);
    }

    listen(){
        this.app.listen( this.port,  () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}


export default Server;