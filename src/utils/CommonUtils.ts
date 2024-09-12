import envConfig from '../configs/envConfig'

export const getApiBaseUrl = () => {
  if (!envConfig.isLocalHostEnvironment) {
    return envConfig.productionHost[`${envConfig.apiVersion}`]
  }

  return envConfig.localHost[`${envConfig.apiVersion}`]
}