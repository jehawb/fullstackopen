import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given yet</p>
    )
  }

  let total = good + neutral + bad
  let average = (good - bad) / total
  let positive = good / total * 100 + "%"   // Hacky way to get the percentage sign but forces the value to string

  return (
    <table>
      <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Feedbacks" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Unicafe satisfaction questionaire - Give us feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="🙂" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="😐" />
      <Button handleClick={() => setBad(bad + 1)} text="☹️" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App