import { NextApiRequest, NextApiResponse } from 'next';
import { formatDate, getCrimeMonthRange } from '../../../lib/crimeAPI';
import { getLocationForPostcode } from '../../../lib/postCodeAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postcode, start, end } = req.query
  
  console.log('start', start)

  const startDate = start ? formatDate(new Date(Date.parse(start as string))) : formatDate(new Date())
  const endDate = end ? formatDate(new Date(Date.parse(end as string))) : formatDate(new Date())

  console.log('startDate', startDate)
  if (typeof postcode === 'string') {
    const location = await getLocationForPostcode(postcode)
    console.log('location', location)
    const crime = await getCrimeMonthRange({
      location, 
      startDate,
      endDate
    })
    return res.send(crime)
  }

  return res.status(400).send('Bad Request')
}