import React from "react";
import { useState,useEffect } from "react";
import CountryDetails from "./CountryDetails";





const CountryList = ({ item }) => {

    const [clicked,setClicked] = useState(false)
    

    const handleClick = () => {

        clicked ? setClicked(false) : setClicked(true)
       
    }
    

    return(
        <div>
            {clicked ? <div><CountryDetails item={item} /></div>:<div>{item.name.common}</div>}
            <button onClick={()=>{handleClick()}}>{clicked ? 'Close' : 'Show'}</button>
        </div>
    )
}

export default CountryList