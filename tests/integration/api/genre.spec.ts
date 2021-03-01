/// <reference types="cypress" />

import * as test_objects from "../../../config/test_objects.json";
import { HttpStatusCode } from "../../../src/lib/http_status_codes";

let genre_id: string;

describe("Genre endpoint", () => {
    it("gets an empty genre list", () => {
        cy.request("GET", "/api/genres").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    it("creates a new genre", () => {
        cy.request("POST", "/api/genres", test_objects.payloads.genre).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.CREATED);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("name");
            expect(response.body.name).to.equal(test_objects.payloads.genre.name);
            genre_id = response.body.id;
        });
    });

    it("gets the new genre", () => {
        cy.request("GET", "/api/genres").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
            expect(body[0].id).to.equal(genre_id);
        });
        cy.request("GET", `/api/genres/id/${genre_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.id).to.equal(genre_id);
            expect(body.name).to.equal(test_objects.payloads.genre.name);
        });
    });

    it("deletes the new genre", () => {
        cy.request("DELETE", `/api/genres/id/${genre_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.NO_CONTENT);
        });
    });

    it("gets an empty genre list", () => {
        cy.request("GET", "/api/genres").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });
});
