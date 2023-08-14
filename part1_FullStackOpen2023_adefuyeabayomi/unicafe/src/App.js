import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
    let {good,bad,neutral} = props;
    let total = good + bad + neutral;
  function average () { 
    // average is given by summation fx / summation f 
    // f are the values good, neutral, bad . Summation F is 3 
    // fx are the corresponding values of F 
    // Using this explanation, we implement the average as given below 
    return (good + bad + neutral) / (3) ;
  }
  function positiveReviews () {
    return ( good / total ) * 100; 
  }  
  if (total > 0){
    return (
      <div>
        <h3>Statistics</h3>
        <p>Good : {props.good}</p>
        <p>Bad : {props.bad} </p>
        <p>Neutral : {props.neutral} </p>
        <p>Total Reviews : {props.good + props.bad + props.neutral} </p>
        <p>Average : {average()}</p>
        <p>Positive reviews : {positiveReviews()}%</p>
      </div>
    )    
  }
  else {
    return (
      <div>
        <p>No reviews given yet</p>
      </div>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Your feedback helps us improve.</h1>
      <p>How do you feel about the services rendered to you?</p>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App