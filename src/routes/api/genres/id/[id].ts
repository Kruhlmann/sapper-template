import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../lib/http_status_codes";
import { Genre } from "../../../../lib/models";

export async function get(request: Request, response: Response): Promise<void> {
    const genre = await Genre.findByPk(request.params.id);
    const json_genre = JSON.stringify(genre);
    response.status(HttpStatusCode.OK).end(json_genre);
}

export async function del(request: Request, response: Response): Promise<void> {
    const genre_from_id = await Genre.findByPk(request.params.id, { attributes: ["id"] });
    if (genre_from_id) {
        await genre_from_id.destroy();
        response.status(HttpStatusCode.NO_CONTENT).end();
    } else {
        response.status(HttpStatusCode.NOT_FOUND).end();
    }
}
