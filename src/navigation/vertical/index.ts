// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'
import FilterMenuOutline from 'mdi-material-ui/FilterMenuOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AdminMenusReducer, LoginReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { useEffect, useState } from 'react'

const Navigation = (): VerticalNavItemsType => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const isUserLoggedIn = useAppSelector(LoginReducer.selectIsUserLoggedIn)
  // @ts-ignore
  const allAdminMenusDataResult = useAppSelector(AdminMenusReducer.selectAllAdminMenusDataResult)

  const defaultNavArr = [
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

  // const afterLogin = [
  //   {
  //     title: 'Dashboard',
  //     icon: HomeOutline,
  //     path: '/'
  //   },
  //   {
  //     title: 'Menus',
  //     icon: AccountOutline,
  //     path: '/menus'
  //   },
  //   {
  //     title: 'Submenus',
  //     icon: AccountOutline,
  //     path: '/submenus'
  //   },
  //   {
  //     title: 'Menu Statuses',
  //     icon: AccountOutline,
  //     path: '/menuStatuses'
  //   },
  //   {
  //     title: 'Users',
  //     icon: AccountOutline,
  //     path: '/users'
  //   },
  //   {
  //     title: 'User Roles',
  //     icon: AccountOutline,
  //     path: '/userRoles'
  //   },
  //   {
  //     title: 'User Statuses',
  //     icon: AccountOutline,
  //     path: '/userStatuses'
  //   },
  //   {
  //     title: 'File Folders',
  //     icon: AccountOutline,
  //     path: '/fileFolders'
  //   },
  //   {
  //     title: 'Categories',
  //     icon: FilterMenuOutline,
  //     path: '/categories'
  //   },
  //   {
  //     title: 'Products',
  //     icon: ShoppingOutline,
  //     path: '/products'
  //   }
  // ]

  const [navigationArr, setNavigationArr] = useState(defaultNavArr)

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENUS' })
  }, [isUserLoggedIn])

  const getMenuAfterLogin = () => {
    if (isUserLoggedIn) {
      const newNavArr: any[] = []
      allAdminMenusDataResult?.dataArray?.map((menuData: any) => {
        newNavArr.push({
          title: menuData.menuTitle,
          icon: ShoppingOutline,
          path: menuData.menuPath,
          extraData: menuData,
        })
      })
      setNavigationArr(newNavArr)
    } else {
      setNavigationArr(defaultNavArr)
    }
  }

  useEffect(() => {
    getMenuAfterLogin()
  }, [allAdminMenusDataResult])

  return navigationArr
}

export default Navigation
