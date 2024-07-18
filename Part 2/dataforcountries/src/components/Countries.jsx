import React from "react";
import { useEffect,useState } from "react";
import CountryList from "./CountryList.jsx"
import CountryDetails from "./CountryDetails.jsx";

const Countries = ({arr,CountryList,setQueryResult}) => {
    if(arr.length != 0){
        if(arr.length>10){
            return(
                <div>Too many matches,specify another filter.</div>
            )
        }else if(arr.length<=10 && arr.length>1){
            return(
                <div>
                    {arr.map(items=><CountryList item={items} key={items.cca3}/>)}
                </div>
            )
        }else if(arr.length == 1 ){
            let lang_arr = Object.values(arr[0].languages)
            return(
                <CountryDetails item={arr[0]} />
            )
        }
    }
        
}

export default Countries