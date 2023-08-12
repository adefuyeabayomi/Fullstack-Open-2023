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
      <CoursePart part={props.part1} exercisesCount={props.exercises1} />
      <CoursePart part={props.part2} exercisesCount={props.exercises2} />
      <CoursePart part={props.part3} exercisesCount={props.exercises3} />
    </div>
  )
}
const Total = function (props){
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  const courseTitle = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseTitle={courseTitle} />
      <CourseContent part1={part1.name} part2={part2.name} part3={part3.name} exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}

export default App