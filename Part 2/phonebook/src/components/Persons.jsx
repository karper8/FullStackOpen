import React from "react";
import axios from "axios";  
import personService from '../services/person'

const Persons = (props) =>{

    const handleDelete = (id,name) =>{
        const res = window.confirm(`Delete ${name}`)

        if (res === true){
            personService
            .deletePerson(id)
                .then(response => {
                    personService
                        .getPersons()
                            .then(response => props.setPersons(response.data))
                })
                .catch(err => {
                    personService
                        .getPersons()
                            .then(response => props.setPersons(response.data))
                    props.setError(`${name} has already been deleted.`)
                    setTimeout(()=>props.setError(null),5000)
                })

        }

    }
    return(
        <div>
            {props.persons.map(person => <div key={person.id}> {person.name} {person.number} <button onClick={() => handleDelete(person.id,person.name)}>Delete</button> </div> )}
        </div>
    )
}

export default Persons