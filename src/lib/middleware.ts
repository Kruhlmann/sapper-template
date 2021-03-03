import * as sapper from "@sapper/server";
import { NextFunction, Request, RequestHandler, Response } from "express";

import { SapperSession } from "../../typings";
import { Logger } from "./log";

export function session_middleware(): RequestHandler {
    return sapper.middleware({
        session: (request: { session: SapperSession }) => ({
            user: request.session && request.session.user,
            token: request.session && request.session.token,
        }),
    });
}

export function logging_middleware(): RequestHandler {
    return (request: Request, _response: Response, next: NextFunction) => {
        Logger.log(`Request to ${request.url}`);
        next();
    };
}
