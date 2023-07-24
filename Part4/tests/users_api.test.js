const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('creation succeeds', () => {
  // beforeEach(async () => {
  //   await User.deleteMany({})

  //   const passwordHash = await bcrypt.hash('sekret', 10)
  //   const user = new User({ username: 'root', name: 'Test', passwordHash })

  //   await user.save()
  // })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('different user creation fails',() => {


  test('creation fails with proper statuscode and message if username already taken', async () => {
    console.log('1')
    const newUser = {
      username: 'testuser',
      name: 'Test',
      password: 'sekret'
    }

    await api.post('/api/users').send(newUser).expect(400)
  }, 100000)

  test('creation fails with proper statuscode and message if username is too short', async () => {
    console.log('2')
    const newUser = {
      username: 'te',
      name: 'short user',
      password: 'sekret'
    }

    await api.post('/api/users').send(newUser).expect(400)
  }, 100000)

  test('creation fails with proper statuscode and message if password is too short', async () => {
    console.log('3')
    const newUser = {
      username: 'testuser',
      name: 'Test',
      password: 'se'
    }

    await api.post('/api/users').send(newUser).expect(400)
  }, 100000)

  test('creation fails with proper statuscode and message if username is missing', async () => {
    console.log('4')
    const newUser = {
      name: 'Test',
      password: 'sekret'
    }

    await api.post('/api/users').send(newUser).expect(400)
  }, 100000)

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test'
    }

    await api.post('/api/users').send(newUser).expect(400)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})