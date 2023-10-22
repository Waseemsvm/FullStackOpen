import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const StatisticsLIne = ({ text, value }) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>);
}
const Staistics = ({ oStatistics }) => {

  if (!(oStatistics.good + oStatistics.bad + oStatistics.neutral))
    return <p><b>No feedback given</b></p>

  return (
    <table>
      <tbody>
        <StatisticsLIne text="good" value={oStatistics.good} />
        <StatisticsLIne text="neutral" value={oStatistics.neutral} />
        <StatisticsLIne text="bad" value={oStatistics.bad} />
        <StatisticsLIne text="all" value={oStatistics.all} />
        <StatisticsLIne text="average" value={oStatistics.average} />
        <StatisticsLIne text="positive" value={oStatistics.positive + " %"} />
      </tbody>
    </table>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + bad + neutral;
  let average = (good * 1 + bad * -1 + neutral * 0) / all;
  average = isNaN(average) ? 0 : average;
  let positive = (good / all) * 100;
  positive = isNaN(positive) ? 0 : positive;

  let oStatistics = {
    good: good,
    bad: bad,
    neutral: neutral,
    all: all,
    average: average,
    positive: positive
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Heading text="statistics" />
      <Staistics oStatistics={oStatistics} />


    </div>
  )
}

export default App