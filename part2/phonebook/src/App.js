import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
        id: 1,
        name: 'Arto Hellas'
    }
  ])
  const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
            id: (persons[persons.length-1].id + 1),
            name: newName,
            number: newNumber
        }
        const copy = persons.concat(inputPerson)
        setPersons(copy)
        setNewName('')
        setNewNumber('')
    };
    return (
      <div>
        <h2>Phonebook</h2>
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
        <h2>Numbers</h2>
          {persons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
      </div>
  )
}

export default App