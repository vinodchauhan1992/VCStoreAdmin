// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import { UserReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
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
  const allUsersDataArray = useAppSelector(UserReducer.selectAllUsersData)

  const [userRelatedStatsData, setUserRelatedStatsData] = useState(getDashboardUserStatsData([]))
  const [totalGrowthOnUsers, setTotalGrowthOnUsers] = useState({ growthPercent: 0, type: 'reduction' })
  const [cardStatisticsVerticalComponentsData, setCardStatisticsVerticalComponentsData] = useState<
    VerticalCardStatisticDataReturnProps[] | []
  >([])

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS' })
  }, [])

  useEffect(() => {
    setUserRelatedStatsData(getDashboardUserStatsData(allUsersDataArray))
    setTotalGrowthOnUsers(getTotalGrowthOnUsers(allUsersDataArray))
  }, [allUsersDataArray])

  useEffect(() => {
    const data = getVerticalCardStatisticData()
    setCardStatisticsVerticalComponentsData(data)
  }, [])

  const renderPerStatCardForVerticalComponent = (dataDimension1: VerticalCardStatisticDataReturnProps) => {
    return dataDimension1?.patchData?.map((dataDimension2: VerticalCardPatchStatisticDataReturnProps) => {
      return (
        <Grid item xs={6}>
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
    })
  }

  const renderCardStatisticsVerticalComponents = () => {
    return cardStatisticsVerticalComponentsData?.map((dataDimension1: VerticalCardStatisticDataReturnProps) => {
      return (
        <Grid item xs={6} md={6} lg={6}>
          <Grid container spacing={6}>
            {renderPerStatCardForVerticalComponent(dataDimension1)}
          </Grid>
        </Grid>
      )
    })
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
