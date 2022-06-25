import express, { Application } from "express";
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';

import { taskRoutes } from '../routes';
import { dbConnection } from '../db/config';
import { validateJSON } from '../middlewares';

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
        //VALIDATE JSON
        this.app.use(validateJSON);
        //PUBLIC FOLDER
        this.app.use(express.static('public'));
        //SWAGGER DOCUMENTATION
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require('../docs')));

        
    }

    routes(){
        this.app.use(this.apiPaths.task, taskRoutes);
    }

    listen(){
        return this.app.listen( this.port,  () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
    
}


export default Server;