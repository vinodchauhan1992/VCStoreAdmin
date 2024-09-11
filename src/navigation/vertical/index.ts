// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import FilterMenuOutline from 'mdi-material-ui/FilterMenuOutline'
import Login from 'mdi-material-ui/Login'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { LoginReducer, useAppSelector } from 'src/redux/reducers'

const Navigation = (): VerticalNavItemsType => {
  // @ts-ignore
  const isUserLoggedIn = useAppSelector(LoginReducer.selectIsUserLoggedIn)

  return !isUserLoggedIn
    ? [
        {
          title: 'Login',
          icon: HomeOutline,
          path: '/login'
        },
        {
          title: 'Dashboard',
          icon: HomeOutline,
          path: '/'
        }
      ]
    : [
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
          title: 'User Roles',
          icon: AccountOutline,
          path: '/userRoles'
        },
        {
          title: 'User Statuses',
          icon: AccountOutline,
          path: '/userStatuses'
        },
        {
          title: 'File Folders',
          icon: AccountOutline,
          path: '/fileFolders'
        },
        {
          title: 'Categories',
          icon: FilterMenuOutline,
          path: '/categories'
        },
        {
          title: 'Products',
          icon: ShoppingOutline,
          path: '/products'
        }
      ]
}

export default Navigation
