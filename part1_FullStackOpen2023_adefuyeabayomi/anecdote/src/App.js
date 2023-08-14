import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState({});
  function getNext () {
    return setSelected(Math.round(Math.random() * 7));
  }
  function castVote(){
    let index = String(selected);
    let currentVoteState = {...votes};
    let newVoteState;
    console.log(index,currentVoteState,newVoteState)
    if(currentVoteState[index]){
      newVoteState = currentVoteState[index] + 1;
      currentVoteState[index] = newVoteState;
    }
    else {
      currentVoteState[index] = 1;
    }
    console.log("current votes",currentVoteState)
    setVotes(currentVoteState);
  }
  const popularAnecdote = () => {
    let val;
    let peak = -Infinity;
    for(let each of Object.keys(votes)){
      if(votes[each] > peak){
        peak = votes[each]
        val = each;
      }
    }
    let result = anecdotes[val];
    console.log("most votes and corresponding anecdote are :", val,"it has ",votes[val],result);
    return result;
  }

  return (
    <div>
      <h3>Anecdote of the day!</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes </p>
      <button onClick={()=> castVote()}>Vote</button>
      <button onClick={()=> getNext()}>Next Anecdote</button>
      <h3>Anecdote with most vote</h3>
      <p> {popularAnecdote()} </p>
    </div>
  )
}

export default App