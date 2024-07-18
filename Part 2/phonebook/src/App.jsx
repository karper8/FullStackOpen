import { useState,useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'
import persronService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [search,setSearch] = useState('')
  const [searchList,setSearchList] = useState([])
  const [error,setError] = useState (null)


  //Using effect hook to request data from the server and updating the persons state to the data recieved as a response to the request.
  useEffect(()=>{
    persronService
      .getPersons() 
      .then(response=>{
        console.log('HTTP GET reqest was successful')
        setPersons(response.data)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error}/>
      <Filter search={search} setSearch={setSearch} setSearchList={setSearchList} persons={persons}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} persons={persons} number={number} setPersons={setPersons} setNewName={setNewName} setNumber={setNumber} setError={setError}/>
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} setError={setError}/>
    </div>
  )
}

export default App
