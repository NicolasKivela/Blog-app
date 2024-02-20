import { useState } from 'react'
import Blog from './Blog'



const BlogForm = ({ createBlog, message, handleLogOut,blogs,username,setBlogs }) => {

  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [newTitle, setTitle] = useState('')
  const [blogVisible,setBlogVisible] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newblogs, setnewBlogs] = useState(blogs)


  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)

  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      username: newUsername,
      url: newUrl,
    })
    setAuthor('')
    setUrl('')
    setNewUsername('')
    setTitle('')
  }

  const blogInsert = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }



    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>create</button>
        </div>
        <div style={showWhenVisible}>
          <form onSubmit={addBlog}>
          Blogs
            <p>
              <div>Author
                <input id='author'
                  value={newAuthor}
                  onChange={handleAuthorChange}
                />
              </div>
            </p>
            <p>
            Title
              <input id='title'
                value={newTitle}
                onChange={handleTitleChange}
              />
            </p>
            <p>
            Url
              <input id='url'
                value={newUrl}
                onChange={handleUrlChange}
              />
            </p>

            <button type="submit">save</button>
          </form>
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  return(
    <div>
      {message}
      <h2>blogs</h2>

      {username} logged in <form onSubmit={handleLogOut}>
        <button type='submit'>Logout</button>
      </form>
      {blogInsert()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setnewBlogs={setnewBlogs}/>
      )}
    </div>
  )
}

export default BlogForm