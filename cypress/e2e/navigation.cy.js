describe('Навигация по приложению', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('должна показывать разные меню для авторизованных и неавторизованных пользователей', () => {
    // Неавторизованный пользователь
    cy.get('nav a[href="/auth"]').should('be.visible')
    cy.get('nav a[href="/create"]').should('not.exist')
    cy.get('nav a[href="/cart"]').should('not.exist')

    // Авторизуемся
    cy.login()

    // Авторизованный пользователь
    cy.get('nav a[href="/create"]').should('be.visible')
    cy.get('nav a[href="/cart"]').should('be.visible')
    cy.get('nav a[href="/auth"]').should('not.exist')
    cy.get('.user-info').should('be.visible')
  })

  it('должна переходить между страницами', () => {
    // Главная
    cy.get('nav a[href="/"]').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Авторизация
    cy.get('nav a[href="/auth"]').click()
    cy.url().should('include', '/auth')

    // После авторизации
    cy.login()
    
    // Создание товара
    cy.get('nav a[href="/create"]').click()
    cy.url().should('include', '/create')

    // Корзина
    cy.get('nav a[href="/cart"]').click()
    cy.url().should('include', '/cart')

    // Оформление заказа
    cy.get('nav a[href="/order"]').click()
    cy.url().should('include', '/order')
  })

  it('должна показывать активную ссылку в навигации', () => {
    cy.get('nav a[href="/"]').click()
    cy.get('nav a[href="/"]').should('have.class', 'router-link-active')

    cy.get('nav a[href="/auth"]').click()
    cy.get('nav a[href="/auth"]').should('have.class', 'router-link-active')
  })
})