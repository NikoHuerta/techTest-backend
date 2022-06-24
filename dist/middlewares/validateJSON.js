"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJSON = void 0;
const validateJSON = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
        res.status(400);
        res.set('Content-Type', 'application/json');
        res.json({
            ok: false,
            message: 'JSON malformed'
        });
    }
    else {
        next();
    }
};
exports.validateJSON = validateJSON;
//# sourceMappingURL=validateJSON.js.map