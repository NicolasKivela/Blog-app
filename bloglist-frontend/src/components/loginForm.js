import PropTypes from 'prop-types'

const LoginForm = ({
  errorMessage,
  handleLogin,
  username,
  setUsername,
  password,
  setpassword
}) => {
  return (
    <div>
      {errorMessage}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username

          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id='password'
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setpassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes ={
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired
}
export default LoginForm