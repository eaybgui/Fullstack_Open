const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const login = async () => {
  const login = await api.post('/api/login').send({ username: 'testuser', password: 'secret12' })
  return login.body.token
}

describe('when there is initially some blogs saved', () => {

  test('2 blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(response => {
        expect(response.body).toHaveLength(2)
      })
  }, 100000)

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 100000)
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0
    }

    const token = await login()
    console.log(token)
    const response = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': 'bearer ' + token })
    console.log(response.body)
    expect(response.status).toBe(201)
    expect(response.body.title).toBe('Test Blog')
    expect(response.body.author).toBe('Test Author')
    expect(response.body.url).toBe('http://testurl.com')
    expect(response.body.likes).toBe(0)
    

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(4)
  }, 100000)

  test('if likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com'
    }
    const token = await login()
    const response = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': 'bearer ' + token })
    expect(response.body.likes).toBe(0)
  }, 100000)

  test('if title and url properties are missing backend response code is 400', async () => {
    const newBlog = {
      author: ' Test',
      likes: 10
    }
    const token = await login()
    await api.post('/api/blogs').send(newBlog).set({ 'Authorization': 'bearer ' + token }).expect(400)
  }, 100000)

  test('if token is not given response code is 401', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0
    }
    await api.post('/api/blogs').send(newBlog).expect(401)
  }, 100000)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(1)
  }, 100000)
})

describe('updating a blog', () => {
  test('likes update succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body[0].likes).toBe(1)
  }, 100000)
})


afterAll(() => {
  mongoose.connection.close()
})