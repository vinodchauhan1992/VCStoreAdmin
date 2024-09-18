import envConfig from '../configs/envConfig'

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


