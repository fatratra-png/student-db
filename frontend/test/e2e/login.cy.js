describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows an error for invalid credentials", () => {
    cy.intercept("POST", "**/auth/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("login");

    cy.get('input[name="email"]').type("wrong@example.com");
    cy.get('input[name="password"]').type("badpassword");
    cy.contains("button", "Se connecter").click();

    cy.wait("@login");
    cy.contains(".error", "Invalid credentials").should("be.visible");
  });

  it("logs in and shows the students page", () => {
    cy.intercept("POST", "**/auth/login", { token: "fake-token" }).as("login");
    cy.intercept("GET", "**/students", { data: [] }).as("students");
    cy.intercept("GET", "**/students/stats", { data: null }).as("stats");

    cy.get('input[name="email"]').type("admin@example.com");
    cy.get('input[name="password"]').type("Password123!");
    cy.contains("button", "Se connecter").click();

    cy.wait("@login");
    cy.contains("h1", "Liste des Étudiants").should("be.visible");
    cy.window().its("localStorage.token").should("eq", "fake-token");
  });

  it("switches between login and register modes", () => {
    cy.contains("h1", "Connexion").should("be.visible");
    cy.contains("button", "Pas de compte ? S'inscrire").click();
    cy.contains("h1", "Créer un compte").should("be.visible");
    cy.contains("button", "Déjà un compte ? Se connecter").click();
    cy.contains("h1", "Connexion").should("be.visible");
  });
});
