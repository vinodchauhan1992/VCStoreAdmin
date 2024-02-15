import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import TimerSandEmpty from 'mdi-material-ui/TimerSandEmpty'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

const CustomisedErrorEmpty = ({
  type = 'empty',
  title = 'Empty!',
  message
}: {
  type?: 'empty' | 'error'
  title?: string
  message?: string
}) => {
  const getIcon = () => {
    if (type === 'error') {
      return <AlertCircleOutline fontSize='large' />
    }

    return <TimerSandEmpty fontSize='large' />
  }

  const getTitle = () => {
    if (type === 'error' && (!title || title === '')) {
      return 'Error!'
    } else if (type === 'empty' && (!title || title === '')) {
      return 'Empty!'
    }

    return title
  }

  return (
    <Grid container spacing={7} sx={{ justifyContent: 'center' }}>
      <Grid item xs={12} sm={12}>
        <Card>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {getIcon()}
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: 900, fontSize: '32px !important' }}>{getTitle()}</Typography>
          </CardContent>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: 300, fontSize: '24px !important', textAlign: 'center' }}>
              {message}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomisedErrorEmpty
