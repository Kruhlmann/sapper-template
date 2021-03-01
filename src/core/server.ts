import { PostgresDatabaseConnection } from "../lib/database";
import { Logger } from "../lib/log";
import {
    Booking,
    DatabaseModelBuilder,
    Genre,
    Hall,
    Movie,
    MovieDirector,
    MovieGenre,
    Seat,
    Show,
    User,
} from "../lib/models";
import { ServerBuilder } from "../lib/server_builder";

export const base_models = [Show, Hall, Seat, Genre, User, Genre, Movie, Booking];
export const junction_models = [MovieDirector, MovieGenre];

const { PORT, NODE_ENV, BASEPATH } = process.env;
const development = NODE_ENV === "development";

try {
    PostgresDatabaseConnection.initialize("postgres", "postgres", "cinema");
    DatabaseModelBuilder.initialize([...junction_models, ...base_models], true);

    const webserver = ServerBuilder.make_sapper_express_server("d79n1meaz9Xz71m00yf7b", development, BASEPATH);
    webserver.listen(PORT, console.error);
} catch (error) {
    Logger.log(error);
}
