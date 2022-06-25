import dotenv from 'dotenv';
import { Server } from '../models';
dotenv.config();
let server = new Server();
export const instance = server.listen();