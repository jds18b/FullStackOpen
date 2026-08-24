const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'An example blog',
        author: 'John Smith',
        likes: 17,
        url: 'www.example.blog'
    },
    {
        title: 'Another blog',
        author: 'Joe Public',
        likes: 3,
        url: 'guywithablog.com/myblog'
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}