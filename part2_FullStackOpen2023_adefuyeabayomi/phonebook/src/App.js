import { useEffect,useState } from 'react'
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue,setSearchValue] = useState('');

  const personsHook = () => {
    axios.get("http://localhost:3001/persons").then(response =>{
      console.log("response body",response.data)
      setPersons(response.data);
      })
  }
  useEffect(personsHook,[])

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
    if(searchValue === ''){
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
  function submitToServer() {
    let request = axios.post("http://localhost:3001/persons",{name : newName, number : newNumber})
    request.then(response=>{
      console.log("submit response:",response.data);
      setPersons(persons.concat({name : newName, number : newNumber}))
      setNewName("");
      setNewNumber("");
    })
  }

  function handleSubmit(eventObject) {
    console.log("in submithandler")
    eventObject.preventDefault();
    let userExist = false;
    for (let each of persons){
      if(each.name === newName){
        userExist = true;
        break;
      }
    }
    if(userExist){
      alert(`${newName} is already in the users list`)
    }
    else {
      submitToServer();
    }
  }
  // components filter, inputs and people
  const Filter = () => {
    return (
      <div>
        <h3>Search for someone</h3>
        <div>
          <input value={searchValue} onChange={handleSearch} />
        </div>
      </div>
    )
  }
  const PersonForm = () => {
    return (
      <div>
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
      </div>
    )
  }

  const Persons = () => {
    return (
      <div>
        {filterUsers()}
      </div>
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter />
      <h2>Phonebook</h2>
      <PersonForm />
      <h2>Numbers</h2>
      <Persons />
    </div>
  )

}

export default App