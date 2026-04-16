import { useState } from 'react'

const Person = ({ person }) => <div>{person.name}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChangeName = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value)
  }

  const handleAddName = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName
    }
    // Check against duplicates
    if(persons.find((person) => person.name === newPerson.name) !== undefined)
    {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
    }
    else
    {
      setPersons(persons.concat(newPerson))
      setNewName('')
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Person person={person} key={person.name} />)}
    </div>
  )
}

export default App