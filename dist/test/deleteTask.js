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
let idMongoTask = '';
(0, mocha_1.describe)('Borrando una tarea especifica: DELETE /api/task/:id', () => {
    before((done) => {
        const taskToBeDeleted = new models_1.Task({
            "descripcion": "Test Description DELETE /api/task/:id",
            "fechaCreacion": "2022-06-25 13:45",
            "vigente": true
        });
        taskToBeDeleted.save((err, task) => {
            if (err)
                console.log(err);
            idMongoTask = task._id.toString();
            done();
        });
    });
    (0, mocha_1.after)((done) => {
        models_1.Task.deleteMany({}, (err) => {
            if (err)
                console.log(err);
            done();
        });
    });
    (0, mocha_1.it)('Debe retornar un codigo de estado 200, y retornar la tarea borrada.', (done) => {
        chai_1.default.request(url)
            .delete(`/api/task/${idMongoTask}`)
            .end((err, res) => {
            (0, chai_1.expect)(res).to.have.status(200);
            (0, chai_1.expect)(res.body).to.have.property('ok').to.be.eql(true);
            (0, chai_1.expect)(res.body).to.have.property('message').to.be.eql('Task eliminada');
            (0, chai_1.expect)(res.body).to.have.property('task').to.be.a('object');
            (0, chai_1.expect)(res.body.task).to.have.property('descripcion').to.be.eql('Test Description DELETE /api/task/:id');
            (0, chai_1.expect)(res.body.task).to.have.property('objectId').to.be.eql(idMongoTask);
            done();
        });
    });
    (0, mocha_1.it)('Debe retornar un codigo de estado 400, indicando el error', (done) => {
        chai_1.default.request(url)
            .get(`/api/task/${idMongoTask + '1'}`)
            .end((err, res) => {
            (0, chai_1.expect)(res).to.have.status(400);
            (0, chai_1.expect)(res.body).to.have.property('ok').to.be.eql(false);
            (0, chai_1.expect)(res.body).to.have.property('message').to.be.a('string');
            done();
        });
    });
});
