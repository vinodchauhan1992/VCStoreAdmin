import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { BrandsModel } from 'src/models/BrandsModel'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'
import CardMedia from '@mui/material/CardMedia'

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
  selectedBrandData?: BrandsModel | null
  openViewBrand?: boolean
  handleOpeningClosingViewBrand?: () => void
}

const MoreDetails = (props: Props) => {
  const { selectedBrandData, openViewBrand, handleOpeningClosingViewBrand } = props

  const renderMoreDetails = () => {
    return (
      <>
        <Typography id='modal-modal-title' variant='h6' color='tomato' component='h2'>
          {`More Details of '${selectedBrandData?.title}' brand:`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Brand id: ${selectedBrandData?.id}`}
        </Typography>
        <Typography id='modal-modal-brand-code' sx={{ mt: 2 }} color='text.secondary'>
          {`Brand code: ${selectedBrandData?.code}`}
        </Typography>
        <Typography id='modal-modal-brand-logo-full-path' sx={{ mt: 2 }} color='text.secondary'>
          {`Brand logo full path: ${selectedBrandData?.brandLogo?.fullPath}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color='teal'>
          {`Date added on: ${convertDateIntoReadableFormat(selectedBrandData?.dateAdded)}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color='blueviolet'>
          {`Last updated: ${convertDateIntoReadableFormat(selectedBrandData?.dateModified)}`}
        </Typography>
      </>
    )
  }

  return (
    <div>
      <Modal
        open={openViewBrand ? true : false}
        onClose={handleOpeningClosingViewBrand}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card>
            <CardMedia
              component='img'
              loading='lazy'
              height='200'
              src={selectedBrandData?.brandLogo?.imageUrl}
              alt='green iguana'
            />
            <CardContent>{renderMoreDetails()}</CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  )
}

export default MoreDetails
