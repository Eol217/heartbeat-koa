const app = require('../app').default
const supertest = require('supertest')
const { instancesService } = require('./instances.service')
const request = supertest(app.callback())


const instanceSample = {
  id: 'someId',
  group: 'someGroup',
  meta: { a: 'abc' },
  createdAt: Date.now(),
  updatedAt: Date.now(),
}
const oneGroupInstances = [instanceSample]

const groupSummary = {
  id: instanceSample.id,
  group: instanceSample.group,
  createdAt: instanceSample.createdAt,
  lastUpdatedAt: instanceSample.updatedAt,
}
const allGroupsSummary = [groupSummary]
const getGroups = async () => allGroupsSummary

describe('InstancesController tests', () => {
  describe('"/:group/:id" endpoint tests', () => {
    describe('post requests', () => {
      beforeAll(() => {
        instancesService.findOne = jest.fn().mockImplementation(async () => instanceSample)
      })

      it('creates a new instance if an instance with the same id not present in db', async () => {
        instancesService.doesExist = jest.fn().mockReturnValue(false)
        instancesService.create = jest.fn()
        instancesService.updateTimestampAndMeta = jest.fn()

        const response = await request.post(`/${instanceSample.group}/${instanceSample.id}`)

        expect(response.status).toEqual(201)
        expect(response.body).toEqual(instanceSample)
        expect(instancesService.create).toBeCalled()
        expect(instancesService.updateTimestampAndMeta).not.toBeCalled()
      })

      it('updates an existing instance if an instance with the same id is found in db', async () => {
        instancesService.doesExist = jest.fn().mockReturnValue(true)
        instancesService.create = jest.fn()
        instancesService.updateTimestampAndMeta = jest.fn()

        const response = await request.post(`/${instanceSample.group}/${instanceSample.id}`)

        expect(response.status).toEqual(200)
        expect(response.body).toEqual(instanceSample)
        expect(instancesService.create).not.toBeCalled()
        expect(instancesService.updateTimestampAndMeta).toBeCalled()
      })
    })

    describe('delete requests', () => {
      it('if the instance is found, it is removed', async () => {
        instancesService.remove = jest.fn().mockReturnValue(true)
        const response = await request.delete(`/${instanceSample.group}/${instanceSample.id}`)

        expect(response.status).toEqual(204)
        expect(response.body).toEqual({})
        expect(response.text).toEqual('')
      })

      it('if the instance is not found, 404 is returned', async () => {
        instancesService.remove = jest.fn().mockReturnValue(false)
        const response = await request.delete(`/${instanceSample.group}/${instanceSample.id}`)

        expect(response.status).toEqual(404)
        expect(response.body).toEqual({})
        expect(response.text).toEqual('Not Found')
      })
    })

    describe('get requests', () => {
      it('not allowed', async () => {
        const response = await request.get(`/${instanceSample.group}/${instanceSample.id}`)

        expect(response.status).toEqual(405)
        expect(response.body).toEqual({})
        expect(response.text).toEqual('Method Not Allowed')
      })
    })
  })

  describe('"/" endpoint tests', () => {
    describe('get requests', () => {
      it('returns an all groups summary on a get request', async () => {
        instancesService.getGroups = jest.fn().mockImplementation(getGroups)

        const response = await request.get('/')

        expect(response.status).toEqual(200)
        expect(response.body).toEqual(allGroupsSummary)
      })
    })
  })

  describe('"/:group" endpoint tests', () => {
    describe('get requests', () => {
      it('fetches instances of one group on a get request and returns them if any', async () => {
        instancesService.getGroupInstances = jest.fn().mockReturnValue(oneGroupInstances)

        const response = await request.get(`/${instanceSample.group}`)

        expect(response.status).toEqual(200)
        expect(response.body).toEqual(oneGroupInstances)
      })

      it('returns 404 end an empty response body if the group is not found', async () => {
        instancesService.getGroupInstances = jest.fn().mockReturnValue([])

        const response = await request.get(`/${instanceSample.group}`)

        expect(response.status).toEqual(404)
        expect(response.body).toEqual({})
        expect(response.text).toEqual('Not Found')
      })
    })
  })

  describe('"/:group/:id" endpoint tests', () => {
    describe('get requests', () => {
      it('fetches instances of one group and returns them if any', async () => {
        instancesService.getGroupInstances = jest.fn().mockReturnValue(oneGroupInstances)

        const response = await request.get(`/${instanceSample.group}`)

        expect(response.status).toEqual(200)
        expect(response.body).toEqual(oneGroupInstances)
      })

      it('returns 404 and an empty response body if the group is not found', async () => {
        instancesService.getGroupInstances = jest.fn().mockReturnValue([])

        const response = await request.get(`/${instanceSample.group}`)

        expect(response.status).toEqual(404)
        expect(response.body).toEqual({})
        expect(response.text).toEqual('Not Found')
      })
    })
  })
})
