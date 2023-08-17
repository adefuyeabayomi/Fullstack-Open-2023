import { useEffect,useState } from 'react'
import utility from "./services/utility"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue,setSearchValue] = useState('');

  const personsHook = () => {
    utility.getAllPersons().then(response=>{
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
        return <p key={i}>{x.name} : {x.number} <button onClick={()=>{handleDelete(x.id)}}>Delete {x.id} </button></p>
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
        return <p key={i}>{x.name} : {x.number} <button onClick={()=>{handleDelete(x.id)}}>Delete {x.id} </button></p>
      })
    }
  }

  function handleDelete(id){
    let sure = window.confirm("are you sure you want to delete this entry?");
    console.log("deleted: ",id,sure);
    if(sure){
      utility.deleteEntry(id).then(response=>{
        console.log(response.data);
      })
      let newPersonsArray = [];
      let count = 0;
      for (let each of persons){
        let entry = {...each};
        if(each.id !== id){
          entry.id = count;
          newPersonsArray.push(entry);
          count++;
        }
      }
      setPersons(newPersonsArray)
    }
  }

  function handleSubmit(eventObject) {
    console.log("in submithandler")
    eventObject.preventDefault();
    let userExist = false;
    let userId = undefined;
    for (let each of persons){
      if(each.name === newName){
        userExist = true;
        userId = each.id;
        break;
      }
    }
    if(userExist){
      let sure = window.confirm("This user exists in the database. Click Ok to update the user's phone number");
      console.log("updated: ",userId,sure);
      if(sure){
        let updatedEntry = {name : newName, number : newNumber}
        utility.updateEntry(userId,updatedEntry).then(response=>{
          console.log("response.data");
          let newPersonsArray = [];
          for (let each of persons){
            let entry = {...each};
            if(each.name == newName){
              entry.number = newNumber;
              newPersonsArray.push(entry);
            }
            else{
              newPersonsArray.push(entry);
            }
          }
          setPersons(newPersonsArray)
        })
      }
    }
    else {
      let newEntry = {name : newName, number : newNumber};
      utility.submitToServer(newEntry).then(response=>{
        console.log("submit response:",response.data);
        setPersons(persons.concat(newEntry))
        setNewName("");
        setNewNumber("");
      });
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