import React from "react";

const Filter = (props) =>{
   
    
    const handleChange = (event) => {
        props.setSearch(event.target.value)
        console.log(arr)
        //Create an array that contains the serach result using the filter function
        const arr = props.persons.filter(person=>props.search === person.name)
        props.setSearchList(arr)
    }

    return(
        <div>
        filter shown with <input value={props.search} onChange={handleChange}/>
      </div>
    )
}

export default Filter