// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Users',
      icon: AccountOutline,
      path: '/users'
    },
    {
      title: 'Categories',
      icon: AccountOutline,
      path: '/categories'
    },
    {
      title: 'Products',
      icon: AccountOutline,
      path: '/products'
    }
  ]
}

export default navigation
