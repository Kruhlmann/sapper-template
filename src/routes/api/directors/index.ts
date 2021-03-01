import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Director } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_directors = await Director.findAll();
    const json_directors = JSON.stringify(all_directors);
    response.status(HttpStatusCode.OK).end(json_directors);
}

export async function post(request: Request, response: Response): Promise<void> {
    Director.create(request.body)
        .catch((error) => {
            console.error(error);
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        })
        .then((director) => {
            response.status(HttpStatusCode.CREATED).end(JSON.stringify(director));
        });
}
