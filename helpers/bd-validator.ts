import { Task } from '../models';


export const existeTaskPorId = async (_id: string) => {

    if (_id.match(/^[0-9a-fA-F]{24}$/)) {

        const existeTask = await Task.findById({ _id });

        if(!existeTask) {
            throw new Error(`El ID ${ _id } no existe en ninguna task`);
        }

    } else {
        throw new Error(`El ID ${ _id } no es mongoID válido`);
    }
}