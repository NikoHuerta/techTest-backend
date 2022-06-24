import { Request, Response } from 'express';

import { Task } from '../models';
import { ITask } from '../interfaces/task';

interface taskData {
    ok: boolean;
    message?: string;
    total?: number;
    task?: ITask;
    tasks?: ITask[];
}


export const getTasks = async ( req: Request, res: Response<taskData> ) => {

    try {
        const [total, tasks] = await Promise.all([
            Task.countDocuments(),
            Task.find()
        ]);
    
        return res.status(200).json({
            ok: true,
            total,
            tasks
        });
        
    } catch (err: any) {

        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener Tasks'
        });
    }
    
};

export const getTask = async ( req: Request, res: Response<taskData> ) => {

    const { id } = req.params;

    try {
        const task = await Task.findById(id) as ITask;
        return res.status(200).json({
            ok: true,
            task
        })


    } catch (err: any){
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: `Error al obtener Task ID ${ id }`
        });
    }
    
};

export const createTask = async ( req: Request, res: Response<taskData> ) => {

    const { descripcion, fechaCreacion, vigente } = req.body as ITask;
    const task = new Task({ descripcion, fechaCreacion, vigente });

    try {
        
        await task.save();
        return res.status(201).json({
            ok: true,
            task
        });

    } catch (err : any) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error al crear Task'
        });
    } 
};

export const updateTask = async ( req: Request, res: Response<taskData> ) => {
  
    const { id } = req.params;
    const { descripcion, fechaCreacion, vigente } = req.body as ITask;

    try {

        const newTask = {
            descripcion,
            fechaCreacion,
            vigente
        };

        const taskUpdated = await Task.findByIdAndUpdate(id, newTask, { new: true }) as ITask;
        return res.status(200).json({
            ok: true,
            task: taskUpdated
        });

    } catch (err: any) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: `Error al modificar Task ID ${ id }`
        });
    }
};

export const deleteTask = async ( req: Request, res: Response<taskData> ) => {

    const { id } = req.params;
    
    try {
        
        const task = await Task.findByIdAndDelete(id) as ITask;
        return res.status(200).json({
            ok: true,
            message: 'Task eliminada',
            task
        });

    } catch (err: any) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: `Error al eliminar Task ID ${ id }`
        });
    }
};