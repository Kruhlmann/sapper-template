import { Request, Response } from "express";

import { HttpStatusCode } from "../../../lib/http_status_codes";
import { Director, Genre, Movie } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_movies = await Movie.findAll({ include: [Director, Genre] });
    const json_movies = JSON.stringify(all_movies);
    response.status(HttpStatusCode.OK).end(json_movies);
}

export async function post(request: Request, response: Response): Promise<void> {
    Movie.create(request.body)
        .catch((error) => {
            console.error(error);
            response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        })
        .then(async (movie) => {
            await (movie as any).setGenres(request.body.genres);
            response.status(HttpStatusCode.CREATED).end(JSON.stringify(movie));
        });
}
