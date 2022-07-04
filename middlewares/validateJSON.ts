import { Request, Response, NextFunction } from "express";

interface IError extends SyntaxError {
    status?: number;
    type?: string;
}

export const validateJSON = (err: IError, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
        res.status(400);
        res.set('Content-Type', 'application/json');
        res.json({
            ok: false,
            message: 'JSON malformed'
        });
    } else {
        next();
    }
}