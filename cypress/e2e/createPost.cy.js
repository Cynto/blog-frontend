/// <reference types="cypress" />
import 'cypress-localstorage-commands';

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

describe('create post tests', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNiMDNjZmQzZjVlY2MxMjdjYzhmNWEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVGVzdCIsInBhc3N3b3JkIjoiJDJhJDEwJG03bUxlZVlEQXF3cDdyV2VhL3BvS2VJNFZuUHlyb3BoeVYuYk5Wekwyb1RoYUdzM1d4T25PIiwiaXNBZG1pbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwibGFzdExvZ2luIjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwiX192IjowLCJpYXQiOjE2NjQ4MTE5OTB9.fLSo__mL3ZTpZrTtdmYj1cxyJTXvTjeHLU03aSw0RpE'
    );
    cy.visit('http://localhost:3000/posts/create');
  });
  it('should have a title', () => {
    cy.title().should('include', 'Create Post');
  });
  it('should have a header', () => {
    cy.get('header').should('be.visible');
  });
  it('tinymce editor should be visible', () => {
    cy.get('.tox-tinymce').should('be.visible');
  });
  it('errors appear when fields contain info that doesnt meet requirements', () => {
    cy.get('#title').type('This');
    cy.setTinyMceContent('T');
    cy.get('#image').type('test');
    cy.get('#tags').type('tes');
    cy.get('form').submit();

    cy.get('.error').should('have.length', 4);
  });
  it('should redirect to post page when form is submitted', () => {
    cy.get('#title').type('This is a test post');
    cy.setTinyMceContent('This is a test post');
    cy.get('#image').type('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=640:*');
    cy.get('#tags').type('test, post');
    cy.get('form').submit();

    cy.url().should('include', '/this-is-a-test-post');
  });

  // it('successful post creation', () => {
  //   cy.get('#title').type('This is a test post');
  //   cy.setTinyMceContent('<b>This is a test post</b>');
  //   cy.get('#image').type('https://picsum.photos/200/300');
  //   cy.get('#tags').type('test, post');
  //   cy.get('form').submit();
  //   cy.url().should('eq', 'http://localhost:3000/posts');
  // });
});
