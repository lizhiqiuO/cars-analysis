const axios = require('axios')
const ergastUrl = 'https://ergast.com/api/f1/'

const instance = axios.create({
  timeout: 50000,
  withCredentials: false,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

export const get = (url, params, needCommonParams = true) => {
  const allParams = {...params}
  return instance.get(url, {
    params: allParams
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log(err)
  })
}

export const ergastGet = (url, params, needCommonParams = true) => {
  const allParams = {...params}
  return axios.get(url, {
    baseURL: ergastUrl,
    params: allParams
  }).then(res => {
    return res.data
  }).catch(err => {
    console.log(err)
  })
}
