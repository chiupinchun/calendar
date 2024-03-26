import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isSameDay, getDays } from '../utils/getDays'

interface Props {
  fixMonth?: boolean
}

const Calender: FC<Props> = ({ fixMonth }) => {
  const toDay = useRef(new Date())
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const days = useMemo(() => getDays(year, month), [year, month])

  const notCurrentMonth = useCallback((day: Date) => day.getMonth() + 1 !== month, [month])

  const [selected, setSelected] = useState<Date[]>([])
  const select = (day: Date) => {
    if (fixMonth && notCurrentMonth(day)) { return }

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

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  const prevMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }

  return (
    <>
      <div className='calendar-header'>
        <span onClick={() => !fixMonth && nextMonth()} className='month-select content-center'>&lt;</span>
        <span>{year}年{month}月</span>
        <span onClick={() => !fixMonth && prevMonth()} className='month-select content-center'>&gt;</span>
      </div>
      <div className='day-area'>
        {days.map((day, index) => (
          <div
            key={index}
            className={[
              'day-button content-center',
              isSameDay(day, toDay.current) ? 'today' : '',
              fixMonth && notCurrentMonth(day) ? 'none-current-month' : '',
              selected.includes(day) ? 'active' : ''
            ].join(' ')}
            onClick={() => select(day)}
          >
            {day.getDate()}日
          </div>
        ))}
      </div>
    </>
  )
}

export default Calender
