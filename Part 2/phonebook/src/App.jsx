import { useState,useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [search,setSearch] = useState('')
  const [searchList,setSearchList] = useState([])


  //Using effect hook to request data from the server and updating the persons state to the data recieved as a response to the request.
  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        console.log('HTTP GET reqest was successful')
        setPersons(response.data)
      })
  },[])
  
  //Function to search the persons array for the value enter in the search field.
  // const handleSearch = (event) =>{
  //   console.log(search)
  //  const arr =  persons.filter((person)=>{
  //     event.target.value === person.name
  //   })
  //   console.log(arr)
    
  // }

  // let namesToShow = undefined
  // const isSearchTrue = () =>{
  //   if(search !== ''){
  //     namesToShow = searchList
  //   }else{
  //     namesToShow = persons
  //   }
  //   // console.log(namesToShow)
  // }
  // isSearchTrue()

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} setSearchList={setSearchList} persons={persons}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} persons={persons} number={number} setPersons={setPersons} setNewName={setNewName} setNumber={setNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App
