import { useState,useEffect } from 'react'
import Form from './components/Form'
import Search from './components/Search'
import Contacts from './components/Contacts'
import axios from 'axios'
import Notification from './components/Notification'
import personService from './services/person.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search,setSearch] = useState('')
  const [searchList, setSearchList] = useState([])
  const [msg,setMsg] = useState(null)

  useEffect(()=>{
    console.log('effect')
    personService
      .getContacts()
      .then(initialData=>{
        setPersons(initialData)
     })
  },[])

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    const newObject = { name : newName , number: newNumber}
    // setPersons(persons.concat(newObject))

  //  Checking if the new name is already present in the list 
   let stat = false
   let id
   for(let i =0;i<persons.length;i++){
    if(persons[i].name.toLowerCase()===newObject.name.toLowerCase()){
      stat = true
      id = persons[i].id
    }
   }
   if(stat===true){
    const confirm = window.confirm(`${newObject.name} is already added to the phonebook, replace the old number with a new one?`)
    if(confirm){

      //Updates the contact by sending a PUT request to the server if ok is clicked 
      personService
        .updateContact(id,newObject)
        .then(response=>{
          //After the PUT request is made the getContacts is used to fetch the contacts and the persons state is updated.
          personService
          .getContacts()
          .then(response=>{
            setPersons(response)
            setMsg(`Updated ${newObject.name}`)
            setTimeout(()=>{setMsg(null)},5000)
          })
        })
        .catch(err=>{
          setPersons(persons.filter(person=>person.name !== newObject.name))
          setMsg(`Information of ${newObject.name} has already been removed from the server `)
          setTimeout(()=>setMsg(null),5000)
        })
    }
   }else{
    // setPersons(persons.concat(newObject))
    personService
      .newContact(newObject)
      .then(res=>{
        personService
          .getContacts()
          .then(res=>{
            setPersons(res)
            setNewName("")
            setNewNumber("")
            setMsg(`Added ${newObject.name}`)
            setTimeout(()=>setMsg(null),5000)

          })
      })
   }

  }

  const handleSearch = (event)=> {
    console.log(event.target.value)
    setSearch(event.target.value)

    const newList = persons.filter(person=>person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setSearchList(newList)
    
  // const find = persons.find()
    
  }

  const handleDelete = (id)=>{
    const person = persons.find(person=>person.id===id)
   const confirm = window.confirm(`Delete ${person.name}`)
   if(confirm){
    personService
    .deleteContact(id)
    .then(response=>{
      setPersons(persons.filter(person=>person.id !== id))
      setMsg(`Deleted ${person.name}`)
      setTimeout(()=>setMsg(null),5000)
    })
   }
  }
  

  return (
    <div>
      <Notification msg={msg} />
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch} search={search}/>
      <h2>Add a new</h2>
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
      handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Contacts searchList={searchList} persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
