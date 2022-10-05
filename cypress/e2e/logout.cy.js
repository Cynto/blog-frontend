/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('logout', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlNzc4MTdkY2NlMjYxYjYzYzc3ZDUiLCJlbWFpbCI6ImJvYkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IkJvYmJ5IiwicGFzc3dvcmQiOiIkMmEkMTAkVkduTWNEcm1WUnpCLzdEQ3hVemtvLnA3ZnFnOWxaejdFcTZLL2hxNjZRaC5hVlRzZWZ3R1MiLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJsYXN0TG9naW4iOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJfX3YiOjAsImlhdCI6MTY1MjQ1OTk5M30.RJqaDAw2MHQGoXB4heJKfCH9OQCQwdwJEy-kWexoN4E'
    );
    cy.visit('http://localhost:3000/logout');
  });

  it('should have a title', () => {
    cy.title().should('include', 'Bloggy Logout');
  });

 
  it('should have a logout button', () => {
    cy.get('[data-testid="logout-button"]').should('be.visible');
  });

  it('should remove jwt token from localstorage on logout', () => {
    cy.getLocalStorage('token').should('not.be.null');
    cy.get('[data-testid="logout-button"]').click();
    cy.getLocalStorage('token').should('not.exist');
  });

  it('should redirect to login page on logout', () => {
    cy.get('[data-testid="logout-button"]').click();
    cy.url().should('include', '/login');
  });

  it('should redirect back when cancel button is clicked', () => {
    cy.visit('http://localhost:3000/');
    cy.visit('http://localhost:3000/logout');
    cy.get('button').contains('Cancel').click();
    cy.url().should('eq', 'http://localhost:3000/');
  })
});
