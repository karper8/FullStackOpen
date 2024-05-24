import React from "react";

const Filter = (props) =>{
    //Create an array that contains the serach result using the filter function
    const arr = props.persons.filter(person=>props.search === person.name)
    
    const handleChange = (event) => {
        props.setSearch(event.target.value)
        console.log(arr)
    }

    return(
        <div>
        filter shown with <input value={props.search} onChange={handleChange}/>
      </div>
    )
}

export default Filter