import {useState} from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const incrementGood = () => {
        setGood(good + 1)
    }
    const incrementNeutral = () => {
        setNeutral(neutral + 1)
    }
    const incrementBad = () => {
        setBad(bad + 1)
    }
    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={incrementGood} text='good'/>
            <Button handleClick={incrementNeutral} text='neutral'/>
            <Button handleClick={incrementBad} text='bad'/>
            <h1>statistics</h1>
            good {good}
            <br/>
            neutral {neutral}
            <br/>
            bad {bad}
        </div>
    )
}

export default App
