import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
}

const Statistics = ({good, neutral, bad}) => {

  const calcAverage = () => {
    return (good - bad) / (good + neutral + bad)
  }

  const calcPositive = () => {
    return ((good / (good + neutral + bad)) * 100)
  }

  if(good + neutral + bad === 0) return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given yet</p>
    </div>
  )

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='average' value={calcAverage()} />
            <StatisticLine text='positive' value={calcPositive() + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (value) => { 
    if (value === 'good') {
      setGood(good + 1)
    } else if (value === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' clickHandler={() => clickHandler('good')} />
      <Button text='neutral' clickHandler={() => clickHandler('neutral')} />
      <Button text='bad' clickHandler={() => clickHandler('bad')} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
