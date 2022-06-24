import { Router } from "express";
import { check } from 'express-validator';

import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers';
import { validateFields } from '../middlewares';
import { isDate, existeTaskPorId } from '../helpers';

const router = Router();


//obtener tasks
router.get('/', [], getTasks);

//obtener task por id
router.get('/:id', [
    check('id').custom( existeTaskPorId ),
    
    validateFields
], getTask);


//crear task
router.post('/', [
    check('descripcion', 'Parametro descripcion es obligatorio').not().isEmpty(),
    check('descripcion', 'Parametro descripcion debe ser texto').isString(),

    check('fechaCreacion', 'Parametro fechaCreacion es obligatorio').not().isEmpty(),
    check('fechaCreacion', 'Parametro fechaCreacion debe ser fecha').custom( isDate ),

    check('vigente', 'Parametro vigente es obligatorio').not().isEmpty(),
    check('vigente', 'Parametro vigente debe ser booleano').isBoolean(),

    validateFields
], createTask);


//editar task
router.put('/:id', [
    check('id').custom( existeTaskPorId ),

    check('descripcion', 'Parametro descripcion es obligatorio').not().isEmpty(),
    check('descripcion', 'Parametro descripcion debe ser texto').isString(),

    check('fechaCreacion', 'Parametro fechaCreacion es obligatorio').not().isEmpty(),
    check('fechaCreacion', 'Parametro fechaCreacion debe ser fecha').custom( isDate ),

    check('vigente', 'Parametro vigente es obligatorio').not().isEmpty(),
    check('vigente', 'Parametro vigente debe ser booleano').isBoolean(),

    validateFields
], updateTask);

//borrar task
router.delete('/:id', [
    check('id').custom( existeTaskPorId ),

    validateFields
], deleteTask);

export default router;