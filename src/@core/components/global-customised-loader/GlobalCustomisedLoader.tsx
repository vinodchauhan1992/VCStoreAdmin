import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { UIReducer, useAppSelector } from 'src/redux/reducers'

const GlobalCustomisedLoader = () => {
  // @ts-ignore
  const isLoaderVisible = useAppSelector(UIReducer.selectShowLoader)

  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoaderVisible ? true : false}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default GlobalCustomisedLoader
