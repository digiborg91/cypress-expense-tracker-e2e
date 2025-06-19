/// <reference types="cypress" />

describe('API TEST for ', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com'

  it('should fetch a list of posts (Positive Path)', () => {
    cy.request(`${baseUrl}/posts`)
      .its('status')
      .should('eq', 200)

    cy.request(`${baseUrl}/posts`)
      .its('body')
      .should('have.length', 100)
  })

  it('should return a single post with ID 1', () => {
    cy.request(`${baseUrl}/posts/1`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('id', 1)
      expect(res.body).to.have.property('title')
    })
  })

  it('should return 404 for invalid post ID (Negative Path)', () => {
    cy.request({
      url: `${baseUrl}/posts/9999`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })

  it('should create a new post (POST request)', () => {
    cy.request('POST', `${baseUrl}/posts`, {
      title: 'Hello World',
      body: 'This is a Cypress Test Post ',
      userId: 2
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('id')
    })
  })

   it('should update an entire post using PUT', () => {
    cy.request('PUT', `${baseUrl}/posts/1`, {
      id: 1,
      title: 'Updated Title',
      body: 'Updated Body Content',
      userId: 1
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.include({
        id: 1,
        title: 'Updated Title',
        body: 'Updated Body Content',
        userId: 1
      })
    })
  })

  it('should partially update a post using PATCH', () => {
    cy.request('PATCH', `${baseUrl}/posts/1`, {
      title: 'Patched Title Only'
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('title', 'Patched Title Only')
    })
  })

  it('should delete a post by ID', () => {
    cy.request('DELETE', `${baseUrl}/posts/1`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.empty
    })
  })
})
