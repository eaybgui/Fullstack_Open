import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const App = (props) => {

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  const vote = () => {
    setVotes(votes.map((value, i) => (i === selected) ? value + 1 : value))
  }

  const getMostVoted = () => {
    return votes.indexOf(Math.max(...votes))
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button text={"vote"} handleClick={vote}/>
      <Button text={"next anecdote"} handleClick={getRandomAnecdote}/>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[getMostVoted()]}
      <p>has {votes[getMostVoted()]} votes</p>
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)