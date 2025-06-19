// cypress/support/api/ReqResApi.ts

export class ReqResApi {
  baseUrl = 'https://reqres.in/api'
  headers = { 'x-api-key': 'reqres-free-v1' }

  getUser(userId: number) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userId}`,
      headers: this.headers,
    })
  }

  createUser(name: string, job: string) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/users`,
      headers: this.headers,
      body: { name, job }
    })
  }

  updateUser(userId: number, data: object) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}/users/${userId}`,
      headers: this.headers,
      body: data
    })
  }

  patchUser(userId: number, data: object) {
    return cy.request({
      method: 'PATCH',
      url: `${this.baseUrl}/users/${userId}`,
      headers: this.headers,
      body: data
    })
  }

  deleteUser(userId: number) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/users/${userId}`,
      headers: this.headers,
    })
  }
}
