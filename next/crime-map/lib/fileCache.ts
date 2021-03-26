import fs from 'fs'
import axios from 'axios'

const CACHE_LOCATION=  './.cache'

export default async function get(url: string){

  const cacheFile = `${CACHE_LOCATION}/${stringToHash(url)}.json`
  console.log('req for:', url)
  console.log('cache file:', cacheFile)
  if (await isCached(cacheFile)){
    console.log('cache hit')
    const data = (await fs.readFileSync(cacheFile)).toString()
    // console.log('cache data:', data)
    return JSON.parse(data)
  }
  console.log('cache miss')
  const result = await axios.get(url)
  await fs.writeFileSync(cacheFile, JSON.stringify(result.data))
  return result.data
}

async function isCached(cacheFile:string) {
  return await fs.existsSync(cacheFile)
}

function stringToHash(string: string) {             
  var hash = 0; 
  if (string.length == 0) return hash;
  for (var i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
  return hash;
}