describe('Login Flow', () => {
  it('Must display login form', () => {
    cy.visit('http://localhost:4200/login');
    cy.wait(100);
    cy.get(".loginTitle").should('contain','Sign in by entering your correct credentials ');

  });

  it('Should display error message when credentials are incorrect', () => {
    cy.visit('http://localhost:4200/login');
    cy.wait(100);
    cy.get("#username").type("admin");
    cy.wait(500);
    cy.get("#password").type("admin");
    cy.wait(500);
    cy.get("#loginButton").click()
    cy.wait(500);
    cy.get(`[aria-label="Generic error"]`).should('contain','Invalid credentials.');
  });



})