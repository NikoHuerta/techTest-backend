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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const models_1 = require("../models");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [total, tasks] = yield Promise.all([
            models_1.Task.countDocuments(),
            models_1.Task.find()
        ]);
        return res.status(200).json({
            ok: true,
            total,
            tasks
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener Tasks'
        });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield models_1.Task.findById(id);
        return res.status(200).json({
            ok: true,
            task
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: `Error al obtener Task ID ${id}`
        });
    }
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion, fechaCreacion, vigente } = req.body;
    const task = new models_1.Task({ descripcion, fechaCreacion, vigente });
    try {
        yield task.save();
        return res.status(201).json({
            ok: true,
            task
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error al crear Task'
        });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion, fechaCreacion, vigente } = req.body;
    try {
        const newTask = {
            descripcion,
            fechaCreacion,
            vigente
        };
        const taskUpdated = yield models_1.Task.findByIdAndUpdate(id, newTask, { new: true });
        return res.status(200).json({
            ok: true,
            task: taskUpdated
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: `Error al modificar Task ID ${id}`
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield models_1.Task.findByIdAndDelete(id);
        return res.status(200).json({
            ok: true,
            message: 'Task eliminada',
            task
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: `Error al eliminar Task ID ${id}`
        });
    }
});
exports.deleteTask = deleteTask;
