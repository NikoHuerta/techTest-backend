"use strict";
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const tasks = require('./tasks');
module.exports = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, basicInfo), servers), tags), components), tasks);
