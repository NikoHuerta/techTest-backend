import dotenv from 'dotenv';
import { Server } from './models';

dotenv.config();

const server = new Server();
server.listen();

