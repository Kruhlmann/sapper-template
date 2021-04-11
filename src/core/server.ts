import { PostgresDatabaseConnection } from "../lib/database";
import { Logger } from "../lib/log";
import {
    Booking,
    DatabaseModelBuilder,
    Director,
    Genre,
    Hall,
    Movie,
    MovieGenre,
    MovieShow,
    Seat,
    Show,
    User,
} from "../lib/models";
import { ServerBuilder } from "../lib/server_builder";

export const models = [Hall, Director, Seat, Genre, User, MovieGenre, Genre, Movie, Show, Booking, MovieShow];

const { PORT, NODE_ENV, BASEPATH } = process.env;
const development = NODE_ENV === "development";

try {
    PostgresDatabaseConnection.initialize("postgres", "postgres", "cinema");
    DatabaseModelBuilder.initialize(models, true);

    const webserver = ServerBuilder.make_sapper_express_server("d79n1meaz9Xz71m00yf7b", development, BASEPATH);
    webserver.listen(PORT, console.error);
} catch (error) {
    Logger.log(error);
}
