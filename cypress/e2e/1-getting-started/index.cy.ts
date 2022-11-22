
describe("Pokedex", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173");
	});

	it("displays 20 pokemon", () => {
		cy.get(".pokemon-list li").should("have.length", 20);
	});

	it("check audio and image of each pokemon", () => {
		cy.get(".pokemon-list li").each(($el) => {

			//check audio
			cy.wrap($el).get("audio").should("have.attr", "src");
			cy.request($el.find("audio").attr("src")).its("status").should("eq", 200);

			//check image
			cy.wrap($el).get("img").should("have.attr", "src");
			cy.request($el.find("img").attr("src")).its("status").should("eq", 200);
		});
	});

});
