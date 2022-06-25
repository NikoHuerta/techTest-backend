"use strict";
module.exports = {
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api`,
            description: "Local RESTserver",
        }
    ]
};
