import React from "react";
import axios from "axios"
import { useEffect,useState } from "react";

const CountryDetails = ({item})=>{

    const apiKey = import.meta.env.VITE_SOME_KEY
    let lang_arr = Object.values(item.languages)
    const [temp,setTemp] = useState(null)
    const [windSpeed,setWindSpeed] = useState(null)
    const [weatherIcon,setWeatherIcon] = useState(null)

    useEffect(()=>{
        let temp = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${item.latlng[0]}&lon=${item.latlng[1]}&appid=${apiKey}`)
        temp.then(response=>{
            setTemp(response.data.main.temp)
            setWindSpeed(response.data.wind.speed)
            setWeatherIcon(response.data.weather[0].icon)
    },error =>{"Error occured while fetching weather data.",error})
    })
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    console.log("capital...",item.capital[0])
        return(
        <div>
            <div>
                    <h1>{item.name.common}</h1>
                    <p><b>Capital:</b>{item.capital[0]}</p>
                    <p><b>Area:</b>{item.area}</p>
                    <p><b>Languages:</b></p>
                    <ul>
                        {lang_arr.map(lang=><li key={lang}>{lang}</li>)}
                    </ul>
                    <img src={item.flags.png} width="150" height="100" />
                    <h1>Weather in {item.capital[0]}</h1>
                    <p><b>Temperature:</b>{Math.floor(temp-273.15)} Celcius</p>
                    <img src={iconUrl} width="50" height="50" />
                    <p>wind {windSpeed} m/s</p>
                </div>
        </div>
    )
}

export default CountryDetails