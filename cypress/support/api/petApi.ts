export class PetApi {
  baseUrl = 'https://petstore.swagger.io/v2'
  
  createPet(pet: { id: number; name: string; status: string }) {
    return cy.request('POST', `${this.baseUrl}/pet`, pet)
  }

  updatePet(pet: { id: number; name: string; status: string }) {
    return cy.request('PUT', `${this.baseUrl}/pet`, pet)
  }

  patchPetName(petId: number, newName: string) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/pet/${petId}`,
      form: true,
      body: {
        name: newName
      }
    })
  }

  deletePet(petId: number) {
    return cy.request('DELETE', `${this.baseUrl}/pet/${petId}`)
  }

  getPet(petId: number) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/pet/${petId}`,
      failOnStatusCode: false
    })
  }
}
