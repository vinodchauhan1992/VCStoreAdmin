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
  selectedCategoryData?: CategoryModel | null
  openViewCategory?: boolean
  handleOpeningClosingViewCategory?: () => void
}

const MoreDetails = (props: Props) => {
  const { selectedCategoryData, openViewCategory, handleOpeningClosingViewCategory } = props

  const renderMoreDetails = () => {
    return (
      <>
        <Typography id='modal-modal-title' variant='h6' color='tomato' component='h2'>
          {`More Details of '${selectedCategoryData?.title}' category:`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Category id: ${selectedCategoryData?.id}`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Category code: ${selectedCategoryData?.code}`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Image full path: ${selectedCategoryData?.imageData?.fullPath}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color='teal'>
          {`Date added on: ${selectedCategoryData?.dateAdded}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color='blueviolet'>
          {`Last updated: ${selectedCategoryData?.dateModified}`}
        </Typography>
      </>
    )
  }

  return (
    <div>
      <Modal
        open={openViewCategory ? true : false}
        onClose={handleOpeningClosingViewCategory}
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
