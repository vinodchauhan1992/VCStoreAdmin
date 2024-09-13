enum ApiVersionEnum {
  v1 = 'v1',
  v2 = 'v2'
}

export default {
  isLocalHostEnvironment: true,
  apiVersion: ApiVersionEnum.v2,
  localHost: {
    v1: 'http://localhost:3371/v1/',
    v2: 'http://localhost:3371/v2/'
  },
  productionHost: {
    v1: 'https://vcstoreapi-production.up.railway.app/v1/',
    v2: 'https://vcstoreapi-production.up.railway.app/v2/'
  }
}
