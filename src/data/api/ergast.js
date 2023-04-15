import requestPath from '../requestPath/path'
import {ergastGet} from '../requestPath/request'
const {
  circuitsInfo,
  driversInfo
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
