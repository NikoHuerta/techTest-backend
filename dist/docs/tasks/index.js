"use strict";
const getTasks = require('./get-tasks');
const getTask = require('./get-task');
const createTask = require('./create-task');
const updateTask = require('./update-task');
const deleteTask = require('./delete-task');
module.exports = {
    paths: {
        '/task': Object.assign(Object.assign({}, getTasks), createTask),
        '/task/{id}': Object.assign(Object.assign(Object.assign({}, getTask), updateTask), deleteTask)
    }
};
//# sourceMappingURL=index.js.map