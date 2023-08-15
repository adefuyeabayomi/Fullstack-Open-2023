const Header = (props) => {
  return <h1>{props.courseTitle}</h1>
}

const Total = (props) => {
  return <p>Number of exercises {props.sumOfExercises}</p>
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  let {parts} = props;
  return (
    <div>
      {parts.map(x=>{
        return <Part part={x.name} key={x.id} exercises1={x.exercises} />
      })}
    </div>
  )
}
const Course = (props) => {
  let {id,name,parts} = props.course;
console.log("parts in course",props)
  return (
    <div>
      <Header courseTitle={name} />
      <Content parts={parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }


  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App