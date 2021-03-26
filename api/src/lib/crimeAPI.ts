import axios from 'axios'
import { OptionsMonth, CrimeDataPoint, OptionsRange } from '../types/types'

const BASE_URL = 'https://data.police.uk/api/'

async function callAPI(path, params) {
  return await axios.get(`${BASE_URL}/${path}?${params}`)
}

export async function getCrimeMonth({ location, date }: OptionsMonth): Promise<CrimeDataPoint[]> {
  const dateParam = date ? `&date=${date}` : ''
  const apiPath = 'crimes-street/all-crime'
  const paramsStr = `lat=${location.lat}&lng=${location.lng}${dateParam}`

  const response = await callAPI(apiPath, paramsStr)
  const data = response.data as CrimeDataPoint[]

  return data
}

function generateMonthArray(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  const today = new Date()
  const currentDate = new Date(today.getFullYear(), today.getMonth(), 0)

  let curDate = startDate
  const dateArray = []
  let i = 0
  while (curDate < endDate && curDate < currentDate) {
    curDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + i++));
    dateArray.push(curDate)
  }

  return dateArray.map(formatDate)
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

export async function getCrimeMonthRange({ location, startDate, endDate }: OptionsRange): Promise<CrimeDataPoint[]> {
  const allMonths = generateMonthArray(startDate, endDate)
  console.log('all months:', allMonths)
  return await (await Promise.all(allMonths.map(date => getCrimeMonth({ location, date })))).flat()
}
