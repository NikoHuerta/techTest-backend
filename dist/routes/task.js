"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
//obtener tasks
router.get('/', [], controllers_1.getTasks);
//obtener task por id
router.get('/:id', [
    (0, express_validator_1.check)('id').custom(helpers_1.existeTaskPorId),
    middlewares_1.validateFields
], controllers_1.getTask);
//crear task
router.post('/', [
    (0, express_validator_1.check)('descripcion', 'Parametro descripcion es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('descripcion', 'Parametro descripcion debe ser texto').isString(),
    (0, express_validator_1.check)('fechaCreacion', 'Parametro fechaCreacion es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechaCreacion', 'Parametro fechaCreacion debe ser fecha').custom(helpers_1.isDate),
    (0, express_validator_1.check)('vigente', 'Parametro vigente es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('vigente', 'Parametro vigente debe ser booleano').isBoolean(),
    middlewares_1.validateFields
], controllers_1.createTask);
//editar task
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(helpers_1.existeTaskPorId),
    (0, express_validator_1.check)('descripcion', 'Parametro descripcion es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('descripcion', 'Parametro descripcion debe ser texto').isString(),
    (0, express_validator_1.check)('fechaCreacion', 'Parametro fechaCreacion es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fechaCreacion', 'Parametro fechaCreacion debe ser fecha').custom(helpers_1.isDate),
    (0, express_validator_1.check)('vigente', 'Parametro vigente es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('vigente', 'Parametro vigente debe ser booleano').isBoolean(),
    middlewares_1.validateFields
], controllers_1.updateTask);
//borrar task
router.delete('/:id', [
    (0, express_validator_1.check)('id').custom(helpers_1.existeTaskPorId),
    middlewares_1.validateFields
], controllers_1.deleteTask);
exports.default = router;
