import FaceAgent from 'mdi-material-ui/FaceAgent'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import Security from 'mdi-material-ui/Security'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import { UserModel } from 'src/models/UserModel'
import { VerticalCardStatisticParamsDataProps } from 'src/models/DashboardUtilsModel'
import ListStatus from 'mdi-material-ui/ListStatus'
import LightningBoltCircle from 'mdi-material-ui/LightningBoltCircle'
import FolderInformation from 'mdi-material-ui/FolderInformation'
import CheckNetwork from 'mdi-material-ui/CheckNetwork'
import MenuOpen from 'mdi-material-ui/MenuOpen'
import Menu from 'mdi-material-ui/Menu'
import ShapeCirclePlus from 'mdi-material-ui/ShapeCirclePlus'
import ChartPpf from 'mdi-material-ui/ChartPpf'

export interface UserDatesProps {
  month: number | null
  date: number | null
  year: number | null
}

export const getMonthDayYearFromDate = (date: Date) => {
  let returnedValues: UserDatesProps = { month: 0, date: 0, year: 0 }
  if (date) {
    returnedValues = {
      month: date?.getUTCMonth?.() ? date.getUTCMonth() + 1 : 0,
      date: date?.getUTCDate?.() ? date.getUTCDate() : 0,
      year: date?.getUTCFullYear?.() ? date.getUTCFullYear() : 0
    }
  }
  return returnedValues
}

export const getUserDatesDataArray = (allUsersDataArray: UserModel[]) => {
  const userDatesArray: UserDatesProps[] = []
  allUsersDataArray?.map((userData: UserModel) => {
    userDatesArray.push(getMonthDayYearFromDate(new Date(userData?.dateAdded) ?? ''))
    return true
  })
  return userDatesArray
}

export const getTotalGrowthOnUsers = (allUsersDataArray: UserModel[]) => {
  const userDatesArray: UserDatesProps[] = getUserDatesDataArray(allUsersDataArray)
  const todaysDateObj = getMonthDayYearFromDate(new Date())
  const thisMonthsData: UserDatesProps[] = []
  const lastData: UserDatesProps[] = []
  userDatesArray.map((dateObj: UserDatesProps) => {
    if (dateObj.month === todaysDateObj.month && dateObj.year === todaysDateObj.year) {
      thisMonthsData.push(dateObj)
    } else {
      lastData.push(dateObj)
    }
  })

  const thisMonthsDataCount = thisMonthsData.length
  const lastDataCount = lastData.length

  let growthPercent = 0
  let type = 'reduction'
  if (thisMonthsDataCount <= lastDataCount) {
    growthPercent = ((lastDataCount - thisMonthsDataCount) / lastDataCount) * 100
    type = 'reduction'
  } else {
    growthPercent = ((thisMonthsDataCount - lastDataCount) / thisMonthsDataCount) * 100
    type = 'growth'
  }

  return { growthPercent: Math.ceil(growthPercent * 100) / 100, type: type }
}

export const getUsersDataByTypes = (allUsersDataArray: UserModel[]) => {
  let employeesArray: UserModel[] = []
  let employeesCount = 0
  let customersArray: UserModel[] = []
  let customersCount = 0
  let adminsArray: UserModel[] = []
  let adminsCount = 0
  allUsersDataArray?.map(userData => {
    if (userData?.userType && userData.userType !== '' && userData.userType.toLowerCase() === 'employee') {
      employeesArray.push(userData)
      employeesCount = employeesCount + 1
    } else {
      customersArray.push(userData)
      customersCount = customersCount + 1
    }

    if (userData?.userRoleID && userData.userRoleID !== '' && userData.userRoleID === 'administrator1708115407374') {
      adminsArray.push(userData)
      adminsCount = adminsCount + 1
    }
    return true
  })
  return {
    employeesArray: employeesArray,
    employeesCount: employeesCount,
    customersArray: customersArray,
    customersCount: customersCount,
    adminsArray: adminsArray,
    adminsCount: adminsCount
  }
}

