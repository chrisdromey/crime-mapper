import { getCrimeMonthRange } from './lib/crimeAPI'
import { getLocationForPostcode } from './lib/postCodeAPI';


async function main() {
  const location = await getLocationForPostcode('M30 0HP')
  const response =  await getCrimeMonthRange({
    location,
    startDate: "2020-11",
    endDate: "2021-06"
  })
  console.log(response)
}

(async () => {
  await main()
  console.log('done');

})().catch(err => {
  console.error(err);
});