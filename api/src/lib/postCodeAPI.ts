import axios from 'axios'

import { Location } from '../types/types'

const BASE_URL = 'http://api.getthedata.com/postcode'

type APIResponse = {
  status: string,
  match_type: string,
  input: string,
  data: PostCodeLocationData
  copyright: string[]
}

type PostCodeLocationData = {
  postcode: string,
  status: string,
  usertype:string,
  easting: number,
  northing: number,
  positional_quality_indicator: 1,
  country: string,
  latitude: string,
  longitude: string,
  postcode_no_space: string
  postcode_fixed_width_seven: string,
  postcode_fixed_width_eight: string,
  postcode_area: string,
  postcode_district: string,
  postcode_sector: string,
  outcode: string,
  incode: string
}

async function callAPI(path, params) : Promise<APIResponse>{
  return (await axios.get(`${BASE_URL}/${path}?${params}`)).data
}

export async function getLocationForPostcode(postcode: string): Promise<Location> {

  const apiPath = postcode
  const paramsStr = ``

  const response = await callAPI(apiPath, paramsStr)
  const data = response.data


  return {
    lat: parseFloat(data.latitude),
    lng: parseFloat(data.longitude)
  }
}
