import { useState } from 'react'

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const handleChangeName = (e) => setNewName(e.target.value)

  const handleChangeNumber = (e) => setNewNumber(e.target.value)

  const handleChangeFilter = (e) => setFilterString(e.target.value)

  const handleAddName = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    // Check against duplicates
    if(persons.find((person) => person.name === newPerson.name) !== undefined)
    {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else
    {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } 
  }

  // If our search bar string is empty, we don't want to filter out anyone
  // If we type in the search bar, we want to only show strings that contain that substring
  const peopleToShow = filterString === '' ? persons : persons.filter((person) => 
    person.name.toLowerCase().includes(filterString.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filterString} onChange={handleChangeFilter} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map((person) => <Person person={person} key={person.name} />)}
    </div>
  )
}

export default App