import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Genre } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_genres = await Genre.findAll();
    const json_genres = JSON.stringify(all_genres);
    response.status(HttpStatusCode.OK).end(json_genres);
}

export async function post(request: Request, response: Response): Promise<void> {
    Genre.create(request.body)
        .catch((error) => {
            console.error(error);
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        })
        .then((genre) => {
            response.status(HttpStatusCode.CREATED).end(JSON.stringify(genre));
        });
}
