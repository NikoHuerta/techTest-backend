module.exports = {
    post: {
        tags: ["Task CRUD operations"],
        description: "Crea una task en la base de datos",
        operationId: "createTask",
        parameters: [],
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
            201: {
                description: "Task creada correctamente",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/getTask",
                        }
                    }
                }
            },
            400: {
                description: "Error al crear task",
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
}