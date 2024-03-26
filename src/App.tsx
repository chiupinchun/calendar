import { FC } from 'react'
import Calender from './components/calender'
import './App.css'

interface Props { }

const Page: FC<Props> = () => {
  return (
    <>
      <h2>Task 1</h2>
      <Calender fixMonth={true} />
      <div style={{ height: '50px' }}></div>
      <h2>Task 2</h2>
      <Calender fixMonth={false} />
    </>
  )
}

export default Page
