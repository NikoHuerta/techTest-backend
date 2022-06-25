"use strict";
module.exports = {
    delete: {
        tags: ["Task CRUD operations"],
        description: "Elimina una task en la base de datos",
        operationId: "deleteTask",
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
        responses: {
            200: {
                description: "Task eliminada correctamente",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/deleteTask",
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
