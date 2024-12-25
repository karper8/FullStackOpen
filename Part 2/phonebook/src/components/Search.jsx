import React from "react";


const Search = (props) =>{
    return( 
      <input value={props.search} onChange={props.handleSearch}/>
    )
}

export default Search