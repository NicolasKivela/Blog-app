import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,blogs, setBlogs,setnewBlogs, }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const addLike = (e) => {
    e.preventDefault()
    console.log('CLICKED')
    setLikes(likes+1)
    const newObject = { likes: likes }
    blogService.edit(blog.id,newObject)

  }
  function removeObjectWithId(arr, id) {

    const objWithIdIndex = arr.filter((obj) => {
      console.log('OBJECTID',obj.id)
      console.log('BLOG ID TO DELETE', id)
      console.log('ARRAY', arr)
      return (obj.id !== id)})


    console.log(objWithIdIndex)
    console.log(arr)
    return objWithIdIndex
  }
  const handleRemove = async (e) => {
    e.preventDefault()
    console.log('REMOVE CLICKED', blog.user)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      await blogService.remove(blog.id, blog.user.id)
      setBlogs(removeObjectWithId(blogs,blog.id))

      setnewBlogs(removeObjectWithId(blogs,blog.id))
    }
  }





  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>
          {blog.title}
        </p>
        <p>{blog.author}</p><p> {blog.url}</p>
        <p>{likes}
          <button onClick={addLike}>Like</button>
        </p>
        <p> {blog.user.username}</p>

        <button onClick={() => setVisible(false)}>hide</button>
      </div>
      <button onClick={handleRemove}>remove</button>
    </div>
  )}

export default Blog