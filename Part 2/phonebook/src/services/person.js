import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getContacts = () =>{
    const req = axios.get(baseUrl)
    return req.then(response=>response.data)
}

const newContact = (object) =>{
    const req = axios.post(baseUrl,object)
    return req.then(response=>response.data)
} 


const deleteContact = (id) =>{
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response=>response.data)
}

const updateContact = (id, object) =>{
    const req = axios.put(`${baseUrl}/${id}`,object)
    return req.then(response=>response.data)
}

export default { getContacts, newContact, deleteContact,updateContact }