/// <reference types="cypress" />

describe("Landing page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("shows a counter", () => {
        cy.get("p")
            .contains("The current count inside Counter.svelte is 5")
            .should("exist");
        cy.get("h1").contains("Count outside is 5!").should("exist");
        cy.get("button").contains("Add").click();
        cy.get("p")
            .contains("The current count inside Counter.svelte is 6")
            .should("exist");
        cy.get("h1").contains("Count outside is 6!").should("exist");
        cy.get("button").contains("Subtract").click();
        cy.get("p")
            .contains("The current count inside Counter.svelte is 5")
            .should("exist");
    });
});
