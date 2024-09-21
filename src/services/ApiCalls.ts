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

    case ApiCallTypes.GET_ALL_USERS_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_USERS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_ADMIN_MENUS_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_ADMIN_MENUS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_ADMIN_SUBMENUS_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_ADMIN_SUBMENUS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_ADMIN_MENU_STATUSES_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_ADMIN_MENU_STATUSES_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_PRODUCTS_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_PRODUCTS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_MENUS_MAX_PRIORITY_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_MENUS_MAX_PRIORITY_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_SUBMENUS_MAX_PRIORITY_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_SUBMENUS_MAX_PRIORITY_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_SUBMENU_BY_MENU_ID_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_SUBMENU_BY_MENU_ID_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.GET_ALL_BRANDS_TYPE:
      requestType = 'GET'
      requestUrl = ApiContainerUrls.GET_ALL_BRANDS_API_PATH
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

    case ApiCallTypes.ADD_ADMIN_MENU_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_ADMIN_MENU_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.ADD_ADMIN_MENU_STATUS_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_ADMIN_MENU_STATUS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.ADD_ADMIN_SUBMENU_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_ADMIN_SUBMENU_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.ADD_PRODUCT_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_PRODUCT_API_PATH
      contentType = 'multipart/form-data'
      break

    case ApiCallTypes.ADD_USER_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_USER_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.ADD_BRAND_TYPE:
      requestType = 'POST'
      requestUrl = ApiContainerUrls.ADD_BRAND_API_PATH
      contentType = 'multipart/form-data'
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

    case ApiCallTypes.DELETE_ADMIN_MENU_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_ADMIN_MENU_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_ADMIN_MENU_STATUS_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_ADMIN_MENU_STATUS_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_ADMIN_SUBMENU_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_ADMIN_SUBMENU_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_PRODUCT_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_PRODUCT_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_USER_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_USER_API_PATH
      contentType = 'application/json'
      break

    case ApiCallTypes.DELETE_BRAND_TYPE:
      requestType = 'DELETE'
      requestUrl = ApiContainerUrls.DELETE_BRAND_API_PATH
      contentType = 'application/json'
      break
    /* ---------- DELETE requests ends ---------------------------- */

    /* ---------- UPDATE requests starts ---------------------------- */
    case ApiCallTypes.UPDATE_CATEGORY_TYPE:
      requestType = 'PUT'
      requestUrl = ApiContainerUrls.UPDATE_CATEGORY_API_PATH
      contentType = 'multipart/form-data'
      break

    case ApiCallTypes.UPDATE_BRAND_TYPE:
      requestType = 'PUT'
      requestUrl = ApiContainerUrls.UPDATE_BRAND_API_PATH
      contentType = 'multipart/form-data'
      break

    case ApiCallTypes.UPDATE_USER_ROLE_TYPE:
      requestType = 'PUT'
      requestUrl = ApiContainerUrls.UPDATE_USER_ROLE_API_PATH
      contentType = 'application/json'
      break
    /* ---------- UPDATE requests ends ---------------------------- */
  }

  return { requestType, requestUrl, contentType }
}
