/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('register tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should have a title', () => {
    cy.title().should('include', 'Register');
  });
  it('unsuccessful register should stay on register page', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret2');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.url().should('include', '/register');
  });

  it('error message should be displayed when passwords do not match', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret2');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.get('.error').should('contain', 'Passwords do not match.');
  });
  it('invalid email should result with staying on register page', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type('invalid');
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.url().should('include', '/register');
  });
  it('error message should be displayed with invalid name', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type('000');
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.get('.error').should('contain', 'First name must only include letters.');
  });
  it('error message should be displayed with too short of a name', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type('a');
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.get('.error').should(
      'contain',
      'First name must include at least 3 characters.'
    );
  });
  it('successful register should redirect to login', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.url().should('include', '/login');
  });
  it('login link should redirect to login', () => {
    cy.get('p:first a').click();
    cy.url().should('include', '/login');
  });
  it('home link should redirect to homepage', () => {
    cy.get('p:last a').click();
    cy.url().should('include', '/');
  });

  
});
