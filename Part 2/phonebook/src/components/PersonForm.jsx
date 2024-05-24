import React from "react";

const PersonForm = (props) =>{    
    //Function to  handle onClick event of the submit button in the form
    const handleClick = (event)=>{
        event.preventDefault()
        const newPerson = { name: props.newName , number:props.number }
        
        //Checking if the value of newPerson is already exists in the persons array.
        //If the name already exists an alert is shown or if the name is new it is added to persons array.
        const checkName = props.persons.find(person=>  JSON.stringify(person)===JSON.stringify(newPerson))
        if(checkName===undefined){
        props.setPersons(props.persons.concat(newPerson))
        }else{
        alert(`${props.newName} is already added to the phonebook`)
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