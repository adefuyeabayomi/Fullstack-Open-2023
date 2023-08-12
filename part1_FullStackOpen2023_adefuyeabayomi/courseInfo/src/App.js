const Header = function (props) {
  return (<h1>{props.courseTitle}</h1>)
}
const CoursePart = function (props){
  return (
    <p>{props.part} : {props.exercisesCount}</p>
  )
}
const CourseContent = function (props) {
  return (
    <div>
      <CoursePart part={props.parts[0].name} exercisesCount={props.parts[0].exercises} />
      <CoursePart part={props.parts[1].name} exercisesCount={props.parts[1].exercises}/>
      <CoursePart part={props.parts[2].name} exercisesCount={props.parts[2].exercises}/>
    </div>
  )
}
const Total = function (props){
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const courseTitle = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header courseTitle={courseTitle} />
      <CourseContent parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App