/// <reference types="cypress" />
 const config = {baseUrl : 'http://localhost:3000'};
describe('User Crud', config, () => {
	const nameElm = '[data-cy="name-input"]';
	const usernameElm = '[data-cy="username-input"]';
	const emailElm = '[data-cy="email-input"]';
	const websiteElm = '[data-cy="website-input"]';
	const btnSubmit = '[data-cy="btn-submit"]';

	const nameValidationMsg = '[data-cy="name-input-validation-message"]';
	const usernameValidationMsg = '[data-cy="username-input-validation-message"]';
	const emailValidationMsg = '[data-cy="email-input-validation-message"]';
	const websiteValidationMsg = '[data-cy="website-input-validation-message"]';

	it('should exists master page', () => {
		cy.visit('/');
	});

	it('should be navigate to user index and new user', () => {
		cy.visit('/');
		cy.get('[data-cy="users-index"]').contains('Users').click();
		cy.location('pathname').should('eq', '/users');
		cy.get('[data-cy="create-user-link"]').contains('Add User').click();
		cy.location('pathname').should('eq', '/users/new');
		cy.go('back');
		cy.location('pathname').should('eq', '/users');
	});

	it('should be exists lable and form elements', () => {
		cy.visit('/users/new');
		cy.get(nameElm).parent().get('label').contains('Name');
		cy.get(usernameElm).parent().get('label').contains('User Name');
		cy.get(emailElm).parent().get('label').contains('Email');
		cy.get(websiteElm).parent().get('label').contains('Website');
		cy.get(btnSubmit).contains('Register');
	});

	it('shoud be show required fields', () => {
		cy.visit('/users/new');
		cy.get(nameElm).focus().blur().get(nameValidationMsg).contains('name is required');
		cy.get(usernameElm).focus().blur().get(usernameValidationMsg).contains('Required');
		cy.get(emailElm).focus().blur().get(emailValidationMsg).contains('Required');
		cy.get(websiteElm).focus().blur().get(websiteValidationMsg).contains('Required');
	});

	it('should be store a new user', () => {
		cy.visit('/users/new');
		cy.get(nameElm).type('Hossein');
		cy.get(usernameElm).type('HosseinJafari');
		cy.get(emailElm).type('j.hossein024@gmail.com');
		cy.get(websiteElm).type('http://google.com');
		cy.get(btnSubmit).should('not.have.attr', 'disabled').contains('Register').click();
		cy.wait(2000);
		cy.location('pathname').should('eq', '/users');
	});

	it('should be show email and website pattern',()=> {
		cy.visit('/users/new');
		cy.get(emailElm).type('j.hossein024');
		cy.get(emailElm).focus().blur().get(emailValidationMsg).contains('please enter valid email.');
		cy.get(websiteElm).type('google');
		cy.get(websiteElm).focus().blur().get(websiteValidationMsg).contains('Please enter valid website url');
	});

});
