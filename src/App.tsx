import { useMemo, useState } from 'react'
import './App.css'
import { getDays } from './utils/getDays'

// Default: white
// Hover: #e6e6e6
// Today: #ffff76
// Active: #006edc
// Non-Current Month: #757575

function App() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [date, setDate] = useState(new Date().getDate())
  const days = useMemo(() => getDays(year, month), [year, month])

  return (
    <>
      <div className='calendar-header'>
        <span className='month-select content-center'>&lt;</span>
        <span>{year}年{month}月</span>
        <span className='month-select content-center'>&gt;</span>
      </div>
      <div className='day-area'>
        {days.map((day, index) => (
          <div key={index} className='day-button content-center'>
            {day}日
          </div>
        ))}
      </div>
    </>
  )
}

export default App
