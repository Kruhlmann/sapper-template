/// <reference types="cypress" />

import * as test_objects from "../../../config/test_objects.json";
import { HttpStatusCode } from "../../../src/lib/http_status_codes";

let director_id: string;

describe("Director endpoint", () => {
    it("gets an empty director list", () => {
        cy.request("GET", "/api/directors").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });

    it("creates a new director", () => {
        cy.request("POST", "/api/directors", test_objects.payloads.director).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.CREATED);
            expect(response.body).to.have.property("id");
            expect(response.body).to.have.property("first_name");
            expect(response.body).to.have.property("last_name");
            expect(response.body).to.have.property("date_of_birth");
            expect(response.body.first_name).to.equal(test_objects.payloads.director.first_name);
            expect(response.body.last_name).to.equal(test_objects.payloads.director.last_name);
            expect(response.body.date_of_birth).to.equal(test_objects.payloads.director.date_of_birth);
            expect(response.body.thumbnail).to.equal(test_objects.payloads.director.thumbnail);
            director_id = response.body.id;
        });
    });

    it("gets the new director", () => {
        cy.request("GET", "/api/directors").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            const body = JSON.parse(response.body);
            expect(body.length).to.equal(1);
            expect(body[0].id).to.equal(director_id);
        });
    });

    it("deletes the new director", () => {
        cy.request("DELETE", `/api/directors/id/${director_id}`).then((response) => {
            expect(response.status).to.equal(HttpStatusCode.NO_CONTENT);
        });
    });

    it("gets an empty director list", () => {
        cy.request("GET", "/api/directors").then((response) => {
            expect(response.status).to.equal(HttpStatusCode.OK);
            expect(response.body).to.equal("[]");
        });
    });
});
