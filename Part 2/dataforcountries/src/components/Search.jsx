import React from "react";
import { useEffect,useState } from "react";


const Filter = ({countries,searchQuery}) => {
    const [squeryResult,setQueryResult] = useState([])

    if(searchQuery){
        setQueryResult(countries.filter(country=>country.name.common.toLowerCase().includes(searchQuery.toLowerCase())))
    }else{
        setQueryResult([])
    }

}