import envConfig from '../configs/envConfig'

export const getApiBaseUrl = () => {
  if (!envConfig.isLocalHostEnvironment) {
    return envConfig.productionHost
  }

  return envConfig.localHost
}
