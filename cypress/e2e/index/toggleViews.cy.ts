/// <reference types="cypress" />

describe("Pokedex - load all pokemon and run tests", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173");
	});

	it("toggle favorites", () => {
		// toggle favorite button
		cy.get("button.favorite-view").click();
		cy.get(".pokemon-list li").each(($el) => {
			cy.wrap($el).get("button.favorite").should("have.class", "favorite");
		});
		
	});
	it("search by name", () => {
		search("pik");
		search("charman");
		search("gengi");

	});

});


function search(string: string) {
	const regex = new RegExp(string, "i");
	cy.get(".search-bar input").type(string);
	cy.wait(1000);
	//check if there are any pokemon
	cy.get(".content").then(($el) => {
		if ($el.find(".pokemon-list li").length) {
			cy.get(".pokemon-list li").each(($el) => {
				const text = $el.find("h2").text();
				expect(text).to.match(regex);
			});
		} else {
			cy.get(".content").contains("No Pokemon Matches");
		}
	});
	cy.get(".search-bar input").clear();
	cy.wait(2000);
}