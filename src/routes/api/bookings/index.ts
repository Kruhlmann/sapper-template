import { Request, Response } from "express";

import { Booking, Hall, Movie, Seat } from "../../../lib/models";

export async function get(_request: Request, response: Response): Promise<void> {
    const all_bookings = await Booking.findAll();
    const json_bookings = JSON.stringify(all_bookings);
    response.status(200).end(json_bookings);
}

export async function post(request: Request, response: Response): Promise<void> {
    const { movie_id, hall_id, seat_id } = request.body;
    const movie = await Movie.findByPk(movie_id);
    const hall = await Hall.findByPk(hall_id);
    const seat = await Seat.findByPk(seat_id);

    const required_model_instances = [movie, hall, seat];
    for (const model_instance of required_model_instances) {
        if (!model_instance) {
            response.status(400).end("A referenced model instance was not found");
        }
    }
}
