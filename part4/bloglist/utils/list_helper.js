const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? undefined : 
        blogs.reduce((prevMax, blog) => prevMax.likes >= blog.likes ? prevMax : blog)
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return undefined
    
    const authors = Object.groupBy(blogs, ({ author }) => author)
    const [ ...authArray ] = Object.getOwnPropertyNames(authors)
    const maxAuthor = authArray.reduce((prevMax, author) => authors[prevMax].length > authors[author].length ? prevMax : author)
    return {
        name: maxAuthor,
        blogs: authors[maxAuthor].length
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}