import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  function handleInputChange (eventObject) {
    console.log(eventObject.target)
    setNewName(eventObject.target.value)
    console.log("event.target.value",eventObject.target.value)
  }
  function handleSubmit(eventObject) {
    console.log("in submithandler")
    eventObject.preventDefault();
    setPersons(persons.concat({name : newName}))
    setNewName("");
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x,i)=>{
        return <p key={i}>{x.name}</p>
      })}
    </div>
  )
}

export default App