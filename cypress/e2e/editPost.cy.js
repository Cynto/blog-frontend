/// <reference types="cypress" />
import 'cypress-localstorage-commands';

Cypress.Commands.add('getTinyMceContent', (content) => {
  cy.window().should('have.property', 'tinymce'); // wait for tinyMCE

  cy.wait(1000).then(() => {
    // wait for editor to be ready

    cy.window().then((win) => {
      const editor = win.tinymce.activeEditor;

      return editor.getContent();
    });
  });
});
Cypress.Commands.add('setTinyMceContent', (content) => {
  cy.window().should('have.property', 'tinymce'); // wait for tinyMCE

  cy.wait(1000).then(() => {
    // wait for editor to be ready

    cy.window().then((win) => {
      const editor = win.tinymce.activeEditor;

      editor.setContent(content, { format: 'text' });
    });
  });
});

describe('edit post', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNiMDNjZmQzZjVlY2MxMjdjYzhmNWEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVGVzdCIsInBhc3N3b3JkIjoiJDJhJDEwJG03bUxlZVlEQXF3cDdyV2VhL3BvS2VJNFZuUHlyb3BoeVYuYk5Wekwyb1RoYUdzM1d4T25PIiwiaXNBZG1pbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwibGFzdExvZ2luIjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwiX192IjowLCJpYXQiOjE2NjQ5ODY4MjZ9.wbT3ljxh2_YED6qdgjERxr7l9s9ttFTMXJ8lP_WI2ZE'
    );
    cy.visit('http://localhost:3000/posts/edit/this-is-a-test-post');
  });

  it('404 page should be displayed if post does not exist', () => {
    cy.visit('http://localhost:3000/posts/edit/this-is-a-test-post-2', {failOnStatusCode: false});
    cy.contains('404');
  });

  it('should have a title', () => {
    cy.title().should('include', 'Bloggy Edit Post');
  });

  it('should have a header', () => {
    cy.get('header').should('be.visible');
  });

  it('should render filled in form', () => {
    cy.get('#title').should('have.value', 'This is a test post');
    cy.get('#image').should('have.value', 'https://i.imgur.com/IZ5Eaf8.jpg');
    cy.getTinyMceContent().should('include', 'This is a test post');
    cy.get('#tags').should('have.value', 'test,post');
    cy.get('#publishedFalse').should('be.checked');
    cy.get('#featuredFalse').should('be.checked');
  });

  it('renders errors if form is not filled in correctly', () => {
    cy.get('#title').clear().type('This');
    cy.setTinyMceContent('T');
    cy.get('#image').clear().type('test');
    cy.get('#tags').clear().type('tes');
    cy.get('form').submit();

    cy.get('.error').should('have.length', 4);
  });
  
});
