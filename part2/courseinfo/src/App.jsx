const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part=>
      <Part part={part} key={part.name} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({parts}) => <p><b>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</b></p>

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
      {
        name: 'Redux',
        exercises: 11,
      },
    ],
  }

  return (
    <Course course={course} />
  )
}

export default App