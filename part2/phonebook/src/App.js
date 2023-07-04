import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
        id: 1,
        name: 'Arto Hellas'
    }
  ])
  const [newName, setNewName] = useState('')

    const handleNewNameOnChange = (event) => {
        console.log(event.target)
        setNewName(event.target.value)
    }

    const handleFormOnSubmit = (event) => {
        event.preventDefault()
        const inputPerson = {
            id: (persons[persons.length-1].id + 1),
            name: newName,
        }
        const copy = persons.concat(inputPerson)
        setPersons(copy)
        setNewName('')
    };
    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={handleFormOnSubmit}>
          <div>
            name: <input value={newName} onChange={handleNewNameOnChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
          {persons.map(person => <div key={person.id}>{person.name}</div>)}
      </div>
  )
}

export default App