export const getDashboardUserStatsData = (allUsersDataArray: UserModel[]) => {
  const { employeesCount, customersCount, adminsCount } = getUsersDataByTypes(allUsersDataArray)

  return [
    {
      id: 1,
      stats: `${employeesCount}`,
      title: 'Employees',
      color: 'primary',
      icon: <FaceAgent sx={{ fontSize: '1.75rem' }} />
    },
    {
      id: 2,
      stats: `${customersCount}`,
      title: 'Customers',
      color: 'success',
      icon: <AccountMultiple sx={{ fontSize: '1.75rem' }} />
    },
    {
      id: 3,
      stats: `${adminsCount}`,
      color: 'warning',
      title: 'Admins',
      icon: <Security sx={{ fontSize: '1.75rem' }} />
    },
    {
      id: 4,
      stats: allUsersDataArray ? `${allUsersDataArray.length}` : '0',
      color: 'info',
      title: 'Total Users',
      icon: <AccountGroup sx={{ fontSize: '1.75rem' }} />
    }
  ]
}

export const getVerticalCardPatch1StatisticData = (props: VerticalCardStatisticParamsDataProps) => {
  return [
    {
      stats: `${props?.allUserRolesDataArray ? props.allUserRolesDataArray.length : 0}`,
      icon: <LightningBoltCircle />,
      color: 'success',
      trendNumber: '+42%',
      title: 'User Roles',
      subtitle: 'User Roles'
    },
    {
      stats: `${props?.allUserStatusesDataArray ? props.allUserStatusesDataArray.length : 0}`,
      title: 'User Statuses',
      trend: 'negative',
      color: 'secondary',
      trendNumber: '-15%',
      subtitle: 'User Statuses',
      icon: <ListStatus />
    },
    {
      stats: `${props?.allFileFoldersDataArray ? props.allFileFoldersDataArray.length : 0}`,
      trend: 'negative',
      trendNumber: '-18%',
      title: 'Total Folders',
      subtitle: 'Total Folders',
      icon: <FolderInformation />
    },
    {
      stats: `${props?.allAdminMenuStatusesDataArray ? props.allAdminMenuStatusesDataArray.length : 0}`,
      color: 'warning',
      trend: 'negative',
      trendNumber: '-18%',
      subtitle: 'Admin Menu Statuses',
      title: 'Admin Menu Statuses',
      icon: <CheckNetwork />
    }
  ]
}

export const getVerticalCardPatch2StatisticData = (props: VerticalCardStatisticParamsDataProps) => {
  return [
    {
      stats: `${props?.allAdminMenusDataArray ? props.allAdminMenusDataArray.length : 0}`,
      icon: <Menu />,
      color: 'success',
      trendNumber: '+42%',
      title: 'Admin Menus',
      subtitle: 'Admin Menus'
    },
    {
      stats: `${props?.allAdminSubmenusDataArray ? props.allAdminSubmenusDataArray.length : 0}`,
      title: 'Admin Submenus',
      trend: 'negative',
      color: 'secondary',
      trendNumber: '-15%',
      subtitle: 'Admin Submenus',
      icon: <MenuOpen />
    },
    {
      stats: `${props?.allCategoriesDataArray ? props.allCategoriesDataArray.length : 0}`,
      trend: 'negative',
      trendNumber: '-18%',
      title: 'Total Categories',
      subtitle: 'Total Categories',
      icon: <ShapeCirclePlus />
    },
    {
      stats: `${props?.allProductsDataArray ? props.allProductsDataArray.length : 0}`,
      color: 'warning',
      trend: 'negative',
      trendNumber: '-18%',
      subtitle: 'Total Products',
      title: 'Total Products',
      icon: <ChartPpf />
    }
  ]
}

export const getVerticalCardStatisticData = (props: VerticalCardStatisticParamsDataProps) => {
  const statsData = [
    {
      patchData: getVerticalCardPatch1StatisticData(props)
    },
    {
      patchData: getVerticalCardPatch2StatisticData(props)
    }
  ]

  return statsData
}
