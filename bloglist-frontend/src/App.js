import { useState, useEffect } from 'react'


import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')



  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => {
        return b.likes - a.likes
      })
      setBlogs( blogs )}
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }
  const addBlog = (blogObject) => {


    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessage('YOU ADDED '+blogObject.title+' by '+ blogObject.author)
    setTimeout(() => {
      setMessage('')
    },5000)



  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('Logging in with', username, password)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(expectations){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }





  if(user === null)
  {
    return (

      <LoginForm errorMessage={errorMessage} username={username} setUsername={setUsername}
        handleLogin = {handleLogin} password={password} setpassword={setPassword}/>

    )
  }
  return (




    <BlogForm message = {message} handleLogOut={handleLogOut} createBlog ={addBlog}
      blogs = {blogs} username={username} setBlogs={setBlogs}/>




  )

}

export default App
