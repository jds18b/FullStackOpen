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
    const maxAuthor = authArray.reduce((prevMax, author) => authors[prevMax].length >= authors[author].length ? prevMax : author)
    return {
        name: maxAuthor,
        blogs: authors[maxAuthor].length
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return undefined
    
    const authors = Object.groupBy(blogs, ({ author }) => author)
    const [ ...authArray ] = Object.getOwnPropertyNames(authors).map(author => {
        return {
            name: author,
            likes: totalLikes(authors[author])
        }
    })
    const maxAuthor = authArray.reduce((prevMax, author) => prevMax.likes >= author.likes ? prevMax : author)
    return maxAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}