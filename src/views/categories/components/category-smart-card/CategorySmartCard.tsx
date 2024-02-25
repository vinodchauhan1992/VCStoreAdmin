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
  catData?: CategoryModel | null
  selectedCategoryData?: CategoryModel | null
  isActionsVisible?: boolean
  isButtonsVisible?: boolean
  isButton1Visible?: boolean
  isButton2Visible?: boolean
  isButton3Visible?: boolean
  button1Text?: string
  button2Text?: string
  button3Text?: string
  onButton1Click?: (dataIndex: number, catData?: CategoryModel | null) => void
  onButton2Click?: (dataIndex: number, catData?: CategoryModel | null) => void
  onButton3Click?: (dataIndex: number, catData?: CategoryModel | null) => void
  isCardClickable?: boolean
  openViewCategory?: boolean
  setOpenViewCategory?: (openViewCategory: boolean) => void
  cardSx?: any
}

const CategorySmartCard = (props: Props) => {
  const {
    dataIndex = 0,
    catData,
    selectedCategoryData,
    isActionsVisible = true,
    isButtonsVisible = true,
    isButton1Visible = true,
    isButton2Visible = true,
    isButton3Visible = false,
    button1Text = 'Delete',
    button2Text = 'Edit',
    button3Text = 'More',
    onButton1Click,
    onButton2Click,
    onButton3Click,
    isCardClickable = true,
    cardSx = { maxWidth: 345 },
    openViewCategory,
    setOpenViewCategory
  } = props

  const handleOpeningClosingViewCategory = () => {
    setOpenViewCategory?.(!openViewCategory)
  }

  const renderButtonActions = () => {
    if (isButtonsVisible) {
      return (
        <>
          {isButton1Visible ? (
            <ButtonStyled
              color='error'
              variant='outlined'
              onClick={() => onButton1Click?.(dataIndex, catData)}
            >
              <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                {button1Text}
              </Typography>
            </ButtonStyled>
          ) : (
            true
          )}
          {isButton2Visible ? (
            <ButtonStyled
              color='info'
              variant='outlined'
              onClick={() => onButton2Click?.(dataIndex, catData)}
            >
              <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                {button2Text}
              </Typography>
            </ButtonStyled>
          ) : null}
          {isButton3Visible ? (
            <ButtonStyled
              color='success'
              variant='outlined'
              onClick={() => onButton3Click?.(dataIndex, catData)}
            >
              <Typography color='success' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                {button3Text}
              </Typography>
            </ButtonStyled>
          ) : null}
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
          src={catData?.imageData?.imageUrl}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {catData?.title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {catData?.description}
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
            handleOpeningClosingViewCategory()
          }}
        >
          {renderCardActionAreaContent()}
        </CardActionArea>
      ) : (
        renderCardActionAreaContent()
      )}
      {isActionsVisible ? <CardActions disableSpacing>{renderButtonActions()}</CardActions> : null}
      <MoreDetails
        selectedCategoryData={selectedCategoryData}
        openViewCategory={openViewCategory}
        handleOpeningClosingViewCategory={() => handleOpeningClosingViewCategory()}
      />
    </Card>
  )
}

export default CategorySmartCard
