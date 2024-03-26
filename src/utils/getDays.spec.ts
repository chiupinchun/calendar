import { describe, expect, test } from 'vitest'
import { getDays } from './getDays'

describe('days', () => {
  test('should always get 35 days', () => {
    expect(getDays(2021, 1).length).toBe(35)
    expect(getDays(2020, 2).length).toBe(35)
    expect(getDays(2019, 3).length).toBe(35)
    expect(getDays(2009, 4).length).toBe(35)
    expect(getDays(2025, 5).length).toBe(35)
    expect(getDays(2026, 6).length).toBe(35)
    expect(getDays(2027, 7).length).toBe(35)
    expect(getDays(2028, 8).length).toBe(35)
  })

  test('should get dates correctly with big month', () => {
    const days202403 = getDays(2024, 3)
    const expection = [26, 27, 28, 29]
    for (let i = 1; i <= 31; i++) {
      expection.push(i)
    }
    expect(days202403).toEqual(expection)
  })

  test('should get dates correctly with small month', () => {
    const days202403 = getDays(2024, 4)
    const expection = []
    for (let i = 1; i <= 30; i++) {
      expection.push(i)
    }
    for (let i = 1; i <= 5; i++) {
      expection.push(i)
    }
    expect(days202403).toEqual(expection)
  })

  test('should get dates correctly with leap year 2 month', () => {
    const days202402 = getDays(2024, 2)
    const expection = [29, 30, 31]
    for (let i = 1; i <= 29; i++) {
      expection.push(i)
    }
    expection.push(1, 2, 3)
    expect(days202402).toEqual(expection)
  })

  test('should get dates correctly with normal year 2 month', () => {
    const days202402 = getDays(2023, 2)
    const expection = [30, 31]
    for (let i = 1; i <= 28; i++) {
      expection.push(i)
    }
    expection.push(1, 2, 3, 4, 5)
    expect(days202402).toEqual(expection)
  })

  test('should catch unexpection when recieve invalid params', () => {
    expect(getDays(-1, 9999999999999)).toEqual([])
    expect(getDays(Infinity, NaN)).toEqual([])
  })
})