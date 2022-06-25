"use strict";
module.exports = {
    get: {
        tags: ["Task CRUD operations"],
        description: "Obtiene todas las task en la base de datos",
        operationId: "getTasks",
        responses: {
            200: {
                description: "Tasks obtenidas de forma correcta",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/getTasks",
                        },
                    },
                },
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
        },
    },
};
