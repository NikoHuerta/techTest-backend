import mongoose, { Schema, Model } from 'mongoose';
import { AutoIncrement } from '../db/config';
import { ITask } from '../interfaces/task';


const TaskSchema = new Schema({
    descripcion:  {
        type: String,
        required: [true, 'La descripcion es requerida']
    },
    fechaCreacion: {
        type: Date,
        required: [true, 'La fecha de creación es requerida']
    },
    vigente: {
        type: Boolean,
        required: [true, 'El estado es requerido']
    }
});


TaskSchema.methods.toJSON = function () {
    const { __v, _id, ...data } = this.toObject();
    data.objectId = _id;

    return data;
}

TaskSchema.plugin(AutoIncrement, { inc_field: 'taskId' });


const Task:Model<ITask> = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export default Task;