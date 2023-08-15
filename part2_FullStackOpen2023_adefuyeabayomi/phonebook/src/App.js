import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue,setSearchValue] = useState('');

  function handleNameChange (eventObject) {
    setNewName(eventObject.target.value)
    console.log("event.target.value",eventObject.target.value)
  }

  function handleNumberChange (eventObject) {
    setNewNumber(eventObject.target.value)
    console.log("event.target.value",eventObject.target.value)
  }

  function handleSearch (eventObject){
    setSearchValue(eventObject.target.value)
    console.log("event.target.value",eventObject.target.value)    
  }
  
  function filterUsers () {
    let filterParam = searchValue.toLowerCase();
    if(searchValue == ''){
      return persons.map((x,i)=>{
        return <p key={i}>{x.name} : {x.number}</p>
      })
    }
    else {
      let filtered = [];
      persons.forEach(x=>{
        let present = x.name.toLowerCase().indexOf(filterParam) > -1;
        console.log("value",x.name,present)
        if(present){
          filtered.push(x);
        }
      })
      return filtered.map((x,i)=>{
        return <p key={i}>{x.name} : {x.number}</p>
      })
    }
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
      <h3>Search for someone</h3>
      <div>
        <input value={searchValue} onChange={handleSearch} />
      </div>
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
      <div>
        {filterUsers()}
      </div>
      
    </div>
  )
}

export default App