import { useState, useEffect } from 'react'
import personService from './services/persons'
import Messages from './components/message'

const Person = ({ person, deletePerson }) => 
  <>
    <div>
      {person.name} {person.number} <button onClick={deletePerson}>Delete</button>
    </div>
  </>

const SearchBar = ({ filterString, handleChangeFilter }) => 
  <div>
    filter shown with: <input value={filterString} onChange={handleChangeFilter} />
  </div>

const PersonList = ({ persons, deletePersonHandler }) => 
  <>
    <h2>Numbers</h2>
    {persons.map(person => <Person person={person} key={person.id} deletePerson={() => deletePersonHandler(person.id)}/>)}
  </>

const PersonForm = ({ newName, newNumber, handleChangeName, handleChangeNumber, handleAddName }) =>
  <>
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
  </>
  

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  
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
    const personToUpdate = persons.find((person) => person.name === newPerson.name)
    if(personToUpdate !== undefined)
    {
      if(confirm(`${personToUpdate.name} is already in the phonebook, replace the old number with a new one?`))
      {
        const updatedPerson = { ...personToUpdate, number: newNumber }
        personService.updatePerson(updatedPerson)
        .then(data => {
          setPersons(persons.map(person => person.id === updatedPerson.id ? data : person))
          setSuccessMessage(`Updated ${data.name}`)
          setTimeout(() => setSuccessMessage(null), 5000)
        })
      }
      setNewName('')
      setNewNumber('')
    }
    else
    {
      personService.addPerson(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`Added ${person.name}`)
          setTimeout(() => setSuccessMessage(null), 5000)
      })
    } 
  }

  const handleDeletePerson = (id) => {
    // Make sure we find the person to delete
    const person = persons.find(p => p.id === id)
    if(person !== undefined)
    {
      // Get deletion confirmation
      if(confirm(`Delete ${person.name}?`))
      {
        personService.deletePerson(person.id)
        // In case of synchronization issues, this person might already be gone
        .catch(()=>console.log('Could not delete person')
        )
        // Regardless of whether it was found on the server or not we want to remove it from the list
        setPersons(persons.filter(p => p.id !== id))
      }
    }
    else
    {
      console.log("Person not found")
    }
  }
  

  useEffect(() => {
    personService.getAllPersons()
    .then((persons) => setPersons(persons))
  },[]
  )

  // If our search bar string is empty, we don't want to filter out anyone
  // If we type in the search bar, we want to only show strings that contain that substring
  const peopleToShow = filterString === '' ? persons : persons.filter((person) => 
    person.name.toLowerCase().includes(filterString.toLowerCase())
  )

  return (
    <div>
      <Messages.SuccessMessage message={successMessage} />
      <h2>Phonebook</h2>
      <SearchBar filterString={filterString} handleChangeFilter={handleChangeFilter} />
      <PersonForm newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} 
        handleChangeNumber={handleChangeNumber} handleAddName={handleAddName} />
      <PersonList persons={peopleToShow} deletePersonHandler={handleDeletePerson} />
    </div>
  )
}

export default App