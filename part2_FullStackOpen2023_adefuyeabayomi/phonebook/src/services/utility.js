import axios from "axios";
  const submitToServer = (newEntry) => {
    let request = axios.post("/api/persons",newEntry);
    return request;
  }
  const getAllPersons = () => {
    let request = axios.get("/api/persons");
    return request;
  }
  const deleteEntry = (id) => {
    let request = axios.delete("/api/persons/"+id);
    return request;
  }
  const updateEntry = (id,updatedEntry) => {
    let request = axios.put("/api/persons/"+id,updatedEntry)
    return request;
  }
  let myExports = {submitToServer,getAllPersons,deleteEntry,updateEntry}
  export default myExports;

