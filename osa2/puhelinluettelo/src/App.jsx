import { useState, useEffect } from 'react'

import personsService from './services/personsService'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  // Fetch the persons initially when the page is loaded using the service
  useEffect(() => {
    getAllPersons()
  }, [])

  // Functions
  const getAllPersons = () => {
    personsService
      .getAll()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      personsService
      .remove(id)
      .then(returnedPerson => {
        console.log(`Deleted person ${returnedPerson.name} with number ${returnedPerson.number}`)
        getAllPersons()
      })
    }
  }

  // Change handling
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h1>Phonebook</h1>

      <h2>Find persons by name</h2>
      <Filter
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      />

      <h2>Add new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchName={searchName}
        deletePerson={deletePerson}
      />
    </>
  )

}

export default App