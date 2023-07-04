import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [filterPersons, setFilterPersons] = useState(persons)
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
          <form >
              <div>
                  filter shown with <input value={filterName} onChange={handleFilterNameOnChange}/>
              </div>
          </form>
          <h2>add a new</h2>
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
          {filterPersons.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
      </div>
  )
}

export default App