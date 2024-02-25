import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { CategoryModel } from 'src/models/CategoryModel'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid blueviolet',
  boxShadow: 24,
  p: 4
}

interface Props {
  moreDetailsCategoryData?: CategoryModel | null
  setMoreDetailsCategoryData?: (moreDetailsCategoryData?: CategoryModel | null) => void
}

const MoreDetails = (props: Props) => {
  const { moreDetailsCategoryData, setMoreDetailsCategoryData } = props

  const renderMoreDetails = () => {
    return (
      <>
        <Typography id='modal-modal-title' variant='h6' color='tomato' component='h2'>
          {`More Details of '${moreDetailsCategoryData?.title}' category:`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Category id: ${moreDetailsCategoryData?.id}`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Category code: ${moreDetailsCategoryData?.code}`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Image full path: ${moreDetailsCategoryData?.imageData?.fullPath}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color='teal'>
          {`Date added on: ${moreDetailsCategoryData?.dateAdded}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color="blueviolet">
          {`Last updated: ${moreDetailsCategoryData?.dateModified}`}
        </Typography>
      </>
    )
  }

  return (
    <div>
      <Modal
        open={moreDetailsCategoryData ? true : false}
        onClose={setMoreDetailsCategoryData}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card>
            <CardContent>{renderMoreDetails()}</CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  )
}

export default MoreDetails
