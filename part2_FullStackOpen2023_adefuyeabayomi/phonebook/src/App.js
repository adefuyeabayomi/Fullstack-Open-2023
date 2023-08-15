import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number : "+2340837948843" }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  function handleNameChange (eventObject) {
    console.log(eventObject.target)
    setNewName(eventObject.target.value)
    console.log("event.target.value",eventObject.target.value)
  }
  function handleNumberChange (eventObject) {
    console.log(eventObject.target)
    setNewNumber(eventObject.target.value)
    console.log("event.target.value",eventObject.target.value)
  }
  function handleSubmit(eventObject) {
    console.log("in submithandler")
    eventObject.preventDefault();
    let userExist = false;
    for (let each of persons){
      if(each.name == newName){
        userExist = true;
        break;
      }
    }
    if(userExist){
      alert(`${newName} is already in the users list`)
    }
    else {
      setPersons(persons.concat({name : newName, number : newNumber}))
      setNewName("");
      setNewNumber("")
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>        <div>
          Number: <input type="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x,i)=>{
        return <p key={i}>{x.name} : {x.number}</p>
      })}
    </div>
  )
}

export default App