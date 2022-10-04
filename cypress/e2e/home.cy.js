/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('homepage', () => {
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
  it('featured post should be visible', () => {
    cy.get('[data-testid="featured-post"]').should('be.visible');
  });
  it('should render correct number of standard article showcases depending on viewport size', () => {
    cy.viewport(1920, 1080);
    cy.get('[data-testid="standard-article"]').should('have.length', 8);

    cy.viewport(1440, 900);
    cy.get('[data-testid="standard-article"]').should('have.length', 6);

    cy.viewport(820, 768);
    cy.get('[data-testid="standard-article"]').should('have.length', 5);
  })
  it('should render correct number of no picture article showcases', () => {
    cy.get('[data-testid="no-picture-article"]').should('have.length', 5);

    cy.viewport(750, 768);
    cy.get('[data-testid="no-picture-article"]').should('not.be.visible');
  });
  it('should render bottom big article showcase', () => {
    cy.get('[data-testid="bottom-big-article"]').should('be.visible');
  });


  
});


