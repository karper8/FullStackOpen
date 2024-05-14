import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const StatisticLine = (props) => {
  return(
  <table>
    <td>{props.category}</td>
    <td>{(props.total)}</td>
  </table>
  )
}

const Statistics = ({Good,good,Neutral,neutral,Bad,bad,total,average,positive}) => {

  if( good===0 && neutral===0 && bad===0 ){
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <>
      <StatisticLine category={Good} total={good} />
      <StatisticLine category={Neutral} total={neutral} />
      <StatisticLine category={Bad} total={bad} />
      <StatisticLine category='Total' total={total} />
      <StatisticLine category='Average' total={average} />
      <StatisticLine category='Positive' total={String(positive + ' %')} />
    </>
  )
}

function App() {

  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)
  const [total,setTotal] = useState(0)
  const [positive,setPositive] = useState(0)
  const [average,setAverage] = useState(0)

  const header1 = 'Give feedback'
  const header2 = 'statistics'
  const Good = "Good"
  const Neutral = "Neutral"
  const Bad = "Bad"
  
  
  const handlePositive = () => {
    const newPositive = (positive/total)*100
    setPositive(newPositive)
  }

  const handleAverage = () => {
    const newAverage = ((good-bad)/total)
    setAverage(newAverage)
  }

  const handleGood = () => {
    const newGood = good + 1
    const newTotal = total + 1
    
    console.log('Updating good, old good', good,'old total',total)
    setGood(newGood)
    setTotal(newTotal)
    //Check if updating the positive state by increasing value based on the clicked button is okay
    // handlePositive()
    const newPositive = ((good+1) / (total+1)) * 100
    console.log('updating positive,old positive',positive)
    setPositive(newPositive)
    // handleAverage()
    const newAverage = (((good+1)-bad)/total)
    setAverage(newAverage)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    const newTotal = total + 1
    console.log('updating neutral,old neutral',neutral,'old total',total)
    setNeutral(newNeutral)
    setTotal(newTotal)
    // handlePositive()
    const newPositive = ((good) / (total+1)) * 100
    console.log('updating positive,old positive',positive)
    setPositive(newPositive)
  }

  const handleBad = () => {
    const newBad = bad + 1
    const newTotal = total + 1
    console.log('updating bad,old bad',bad,'old total',total)
    setBad(newBad)
    setTotal(newTotal)
    // handlePositive()
    const newPositive = ((good) / (total+1)) * 100
    console.log('updating positive,old positive',positive)
    setPositive(newPositive)
    // handleAverage()
    const newAverage = ((good-(bad))/total)
    setAverage(newAverage)
  }

  

  return(
    <>
      <Header text={header1} />
      <Button handleClick={handleGood} text={Good} />
      <Button handleClick={handleNeutral} text={Neutral} />
      <Button handleClick={handleBad} text={Bad} />
      <Header text={header2} />
      <Statistics Good={Good} good={good} Neutral={Neutral} neutral={neutral} Bad={Bad} bad={bad} total={total} average={average} positive={positive} />
      
    </>
  )
  
}

export default App
