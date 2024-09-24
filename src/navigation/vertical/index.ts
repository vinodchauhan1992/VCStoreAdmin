// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AdminMenusReducer, LoginReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { useEffect, useState } from 'react'
import { getVerticalNavMenuIcon } from 'src/utils/VerticalNavMenuUtils'
import { AdminMenusModel } from 'src/models/AdminMenusModel'

const Navigation = (): VerticalNavItemsType => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const isUserLoggedIn = useAppSelector(LoginReducer.selectIsUserLoggedIn)
  // @ts-ignore
  const allAdminMenusDataResult = useAppSelector(AdminMenusReducer.selectAllAdminMenusDataResult)

  const beforeLoginMenuArr: AdminMenusModel[] = [
    {
      menuTitle: 'Login',
      menuPath: '/login',
      adminMenuStatus: 'Active',
      adminMenuStatusID: '1',
      isDeleteable: false,
      isAdminDeleteable: true,
      priority: 1
    },
    {
      menuTitle: 'Dashboard',
      menuPath: '/',
      adminMenuStatus: 'Active',
      adminMenuStatusID: '2',
      isDeleteable: false,
      isAdminDeleteable: true,
      priority: 2
    }
  ]

  const [navigationArr, setNavigationArr] = useState([])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENUS' })
  }, [isUserLoggedIn])

  const getVerticalNavigationMenu = () => {
    const newNavArr: any = []
    const arrForMap: AdminMenusModel[] = isUserLoggedIn ? allAdminMenusDataResult?.dataArray : beforeLoginMenuArr
    arrForMap?.map((menuData: AdminMenusModel) => {
      newNavArr.push({
        title: menuData.menuTitle,
        icon: getVerticalNavMenuIcon(menuData),
        path: menuData.menuPath,
        extraData: menuData
      })
    })
    setNavigationArr(newNavArr)
  }

  useEffect(() => {
    getVerticalNavigationMenu()
  }, [allAdminMenusDataResult])

  return navigationArr
}

export default Navigation
