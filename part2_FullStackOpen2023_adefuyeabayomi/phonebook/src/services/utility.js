import axios from "axios";
  const submitToServer = (newEntry) => {
    let request = axios.post("http://localhost:3001/persons",newEntry);
    return request;
  }
  const getAllPersons = () => {
    let request = axios.get("http://localhost:3001/persons");
    return request;
  }
  const deleteEntry = (id) => {
    let request = axios.delete("http://localhost:3001/persons/"+id);
    return request;
  }
  const updateEntry = (id,updatedEntry) => {
    let request = axios.put("http://localhost:3001/persons/"+id,updatedEntry)
    return request;
  }
  export default {submitToServer,getAllPersons,deleteEntry,updateEntry};

