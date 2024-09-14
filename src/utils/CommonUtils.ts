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
