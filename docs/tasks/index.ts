const getTasks = require('./get-tasks');
const getTask = require('./get-task');
const createTask = require('./create-task');
const updateTask = require('./update-task');
const deleteTask = require('./delete-task');

module.exports = {
    paths:{
        '/task':{
            ...getTasks,
            ...createTask
        },
        '/task/{id}':{
            ...getTask,
            ...updateTask,
            ...deleteTask
        }
    }
}