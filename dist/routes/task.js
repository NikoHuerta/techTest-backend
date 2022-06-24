"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validateFields_1 = require("../middlewares/validateFields");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
//obtener tasks
router.get('/', [
    (0, express_validator_1.check)('limit', 'Parametro limit debe ser numerico').isNumeric().optional({ nullable: true }),
    (0, express_validator_1.check)('desde', 'Parametro desde debe ser numerico').isNumeric().optional({ nullable: true }),
    validateFields_1.validateFields
], controllers_1.getTasks);
//obtener task
// router.get('/:id', [
// ], getTask);
//crear task
// router.post('/', [
// ], createTask);
//editar task
// router.put('/:id', [
// ]);
//borrar task
// router.delete('/:id', [
// ], deleteTask);
exports.default = router;
//# sourceMappingURL=task.js.map