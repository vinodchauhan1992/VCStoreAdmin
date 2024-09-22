import { AlertValuesModel } from 'src/models/AlertValuesModel'
import {
  AddNewUserValidationInfoParamsModel,
  CommonValidationInfoParamsModel,
  PasswordValidationInfoParamsModel,
  UserImageValidationInfoParamsModel,
  UserRoleValidationInfoParamsModel,
  UserStatusValidationInfoParamsModel
} from 'src/models/UserModel'
import moment from 'moment'

export const userImageFieldsValidationInfo = (params: UserImageValidationInfoParamsModel): AlertValuesModel => {
  const { imageFileData, defaultImage } = params
  if (!imageFileData || imageFileData === '' || imageFileData === defaultImage) {
    return {
      severity: 'error',
      message: 'Please select an image.',
      isVisible: true,
      accordionName: 'upload user image'
    }
  }
  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const personalDetailsFieldsValidationInfo = (params: CommonValidationInfoParamsModel): AlertValuesModel => {
  const { values } = params
  if (!values?.firstname || values.firstname === '') {
    return {
      severity: 'error',
      message: 'Please enter firstname.',
      isVisible: true,
      accordionName: 'personal details'
    }
  }
  if (!values?.lastname || values.lastname === '') {
    return {
      severity: 'error',
      message: 'Please enter lastname.',
      isVisible: true,
      accordionName: 'personal details'
    }
  }
  if (!values?.dateOfBirth) {
    return {
      severity: 'error',
      message: 'Please select date of birth.',
      isVisible: true,
      accordionName: 'personal details'
    }
  }
  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const userRoleDetailsValidationInfo = (params: UserRoleValidationInfoParamsModel): AlertValuesModel => {
  const { selectedUserRole } = params
  if (!selectedUserRole?.id || !selectedUserRole?.role || !selectedUserRole?.userType) {
    return {
      severity: 'error',
      message: 'Please select user role.',
      isVisible: true,
      accordionName: 'role details'
    }
  }
  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const userStatusDetailsValidationInfo = (params: UserStatusValidationInfoParamsModel): AlertValuesModel => {
  const { selectedUserStatus } = params
  if (!selectedUserStatus?.id || !selectedUserStatus?.status) {
    return {
      severity: 'error',
      message: 'Please select user status.',
      isVisible: true,
      accordionName: 'status details'
    }
  }
  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const contactDetailsValidationInfo = (params: CommonValidationInfoParamsModel): AlertValuesModel => {
  const { values } = params
  if (!values?.email || values.email === '') {
    return {
      severity: 'error',
      message: 'Please enter email address.',
      isVisible: true,
      accordionName: 'contact details'
    }
  }
  if (!values?.username || values.username === '') {
    return {
      severity: 'error',
      message: 'Please enter username.',
      isVisible: true,
      accordionName: 'contact details'
    }
  }
  if (!values?.phone || values.phone === '') {
    return {
      severity: 'error',
      message: 'Please enter phone number.',
      isVisible: true,
      accordionName: 'contact details'
    }
  }
  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const addressDetailsFieldsValidationInfo = (params: CommonValidationInfoParamsModel): AlertValuesModel => {
  const { values } = params
  if (!values?.address || values.address === '') {
    return {
      severity: 'error',
      message: 'Please enter address.',
      isVisible: true,
      accordionName: 'address details'
    }
  }
  if (!values?.city || values.city === '') {
    return {
      severity: 'error',
      message: 'Please enter city.',
      isVisible: true,
      accordionName: 'address details'
    }
  }
  if (!values?.state || values.state === '') {
    return {
      severity: 'error',
      message: 'Please enter state.',
      isVisible: true,
      accordionName: 'address details'
    }
  }
  if (!values?.zipcode || values.zipcode === '') {
    return {
      severity: 'error',
      message: 'Please enter zipcode.',
      isVisible: true,
      accordionName: 'address details'
    }
  }
  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const passwordDetailsFieldsValidationInfo = (params: PasswordValidationInfoParamsModel): AlertValuesModel => {
  const { values, confirmPassword } = params
  if (!values?.password || values.password === '') {
    return {
      severity: 'error',
      message: 'Please enter password.',
      isVisible: true,
      accordionName: 'password details'
    }
  }
  if (values.password.length < 8) {
    return {
      severity: 'error',
      message: 'Password must be 8 or more characters long.',
      isVisible: true,
      accordionName: 'password details'
    }
  }
  if (!confirmPassword || confirmPassword === '') {
    return {
      severity: 'error',
      message: 'Please confirm your password.',
      isVisible: true,
      accordionName: 'password details'
    }
  }
  if (values.password !== confirmPassword) {
    return {
      severity: 'error',
      message: 'Password and confirm password not matched.',
      isVisible: true,
      accordionName: 'password details'
    }
  }
  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const addNewUserValidationInfo = (params: AddNewUserValidationInfoParamsModel): AlertValuesModel => {
  const { selectedUserRole, selectedUserStatus, values, imageFileData, defaultImage, confirmPassword } = params

  const userImageFieldsValidationInfoData = userImageFieldsValidationInfo({ imageFileData, defaultImage })
  if (userImageFieldsValidationInfoData.severity === 'error') {
    return userImageFieldsValidationInfoData
  }

  const personalDetailsFieldsValidationInfoData = personalDetailsFieldsValidationInfo({ values })
  if (personalDetailsFieldsValidationInfoData.severity === 'error') {
    return personalDetailsFieldsValidationInfoData
  }

  const userRoleDetailsValidationInfoData = userRoleDetailsValidationInfo({ selectedUserRole })
  if (userRoleDetailsValidationInfoData.severity === 'error') {
    return userRoleDetailsValidationInfoData
  }

  const userStatusDetailsValidationInfoData = userStatusDetailsValidationInfo({ selectedUserStatus })
  if (userStatusDetailsValidationInfoData.severity === 'error') {
    return userStatusDetailsValidationInfoData
  }

  const contactDetailsValidationInfoData = contactDetailsValidationInfo({ values })
  if (contactDetailsValidationInfoData.severity === 'error') {
    return contactDetailsValidationInfoData
  }

  const addressDetailsFieldsValidationInfoData = addressDetailsFieldsValidationInfo({ values })
  if (addressDetailsFieldsValidationInfoData.severity === 'error') {
    return addressDetailsFieldsValidationInfoData
  }

  const passwordDetailsFieldsValidationInfoData = passwordDetailsFieldsValidationInfo({ values, confirmPassword })
  if (passwordDetailsFieldsValidationInfoData.severity === 'error') {
    return passwordDetailsFieldsValidationInfoData
  }

  return {
    severity: 'success',
    message: '',
    isVisible: false,
    accordionName: null
  }
}

export const getPastDateFromNow = (yearsAgo?: number | null) => {
  const currentDate = new Date()
  if (yearsAgo && yearsAgo !== 0) {
    currentDate.setFullYear(currentDate.getFullYear() - yearsAgo)
    const formattedDate = moment(currentDate).format('yyyy-MM-DD')
    return formattedDate
  }
  return currentDate
}
