import Axios from 'axios'
import { getApiBaseUrl } from 'src/utils/CommonUtils'

export const httpGetRequest = async ({ apiUrlPath }: { apiUrlPath: string }) => {
  return await Axios.get(`${getApiBaseUrl()}${apiUrlPath}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
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

export const httpPostRequest = async ({ apiUrlPath, jsonBody }: { apiUrlPath: string; jsonBody: any }) => {
  return await Axios.post(`${getApiBaseUrl()}${apiUrlPath}`, jsonBody, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
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

export const httpDeleteRequest = async ({ apiUrlPath }: { apiUrlPath: string }) => {
  return await Axios.delete(`${getApiBaseUrl()}${apiUrlPath}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
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

export const httpUpdateRequest = async ({ apiUrlPath, jsonBody }: { apiUrlPath: string; jsonBody: any }) => {
  return await Axios.put(`${getApiBaseUrl()}${apiUrlPath}`, jsonBody, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
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

export const httpMultipartPostRequest = async ({ apiUrlPath, jsonBody }: { apiUrlPath: string; jsonBody: any }) => {
  return await Axios.post(`${getApiBaseUrl()}${apiUrlPath}`, jsonBody, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
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

export const httpMultipartUpdateRequest = async ({ apiUrlPath, jsonBody }: { apiUrlPath: string; jsonBody: any }) => {
  return await Axios.put(`${getApiBaseUrl()}${apiUrlPath}`, jsonBody, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
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
