const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithSeveralBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: "6a0bab8316b932646768c3eb",
      title: "An Example Blog",
      author: "John Smith",
      url: "www.example.blog",
      likes: 17,
      __v: 0
    },
    {
      _id: "6a0bb43a2deb67451b032a3f",
      title: "Another Blog",
      author: "Some Guy",
      url: "www.someguy.com/myblog",
      likes: 3,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
  test('when list has multiple blogs, equals the sum of their likes', () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs)
    assert.strictEqual(result, 25)
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithSeveralBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: "6a0bab8316b932646768c3eb",
      title: "An Example Blog",
      author: "John Smith",
      url: "www.example.blog",
      likes: 17,
      __v: 0
    },
    {
      _id: "6a0bb43a2deb67451b032a3f",
      title: "Another Blog",
      author: "Some Guy",
      url: "www.someguy.com/myblog",
      likes: 3,
      __v: 0
    }
  ]

  test('when list has one entry, returns that entry', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  }),
  test('when list has several entries, retuns the entry with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    assert.deepStrictEqual(result, listWithSeveralBlogs[1])
  })
  test('when list is empty, returns undefined', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, undefined)
  })
})