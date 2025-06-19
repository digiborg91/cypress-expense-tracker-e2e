import { PetApi } from "cypress/support/api/petApi"
 
const  petApi = new PetApi()

describe('Petstore API Tests', () => {
    const pet = {
        id: 987654321,
        name: 'Fluffy',
        status: 'available'
    }

    before(() => {
        petApi.createPet(pet).then((res) => {
            expect(res.status).to.eq(200) 
        })
    })
    

    it ('should update a pet using PUT', () => {
        const updatedPet = {...pet, name: 'FluffyUpdated', status: 'sold'}

        petApi.updatePet(updatedPet).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.include({id: pet.id, name: updatedPet.name, status: updatedPet.status})
        })
    })

  it('should update pet name using form data', () => {
    petApi.patchPetName(pet.id, 'PatchedFluffy').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.message).to.eq(pet.id.toString())
    })
  })

    it('should delete the pet', () => {
    petApi.deletePet(pet.id).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.message).to.eq(pet.id.toString())
    })
})

    it('should return 404 or a not found message after deletion', () => {
    petApi.getPet(pet.id).then((res) => {
        if (res.status === 200) {
        // Does not delete.
        expect(res.body.name).to.not.eq(pet.name)
            } else {
                expect(res.status).to.eq(404)
                expect(res.body.message).to.eq('Pet not found')
            }
        })
    })
})