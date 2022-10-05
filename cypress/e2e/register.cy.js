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
  

  it('error messages show when info doesnt meet requirements ', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type('bo');
    cy.get('#lastName').type('bo');
    cy.get('#email').type('bob@gmail.com');
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret2');
    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.contains('First name must contain at least 3 characters');
    cy.contains('Last name must contain at least 3 characters');
    cy.get('.error').should('contain', 'Passwords must match');
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

  it('error should appear if admin code is incorrect', () => {
    const email = chance.email();
    const firstName = chance.first();
    const lastName = chance.last();

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#email').type(email);
    cy.get('#password').type('SuperSecret');
    cy.get('#confirmPassword').type('SuperSecret');
    cy.get('#adminCode').type('wrong');

    cy.get('[type=submit]').click();
    cy.wait(300);
    cy.contains('Admin code is incorrect');
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
