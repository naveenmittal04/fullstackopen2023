function Header({name}) {
    console.log('Header ', name)
    return (
        <h1>{name}</h1>
    )
}

const Part = ({part}) => {
    console.log('Part ', part)
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

function Total({parts}) {
    let total = parts.reduce((sum, part) => {
        //console.log("sum ", sum,"part", part)
        return sum + part.exercises
    }, 0);
    // console.log('Total ', total)
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

function Content({parts}) {
    console.log('Content ', parts)
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <Total parts={parts} />
        </div>
    )
}

const Course = ({ course }) => {
    console.log('Course ', course)
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course