import axios from 'axios'
import config from '../config/Config'

const { API_KEY } = config

const getAccessToken = () => {
  const userV2Response = JSON.parse(
    localStorage && localStorage.getItem('_GresponseV2')
  )
  if (userV2Response) {
    return userV2Response && userV2Response.access_token
  } else {
    console.log('Authenticatiion required')
    return undefined
  }
}

export const serviceRequest = (url, method, payload, params) => {
  const accessToken = getAccessToken()

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  }

  let serviceUrl = `${url}?apikey=${API_KEY}`

  if (params) {
    serviceUrl += `&${params}`
  }

  return axios({
    method: method,
    url: serviceUrl,
    headers: headers,
    data: payload,
  })
}

export const serviceRequestForFileUpload = (url, method, payload, params) => {
  const accessToken = getAccessToken()

  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  }

  let serviceUrl = `${url}?apikey=${API_KEY}`

  if (params) {
    serviceUrl += `&${params}`
  }

  return axios({
    method: method,
    url: serviceUrl,
    headers: headers,
    data: payload,
  })
}

export const serviceRequestBasic = (url, method, payload, params) => {
  const token =
    'dnFhaURSWnpTUWhBNkNQQXkwclNvdHNRQWtSZXBwclg6THhhVk01SllpckJya1FRdQ=='
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${token}`,
  }

  let serviceUrl = `${url}?apikey=${API_KEY}`

  if (params) {
    serviceUrl += `&${params}`
  }

  return axios({
    method: method,
    url: serviceUrl,
    headers: headers,
    data: payload,
  })
}

export const serviceRequestForProduct = (url, method, payload, params) => {
  const token =
    'dnFhaURSWnpTUWhBNkNQQXkwclNvdHNRQWtSZXBwclg6THhhVk01SllpckJya1FRdQ=='
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${token}`,
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: payload,
  })
}
