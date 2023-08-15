const Header = (props) => {
  return <h1>{props.courseTitle}</h1>
}

const Total = (props) => {
  return <p><strong>Number of exercises {props.sumOfExercises}</strong></p>
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
  let exerciseCount = parts.reduce((a,b)=>{ console.log("a",a,"b",b)
  return a + b.exercises;
  },0)
  return (
    <div>
      <Header courseTitle={name} />
      <Content parts={parts} />
      <Total sumOfExercises={exerciseCount}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      {courses.map(x=>{
        return <Course key={x.id} course={x} />
      })}
      
    </div>
  )
}

export default App