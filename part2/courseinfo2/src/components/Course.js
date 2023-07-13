const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h3>total of {sum} exercises</h3>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} /> */}
      <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </>
  )
}

export default Course