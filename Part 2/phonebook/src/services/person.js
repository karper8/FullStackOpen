import axios from "axios";
const baseurl = 'http://localhost:3001/persons'
import App from '../App'

const addPerson = (personObject) =>{
    return axios.post(baseurl,personObject)
}

const getPersons = () => {
    return axios.get(baseurl)
}

const deletePerson = (id) => {
    return axios.delete(`${baseurl}/${id}`)
} 

const updatePerson = (id,personObject) =>{
    return axios.put(`${baseurl}/${id}`,personObject)
}
export default { addPerson, getPersons, deletePerson , updatePerson}