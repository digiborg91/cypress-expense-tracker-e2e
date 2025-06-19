/// <reference types="cypress" />

import { ReqResApi } from '../../support/api/ReqResApi'

describe('ReqRes.in API E2E Tests', () => {
  const api = new ReqResApi()

  it('GET - should retrieve a single user', () => {
    api.getUser(2).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data).to.have.property('id', 2)
      expect(res.body.data).to.have.property('email')
    })
  })

  it('POST - should create a new user', () => {
    api.createUser('Johny', 'Test Engineer').then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.include({ name: 'Johny', job: 'Test Engineer' })
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('createdAt')
    })
  })

  it('PUT - should update user details completely', () => {
    api.updateUser(2, { name: 'Johny Updated', job: 'Lead QA' }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.include({ name: 'Johny Updated', job: 'Lead QA' })
      expect(res.body).to.have.property('updatedAt')
    })
  })

  it('PATCH - should update user details partially', () => {
    api.patchUser(2, { job: 'Senior QA' }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('job', 'Senior QA')
      expect(res.body).to.have.property('updatedAt')
    })
  })

  it('DELETE - should delete the user', () => {
    api.deleteUser(2).then((res) => {
      expect(res.status).to.eq(204)
      expect(res.body).to.be.empty
    })
  })
})
