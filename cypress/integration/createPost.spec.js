/// <reference types="cypress" />
import 'cypress-localstorage-commands';


Cypress.Commands.add('setTinyMceContent', (content) => {
  cy.window().then((win) => {
    const editor = win.tinymce.execCommand('mceSetContent', false, content);
  });
});

describe('create post tests', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlNzc4MTdkY2NlMjYxYjYzYzc3ZDUiLCJlbWFpbCI6ImJvYkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IkJvYmJ5IiwicGFzc3dvcmQiOiIkMmEkMTAkVkduTWNEcm1WUnpCLzdEQ3hVemtvLnA3ZnFnOWxaejdFcTZLL2hxNjZRaC5hVlRzZWZ3R1MiLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJsYXN0TG9naW4iOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJfX3YiOjAsImlhdCI6MTY1MjQ1OTk5M30.RJqaDAw2MHQGoXB4heJKfCH9OQCQwdwJEy-kWexoN4E'
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
  it('unsuccessful post creation on empty title', () => {
    cy.setTinyMceContent('<b>This is a test post</b>');
    cy.get('#image').type('https://picsum.photos/200/300');
    cy.get('#tags').type('test, post');
    cy.get('form').submit();
    cy.get('.error').should('be.visible');
  });
  it('unsuccessful post creation on empty content', () => {
    cy.get('#title').type('This is a test post');
    cy.get('#image').type('https://picsum.photos/200/300');
    cy.get('#tags').type('test, post');
    cy.get('form').submit();
    cy.get('.error').should('be.visible');
  });
  it('unsuccessful post creation on empty tags', () => {
    cy.get('#title').type('This is a test post');
    cy.setTinyMceContent('<b>This is a test post</b>');
    cy.get('form').submit();
    cy.get('.error').should('be.visible');
  })
  it('successful post creation', () => {
    cy.get('#title').type('This is a test post');
    cy.setTinyMceContent('<b>This is a test post</b>');
    cy.get('#image').type('https://picsum.photos/200/300');
    cy.get('#tags').type('test, post');
    cy.get('form').submit();
    cy.url().should('eq', 'http://localhost:3000/posts');
  });
});
