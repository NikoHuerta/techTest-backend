import { Router } from "express";
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validateFields';
import { getTasks } from '../controllers';

const router = Router();


//obtener tasks

router.get('/', [
    check('limit', 'Parametro limit debe ser numerico').isNumeric().optional({nullable: true}),
    check('desde', 'Parametro desde debe ser numerico').isNumeric().optional({nullable: true}),
    validateFields
], getTasks);


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

export default router;