// / <reference types='cypress' />

/** DEBUGGING
 * it.only exécute le scénario uniquement
 * it.skip permet de sauter le scénario
 */

describe('Nom de la Suite de Tests', ()=>{
    it('Visite du site', ()=>{
        cy.visit('http://localhost:3000/dashboard')
    })
    it('Test du Login', ()=>{
        cy.get('.LoginMail').type('suzie.romanov@immoco.fr')
        .should('have.value', 'suzie.romanov@immoco.fr')
    })
    it('Test du Password', ()=>{
        cy.get('.LoginPassword').type('suzieRo')
        .should('have.value', 'suzieRo')
    })
    it('Tentative de connexion à l\'application sans entrer de login ni de mot de passe', ()=>{
        cy.get('[data-cy=LoginPageButton]').click()
    })
})