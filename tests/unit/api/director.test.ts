import { Server } from "http";
import { agent, SuperTest } from "supertest";

import { PostgresDatabaseConnection } from "../../../src/lib/database";
import { Booking, DatabaseModelBuilder, Director, Genre, Hall, Movie, Seat, User } from "../../../src/lib/models";
import { ServerBuilder } from "../../../src/lib/server_builder";

let request: SuperTest<any>;
let webserver: Server;
const director_request_body = {
    first_name: "Steven",
    last_name: "Spielberg",
    date_of_birth: "1967-04-03",
};

describe("Director endpoint", () => {
    beforeAll(async (done) => {
        PostgresDatabaseConnection.initialize("postgres", "postgres", "cinema");
        await DatabaseModelBuilder.initialize([Seat, Hall, Booking, User, Director, Genre, Movie], true);
        const express_app = ServerBuilder.make_sapper_express_server("", true);
        webserver = express_app.listen(2900, console.error);
        request = agent(webserver);
        done();
    });

    it("creates a director", async (done) => {
        request
            .get("/api/directors")
            .send(director_request_body)
            .expect(201)
            .then(async (_response: { status: number }) => {
                done();
            });
    });

    afterAll(async (done) => {
        webserver.close(done);
    });
});
