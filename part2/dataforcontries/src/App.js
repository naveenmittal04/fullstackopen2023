import countryService from './services/countries'
import {useState, useEffect} from 'react'


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
    const keys = Object.keys(country.languages)
    let languages = []
    for(let i = 0; i < keys.length; i++) {
        languages.push({id:i, lan: country.languages[keys[i]]})
    }
    console.log(country.flags)
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
        </div>
    )
}

const Name = ({name, show}) => {
    return (
        <div >
            {name} <button onClick={() => show(name)}>show</button>
        </div>
    )
}
const Countries = ({names, show}) => {
    return (
        <div>
            {names.map(name => <Name name={name} show={show}/>)}
        </div>
    )
}
export default App;
