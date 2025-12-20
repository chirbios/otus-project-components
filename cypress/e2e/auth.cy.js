describe('Авторизация', () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    cy.clearLocalStorage()
    cy.visit('/auth')
  })

  it('должна показывать форму авторизации', () => {
    cy.get('h2').should('contain.text', 'Авторизация')
    cy.get('input[name="authLogin"]').should('be.visible')
    cy.get('input[name="authPassword"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain.text', 'Войти')
    cy.contains('Демо-доступ: любой логин и пароль').should('be.visible')
  })

  it('должна показывать ошибки валидации', () => {
    // Короткий логин
    cy.get('input[name="authLogin"]').type('ab')
    cy.get('input[name="authPassword"]').type('123')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Логин должен быть не менее 3 символов').should('be.visible')
    cy.contains('Пароль должен быть не менее 4 символов').should('be.visible')
  })

  it('должна успешно авторизовывать с валидными данными', () => {
    // Используем реальные данные из вашего компонента
    cy.get('input[name="authLogin"]').type('testuser')
    cy.get('input[name="authPassword"]').type('password123')
    
    // Перехватываем вызовы к console.log
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog')
    })
    
    cy.get('button[type="submit"]').click()
    
    // Ждем появления сообщения об успехе
    cy.contains('Вы успешно авторизовались', { timeout: 2000 }).should('be.visible')
    
    // Проверяем, что произошел редирект на /create
    cy.url({ timeout: 3000 }).should('include', '/create')
  })

  it('должна показывать сообщение об успехе', () => {
    cy.get('input[name="authLogin"]').type('anyuser')
    cy.get('input[name="authPassword"]').type('anypassword')
    cy.get('button[type="submit"]').click()
    
    // Проверяем, что появилось зеленое сообщение об успехе
    cy.get('.success-message', { timeout: 2000 })
      .should('be.visible')
      .and('contain.text', 'Вы успешно авторизовались')
  })

  it('должна перенаправлять после успешной авторизации', () => {
    cy.get('input[name="authLogin"]').type('admin')
    cy.get('input[name="authPassword"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Ждем редиректа на /create
    cy.url({ timeout: 4000 }).should('eq', Cypress.config().baseUrl + '/create')
  })

  it('должна обновлять header после авторизации', () => {
    cy.get('input[name="authLogin"]').type('john')
    cy.get('input[name="authPassword"]').type('doe123')
    cy.get('button[type="submit"]').click()
    
    // После авторизации должны увидеть приветствие в header
    cy.get('nav', { timeout: 3000 }).within(() => {
      cy.contains('Привет, john!').should('be.visible')
      cy.contains('Выйти').should('be.visible')
      cy.contains('Войти').should('not.exist')
    })
  })
})