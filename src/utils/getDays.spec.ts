import { describe, expect, test } from 'vitest'
import { getDays, isSameDay } from './getDays'

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
    const expection = [26, 27, 28, 29].map(date => new Date(2024, 1, date))
    for (let i = 1; i <= 31; i++) {
      expection.push(new Date(2024, 2, i))
    }
    expect(days202403).toEqual(expection)
  })

  test('should get dates correctly with small month', () => {
    const days202403 = getDays(2024, 4)
    const expection = []
    for (let i = 1; i <= 30; i++) {
      expection.push(new Date(2024, 3, i))
    }
    for (let i = 1; i <= 5; i++) {
      expection.push(new Date(2024, 4, i))
    }
    expect(days202403).toEqual(expection)
  })

  test('should get dates correctly with leap year 2 month', () => {
    const days202402 = getDays(2024, 2)
    const expection = [29, 30, 31].map(date => new Date(2024, 0, date))
    for (let i = 1; i <= 29; i++) {
      expection.push(new Date(2024, 1, i))
    }
    expection.push(...[1, 2, 3].map(date => new Date(2024, 2, date)))
    expect(days202402).toEqual(expection)
  })

  test('should get dates correctly with normal year 2 month', () => {
    const days202402 = getDays(2023, 2)
    const expection = [30, 31].map(date => new Date(2023, 0, date))
    for (let i = 1; i <= 28; i++) {
      expection.push(new Date(2023, 1, i))
    }
    expection.push(...[1, 2, 3, 4, 5].map(date => new Date(2023, 2, date)))
    expect(days202402).toEqual(expection)
  })

  test('should catch unexpection', () => {
    expect(getDays(-1, 9999999999999)).toEqual([])
    expect(getDays(Infinity, NaN)).toEqual([])
  })
})

describe('isSameDay', () => {
  test('should check today correctly', () => {
    expect(isSameDay(
      new Date(), new Date()
    )).toBe(true)
  })

  test('should check same day correctly', () => {
    expect(isSameDay(
      new Date(2024, 3, 26), new Date(2024, 3, 26)
    )).toBe(true)
  })

  test('should check different day correctly', () => {
    expect(isSameDay(
      new Date(2024, 3, 26), new Date(2024, 3, 27)
    )).toBe(false)
  })

  test('should catch unexpection', () => {
    expect(isSameDay(new Date(Infinity, NaN, -1), new Date(50000, 6000, 300))).toEqual(false)
  })
})