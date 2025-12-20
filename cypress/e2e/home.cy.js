describe('Главная страница', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('должна отображать список товаров', () => {
    cy.get('.products-list .element').should('have.length.at.least', 1)
    cy.contains('Список товаров').should('be.visible')
  })

  it('должна фильтровать товары по цене', () => {
    cy.get('input[placeholder="0"]').type('500')
    cy.get('input[placeholder="100000"]').type('1000')
    cy.get('.products-list .element').should('have.length.at.least', 1)
  })

  it('должна показывать статистику фильтров', () => {
    cy.get('.filter-stats').should('contain.text', 'Найдено товаров')
  })

  it('должна переходить на страницу товара при клике', () => {
    cy.get('.element').first().click()
    cy.url().should('include', '/product/')
  })
})