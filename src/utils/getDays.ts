export const getDays = (year: number, month: number) => {
  const days: Date[] = []

  try {
    const count = new Date(year, month, 0).getDate()
    const firstDay = new Date(year, month - 1, 1).getDay() || 7
    const lastDay = new Date(year, month, 0).getDay() || 7

    if (isNaN(count) || isNaN(firstDay) || isNaN(lastDay)) {
      return days
    }

    for (let i = 1; i < firstDay; i++) {
      days.unshift(new Date(year, month - 1, 1 - i))
    }

    for (let i = 1; i <= count; i++) {
      days.push(new Date(year, month - 1, i))
    }

    for (let i = 1; i <= 7 - lastDay; i++) {
      days.push(new Date(year, month, i))
    }
  } catch (err) {
    console.log(err)
  }

  return days
}
