import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const req = axios.get(baseUrl)
  const nonExisting = {
    id:10000,
    content: 'This note is not saved in the server',
    important: true
  }
  return req.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const req =  axios.post(baseUrl, newObject)
  return req.then(response => response.data)
}

const update = (id, newObject) => {
  const req =  axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(response => response.data)
}

export default { getAll,create,update }