import countryService from './services/countries'
import {useState, useEffect} from 'react'
import axios from "axios";


function App() {
    const [countries, setCountries] = useState([])
    const [display, setDisplay] = useState([])
    const [names, setNames] = useState([])
    const [value, setValue] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState([])

    useEffect(
        () => {
            countryService
                .getAll()
                .then(
                    response => {
                        console.log("got data from server")
                        setCountries(response.data)
                        console.log(response.data)
                        const copyNames = response.data.map(n => n.name.common)
                        setNames(copyNames)
                        console.log(copyNames)
                    }
                )
                .catch(() => {
                    console.log("something went wrong")
                })
        }, []
    )

    const show = (name) => {
        console.log("show " + name)
        setState("single")
        setCountry(countries.find(country => country.name.common === name))
    }
    const handleOnChange = (event) => {
        console.log(event.target)
        setValue(event.target.value)
        const copy = names.filter(name => name.toLowerCase().includes(event.target.value.toLowerCase()))
        if(copy.length > 10){
            setState("too_many")
        } else if(copy.length === 1){
            setState("single")
            setCountry(countries.find(country => country.name.common === copy[0]))
        } else {
            setState("some")
            setDisplay(copy)
        }
    }
    return (
        <div>
            <p>find countries</p>
            <form>
                <input value={value} onChange={handleOnChange}/>
            </form>
            {state.includes("too_many") ? <p>Too many matches, specify another filter </p>: null}
            {state.includes("some") ? <Countries names={display} show={(name)=>show(name)}/>: null}
            {state.includes("single") ? <Country country={country} />:null}
        </div>
    );
}


const Country = ({country}) => {
    const [iconUrl, setIconUrl] = useState()
    const [temp, setTemp] = useState(0)
    const keys = Object.keys(country.languages)
    let languages = []
    for(let i = 0; i < keys.length; i++) {
        languages.push({id:i, lan: country.languages[keys[i]]})
    }
    console.log(country.flags)
    let weather = null
    const api_key = process.env.REACT_APP_API_KEY
    useEffect( () => {
            axios
                .get("https://api.openweathermap.org/data/2.5/weather?lat=" + country.latlng[0] + "&lon=" + country.latlng[1] + "&appid="+api_key)
                .then(response => {
                    console.log(response)
                    weather = response.data
                    setTemp(weather.main.temp)
                    console.log("temp " + weather.main.temp)
                    let code = weather.weather[0].icon
                    console.log("code " + code)
                    setIconUrl("https://openweathermap.org/img/wn/" + code + "@2x.png")
                    console.log("iconUrl " + iconUrl + code + "@2x.png")
                })
        }, []
    )
    return (
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital[0]}
            <br/>
            area {country.area}
            <h2>languages:</h2>
            <ul>
                {
                    languages.map(lan => <li key={lan.id}>{lan.lan} </li>)
                }
            </ul>
            <img src={country.flags.png} alt={"flag"}/>
            <h2>Weather of {country.name.common}</h2>
            temperature {temp-273.15} Celsius
            <br/>
            {iconUrl === null ? <img src={iconUrl} alt={"weather icon"}/>: null}
        </div>
    )
}

const Name = ({ name, show}) => {
    return (
        <div>
            {name} <button onClick={() => show(name)}>show</button>
        </div>
    )
}
const Countries = ({names, show}) => {
    return (
        <div>
            {names.map((name,id) => <Name key={id} name={name} show={show}/>)}
        </div>
    )
}
export default App;
