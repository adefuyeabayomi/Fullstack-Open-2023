import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
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
      <h3>Statistics</h3>
      <p>Good : {good}</p>
      <p>Bad : {bad} </p>
      <p>Neutral : {neutral} </p>
    </div>
  )
}

export default App