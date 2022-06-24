"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeTaskPorId = void 0;
const models_1 = require("../models");
const existeTaskPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeTask = yield models_1.Task.findById({ _id });
        if (!existeTask) {
            throw new Error(`El ID ${_id} no existe en ninguna task`);
        }
    }
    else {
        throw new Error(`El ID ${_id} no es mongoID válido`);
    }
});
exports.existeTaskPorId = existeTaskPorId;
//# sourceMappingURL=bd-validator.js.map