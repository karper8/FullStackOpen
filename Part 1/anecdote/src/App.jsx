import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'


const Header = ({text}) => <h1>{text}</h1>

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes,setVotes] = useState([0,0,0,0,0,0,0,0])

  const [selected,setSelected] = useState(0)

  const handleClick = () =>{
    const rand = Math.floor(Math.random() * 8)
    setSelected(rand)
  }

  const handleVotes = () =>{
    const newVotes = [...votes]
    newVotes[selected] += 1
    console.log(newVotes)
    setVotes(newVotes)
  }
 
    let highest = 0
    let anec = 0
    votes.forEach(element => {
    if (element > highest){
      highest = element
      anec = votes.indexOf(highest)
    }
    
    
  })
  // setRandom()
  return(
    <>
      <Header text='Anecdote of the day' />
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes</div>
      <button onClick={handleClick}>Next</button>
      <button onClick={handleVotes}>Vote</button>
      <Header text='Anecdote with the most votes' />
      <div>
        {anecdotes[anec]}
      </div>
    </>
  )
}

export default App
