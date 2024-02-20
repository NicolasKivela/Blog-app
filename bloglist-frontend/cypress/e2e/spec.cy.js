describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Nicolas Kivelä',
      username: 'naico',
      password: 'ismo'
    }
    const user2 = {
      name: 'jarmo makkonen',
      username: 'jaki',
      password: 'kee'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })
  it('Login form is shown', function() {

    cy.get('input:first')
    cy.get('input:last')
    cy.contains('login').click()

  })
})
describe('Login',function() {
  it('succeeds with correct credentials', function() {
    cy.get('input:first').type('naico')
    cy.get('input:last').type('ismo')
    cy.contains('login').click()
    cy.contains('logged in')
    cy.contains('Logout').click()
  })

  it('fails with wrong credentials', function() {
    cy.get('input:first').type('jaki')
    cy.get('input:last').type('kee')
    cy.contains('login').click()
    cy.contains('wrong credentials')
    cy.get('input:first').clear()
    cy.get('input:last').clear()
  })
})
describe('Blog app', function() {
  // ...

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('naico')
      cy.get('input:last').type('ismo')
      cy.contains('login').click()
      cy.contains('logged in')
    })

    it('A blog can be created', function() {
      cy.contains('create').click().wait(500)
      //ei löydä inputin id
      cy.get('input:first').type('moi')

      cy.get('input:last').type('koi')
      //cy.get('.url').type('poi')
      cy.contains('save').click()
      cy.contains('YOU ADEED by moi')
    })
    it('like clicked', function () {

    })
  })

})