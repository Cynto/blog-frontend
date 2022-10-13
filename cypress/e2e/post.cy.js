/// <reference types="cypress" />
import 'cypress-localstorage-commands';

describe('post page normal user', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlNzc4MTdkY2NlMjYxYjYzYzc3ZDUiLCJlbWFpbCI6ImJvYkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IkJvYmJ5IiwicGFzc3dvcmQiOiIkMmEkMTAkVkduTWNEcm1WUnpCLzdEQ3hVemtvLnA3ZnFnOWxaejdFcTZLL2hxNjZRaC5hVlRzZWZ3R1MiLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJsYXN0TG9naW4iOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJfX3YiOjAsImlhdCI6MTY1MjQ1OTk5M30.RJqaDAw2MHQGoXB4heJKfCH9OQCQwdwJEy-kWexoN4E'
    );
    cy.visit(
      'http://localhost:3000/time-to-get-your-house-clean-and-in-order-7'
    );
  });

  it('should have a title', () => {
    cy.title().should('include', 'Time to Get Your House Clean and in Order 7');
  });

  it('top section should render', () => {
    cy.get('h1').contains('Time to Get Your House Clean and in Order 7');
    cy.get('[data-testid="post-socials"]').should('be.visible');
    cy.contains('Article written by: Luca');
  });

  it('should render the post content', () => {
    cy.get('img').should('have.length', 1);
    cy.get('p').contains(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    );
    cy.get('h2').contains('This is a test subheading. I hope you enjoy it.');
  });

  it('should render post suggestions section depending on if screen is large or not', () => {
    cy.viewport(1920, 1080);
    cy.get('.post-suggestions').should('be.visible');
    cy.viewport(375, 812);
    cy.get('.post-suggestions').should('not.be.visible');
  });

  it('should show 404 page if post does not exist', () => {
    cy.visit('http://localhost:3000/this-post-does-not-exist', {
      failOnStatusCode: false,
    });
    cy.get('h1').contains('404');
  });

  it('should redirect to 404 if post is unpublished', () => {
    cy.visit('http://localhost:3000/this-is-a-test-post');
    cy.url().should('include', '/404');
  });
});

describe('post page admin user', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNiMDNjZmQzZjVlY2MxMjdjYzhmNWEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVGVzdCIsInBhc3N3b3JkIjoiJDJhJDEwJG03bUxlZVlEQXF3cDdyV2VhL3BvS2VJNFZuUHlyb3BoeVYuYk5Wekwyb1RoYUdzM1d4T25PIiwiaXNBZG1pbiI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwibGFzdExvZ2luIjoiMjAyMi0xMC0wM1QxNTo0NjoyMy41ODhaIiwiX192IjowLCJpYXQiOjE2NjQ5ODY4MjZ9.wbT3ljxh2_YED6qdgjERxr7l9s9ttFTMXJ8lP_WI2ZE'
    );
  });

  it('should render unpublished post if user is admin', () => {
    cy.visit('http://localhost:3000/this-is-a-test-post');
    cy.wait(1000);
    cy.get('h1').contains('This is a test post');
  });
});

describe('comments', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdlNzc4MTdkY2NlMjYxYjYzYzc3ZDUiLCJlbWFpbCI6ImJvYkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCb2IiLCJsYXN0TmFtZSI6IkJvYmJ5IiwicGFzc3dvcmQiOiIkMmEkMTAkVkduTWNEcm1WUnpCLzdEQ3hVemtvLnA3ZnFnOWxaejdFcTZLL2hxNjZRaC5hVlRzZWZ3R1MiLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJsYXN0TG9naW4iOiIyMDIyLTA1LTEzVDE1OjIxOjM3LjczOVoiLCJfX3YiOjAsImlhdCI6MTY1MjQ1OTk5M30.RJqaDAw2MHQGoXB4heJKfCH9OQCQwdwJEy-kWexoN4E'
    );
    cy.visit(
      'http://localhost:3000/time-to-get-your-house-clean-and-in-order-7'
    );
  });

  it('should render comments section', () => {
    cy.get('#comments').should('be.visible');
  });

  it('should render comments', () => {
    cy.get('.comment').should('have.length.greaterThan', 0);
  });

  it('should render comment properties', () => {
    cy.get('.comment').first().should('contain', 'Luca');
    cy.get('.comment').first().should('contain', 'Test2');
  });

  it('should render comment form', () => {
    cy.get('.comment-form-section').should('be.visible');
    cy.get(
      '.comment-form-section textarea[placeholder="Write a comment..."]'
    ).should('be.visible');
  });

  it('should be able to write and delete a comment', async () => {
    let commentLength = 0;
    cy.get('.comment').then((comments) => (commentLength = comments.length));
    cy.get(
      '.comment-form-section textarea[placeholder="Write a comment..."]'
    ).type('This is a test comment');

    cy.get('.comment-form-section button[type="submit"]').click();
    cy.wait(500);

    cy.get('.comment').should('have.length', commentLength + 1);

    cy.get('.comment').then((comments) => (commentLength = comments.length));

    cy.get('.comment')
      .first()
      .find('button[data-testid="delete-comment-initial"]')
      .click();
    cy.get('.comment')
      .first()
      .find('button[data-testid="delete-comment-confirm"]')
      .click();
    cy.wait(500);

    cy.get('.comment').should('have.length', commentLength - 1);
  });

  it('should render replies when view replies is clicked', () => {
    cy.get('.comment')
      .first()
      .within(() => {
        cy.get('button').contains('View replies').click();
        cy.get('.reply').should('be.visible');
      });
  });

  it('should render reply form when reply button is clicked', () => {
    cy.get('.comment')
      .first()
      .within(() => {
        cy.get('button').contains('Reply').click();
        cy.get('textarea[placeholder="Write a reply..."]').should('be.visible');
      });
  });

  it('should be able to write and delete a reply', async () => {
    let replyLength = 0;
    cy.get('.comment')
      .first()
      .within(() => {
        cy.get('button').contains('View replies').click();
        cy.get('.reply').then((replies) => (replyLength = replies.length));
      });

    cy.get('.comment')
      .first()
      .within(() => {
        cy.get('button').contains('Reply').click();
        cy.get('textarea[placeholder="Write a reply..."]').type(
          'This is a test reply'
        );
        cy.get('button[type="submit"]').click();
        cy.wait(500);
        cy.get('.reply').should('have.length', replyLength + 1);
      });

    cy.get('.comment')
      .first()
      .within(() => {
        cy.get('.reply').then((replies) => (replyLength = replies.length));
        cy.get('button[data-testid="delete-reply-initial"]').click();
        cy.get('button[data-testid="delete-reply-confirm"]').click();
        cy.wait(500);
        cy.get('.reply').should('have.length', replyLength - 1);
      });
  });
});
