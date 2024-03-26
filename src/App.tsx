import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { isSameDay, getDays } from './utils/getDays'

// Default: white
// Hover: #e6e6e6
// Today: #ffff76
// Active: #006edc
// Non-Current Month: #757575

function App() {
  const toDay = useRef(new Date())
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [date, setDate] = useState(toDay.current.getDate())
  const days = useMemo(() => getDays(year, month), [year, month])

  const notCurrentMonth = useCallback((day: Date) => day.getMonth() + 1 !== month, [month])

  const [selected, setSelected] = useState<Date[]>([])
  const select = (day: Date) => {
    if (!selected.length || selected.length >= 2) {
      setSelected([day])
    } else {
      if (day > selected[0]) {
        const start = days.indexOf(selected[0])
        const end = days.indexOf(day) + 1
        setSelected(days.slice(start, end))
      } else {
        setSelected([day])
      }
    }
  }
  useEffect(() => {
    setSelected([])
  }, [year, month])

  return (
    <>
      <div className='calendar-header'>
        <span className='month-select content-center'>&lt;</span>
        <span>{year}年{month}月</span>
        <span className='month-select content-center'>&gt;</span>
      </div>
      <div className='day-area'>
        {days.map((day, index) => (
          <div
            key={index}
            className={[
              'day-button content-center',
              isSameDay(day, toDay.current) ? 'today' : '',
              notCurrentMonth(day) ? 'none-current-month' : '',
              selected.includes(day) ? 'active' : ''
            ].join(' ')}
            onClick={() => notCurrentMonth(day) || select(day)}
          >
            {day.getDate()}日
          </div>
        ))}
      </div>
    </>
  )
}

export default App
