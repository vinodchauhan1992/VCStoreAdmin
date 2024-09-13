import Axios from 'axios'
import { getApiBaseUrl } from 'src/utils/CommonUtils'
import * as ApiCalls from './ApiCalls'
import { HTTPRequestModel } from '../models/serviceModels/ApiServiceModel'

export const httpGetRequest = async ({ apiUrl, specialHeaderObject }: HTTPRequestModel) => {
  let headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
  if (specialHeaderObject && Object.keys(specialHeaderObject).length > 0) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...specialHeaderObject
    }
  }
  return await Axios.get(apiUrl, {
    headers: headers
  })
    .then((response: any) => {
      if (response.status === 200) {
        return { responseData: response.data, isSucceded: true }
      } else {
        return { responseData: null, isSucceded: false }
      }
    })
    .catch((error: any) => {
      const excep = error

      return { responseData: excep.response, isSucceded: false }
    })
}

export const httpDeleteRequest = async ({ apiUrl, specialHeaderObject }: HTTPRequestModel) => {
  let headers = { Accept: 'application/json', 'Content-Type': 'application/json' }
  if (specialHeaderObject && Object.keys(specialHeaderObject).length > 0) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...specialHeaderObject
    }
  }
  return await Axios.delete(apiUrl, {
    headers: headers
  })
    .then((response: any) => {
      if (response.status === 200) {
        return { responseData: response.data, isSucceded: true }
      } else {
        return { responseData: null, isSucceded: false }
      }
    })
    .catch((error: any) => {
      const excep = error

      return { responseData: excep.response, isSucceded: false }
    })
}

export const httpPostRequest = async ({ apiUrl, jsonBody, contentType, specialHeaderObject }: HTTPRequestModel) => {
  let headers = { Accept: 'application/json', 'Content-Type': contentType ? contentType : 'application/json' }
  if (specialHeaderObject && Object.keys(specialHeaderObject).length > 0) {
    headers = {
      Accept: 'application/json',
      'Content-Type': contentType ? contentType : 'application/json',
      ...specialHeaderObject
    }
  }
  return await Axios.post(apiUrl, jsonBody, {
    headers: headers
  })
    .then((response: any) => {
      if (response.status === 200) {
        return { responseData: response.data, isSucceded: true }
      } else {
        return { responseData: null, isSucceded: false }
      }
    })
    .catch((error: any) => {
      const excep = error

      return { responseData: excep.response, isSucceded: false }
    })
}

export const httpUpdateRequest = async ({ apiUrl, jsonBody, contentType, specialHeaderObject }: HTTPRequestModel) => {
  let headers = { Accept: 'application/json', 'Content-Type': contentType ? contentType : 'application/json' }
  if (specialHeaderObject && Object.keys(specialHeaderObject).length > 0) {
    headers = {
      Accept: 'application/json',
      'Content-Type': contentType ? contentType : 'application/json',
      ...specialHeaderObject
    }
  }
  return await Axios.put(apiUrl, jsonBody, {
    headers: headers
  })
    .then((response: any) => {
      if (response.status === 200) {
        return { responseData: response.data, isSucceded: true }
      } else {
        return { responseData: null, isSucceded: false }
      }
    })
    .catch((error: any) => {
      const excep = error

      return { responseData: excep.response, isSucceded: false }
    })
}

/**
 * This is an actual function for calling api service and it will decide whether the api call will be
 * GET or POST request
 * @param {string} apiType
 * @param {any} jsonBody
 */
export const callApiService = async (
  apiType: string,
  jsonBody: any,
  extraUrlString?: string,
  specialHeaderObject?: any
): Promise<unknown> => {
  const request = ApiCalls.apiCalls({ apiType })
  let apiUrl = `${getApiBaseUrl()}${request.requestUrl}`
  if (request.requestType === 'POST') {
    if (extraUrlString && extraUrlString !== '') {
      apiUrl = `${apiUrl}${extraUrlString}`
    }
    console.log('apiUrl', apiUrl)

    return await httpPostRequest({ apiUrl, jsonBody, contentType: request.contentType, specialHeaderObject })
  } else if (request.requestType === 'GET') {
    if (extraUrlString && extraUrlString !== '') {
      apiUrl = `${apiUrl}${extraUrlString}`
    }
    console.log('apiUrl', apiUrl)
    return await httpGetRequest({ apiUrl, contentType: request.contentType, specialHeaderObject })
  } else if (request.requestType === 'PUT') {
    if (extraUrlString && extraUrlString !== '') {
      apiUrl = `${apiUrl}${extraUrlString}`
    }
    console.log('apiUrl', apiUrl)

    return await httpUpdateRequest({ apiUrl, jsonBody, contentType: request.contentType, specialHeaderObject })
  } else if (request.requestType === 'DELETE') {
    if (extraUrlString && extraUrlString !== '') {
      apiUrl = `${apiUrl}${extraUrlString}`
    }
    console.log('apiUrl', apiUrl)

    return await httpDeleteRequest({ apiUrl, contentType: request.contentType, specialHeaderObject })
  }
}
