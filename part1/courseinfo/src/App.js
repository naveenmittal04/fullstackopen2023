const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <>
            <Part part={props.part[0]} />
            <Part part={props.part[1]} />
            <Part part={props.part[2]} />
        </>
    )
}
const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    let total = 0
    props.part.forEach(part => {
        total += part.exercises
    })
    return (
        <p>
            Number of exercises {total}
        </p>
    )
}
const App = () => {
    const course = 'Half Stack application development'
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
            <Header course={course}/>
            <Content part={parts} />
            <Total part={parts}/>
        </div>
    )
}

export default App