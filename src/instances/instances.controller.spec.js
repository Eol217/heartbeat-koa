const app = require('../app').default
const supertest = require('supertest')
const { instancesService } = require('./instances.service')
const request = supertest(app.callback())


const instanceSample = {
  id: 'someId',
  group: 'someGroup',
  meta: { a: 'abc' }
}

const groupSummary = {
  id: instanceSample.id,
  group: instanceSample.group,
  createdAt: Date.now(),
  lastUpdatedAt: Date.now(),
}

const allGroupsSummary = [groupSummary]

const getGroups = async () => allGroupsSummary


it('gets the test endpoint', async () => {
  instancesService.getGroups = jest.fn().mockImplementation(getGroups)

  const response = await request.get('/')

  expect(response.status).toEqual(200)
  expect(response.body).toEqual(allGroupsSummary)
})
