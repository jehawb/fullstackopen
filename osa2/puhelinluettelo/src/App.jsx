import { useState, useEffect } from 'react'

import personsService from './services/personsService'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

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

  const showMessage = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)   // type checked in the component
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    // Check if there is already person with that name
    const foundPerson = persons.find(person => person.name === newName)

    if (foundPerson) {
      if (window.confirm(`${newName} found in the phonebook, replace the old number with the new one?`)) {
        personsService
          .update(foundPerson.id, newPerson)
          .then(
            returnedPerson => {
              showMessage(`Person '${returnedPerson.name}' updated`)
              getAllPersons()   // Would it be better to manipulate the local state than fetch everything from the server?
              setNewName('')
              setNewNumber('')
            })
          .catch(error => {
            showMessage(`${foundPerson.name} was deleted from the phonebook previously, no update made`, "error")
            getAllPersons()
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          showMessage(`Person '${returnedPerson.name}' with number '${returnedPerson.number}' added`)
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
          showMessage(`Deleted person '${returnedPerson.name}' with number '${returnedPerson.number}'`)
          getAllPersons()
        })
        .catch(error => {
          showMessage(`${name} was already deleted from the phonebook`, "error")
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

      <Notification message={notificationMessage} type={notificationType} />

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