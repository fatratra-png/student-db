describe("Students", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/students", {
      data: [
        { id: 1, last_name: "Doe", first_name: "John", email: "john@example.com", age: 20 },
      ],
    }).as("students");
    cy.intercept("GET", "**/students/stats", {
      data: {
        total: 1,
        average_age: 20,
        min_age: 20,
        max_age: 20,
        created_this_week: 1,
      },
    }).as("stats");
    cy.intercept("POST", "**/students", {
      data: { id: 2, last_name: "Smith", first_name: "Jane", email: "jane@example.com", age: 22 },
    }).as("create");

    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", "fake-token");
      },
    });
  });

  it("displays the student list and stats", () => {
    cy.contains("h1", "Liste des Étudiants").should("be.visible");
    cy.get("tbody tr").should("have.length", 1);
    cy.contains("td", "Doe").should("be.visible");
    cy.contains("td", "john@example.com").should("be.visible");
    cy.contains(".stat-value", "1").should("be.visible");
  });

  it("adds a student and clears the form", () => {
    cy.get('input[name="last_name"]').type("Smith");
    cy.get('input[name="first_name"]').type("Jane");
    cy.get('input[name="email"]').type("jane@example.com");
    cy.get('input[name="age"]').type("22");
    cy.contains("button", "Ajouter").click();

    cy.wait("@create")
      .its("request.body")
      .should("deep.equal", {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@example.com",
        age: 22,
      });
    cy.get('input[name="last_name"]').should("have.value", "");
    cy.get('input[name="first_name"]').should("have.value", "");
  });

  it("logs out and returns to the login page", () => {
    cy.contains("button", "Déconnexion").click();
    cy.contains("h1", "Connexion").should("be.visible");
    cy.window().its("localStorage.token").should("not.exist");
  });
});
