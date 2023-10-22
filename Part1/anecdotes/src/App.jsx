import { useState } from "react";

const Button = props => <button onClick={props.handleClick}>{props.text}</button>
const Anecdote = props => <p>{props.text}</p>
const Heading = props => <h1>{props.text}</h1>

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
  const [votes, setVotes] = useState({});
  const [activeAnecdote, setActiveAnecdote] = useState(anecdotes[0]);
  const [max, setMax] = useState(0);
  const handleAnecdotes = () => {
    let iIndex = Math.round(Math.random() * (anecdotes.length - 1));
    setSelected(iIndex);
  }

  const handleVotes = () => {
    //if the selected anecdote is not voted then initialize with 0
    votes[selected] ??= 0;

    //make a copy of the votes state.
    let obj = { ...votes };
    obj[selected] += 1;

    //change the state of the votes.
    setVotes(obj);

    let myMax = 0;
    let myActiveAnecdote = anecdotes[0];
    for (let key in obj) {
      if (obj[key] > myMax) {
        myMax = obj[key];
        myActiveAnecdote = anecdotes[key];
      }
    }
    setMax(myMax);
    setActiveAnecdote(myActiveAnecdote)

  }

  return (
    <div>
      <Heading text="Anecdotes of the day" />
      <Anecdote text={anecdotes[selected]} />
      <p>has {votes[selected] ?? 0} votes</p>
      <Button text="vote" handleClick={handleVotes} />
      <Button text="next anecdote" handleClick={handleAnecdotes} />

      <Heading text="Anecdote with most votes" />
      <Anecdote text={activeAnecdote} />
      <p>has {max ?? 0} votes</p>
    </div>
  )
}

export default App;
