import dotenv from "dotenv";
import mongoose from 'mongoose';
export const AutoIncrement = require('mongoose-sequence')(mongoose);

dotenv.config();

export const dbConnection = async () => {

    try {

        console.log('Enviroment: ',process.env.NODE_ENV);
        switch(process.env.NODE_ENV){
            case 'dev':
                await mongoose.connect(process.env.DB_URL_DEV || '');
                break;
            
            case 'testing':
                await mongoose.connect(process.env.DB_URL_TEST || '');
                break;
            
            case 'prod':
                await mongoose.connect(process.env.DB_URL_PROD || '');
                break;
        }
        
        if(process.env.NODE_ENV !== 'testing')
            console.log('DB Online');

    } catch (err) {

        console.log(err);
        throw new Error('Error connecting to DB');

    }
}




