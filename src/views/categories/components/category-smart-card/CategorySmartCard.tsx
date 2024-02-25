import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions, ButtonProps } from '@mui/material'
import { CategoryModel } from 'src/models/CategoryModel'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MoreDetails from '../moreDetails/MoreDetails'

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

interface Props {
  dataIndex?: number
  selectedCategoryData?: CategoryModel | null
  moreDetailsCategoryData?: CategoryModel | null
  setMoreDetailsCategoryData?: (moreDetailsCategoryData?: CategoryModel | null) => void
  isActionsVisible?: boolean
  isButtonsVisible?: boolean
  button1Text?: string
  button2Text?: string
  onButton1Click?: (dataIndex: number, selectedCategoryData?: CategoryModel | null) => void
  onButton2Click?: (dataIndex: number, selectedCategoryData?: CategoryModel | null) => void
  isCardClickable?: boolean
  cardSx?: any
}

const CategorySmartCard = (props: Props) => {
  const {
    dataIndex = 0,
    selectedCategoryData,
    isActionsVisible = true,
    isButtonsVisible = true,
    button1Text = 'Delete',
    button2Text = 'Edit',
    onButton1Click,
    onButton2Click,
    moreDetailsCategoryData,
    setMoreDetailsCategoryData,
    isCardClickable = true,
    cardSx = { maxWidth: 345 }
  } = props

  const handleMoreDetailsData = (isClosed: boolean) => {
    if (selectedCategoryData?.id === moreDetailsCategoryData?.id || isClosed) {
      setMoreDetailsCategoryData?.(null)
    } else {
      setMoreDetailsCategoryData?.(selectedCategoryData)
    }
  }

  const renderButtonActions = () => {
    if (isButtonsVisible) {
      return (
        <>
          <ButtonStyled
            color='error'
            variant='outlined'
            onClick={() => onButton1Click?.(dataIndex, selectedCategoryData)}
          >
            <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
              {button1Text}
            </Typography>
          </ButtonStyled>
          <ButtonStyled
            color='info'
            variant='outlined'
            onClick={() => onButton2Click?.(dataIndex, selectedCategoryData)}
          >
            <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
              {button2Text}
            </Typography>
          </ButtonStyled>
        </>
      )
    }

    return null
  }

  const renderCardActionAreaContent = () => {
    return (
      <>
        <CardMedia
          component='img'
          loading='lazy'
          height='140'
          src={selectedCategoryData?.imageData?.imageUrl}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {selectedCategoryData?.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {selectedCategoryData?.description}
          </Typography>
        </CardContent>
      </>
    )
  }

  return (
    <Card sx={cardSx}>
      {isCardClickable ? (
        <CardActionArea
          onClick={() => {
            handleMoreDetailsData(false)
          }}
        >
          {renderCardActionAreaContent()}
        </CardActionArea>
      ) : (
        renderCardActionAreaContent()
      )}
      {isActionsVisible ? <CardActions disableSpacing>{renderButtonActions()}</CardActions> : null}
      <MoreDetails
        moreDetailsCategoryData={moreDetailsCategoryData}
        setMoreDetailsCategoryData={() => handleMoreDetailsData(true)}
      />
    </Card>
  )
}

export default CategorySmartCard
