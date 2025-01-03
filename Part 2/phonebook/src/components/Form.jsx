import React from "react";

const Form = (props) => {

    const {newName,handleNameChange,newNumber,handleNumberChange,handleSubmit} = props
    return(
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}

export default Form