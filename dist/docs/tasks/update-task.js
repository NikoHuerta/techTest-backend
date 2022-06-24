"use strict";
module.exports = {
    put: {
        tags: ["Task CRUD operations"],
        description: "Actualiza una task en la base de datos",
        operationId: "updateTask",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/id",
                },
                required: true,
                description: "Un MongoId valido",
            }
        ],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/TaskInput",
                    },
                }
            }
        },
        responses: {
            200: {
                description: "Task actualizada correctamente",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/getTask",
                        }
                    }
                }
            },
            400: {
                description: "TaskId no encontrado en BD o no es valido",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        }
                    }
                }
            },
            500: {
                description: "Error interno de servidor",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                        }
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=update-task.js.map