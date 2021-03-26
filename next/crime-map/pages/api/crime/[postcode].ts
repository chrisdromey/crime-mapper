import { NextApiRequest, NextApiResponse } from 'next';
import { getCrimeMonthRange } from '../../../lib/crimeAPI';
import { getLocationForPostcode } from '../../../lib/postCodeAPI';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postcode } = req.query

  if (typeof postcode === 'string') {
    const location = await getLocationForPostcode(postcode)
    console.log('location', location)
    const crime = await getCrimeMonthRange({
      location, 
      startDate: "2020-11",
      endDate: "2021-06"
    })
    return res.send(crime)
  }

  return res.status(400).send('Bad Request')
}