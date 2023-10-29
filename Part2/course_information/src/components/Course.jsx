const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id}  part={part}/>)}
  </>


const Course = ({ course }) => {
  console.log(course)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((acc, part) => (part.exercises + acc), 0)}/>
    </>
  );
}

export default Course;