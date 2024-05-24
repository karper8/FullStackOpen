import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [search,setSearch] = useState('')
  const [searchList,setSearchList] = useState([])



  
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
