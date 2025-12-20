import '@testing-library/cypress/add-commands'

// Команда для авторизации
Cypress.Commands.add('login', (username = 'testuser', password = 'password123') => {
  cy.visit('/auth')
  cy.get('input[name="authLogin"]').type(username)
  cy.get('input[name="authPassword"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.contains('Вы успешно авторизовались', { timeout: 10000 }).should('be.visible')
})

Cypress.Commands.add('addToCart', (productIndex = 0) => {
  cy.get('.element').eq(productIndex).find('.add-to-cart-btn').click()
})

Cypress.Commands.add('clearCart', () => {
  cy.visit('/cart')
  cy.get('.clear-cart-btn').click()
  cy.contains('Ваша корзина пуста').should('be.visible')
})