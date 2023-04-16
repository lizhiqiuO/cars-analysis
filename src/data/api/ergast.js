import requestPath from '../requestPath/path'
import {ergastGet, ergastYearGet} from '../requestPath/request'
const {
  circuitsInfo,
  driversInfo,
  driverStandingInfo,
  constructorStandings
} = requestPath

// 赛道数据
export const getCircuitsInfo = (params = {}) => {
  const reqParams = {
    ...params
  }
  return ergastGet(circuitsInfo, reqParams, true).then(res => {
    return res
  })
}

// 赛车手数据
export const getDriverInfo = (params = {}) => {
  const reqParams = {
    ...params
  }
  return ergastGet(driversInfo, reqParams, true).then(res => {
    return res
  })
}

// 赛车手排位
export const getDriverStandingInfo = (params = {}, year) => {
  const reqParams = {
    ...params
  }
  return ergastYearGet(driverStandingInfo, year, reqParams, true).then(res => {
    return res
  })
}

// 赞助商
export const getConstructorStandingInfo = (params = {}, year) => {
  const reqParams = {
    ...params
  }
  return ergastYearGet(constructorStandings, year, reqParams, true).then(res => {
    return res
  })
}
