import { useState, useEffect } from 'react'
import personService from './services/persons'
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [filterPersons, setFilterPersons] = useState(persons)
    const [message, setMessage] = useState(null)
    const [color, setColor] = useState("")

    const setNotifocation = (message, isError) => {
        if(isError){
            setColor("red")
        } else {
            setColor("green")
        }
        setMessage(message)
        setTimeout(()=>{
            setMessage(null)
        }, 5000)
    }
    const remove = (name, id) => {
        if(window.confirm(`Do you want to delete ${name} ?`)) {
            personService
                .remove(id)
                .then(() => {
                    setPersons(persons.filter(n => n.id !== id))
                    setFilterPersons(filterPersons.filter(n => n.id !== id))
                    setNotifocation(`${name} Deleted.`, false)
                })
                .catch(response => {
                    console.log(response)
                    if(response.response.status === 404) {
                        setPersons(persons.filter(n => n.id !== id))
                        setFilterPersons(filterPersons.filter(n => n.id !== id))
                        setNotifocation(`${name} Already Deleted`, true)
                    }
                })
        }
    }

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(responsePersons => {
                console.log('promise fulfilled')
                setPersons(responsePersons)
                setFilterPersons(responsePersons)
            })
            .catch(error => {
                console.log(error)
                setNotifocation('Failed to load Data from DB', true)
            })
    }, [])
    const handleNewNameOnChange = (event) => {
        console.log(event.target)
        setNewName(event.target.value)
    }
    const handleNewNumberOnChange = (event) => {
        console.log(event.target)
        setNewNumber(event.target.value)
    }

    const update = (person, newNumber) => {
        const inputPerson = {
            ...person,
            number: newNumber
        }
        personService
            .update(person.id, inputPerson)
            .then(() => {
                setPersons(persons.map(n => (n.id !== person.id) ? n:inputPerson))
                setFilterPersons(filterPersons.map(n => (n.id !== person.id) ? n:inputPerson))
                setNotifocation(`${person.name} Updated.`, false)
                setNewName('')
                setNewNumber('')
            })
            .catch(error => {
                console.log(error)
                setNotifocation('Failed to Update in DB', true)
            })
    }

    const handleFormOnSubmit = (event) => {
        event.preventDefault()
        for(let i = 0; i < persons.length; i++) {
            if(persons[i].name === newName) {
                if(window.confirm(`${newName} is already added to phonebook, replace old phone number ?`)){
                    update(persons[i], newNumber)
                }
                return
            }
        }
        const inputPerson = {
            //id: (persons[persons.length-1].id + 1),
            name: newName,
            number: newNumber
        }

        personService
            .create(inputPerson)
            .then(responsePerson => {
                console.log('new person added to server')
                setNotifocation(`${responsePerson.name} Added.`)
                const copy = persons.concat(responsePerson)
                setPersons(copy)
                setNewName('')
                setNewNumber('')

                if(newName.toLowerCase().includes(filterName.toLowerCase())) {
                    const copy = filterPersons.concat(responsePerson)
                    setFilterPersons(copy)
                }
            })
            .catch(error => {
                console.log(error)
                setNotifocation('failed to add new person to Database', true)
            })


    };

    const handleFilterNameOnChange = (event) => {
        console.log(event.target)
        setFilterName(event.target.value)
        const copy = []
        for(let i = 0; i < persons.length; i++) {
            if(persons[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
                copy.push(persons[i])
            }
        }
        setFilterPersons(copy)
    };
    return (
        <div>
            <Notification message={message} setMessage={setMessage} color={color}/>
            <h2>Phonebook</h2>
            <Filter filterName={filterName} handleFilterNameOnChange={handleFilterNameOnChange}/>
            <h2>Add a new</h2>
            <PersonForm handleFormOnSubmit={handleFormOnSubmit} newName={newName} handleNewNameOnChange={handleNewNameOnChange} newNumber={newNumber} handleNewNumberOnChange={handleNewNumberOnChange}/>
            <h2>Numbers</h2>
            <Persons persons={filterPersons} remove={remove}/>
        </div>
    )
}

const Notification = ({message, setMessage, color}) => {
    const notificationStyle = {
        color: color,
        background: "lightgray",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        fontSize: 20
    }
    if(message === null){
        return null;
    }
    setTimeout(()=>{
        setMessage(null)
    }, 5000)
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}
const Filter = ({filterName, handleFilterNameOnChange}) => {
    return (
        <form >
            <div>
                filter shown with <input value={filterName} onChange={handleFilterNameOnChange}/>
            </div>
        </form>
    )
}

const PersonForm = ({newName, handleNewNameOnChange, newNumber, handleNewNumberOnChange, handleFormOnSubmit}) => {
    return (
        <form onSubmit={handleFormOnSubmit}>
            <div>
                name: <input value={newName} onChange={handleNewNameOnChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumberOnChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({person, remove}) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => remove(person.name, person.id)}>delete</button>
        </div>
    )
}
const Persons = ({persons, remove}) => {
    return (
        <div>
            {persons.map(person => <Person key={person.id} person={person} remove={remove} />)}
        </div>
    )
}
export default App