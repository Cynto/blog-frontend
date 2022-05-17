/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('homepage tests', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlNzc4MTdkY2NlMjYxYjYzYzc3ZDUiLCJlbWFpbCI6ImJvYkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IkJvYmJ5IiwicGFzc3dvcmQiOiIkMmEkMTAkVkduTWNEcm1WUnpCLzdEQ3hVemtvLnA3ZnFnOWxaejdFcTZLL2hxNjZRaC5hVlRzZWZ3R1MiLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJsYXN0TG9naW4iOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJfX3YiOjAsImlhdCI6MTY1MjQ1OTk5M30.RJqaDAw2MHQGoXB4heJKfCH9OQCQwdwJEy-kWexoN4E'
    );
    cy.visit('http://localhost:3000/');
  });
  it('should have a title', () => {
    cy.title().should('include', 'Bloggy');
  });
  it('should have a header', () => {
    cy.get('header').should('be.visible');
  });
  it('logout form should be visible on click', () => {
    cy.get('[data-testid=header-logout]').click();
    cy.get('[data-testid=logout-form]').should('be.visible');
  });
  it('jwt token should be removed on logout', () => {
    cy.get('[data-testid=header-logout]').click();
    cy.get('[data-testid=logout-button]').click();
    cy.getLocalStorage('token').should('be.null');
  });
});
