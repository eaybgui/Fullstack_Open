import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookServices from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  useEffect(() => {
    phonebookServices.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      console.log(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handlePersonDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm("Delete " + personToDelete.name))
    phonebookServices.deletePerson(id)
    .then(deleted => {
      setPersons(persons.filter(person => person.id !== id))
    })
    setNotificationMessage(`${personToDelete.name} was deleted`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const personToUpdate = persons.find(person => person.name === newName)

    if(personToUpdate !== undefined) {
      if(window.confirm(personToUpdate.name + " is already in the list, do you want to replace the old number with the new one?")){
        const changedPerson = {...personToUpdate, number: newNumber}
        phonebookServices.updatePerson(personToUpdate.id, changedPerson)
        .then(updated => setPersons(persons.map(person => person.id !== updated.id ? person : updated)))
        setNotificationMessage(`${changedPerson.name} number was updated`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }

    phonebookServices.createPerson(newPerson)
    .then(addedPerson => {
      setPersons(persons.concat(addedPerson))
      setNewName('')
      setNewNumber('')
    })
    setNotificationMessage(`Added ${newPerson.name}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    console.log(persons)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Phonebook</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handlePersonDelete}/>
    </div>
  )
}

export default App