import requestPath from '../requestPath/path'
import {get} from '../requestPath/request'
const {
  worldMap,
  countryMap
} = requestPath

// 地图数据
export const worldMapInfo = (params = {}) => {
  const reqParams = {
    ...params
  }
  return get(worldMap, reqParams, true).then(res => {
    return res
  })
}

export const countryMapInfo = (params = {}) => {
  const {url} = params
  const contryUrl = `${countryMap}${url}/country.resource.geo.json`
  delete params.url
  const reqParams = {
    ...params
  }
  return get(contryUrl, reqParams, true).then(res => {
    return res
  })
}
