import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { convertDateIntoReadableFormat } from 'src/utils/CommonUtils'
import CardMedia from '@mui/material/CardMedia'
import { ProductsDataModel } from 'src/models/ProductsModel'

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
  selectedProductData?: ProductsDataModel | null
  openViewProduct?: boolean
  handleOpeningClosingViewProduct?: () => void
}

const MoreDetails = (props: Props) => {
  const { selectedProductData, openViewProduct, handleOpeningClosingViewProduct } = props

  const renderMoreDetails = () => {
    return (
      <>
        <Typography id='modal-modal-title' variant='h6' color='tomato' component='h2'>
          {`More Details of '${selectedProductData?.productData?.title}' brand:`}
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }} color='text.secondary'>
          {`Brand id: ${selectedProductData?.productData?.id}`}
        </Typography>
        <Typography id='modal-modal-brand-code' sx={{ mt: 2 }} color='text.secondary'>
          {`Brand code: ${selectedProductData?.brandDetails?.title}`}
        </Typography>
        <Typography id='modal-modal-brand-logo-full-path' sx={{ mt: 2 }} color='text.secondary'>
          {`Brand logo full path: ${selectedProductData?.productData?.imageData?.fullPath}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color='teal'>
          {`Date added on: ${convertDateIntoReadableFormat(selectedProductData?.productData?.dateAdded)}`}
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }} color='blueviolet'>
          {`Last updated: ${convertDateIntoReadableFormat(selectedProductData?.productData?.dateModified)}`}
        </Typography>
      </>
    )
  }

  return (
    <div>
      <Modal
        open={openViewProduct ? true : false}
        onClose={handleOpeningClosingViewProduct}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card>
            <CardMedia
              component='img'
              loading='lazy'
              height='200'
              src={selectedProductData?.productData?.imageData?.imageUrl}
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
