import { useState } from 'react'

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <p>{text}</p>
      <p>Has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))
  const [mostVoted, setMostVoted] = useState(0)

  const randomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const handleVoting = () => {
    const pointsCopy = [...points]

    pointsCopy[selected] += 1

    setPoints(pointsCopy)

    let maxVotes = 0

    pointsCopy.forEach(votes => {
      if (votes > maxVotes) {
        maxVotes = votes
      }
    })

    setMostVoted(pointsCopy.indexOf(maxVotes))
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <button onClick={handleVoting}>Vote</button>
      <button onClick={() => setSelected(randomIndex)}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[mostVoted]} votes={points[mostVoted]} />
    </>
  )
}

export default App