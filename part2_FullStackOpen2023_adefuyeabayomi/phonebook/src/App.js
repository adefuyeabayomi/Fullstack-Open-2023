import { useEffect,useState } from 'react'
import utility from "./services/utility"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue,setSearchValue] = useState('');
  const [showNotification,setShowNotification] = useState(false);
  const [notifType,setNotifType] = useState('');
  const [notificationText,setNotificationText] = useState('');

  const personsHook = () => {
    utility.getAllPersons().then(response=>{
      console.log("response body",response.data)
      setPersons(response.data);      
    })
  }
  useEffect(personsHook,[])

  function handleNameChange (eventObject) {
    setNewName(eventObject.target.value)
  }

  function handleNumberChange (eventObject) {
    setNewNumber(eventObject.target.value)
  }

  function handleSearch (eventObject){
    setSearchValue(eventObject.target.value) 
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
    let newPersonsArray = [];
    let deleted;
    for (let each of persons){
      let entry = {...each};
      if(each.id !== id){
        newPersonsArray.push(entry);
      }
      else{
        deleted = entry;
      }
    }
    if(sure){
      utility.deleteEntry(id).then(response=>{
        console.log(response.data);
        setNotificationText(deleted.name + " deleted successfully.");
        setNotifType('success');
        setShowNotification(true);
        setTimeout(()=>{
          setShowNotification(false);
        },5000)
      }).catch(err=>{
        console.log("Error",err.message);
        // error notification
        setNotificationText(deleted.name + " has already been deleted");
        setNotifType('error');
        setShowNotification(true);
        setTimeout(()=>{
          setShowNotification(false);
        },5000)
      })
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
            if(each.name === newName){
              entry.number = newNumber;
              newPersonsArray.push(entry);
            }
            else{
              newPersonsArray.push(entry);
            }
          }
          setPersons(newPersonsArray)
          setNotificationText(newName + " Updated in list.");
          setShowNotification(true);
          setNotifType('success')
          setTimeout(()=>{
            setShowNotification(false)
          },5000)
          setNewName("");
          setNewNumber("");
        }).catch(err=>{
          console.log("Error",err.message);
          setNotificationText(newName + "  already been removed from the server");
          setNotifType('error');
          setShowNotification(true);
          setTimeout(()=>{
            setShowNotification(false);
          },5000)
          setNewName("");
          setNewNumber("");
        })
      }
    }
    else {
      let newEntry = {name : newName, number : newNumber};
      utility.submitToServer(newEntry).then(response=>{
        console.log("submit response:",response.data);
        setPersons(persons.concat(newEntry))
        setNotificationText(newEntry.name + " Added to list.");
        setNotifType('success');
        setShowNotification(true);
        setTimeout(()=>{
          setShowNotification(false)
        },5000)
        setNewName("");
        setNewNumber("");
        console.log("newEntry", newEntry)
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



  const Notification = (props) => {
    let notificationStyle;
    if(props.type === 'success'){
      notificationStyle = {
        margin : 15,
        borderWeight : 2,
        borderStyle : 'solid',
        borderRadius : 8,
        borderColor : 'green',
        backgroundColor: '#85FF8D',
        color : 'green',
        padding: '10px 15px'
      }
    }
    else{
      notificationStyle = {
        margin : 15,
        borderWeight : 2,
        borderStyle : 'solid',
        borderRadius : 8,
        backgroundColor: '#FF85B2',
        color : '#FC4850',
        padding: '10px 15px'
      }
    }
    if(!showNotification){
      return (
        <p></p>
      )
    }
    return (
      <div style={notificationStyle}>
        <p>{props.text}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification type={notifType} text={notificationText} />
      <Filter />
      <h2>Phonebook</h2>
      <PersonForm />
      <h2>Numbers</h2>
      <Persons />
    </div>
  )

}

export default App