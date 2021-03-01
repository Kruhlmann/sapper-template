import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../lib/http_status_codes";
import { Director } from "../../../../lib/models";

export async function get(request: Request, response: Response): Promise<void> {
    const director = await Director.findByPk(request.params.id);
    const json_director = JSON.stringify(director);
    response.status(HttpStatusCode.OK).end(json_director);
}

export async function del(request: Request, response: Response): Promise<void> {
    const director_from_id = await Director.findByPk(request.params.id, { attributes: ["id"] });
    if (director_from_id) {
        await director_from_id.destroy();
        response.status(HttpStatusCode.NO_CONTENT).end();
    } else {
        response.status(HttpStatusCode.NOT_FOUND).end();
    }
}
