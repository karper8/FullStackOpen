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
            {clicked ? <div><CountryDetails item={item} /><button onClick={()=>{handleClick()}}>{clicked ? 'Close' : 'Show'}</button></div>:
            <div>{item.name.common} <button onClick={()=>{handleClick()}}>{clicked ? 'Close' : 'Show'}</button></div>} 
            
        </div>
    )
}

export default CountryList