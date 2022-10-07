/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('posts page', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlNzc4MTdkY2NlMjYxYjYzYzc3ZDUiLCJlbWFpbCI6ImJvYkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IkJvYmJ5IiwicGFzc3dvcmQiOiIkMmEkMTAkVkduTWNEcm1WUnpCLzdEQ3hVemtvLnA3ZnFnOWxaejdFcTZLL2hxNjZRaC5hVlRzZWZ3R1MiLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJsYXN0TG9naW4iOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJfX3YiOjAsImlhdCI6MTY1MjQ1OTk5M30.RJqaDAw2MHQGoXB4heJKfCH9OQCQwdwJEy-kWexoN4E'
    );
    cy.visit('http://localhost:3000/posts');
  });

  it('should have a title', () => {
    cy.title().should('include', 'Bloggy Posts');
  });

  it('renders sort section', () => {
    cy.contains('Sort by:');
    cy.contains('Newest');
    cy.contains('Oldest');
    cy.contains('Most Comments');
  });

  it('renders 12 posts by default', () => {
    cy.get('.post').should('have.length', 12);
  });

  it('url params should be updated when sort by is changed', () => {
    cy.get('span').contains('Oldest').click();
    cy.url().should('include', 'sort=createdAt');

    cy.get('span').contains('Newest').click();
    cy.url().should('include', 'sort=-createdAt');

    cy.get('span').contains('Most Comments').click();
    cy.url().should('include', 'sort=comments');
  });

  it('url params should be updated when limit is changed', () => {
    cy.get('[data-testid="load-more-button"]').click();

    cy.url().should('include', 'limit=24');
  });

  it('should render more than 12 posts when load more button is clicked', () => {
    cy.get('[data-testid="load-more-button"]').click();

    cy.get('.post').should('have.length.greaterThan', 12);
  });

  it('load button should be disabled when all posts are loaded', () => {
    cy.get('[data-testid="load-more-button"]').click();

    cy.get('[data-testid="load-more-button"]').should('not.exist');
  });
});
