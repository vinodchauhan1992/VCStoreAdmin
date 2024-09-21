// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export interface StatsDataTypeProps {
  id: number
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

export interface GrowthDataTypeProps {
  growthPercent: number
  type: 'reduction' | 'growth'
}

const renderStats = (dataArray: StatsDataTypeProps[]) => {
  return dataArray.map((item: StatsDataTypeProps, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

export interface StatisticsCardProps {
  statsDataArray: StatsDataTypeProps[]
  growthData: GrowthDataTypeProps
}

const StatisticsCard = (props: StatisticsCardProps) => {
  const { statsDataArray, growthData } = props

  const getGrowthShowText = () => {
    let signToShow = ''
    let newGrowthPercent = growthData?.growthPercent ? growthData.growthPercent : 0
    if (growthData && growthData?.type === 'growth') {
      signToShow = '+'
    } else if (growthData && growthData?.type === 'reduction') {
      signToShow = '-'
    }

    return newGrowthPercent > 0 ? ` ${signToShow}${newGrowthPercent}% growth` : ` ${newGrowthPercent}% growth`
  }

  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total
            </Box>
            <Box
              component='span'
              sx={{
                fontWeight: 600,
                color: growthData && growthData?.type === 'growth' ? 'success.dark' : 'error.dark'
              }}
            >
              {`${getGrowthShowText()}`}
            </Box>{' '}
            this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(statsDataArray)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
