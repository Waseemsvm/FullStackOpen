import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import { Notification } from './components/Notification';

import personsService from './services/persons';

const App = () => {
  let aBackup = [];
  const [persons, setPersons] = useState([]);
  const [localData, setLocalData] = useState({ newName: "", newNumber: "", isFiltered: false, filteredData: [] });
  const [message, setMessage] = useState(null);

  const hook = () => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    })
  }
  useEffect(hook, []);

  const validateUser = () => {
    return persons.find(person => person.name === localData.newName)
  }

  const handleChangeName = (event) => {
    setLocalData({ ...localData, newName: event.target.value })
  }

  const handleChangeNumber = (event) => {
    setLocalData({ ...localData, newNumber: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let personObj = {
      name: localData.newName,
      number: localData.newNumber
    }

    console.log("submit handler", personObj)

    const personFound = validateUser();

    if (personFound) {
      let bConfirm = window.confirm(`${personFound.name} already added to phonebook, replace the old number with the new one ?`);
      if (bConfirm) {
        personsService.update(personFound.id, personObj).then(data => {
          let newPersons = persons.map(person => person.id === personFound.id ? { ...person, name: personObj.name, number: personObj.number } : person);
          setPersons(newPersons);
          setMessage({ text: `Updated phone number for ${personObj.name}`, error: false })
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        }).catch(error => {
          setMessage({ text: `Information of ${personObj.name} has already been removed from the server.`, error: true })
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
      }
      return;
    }

    console.log("creating person", personObj)
    personsService.create(personObj).then(returnedPerson => {
      console.log("returnedPerson", returnedPerson);
      const newPersonsArr = persons.concat(returnedPerson);
      setPersons(newPersonsArr);
      setLocalData({ ...localData, newName: "", newNumber: "" });

      setMessage({ text: `Added ${returnedPerson.name}`, error: false });

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    })
  }

  const handleFilter = (event) => {
    console.log(event.target.value);
    if (!event.target.value) {
      setLocalData({ ...localData, isFiltered: false });
      return;
    }
    let filteredRes = persons.filter(person => person.name.toLowerCase().match(event.target.value.toLowerCase()));
    setLocalData({ ...localData, isFiltered: true, filteredData: filteredRes });
  }

  const handleDelete = (id) => {

    let person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.remove(id).then(data => {
        let newPersons = persons.filter(person => person.id !== id);
        setPersons(newPersons);
        setMessage({ text: `Information of ${person.name} has been successfully removed from the server.`, error: false });
        console.log("success");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }).catch(error => {
        let newPersons = persons.filter(person => person.id !== id);
        setPersons(newPersons);
        setMessage({ text: `Information of ${person.name} has already been removed from the server.`, error: true })
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
    }
  }

  let events = {
    handleDelete,
    handleChangeName,
    handleChangeNumber,
    handleSubmit
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Form newName={localData.newName} newNumber={localData.newNumber} events={events} />
      <h2>Numbers</h2>
      <Persons persons={localData.isFiltered ? localData.filteredData : persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App