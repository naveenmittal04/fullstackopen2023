import { useState, useEffect } from 'react'
import personService from './services/persons'
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [filterPersons, setFilterPersons] = useState(persons)

    const remove = (name, id) => {
        if(window.confirm(`Do you want to delete ${name} ?`)) {
            personService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(n => n.id !== id))
                    setFilterPersons(filterPersons.filter(n => n.id !== id))
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
    }, [])
    const handleNewNameOnChange = (event) => {
        console.log(event.target)
        setNewName(event.target.value)
    }
    const handleNewNumberOnChange = (event) => {
        console.log(event.target)
        setNewNumber(event.target.value)
    }

    const handleFormOnSubmit = (event) => {
        event.preventDefault()
        for(let i = 0; i < persons.length; i++) {
            if(persons[i].name === newName) {
                alert(`${newName} is already added to phonebook`)
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
                console.log('new note added to server')
                const copy = persons.concat(responsePerson)
                setPersons(copy)
                setNewName('')
                setNewNumber('')

                if(newName.toLowerCase().includes(filterName.toLowerCase())) {
                    const copy = filterPersons.concat(responsePerson)
                    setFilterPersons(copy)
                }
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
            <h2>Phonebook</h2>
            <Filter filterName={filterName} handleFilterNameOnChange={handleFilterNameOnChange}/>
            <h2>Add a new</h2>
            <PersonForm handleFormOnSubmit={handleFormOnSubmit} newName={newName} handleNewNameOnChange={handleNewNameOnChange} newNumber={newNumber} handleNewNumberOnChange={handleNewNumberOnChange}/>
            <h2>Numbers</h2>
            <Persons persons={filterPersons} remove={remove}/>
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