import {useState} from 'react'

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const StatisticLine = ({text, value, sufix}) => {
    return (
        <tr>
            <td>
                {text}
            </td>
            <td>
                {value} {sufix}
            </td>
        </tr>
    )
}
const Statistics = (params) => {
    const [good, neutral, bad, totalScore] = params.feedback
    let total = good + neutral + bad

    if(total === 0){
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good}/>
                    <StatisticLine text='neutral' value={neutral}/>
                    <StatisticLine text='bad' value={bad}/>
                    <StatisticLine text='all' value={total}/>
                    <StatisticLine text='average' value={total !== 0? totalScore/total: 0}/>
                    <StatisticLine text='positive' value={total !== 0? good/total*100: 0} sufix='%'/>
                </tbody>
            </table>
        </div>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
   // const [total, setTotal] = useState(0)
    let totalScore = good-bad
    const incrementGood = () => {
        setGood(good + 1)
        //setTotal(total + 1)
        totalScore += 1
    }
    const incrementNeutral = () => {
        setNeutral(neutral + 1)
        //setTotal(total + 1)
    }
    const incrementBad = () => {
        setBad(bad + 1)
        //setTotal(total + 1)
        totalScore -= 1
    }
    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={incrementGood} text='good'/>
            <Button handleClick={incrementNeutral} text='neutral'/>
            <Button handleClick={incrementBad} text='bad'/>
            <h1>statistics</h1>
            <Statistics feedback={[good, neutral, bad, totalScore]}/>
        </div>
    )
}

export default App
