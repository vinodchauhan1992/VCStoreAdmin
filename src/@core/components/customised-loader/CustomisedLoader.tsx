import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

interface CustomisedLoaderProps {
  visible: boolean
}

const CustomisedLoader = (props: CustomisedLoaderProps) => {
  const { visible } = props

  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={visible}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default CustomisedLoader
