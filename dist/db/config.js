"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.AutoIncrement = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.AutoIncrement = require('mongoose-sequence')(mongoose_1.default);
dotenv_1.default.config();
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Enviroment: ', process.env.NODE_ENV);
        switch (process.env.NODE_ENV) {
            case 'dev':
                yield mongoose_1.default.connect(process.env.DB_URL_DEV || '');
                break;
            case 'testing':
                yield mongoose_1.default.connect(process.env.DB_URL_TEST || '');
                break;
            case 'prod':
                yield mongoose_1.default.connect(process.env.DB_URL_PROD || '');
                break;
        }
        if (process.env.NODE_ENV !== 'testing')
            console.log('DB Online');
    }
    catch (err) {
        console.log(err);
        throw new Error('Error connecting to DB');
    }
});
exports.dbConnection = dbConnection;
