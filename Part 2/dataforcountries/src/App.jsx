import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Countries from './components/Countries'



function App() {
  const [countries,setCountries] = useState([])
  const [search,setSearch] = useState('')
  const [queryResult,setQueryResult] = useState([])

  useEffect(()=>{
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    const res = axios.get(url)
                  .then(response=> {setCountries(response.data)
                  })
                  .catch(error => console.log('Error occurred', error))
  },[])

  useEffect(()=>{
    if(queryResult){
      if(queryResult.length > 10 ){
        console.log('Too many matches, specify another filter')
      }else if(queryResult.length <= 10 && queryResult.length > 1){
        console.log(queryResult)
      }else if(queryResult.length == 1){
        console.log(queryResult[0].capital[0])
      }
    }
  },[queryResult])

  const handleChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
    console.log(event.target.value)
    
    if(event.target.value ){
      const res = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      console.log(res)
      setQueryResult(res)
      console.log(queryResult)
    }
    
  }

  

  

  

  return (
    <div>
      <form>Find countries <input value={search} onChange={handleChange}></input></form>
      <Countries arr={queryResult} CountryList={CountryList} setQueryResult={setQueryResult} />
    </div>
  )
}

export default App
