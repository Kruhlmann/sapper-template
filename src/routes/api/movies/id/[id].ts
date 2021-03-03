import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../lib/http_status_codes";
import { Director, Genre, Movie } from "../../../../lib/models";

export async function get(request: Request, response: Response): Promise<void> {
    const movie = await Movie.findByPk(request.params.id, { include: [Director, Genre] });
    const json_movie = JSON.stringify(movie);
    response.status(HttpStatusCode.OK).end(json_movie);
}

export async function del(request: Request, response: Response): Promise<void> {
    const movie_from_id = await Movie.findByPk(request.params.id, { attributes: ["id"] });
    if (movie_from_id) {
        await movie_from_id.destroy();
        response.status(HttpStatusCode.NO_CONTENT).end();
    } else {
        response.status(HttpStatusCode.NOT_FOUND).end();
    }
}
