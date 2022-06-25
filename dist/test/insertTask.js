"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const models_1 = require("../models");
chai_1.default.use(chai_http_1.default);
const url = 'http://localhost:8080';
(0, mocha_1.describe)('Insertando una tarea: POST /api/task', () => {
    (0, mocha_1.after)((done) => {
        models_1.Task.deleteMany({}, (err) => {
            if (err)
                console.log(err);
            done();
        });
    });
    (0, mocha_1.it)('Debe retornar un codigo de estado 201, y retornar el registro creado.', (done) => {
        chai_1.default.request(url)
            .post('/api/task')
            .send({
            "descripcion": "Test Description",
            "fechaCreacion": "2022-06-24 13:45",
            "vigente": true
        })
            .end((err, res) => {
            (0, chai_1.expect)(res).to.have.status(201);
            (0, chai_1.expect)(res.body).to.have.property('ok').to.be.eql(true);
            (0, chai_1.expect)(res.body).to.have.property('task').to.be.a('object');
            (0, chai_1.expect)(res.body.task).to.have.property('objectId').to.be.a('string');
            (0, chai_1.expect)(res.body.task).to.have.property('descripcion').to.be.eql('Test Description');
            done();
        });
    });
    (0, mocha_1.it)('Debe retornar una response con codigo de estado 400 , indicando el error.', (done) => {
        chai_1.default.request(url)
            .post('/api/task')
            .send({
            "descripcion": "Test Description",
            "fechaCreacion": "2022-06-24 13:45"
        })
            .end((err, res) => {
            (0, chai_1.expect)(res).to.have.status(400);
            (0, chai_1.expect)(res.body).to.have.property('ok').to.be.eql(false);
            (0, chai_1.expect)(res.body).to.have.property('message').to.be.a('string');
            done();
        });
    });
});
