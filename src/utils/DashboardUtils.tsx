import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { UserModel } from 'src/models/UserModel'
import Poll from 'mdi-material-ui/Poll'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

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
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      id: 2,
      stats: `${customersCount}`,
      title: 'Customers',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      id: 3,
      stats: `${adminsCount}`,
      color: 'warning',
      title: 'Admins',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      id: 4,
      stats: allUsersDataArray ? `${allUsersDataArray.length}` : '0',
      color: 'info',
      title: 'Total Users',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    }
  ]
}

export const getVerticalCardPatch1StatisticData = () => {
  return [
    {
      stats: '$25.6k',
      icon: <Poll />,
      color: 'success',
      trendNumber: '+42%',
      title: 'User Roles',
      subtitle: 'User Roles'
    },
    {
      stats: '$78',
      title: 'User Statuses',
      trend: 'negative',
      color: 'secondary',
      trendNumber: '-15%',
      subtitle: 'User Statuses',
      icon: <CurrencyUsd />
    },
    {
      stats: '862',
      trend: 'negative',
      trendNumber: '-18%',
      title: 'Total Folders',
      subtitle: 'Total Folders',
      icon: <BriefcaseVariantOutline />
    },
    {
      stats: '15',
      color: 'warning',
      trend: 'negative',
      trendNumber: '-18%',
      subtitle: 'Admin Menu Statuses',
      title: 'Admin Menu Statuses',
      icon: <HelpCircleOutline />
    }
  ]
}

export const getVerticalCardPatch2StatisticData = () => {
  return [
    {
      stats: '$25.6k',
      icon: <Poll />,
      color: 'success',
      trendNumber: '+42%',
      title: 'Admin Menus',
      subtitle: 'Admin Menus'
    },
    {
      stats: '$78',
      title: 'Admin Submenus',
      trend: 'negative',
      color: 'secondary',
      trendNumber: '-15%',
      subtitle: 'Admin Submenus',
      icon: <CurrencyUsd />
    },
    {
      stats: '862',
      trend: 'negative',
      trendNumber: '-18%',
      title: 'Total Categories',
      subtitle: 'Total Categories',
      icon: <BriefcaseVariantOutline />
    },
    {
      stats: '15',
      color: 'warning',
      trend: 'negative',
      trendNumber: '-18%',
      subtitle: 'Total Products',
      title: 'Total Products',
      icon: <HelpCircleOutline />
    }
  ]
}

export const getVerticalCardStatisticData = () => {
  const statsData = [
    {
      patchData: getVerticalCardPatch1StatisticData()
    },
    {
      patchData: getVerticalCardPatch2StatisticData()
    }
  ]

  return statsData
}
