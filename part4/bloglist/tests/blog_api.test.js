const assert = require('node:assert')
const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)

beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test("Blogs are returned as JSON", async () => {
    response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test("The correct number of blogs are returned", async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test("Blog objects are returned with correct id field value", async () => {
    const blogs = await helper.blogsInDB()
    const propNames = Object.getOwnPropertyNames(blogs[0])

    assert(propNames.includes('id'))
})

test("Blogs can be added using the post route", async () => {
    const newBlog = {
        title: "A new blog",
        author: "New Author",
        url: 'newblog.blogland.org'
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalBlogs = await helper.blogsInDB()
    const titles = finalBlogs.map(b => b.title)

    assert.strictEqual(finalBlogs.length, helper.initialBlogs.length + 1)

    assert(titles.includes("A new blog"))
})

test("Posted blogs with no likes value will default to 0", async() => {
    const newBlog = {
        title: "Blog without likes",
        url: "gotnolikes.com",
        author: "Jane Doe"
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const finalBlogs = await helper.blogsInDB()
    const addedBlog = finalBlogs.find(b => b.title === 'Blog without likes')

    assert.strictEqual(addedBlog.likes, 0)
})

test("Blogs missing titles or urls will be rejected", async () => {
  const blogNoURL = {
    title: 'This blog has no url',
    author: 'Johnathan NoURL'
  }
  const blogNoAuthor = {
    title: 'This blog has no author',
    url: 'blogswrittenbynobody.com'
  }

  await api.post('/api/blogs')
    .send(blogNoURL)  
    .expect(400)

  await api.post('/api/blogs')
    .send(blogNoAuthor)
    .expect(400)

  const finalBlogs = await helper.blogsInDB()

  assert.strictEqual(finalBlogs.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})