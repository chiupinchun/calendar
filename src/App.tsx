import React, { FC } from 'react'
import Calender from './components/calender'
import './App.css'

interface Props { }

const Page: FC<Props> = () => {
  return (
    <>
      <h1>task 1</h1>
      <Calender />
    </>
  )
}

export default Page
