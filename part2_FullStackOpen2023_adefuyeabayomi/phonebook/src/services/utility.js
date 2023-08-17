import axios from "axios";
  const submitToServer = (newEntry) => {
    let request = axios.post("http://localhost:3001/persons",newEntry);
    return request;
  }
  const getAllPersons = () => {
    let request = axios.get("http://localhost:3001/persons");
    return request;
  }

  export default {submitToServer,getAllPersons};

