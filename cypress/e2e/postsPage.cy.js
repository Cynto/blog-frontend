/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('posts page normal user', () => {
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

  it('read article button should redirect to post page', () => {
    cy.wait(1000);
    cy.contains('This is a test post').parent('div').within(($div) => {
      cy.get('button').contains('Read Article').click();
    })

    cy.url().should('include', 'this-is-a-test-post');
  });
});

describe('posts page admin user', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNiMDNjZmQzZjVlY2MxMjdjYzhmNWEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVGVzdCIsInBhc3N3b3JkIjoiJDJhJDEwJG03bUxlZVlEQXF3cDdyV2VhL3BvS2VJNFZuUHlyb3BoeVYuYk5Wekwyb1RoYUdzM1d4T25PIiwiaXNBZG1pbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwibGFzdExvZ2luIjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwiX192IjowLCJpYXQiOjE2NjQ5ODY4MjZ9.wbT3ljxh2_YED6qdgjERxr7l9s9ttFTMXJ8lP_WI2ZE'
    );
    cy.visit('http://localhost:3000/posts');
  });

  it('should render posts with edit and delete buttons', () => {
    cy.wait(1000);
    cy.get('button span').contains('Edit Article');
    cy.get('button span').contains('Delete Article');
  });

  it('edit button should redirect to edit post page', () => {
    cy.wait(1000);
    cy.get('button span').contains('Edit Article').click();
    cy.url().should('include', 'edit');
  });

  it('delete button should redirect to delete page', () => {
    cy.wait(1000);
    cy.get('button span').contains('Delete Article').click();
    cy.url().should('include', 'delete');
  });
});
