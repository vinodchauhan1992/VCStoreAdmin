import { CountriesModel } from 'src/models/CountriesModel'
import envConfig from '../configs/envConfig'
import { StatesModel } from 'src/models/StatesModel'

export const getApiBaseUrl = () => {
  if (!envConfig.isLocalHostEnvironment) {
    return envConfig.productionHost[`${envConfig.apiVersion}`]
  }

  return envConfig.localHost[`${envConfig.apiVersion}`]
}

export const convertDateIntoReadableFormat = (date?: Date | null) => {
  let convertedData = 'N/A'
  if (date) {
    const newDate = new Date(date)
    convertedData = `${newDate.toUTCString()}`
  }
  return convertedData
}

export const getAvatarText = (text?: string | null) => {
  if (text && text !== '') {
    const splittedTextArray = text.split(' ')
    if (splittedTextArray.length === 1) {
      return splittedTextArray[0].charAt(0)
    }
    return `${splittedTextArray[0].charAt(0)}${splittedTextArray[splittedTextArray.length - 1].charAt(0)}`
  }
  return 'A'
}

export const getCountryFromCountryId = ({
  countryID,
  allCountriesData
}: {
  countryID?: string | null
  allCountriesData?: CountriesModel[] | null
}) => {
  if (countryID && countryID !== '') {
    const foundObject = allCountriesData?.find(countryData => countryData?.id === countryID)
    if (foundObject) {
      return foundObject
    }
  }
  return null
}

export const getStateFromCountryAndStateId = ({
  countryID,
  stateID,
  statesByCountryIdData
}: {
  countryID?: string | null
  stateID?: string | null
  statesByCountryIdData?: StatesModel[] | null
}) => {
  console.log('countryID', countryID)
  console.log('stateID', stateID)
  console.log('statesByCountryIdData', statesByCountryIdData)
  if (stateID && stateID !== '') {
    const foundObject = statesByCountryIdData?.find(
      stateData => stateData?.id === stateID && stateData?.countryID === countryID
    )
    if (foundObject) {
      return foundObject
    }
  }
  return null
}

export const convertFileSizeToReadableFormat = (sizeInBytes: number) => {
  if (sizeInBytes) {
    if (sizeInBytes < 1024) {
      return `${Math.round(sizeInBytes * 100) / 100} Bytes`
    }
    if (sizeInBytes >= 1024) {
      const sizeInKb = sizeInBytes / 1024
      if (sizeInKb < 1024) {
        return `${Math.round(sizeInKb * 100) / 100} KB`
      }
      if (sizeInKb >= 1024) {
        const sizeInMb = sizeInKb / 1024
        return `${Math.round(sizeInMb * 100) / 100} MB`
      }
    }
  }
  return '0 Bytes'
}
