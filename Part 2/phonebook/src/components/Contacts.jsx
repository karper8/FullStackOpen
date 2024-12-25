import React from "react";
import Person from "./Person"

const Contacts = ({search,searchList, persons, handleDelete}) =>{
    if(search){
      return(
        searchList.map(person=> 
          <Person key={person.name} personName={person.name} personNumber={person.number} handleDelete={handleDelete} personId={person.id}/>
      ))
    }else{
      return(
        persons.map(person => 
          <Person key={person.name} personName={person.name} personNumber={person.number} handleDelete={handleDelete} personId={person.id}/>
      ))
    }

}
  

export default Contacts