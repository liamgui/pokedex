/// <reference types="cypress" />

describe("Pokedex - load all pokemon and run tests", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173");
		loadPokemon();
	});

	it("check image of each pokemon", () => {
		cy.get(".pokemon-list li").each(($el) => {

			// //check audio
			// cy.wrap($el).get("audio").should("have.attr", "src");
			// cy.request($el.find("audio").attr("src")).its("status").should("eq", 200);
			//check image
			cy.wrap($el).get("img").should("have.attr", "src");
			cy.request($el.find("img").attr("src")).its("status").should("eq", 200);
		});
	});

	it("check for title and types of each pokemon", () => {
		cy.get(".pokemon-list li").each(($el) => {

			cy.wrap($el).get("h2").should("not.be.empty");
			cy.wrap($el).get("types").should("not.be.empty");
		});
	});
});


function loadPokemon() {
	Cypress.on("fail", (error, runnable) => {});
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 20);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 40);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 60);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 80);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 100);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 120);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 140);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 160);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 180);
	cy.get(".auto-scroll").scrollTo("bottom");
	cy.get(".pokemon-list li").should("have.length.greaterThan", 200);

}
