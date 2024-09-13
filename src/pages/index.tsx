// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import {
  AdminMenuStatusesReducer,
  AdminMenusReducer,
  AdminSubmenusReducer,
  CategoriesReducer,
  FileFoldersReducer,
  ProductsReducer,
  UserReducer,
  UserRolesReducer,
  UserStatusesReducer,
  useAppDispatch,
  useAppSelector
} from 'src/redux/reducers'
import { useEffect, useState } from 'react'
import {
  getDashboardUserStatsData,
  getTotalGrowthOnUsers,
  getVerticalCardStatisticData
} from 'src/utils/DashboardUtils'
import {
  VerticalCardPatchStatisticDataReturnProps,
  VerticalCardStatisticDataReturnProps
} from 'src/models/DashboardUtilsModel'

const Dashboard = () => {
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allUsersDataResult = useAppSelector(UserReducer.selectAllUsersDataResult)
  // @ts-ignore
  const allCategoriesDataResult = useAppSelector(CategoriesReducer.selectAllCategoriesDataResult)
  // @ts-ignore
  const allUserRolesDataResult = useAppSelector(UserRolesReducer.selectAllUserRolesDataResult)
  // @ts-ignore
  const allUserStatusesDataResult = useAppSelector(UserStatusesReducer.selectAllUserStatusesDataResult)
  // @ts-ignore
  const allFileFoldersDataResult = useAppSelector(FileFoldersReducer.selectAllFileFoldersDataResult)
  // @ts-ignore
  const allAdminMenusDataResult = useAppSelector(AdminMenusReducer.selectAllAdminMenusDataResult)
  // @ts-ignore
  const allAdminSubmenusDataResult = useAppSelector(AdminSubmenusReducer.selectAllAdminSubmenusDataResult)
  // @ts-ignore
  const allAdminMenuStatusesDataResult = useAppSelector(AdminMenuStatusesReducer.selectAllAdminMenuStatusesDataResult)
  // @ts-ignore
  const allProductsDataResult = useAppSelector(ProductsReducer.selectAllProductsDataResult)

  const [userRelatedStatsData, setUserRelatedStatsData] = useState(getDashboardUserStatsData([]))
  const [totalGrowthOnUsers, setTotalGrowthOnUsers] = useState({ growthPercent: 0, type: 'reduction' })
  const [cardStatisticsVerticalComponentsData, setCardStatisticsVerticalComponentsData] = useState<
    VerticalCardStatisticDataReturnProps[] | []
  >([])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS' })
  }, [])

  useEffect(() => {
    setUserRelatedStatsData(getDashboardUserStatsData(allUsersDataResult?.dataArray))
    setTotalGrowthOnUsers(getTotalGrowthOnUsers(allUsersDataResult?.dataArray))
    dispatch({ type: 'FETCH_ALL_CATEGORIES' })
  }, [allUsersDataResult?.dataArray])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER_ROLES' })
  }, [allCategoriesDataResult?.dataArray])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USER_STATUSES' })
  }, [allUserRolesDataResult?.dataArray])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_FILE_FOLDERS' })
  }, [allUserStatusesDataResult?.dataArray])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENUS' })
  }, [allFileFoldersDataResult?.dataArray])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_SUBMENUS' })
  }, [allAdminMenusDataResult?.dataArray])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ADMIN_MENU_STATUSES' })
  }, [allAdminSubmenusDataResult?.dataArray])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_PRODUCTS' })
  }, [allAdminMenuStatusesDataResult?.dataArray])

  useEffect(() => {
    const data = getVerticalCardStatisticData({
      allCategoriesDataArray: allCategoriesDataResult?.dataArray,
      allUserRolesDataArray: allUserRolesDataResult?.dataArray,
      allUserStatusesDataArray: allUserStatusesDataResult?.dataArray,
      allFileFoldersDataArray: allFileFoldersDataResult?.dataArray,
      allAdminMenusDataArray: allAdminMenusDataResult?.dataArray,
      allAdminSubmenusDataArray: allAdminSubmenusDataResult?.dataArray,
      allAdminMenuStatusesDataArray: allAdminMenuStatusesDataResult?.dataArray,
      allProductsDataArray: allProductsDataResult?.dataArray
    })
    setCardStatisticsVerticalComponentsData(data)
  }, [
    allCategoriesDataResult?.dataArray,
    allUserRolesDataResult?.dataArray,
    allUserStatusesDataResult?.dataArray,
    allFileFoldersDataResult?.dataArray,
    allAdminMenusDataResult?.dataArray,
    allAdminSubmenusDataResult?.dataArray,
    allAdminMenuStatusesDataResult?.dataArray,
    allProductsDataResult?.dataArray
  ])

  const renderPerStatCardForVerticalComponent = (dataDimension1: VerticalCardStatisticDataReturnProps) => {
    return dataDimension1?.patchData?.map(
      (dataDimension2: VerticalCardPatchStatisticDataReturnProps, index: number) => {
        return (
          <Grid key={`${index.toString()}`} item xs={6}>
            <CardStatisticsVerticalComponent
              stats={dataDimension2?.stats ?? ''}
              icon={dataDimension2?.icon ?? ''}
              color={dataDimension2?.color}
              trendNumber={dataDimension2?.trendNumber ?? ''}
              title={dataDimension2?.title ?? ''}
              subtitle={dataDimension2?.subtitle ?? ''}
            />
          </Grid>
        )
      }
    )
  }

  const renderCardStatisticsVerticalComponents = () => {
    return cardStatisticsVerticalComponentsData?.map(
      (dataDimension1: VerticalCardStatisticDataReturnProps, index: number) => {
        return (
          <Grid key={`${index.toString()}`} item xs={6} md={6} lg={6}>
            <Grid container spacing={6}>
              {renderPerStatCardForVerticalComponent(dataDimension1)}
            </Grid>
          </Grid>
        )
      }
    )
  }

  const renderDashboard = () => {
    return (
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              {/* @ts-ignore */}
              <StatisticsCard statsDataArray={userRelatedStatsData} growthData={totalGrowthOnUsers} />
            </Grid>
            {/* <Grid item xs={6}>
              <StatisticsCard />
            </Grid> */}
          </Grid>
          {renderCardStatisticsVerticalComponents()}
        </Grid>
      </ApexChartWrapper>
    )
  }

  return renderDashboard()
}

export default Dashboard
