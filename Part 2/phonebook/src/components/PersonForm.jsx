import React from "react";
import axios from "axios";
import personService from "../services/person";
import Notification from "./Notification"

const PersonForm = (props) =>{    
    //Function to  handle onClick event of the submit button in the form
    const handleClick = (event)=>{
        event.preventDefault()
        const newPerson = { "name": props.newName , "number":props.number, "id": String(props.persons.length +1) }

        /*This checks whether any object in the persons array has the same name as the one provided by the user
        if the name already exists is returns the object or else  it returns undefined */
        const res = props.persons.find(person => person.name === newPerson.name)
        if(res === undefined){
          const url = `http://localhost:3001/persons`
          personService
            .addPerson(newPerson)
          props.setPersons(props.persons.concat(newPerson))
          props.setError(`Added ${newPerson.name}`)
          setTimeout(() => props.setError(null),5000)
        }else if(res.number !== newPerson.number){
          const yes = window.confirm(`${res.name} is already added to the phonebook, replace the old number with a new one?`)
          if(yes === true){
            personService
              .updatePerson(res.id,newPerson)
                .then(response => {
                  personService
                    .getPersons()
                      .then(response=>props.setPersons(response.data))
                })
                .catch(err=>{
                  personService
                    .getPersons()
                      .then(response=>props.setPersons(response.data))
                  props.setError(`${newPerson.name} has already been removed`)
                  setTimeout(()=>props.setError(null),5000)
                })
          }
        }else{
          alert(`${newPerson.name} is already added to the phonebook`)
        }

    }

   return (<form>
        <div>
          name: <input value={props.newName} onChange={(event)=>props.setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={props.number} onChange={(event)=>props.setNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>)
}

export default PersonForm