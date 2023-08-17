import axios from "axios";
import {useState,useEffect} from "react";

const App = () => {
let [countryData,setCountryData] = useState([]);
let [searchVal,setSearchVal] = useState('');
let [countryNames,setCountryNames] = useState([]);
let [countriesToShow,setCoutriesToShow]= useState([]);
let [activeCountry,setActiveCountry] = useState('');
let [showDetails,setShowDetails] = useState({});
let [showCountry,setShowCountry] = useState(false);
function getData () {
  return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
}
useEffect(()=>{
  getData().then(response=>{
    let countrydata = response.data;
    setCountryData(countrydata);
    let countryNameArr = countrydata.map(x=> x.name.common);
    setCountryNames(countryNameArr);
  })
  },[])
  //setting countries to show based on search value
  useEffect(()=>{
    let length = searchVal.length;
    let matches = [];
    for (let each of countryNames){
      if(each.toLowerCase().slice(0,length) === searchVal.toLowerCase()){
        matches.push(each);
      }
    }
    setCoutriesToShow(matches);
  },[searchVal])


  function handleChange(e){
  e.preventDefault();
  console.log(e.target.value);
  setSearchVal(e.target.value);
  }

  function searchResult () {
    let toShowList;
    if(countriesToShow.length === 0){
      toShowList = <p>Please input a search item</p>
    }
    else if(countriesToShow.length === 1){
      toShowList = <p>Only One Match Found, Showing the result for <b>{countriesToShow[0].toUpperCase()}</b> </p>
    }
    else if(countriesToShow.length > 0 && countriesToShow.length <= 10){
      toShowList = countriesToShow.map((x,i)=> <p key={i}>=&gt; {x} <button>show details</button></p>)
    }
    else if(countriesToShow.length>10){
      toShowList = <p>No of matches too much, please be more specific</p>
    }
    return (
      <div>
        <p>Results : </p>
        <div>{toShowList}</div>
      </div>
    )
  }
  // effect to show active countries
  useEffect(()=>{
    if(countriesToShow.length === 1){
      setActiveCountry(countriesToShow[0]);
      console.log("setting active country", activeCountry);
      setShowCountry(true);
    }
    else{
      setShowCountry(false)
    }
  },[countriesToShow])
  // effect to display details
  useEffect(()=>{
    console.log("just entered show details")
    setShowCountry(true);
    let details = {};
    for(let each of countryData){
      let proceed = each.name.common.toLowerCase() === activeCountry.toLowerCase();
      if(proceed){
        details = each;
        console.log("passed test", details)
      }
    }
    setShowDetails(details);
    console.log("in show details, my details are",showDetails,)
  },[activeCountry])
  const Country = () => {
    console.log("show country in country render", showCountry)
    if(showCountry){
         return (
            <div>
              <h1>Details : {showDetails.name?.common}</h1>
              <p>Capital : {showDetails.capital} </p>
              <p>Area : {showDetails.area} </p>
              <img src={showDetails.flags?.png} alt="country flag" />
            </div>
          ) 
      }
      else{
        return (<p></p>)
      }
  }

  return (
    <div>
      <p>Search For A Country Below</p>
      <form>
        <div>
          <input value={searchVal} onChange={handleChange} />
        </div>
      </form>
      <div>
        {searchResult()}
      </div>
      <div>
        <Country />
      </div>
    </div>
  )
}

export default App