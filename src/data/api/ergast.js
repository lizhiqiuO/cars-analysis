import requestPath from '../requestPath/path'
import {ergastGet} from '../requestPath/request'
const {
  circuitsInfo
} = requestPath

// 地图数据
export const getCircuitsInfo = (params = {}) => {
  const reqParams = {
    ...params
  }
  return ergastGet(circuitsInfo, reqParams, true).then(res => {
    return res
  })
}
