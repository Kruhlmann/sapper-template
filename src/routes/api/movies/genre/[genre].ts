import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../lib/http_status_codes";
import { Director, Genre, Movie } from "../../../../lib/models";

export async function get(request: Request, response: Response): Promise<void> {
    const movies_by_genre = await Movie.findAll({
        include: [Director, { model: Genre, as: "genres" }],
        where: {
            "$genres.id$": request.params.genre,
        },
    });
    const json_movies = JSON.stringify(movies_by_genre);
    response.status(HttpStatusCode.OK).end(json_movies);
}
