import axios from 'axios'

const baseUrl = '/api/blogs'
let token =null

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}
const setToken = newToken => {
  token =`bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization : token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const edit = (id, newblog) => {
  console.log('editing')
  console.log('URL:', `${baseUrl}/${id}`)
  const request = axios.put(`${baseUrl}/${id}`, newblog)

  return request.data
}
const remove = async (id, userid) => {
  console.log('removing...', `${baseUrl}/${id}`)
  console.log('USERID', userid)
  const response = await axios.delete(`${baseUrl}/${id}`,{ data:{ user: userid } })

  return response.data
}

const exportedObject ={ getAll, setToken, create, edit,remove }



export default exportedObject