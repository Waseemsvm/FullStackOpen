const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}

//#regaion parta 1.1
// const Content = (props) => {
//   return (
//     <>
//       <p>{props.part} {props.exercises}</p>
//     </>
//   );
// }

//#endregaion parta 1.1

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  );
}

const Content = (props) => {
  return (
    <>
      <Part part = {props.data[0].part} exercises = {props.data[0].exercise} />
      <Part part = {props.data[1].part} exercises = {props.data[1].exercise} />
      <Part part = {props.data[2].part} exercises = {props.data[2].exercise} />
    </>
  );
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  );
  
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const oData = [{part: part1, exercise: exercises1}, {part: part2, exercise: exercises2}, {part: part3, exercise: exercises3}];

  return (
    <div>
      <Header course = {course} />
      <Content data = {oData}/>
      <Total total = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App