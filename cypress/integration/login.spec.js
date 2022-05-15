/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should have a title', () => {
    cy.title().should('include', 'Login');
  });
  it('successful login should redirect to homepage', () => {
    cy.get('#email').type('bob@gmail.com');
    cy.get('#password').type('SuperSecret');
    cy.get('[type=submit]').click();
    cy.url().should('include', '/');
  });
  it('unsuccessful login should stay on login page', () => {
    cy.get('#email').type('bob@gmail.com');
    cy.get('#password').type('wrong');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.url().should('include', '/login');
  });
  it('successful login should set jwt token in localstorage', () => {
    cy.get('#email').type('bob@gmail.com');
    cy.get('#password').type('SuperSecret');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.getLocalStorage('token').should('not.be.null');
  });
});
