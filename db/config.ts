import dotenv from "dotenv";
import mongoose from 'mongoose';
export const AutoIncrement = require('mongoose-sequence')(mongoose);

dotenv.config();

export const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_URL || '');
        console.log('DB Online');

    } catch (err) {

        console.log(err);
        throw new Error('Error connecting to DB');

    }
}




