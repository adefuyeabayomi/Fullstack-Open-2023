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
  export default Course;