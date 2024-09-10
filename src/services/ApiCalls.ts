import ApiCallTypes from './ApiCallTypes'
import ApiContainerUrls from './ApiContainerUrls'
import { ApiCallsModel, ApiCallsReturnModel } from '../models/serviceModels/ApiCallModel'
import { ApiContentType } from 'src/models/serviceModels/ApiServiceModel'

/**
 * This function is responsible to decide the requestType and requestUrl of api calls
 * @param {ApiCallsModel} apiType
 */
export const apiCalls = ({ apiType }: ApiCallsModel): ApiCallsReturnModel => {
  let requestType = ''
  let requestUrl = ''
  let contentType: ApiContentType = 'application/json'
  switch (apiType) {
    /* ---------- GET requests starts ---------------------------- */
    case ApiCallTypes.GET_ALL_CATEGORIES_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_CATEGORIES_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_USER_ROLES_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_USER_ROLES_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_USER_STATUSES_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_USER_STATUSES_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_FILE_FOLDERS_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_FILE_FOLDERS_API_PATH
      contentType = 'application/json'
      break

    /* ---------- GET requests ends ---------------------------- */

    /* ---------- POST requests starts ---------------------------- */
    case ApiCallTypes.ADD_CATEGORY_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_CATEGORY_API_PATH
      contentType = 'multipart/form-data'
      break

    case ApiCallTypes.ADD_USER_ROLE_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_USER_ROLE_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.ADD_USER_STATUS_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_USER_STATUS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.ADD_FILE_FOLDER_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_FILE_FOLDER_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.AUTH_LOGIN_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.AUTH_LOGIN_API_PATH
      contentType = 'application/json'
      break

    /* ---------- POST requests ends ---------------------------- */

    /* ---------- DELETE requests starts ---------------------------- */
    case ApiCallTypes.DELETE_CATEGORY_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_CATEGORY_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_USER_ROLE_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_USER_ROLE_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_USER_STATUS_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_USER_STATUS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_FILE_FOLDER_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_FILE_FOLDER_API_PATH
      contentType = 'application/json'
      break

    /* ---------- DELETE requests ends ---------------------------- */

    /* ---------- UPDATE requests starts ---------------------------- */
    case ApiCallTypes.UPDATE_CATEGORY_TYPE:
      requestType = 'PUT'
      requestUrl = ApiContainerUrls.UPDATE_CATEGORY_API_PATH
      contentType = 'multipart/form-data'
      break

    /* ---------- UPDATE requests ends ---------------------------- */
  }

  return { requestType, requestUrl, contentType }
}
