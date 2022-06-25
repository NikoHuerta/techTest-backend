"use strict";
module.exports = {
    components: {
        schemas: {
            // mongoid
            id: {
                type: "string",
                description: "Un MongoID de una task",
                example: "62b5f846bd7fc31ea94414ff",
            },
            // Task model
            Task: {
                type: "object",
                properties: {
                    descripcion: {
                        type: "string",
                        description: "Titulo de la task",
                        example: "Crear desafio de programacion en NodeJS + React Redux",
                    },
                    fechaCreacion: {
                        type: "string",
                        description: "Fecha de creacion de la task",
                        example: "2022-06-24T20:53:00.000Z",
                    },
                    vigente: {
                        type: "boolean",
                        description: "El estado de la task",
                        example: true,
                    },
                    taskId: {
                        type: "number",
                        description: "Id numerico de la task",
                        example: 2,
                    },
                    objectId: {
                        type: "string",
                        description: "MongoID de una task",
                        example: "62b5f846bd7fc31ea94414ff",
                    }
                }
            },
            // Task input model
            TaskInput: {
                type: "object",
                properties: {
                    descripcion: {
                        type: "string",
                        description: "Titulo de la task",
                        example: "Coding in TypeScript",
                    },
                    fechaCreacion: {
                        type: "dateTime",
                        description: "Fecha de creacion de la task",
                        example: "2022-06-24 15:50",
                    },
                    vigente: {
                        type: "boolean",
                        description: "Estado de la task",
                        example: true,
                    },
                }
            },
            // getTasks model
            getTasks: {
                type: "object",
                properties: {
                    ok: {
                        type: "boolean",
                        description: "Indica si la operacion se realizo correctamente",
                        example: true,
                    },
                    total: {
                        type: "number",
                        description: "Cantidad de tasks en la base de datos",
                        example: 1,
                    },
                    tasks: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Task",
                        }
                    },
                },
            },
            getTask: {
                type: "object",
                properties: {
                    ok: {
                        type: "boolean",
                        description: "Indica si la operacion se realizo correctamente",
                        example: true,
                    },
                    task: {
                        $ref: "#/components/schemas/Task",
                    }
                }
            },
            // deleteTask Response model
            deleteTask: {
                type: "object",
                properties: {
                    ok: {
                        type: "boolean",
                        description: "Indica si la operacion se realizo correctamente",
                        example: true,
                    },
                    message: {
                        type: "string",
                        description: "Mensaje de respuesta",
                        example: "Task eliminada",
                    },
                    task: {
                        $ref: "#/components/schemas/Task",
                    }
                }
            },
            // error model
            Error: {
                type: "object",
                properties: {
                    ok: {
                        type: "boolean",
                        description: "Indica si la operacion se realizo correctamente",
                        example: "false",
                    },
                    message: {
                        type: "string",
                        description: "Descripcion del error obtenido",
                        example: "Esta es la causa del error",
                    },
                }
            }
        }
    }
};
