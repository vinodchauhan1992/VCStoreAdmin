import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions, ButtonProps } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MoreDetails from '../moreDetails/MoreDetails'
import { ProductsDataModel } from 'src/models/ProductsModel'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import { amber, cyan, green, red } from '@mui/material/colors'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import EditIcon from '@mui/icons-material/Edit'
import MoreSharpIcon from '@mui/icons-material/MoreSharp'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { convertDateIntoReadableFormat, getAvatarText } from 'src/utils/CommonUtils'
import { getFormattedCurrencyWithSymbol } from 'src/utils/CurrencyUtils'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import VerifiedIcon from '@mui/icons-material/Verified'
import PriceCheckRounded from '@mui/icons-material/PriceCheckRounded'
import CancelIcon from '@mui/icons-material/Cancel'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import CustomisedMenu from 'src/@core/components/customised-menu/CustomisedMenu'
import { getStaticMenuOptionData } from 'src/views/products/staticData/staticMenuOptions'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  variants: [
    {
      props: ({ expand }: { expand: any }) => !expand,
      style: {
        transform: 'rotate(0deg)'
      }
    },
    {
      props: ({ expand }: { expand: any }) => !!expand,
      style: {
        transform: 'rotate(180deg)'
      }
    }
  ]
}))

interface Props {
  dataIndex?: number
  productData?: ProductsDataModel | null
  selectedProductData?: ProductsDataModel | null
  isActionsVisible?: boolean
  isButtonsVisible?: boolean
  isButton1Visible?: boolean
  isButton2Visible?: boolean
  isButton3Visible?: boolean
  button1Text?: string
  button2Text?: string
  button3Text?: string
  onButton1Click?: (dataIndex: number, productData?: ProductsDataModel | null) => void
  onButton2Click?: (dataIndex: number, productData?: ProductsDataModel | null) => void
  onButton3Click?: (dataIndex: number, productData?: ProductsDataModel | null) => void
  onShowBrandDetailsClick?: (dataIndex: number, productData?: ProductsDataModel | null) => void
  onShowStockDetailsClick?: (dataIndex: number, productData?: ProductsDataModel | null) => void
  isCardClickable?: boolean
  openViewProduct?: boolean
  setOpenViewProduct?: (openViewProduct: boolean) => void
  cardSx?: any
}

const ProductSmartCard = (props: Props) => {
  const {
    dataIndex = 0,
    productData,
    selectedProductData,
    isActionsVisible = true,
    isButtonsVisible = true,
    isButton1Visible = true,
    isButton2Visible = true,
    isButton3Visible = false,
    button1Text = 'Delete product',
    button2Text = 'Update product',
    button3Text = 'More details',
    onButton1Click,
    onButton2Click,
    onButton3Click,
    isCardClickable = true,
    cardSx = { maxWidth: 345 },
    openViewProduct,
    setOpenViewProduct,
    onShowBrandDetailsClick,
    onShowStockDetailsClick
  } = props

  const [expanded, setExpanded] = React.useState(false)

  const isProfit = productData?.productData?.priceDetails?.isProfit ?? false
  const isProductActive = productData?.productData?.isActive ?? false

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleOpeningClosingViewProduct = () => {
    setOpenViewProduct?.(!openViewProduct)
  }

  const onMenuItemClick = (
    isClickedOutside: boolean,
    cardData?: ProductsDataModel | null,
    selectedMenuOption?: CustomisedMenuItemOptionProps | null
  ) => {
    console.log('onMenuItemClick_isClickedOutside', isClickedOutside)
    console.log('onMenuItemClick_cardData', cardData)
    console.log('onMenuItemClick_selectedMenuOption', selectedMenuOption)
    if (!isClickedOutside) {
      switch (selectedMenuOption?.optionCode) {
        case 'show_brand_details':
          onShowBrandDetailsClick?.(dataIndex, cardData)
          break

        case 'show_stock_details':
          onShowStockDetailsClick?.(dataIndex, cardData)
          break

        case 'update_product':
          onButton2Click?.(dataIndex, cardData)
          break

        case 'delete_product':
          onButton1Click?.(dataIndex, cardData)
          break

        default:
          break
      }
    }
  }

  const isAvatarUrlValid = () => {
    return productData?.brandDetails?.brandLogo?.imageUrl && productData.brandDetails.brandLogo.imageUrl !== ''
      ? true
      : false
  }

  const renderCardHeader = () => {
    return (
      <CardHeader
        avatar={
          <Avatar
            src={isAvatarUrlValid() ? productData?.brandDetails?.brandLogo?.imageUrl : ''}
            sx={{
              bgcolor: 'white',
              color: 'white',
              border: '2px solid orange',
              blockSize: '80px',
              inlineSize: '80px'
            }}
            aria-label='brand-logo'
            variant='rounded'
          >
            {!isAvatarUrlValid() ? getAvatarText('Vinod Chauhan') : null}
          </Avatar>
        }
        action={
          <CustomisedMenu
            cardData={productData}
            menuOptions={getStaticMenuOptionData()}
            onMenuItemClick={({ cardData, selectedMenuOption, isClickedOutside }) =>
              onMenuItemClick(isClickedOutside, cardData, selectedMenuOption)
            }
          />
        }
        title={productData?.productData?.title}
        subheader={`${productData?.brandDetails?.title}`}
      />
    )
  }

  const renderCardMedia = () => {
    return (
      <CardMedia
        component='img'
        height='220'
        image={productData?.productData?.imageData?.imageUrl}
        alt={`${productData?.productData?.title} By ${productData?.brandDetails?.title}`}
      />
    )
  }

  const renderVisibleCardContent = () => {
    return (
      <>
        <CardContent>
          <Stack spacing={5} direction='row'>
            <Chip
              icon={isProfit ? <VerifiedIcon /> : <PriceCheckRounded />}
              label={isProfit ? 'Profit' : 'Loss'}
              size='medium'
              color={isProfit ? 'success' : 'error'}
            />
            <Chip
              icon={isProductActive ? <VerifiedIcon /> : <CancelIcon />}
              label={isProductActive ? 'Active' : 'Inactive'}
              size='medium'
              color={isProductActive ? 'success' : 'error'}
            />
            <Chip label={productData?.productData?.categoryDetails?.categoryTitle} size='medium' color='info' />
          </Stack>
          <Stack spacing={5} direction='row' sx={{ marginTop: 5 }}>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
              {`Purchased price: ${getFormattedCurrencyWithSymbol({
                amount: productData?.productData?.priceDetails?.purchasePrice ?? 0
              })}`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'end' }}>
              {`Selling price: ${getFormattedCurrencyWithSymbol({
                amount: productData?.productData?.priceDetails?.sellingPrice ?? 0
              })}`}
            </Typography>
          </Stack>
          <Divider variant='middle' sx={{ backgroundColor: amber[100] }} />
          <Stack spacing={5} direction='row'>
            <Typography variant='subtitle1' sx={{ color: 'info.dark' }}>
              {`Max discount: ${productData?.productData?.priceDetails?.maxDiscountPercentage ?? 0}%`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'info.dark', textAlign: 'end' }}>
              {`Discount amount: ${getFormattedCurrencyWithSymbol({
                amount: productData?.productData?.priceDetails?.maxDiscountValue ?? 0
              })}`}
            </Typography>
          </Stack>
          <Divider variant='middle' sx={{ backgroundColor: amber[100] }} />
          <Stack spacing={5} direction='row'>
            <Typography variant='subtitle1' sx={{ color: isProfit ? 'success.dark' : 'error.dark' }}>
              {`Profit: ${getFormattedCurrencyWithSymbol({
                amount: productData?.productData?.priceDetails?.profitMargin ?? 0
              })}`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: isProfit ? 'success.dark' : 'error.dark', textAlign: 'end' }}>
              {`Discounted profit: ${getFormattedCurrencyWithSymbol({
                amount: productData?.productData?.priceDetails?.profitAfterMaxDiscount ?? 0
              })}`}
            </Typography>
          </Stack>
          <Divider variant='middle' sx={{ backgroundColor: amber[100] }} />
          <Stack spacing={5} direction='row' sx={{ marginTop: 5 }}>
            <Chip
              label='Brand details'
              size='medium'
              color={isProfit ? 'success' : 'error'}
              variant='outlined'
              onClick={() => onShowBrandDetailsClick?.(dataIndex, productData)}
            />
            <Chip
              label='Stock details'
              size='medium'
              color={isProductActive ? 'success' : 'error'}
              variant='outlined'
              onClick={() => onShowStockDetailsClick?.(dataIndex, productData)}
            />
          </Stack>
        </CardContent>
        <Divider variant='fullWidth' sx={{ backgroundColor: amber[300] }} />
      </>
    )
  }

  const renderCardActions = () => {
    if (!isButtonsVisible) {
      return null
    }
    return (
      <CardActions disableSpacing>
        {isButton1Visible ? (
          <Tooltip title={button1Text} arrow>
            <IconButton aria-label={button1Text} size='large' onClick={() => onButton1Click?.(dataIndex, productData)}>
              <DeleteForeverSharpIcon color='error' />
            </IconButton>
          </Tooltip>
        ) : null}
        {isButton2Visible ? (
          <Tooltip title={button2Text} arrow>
            <IconButton aria-label={button2Text} size='large' onClick={() => onButton2Click?.(dataIndex, productData)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {isButton3Visible ? (
          <Tooltip title={button3Text} arrow>
            <IconButton aria-label={button3Text} size='large' onClick={() => onButton3Click?.(dataIndex, productData)}>
              <MoreSharpIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
          <Tooltip title='Expand For More Details' arrow>
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
    )
  }

  const renderCollapsedCardContent = () => {
    return (
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Divider variant='fullWidth' sx={{ backgroundColor: amber[300] }} />
        <CardContent>
          <div style={{ backgroundColor: cyan[800], borderRadius: 10, padding: 15 }}>
            <Typography variant='body2' sx={{ color: 'white' }}>
              {`Product ID: ${productData?.productData?.id ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'white', marginTop: 2 }}>
              {`Product added on: ${
                productData?.productData?.dateAdded
                  ? convertDateIntoReadableFormat(productData.productData.dateAdded)
                  : 'N/A'
              }`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'white', marginTop: 2 }}>
              {`Product modified on: ${
                productData?.productData?.dateModified
                  ? convertDateIntoReadableFormat(productData.productData.dateModified)
                  : 'N/A'
              }`}
            </Typography>
          </div>
          <Divider variant='middle' sx={{ backgroundColor: amber[100], marginTop: 8, marginBottom: 8 }} />
          <div style={{ backgroundColor: amber[300], borderRadius: 10, padding: 15 }}>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {`Image name: ${productData?.productData?.imageData?.name ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Image folder: ${productData?.productData?.imageData?.fileFolderName ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Image size: ${productData?.productData?.imageData?.size ?? 0} kb`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Full path: ${productData?.productData?.imageData?.fullPath ?? 'N/A'}`}
            </Typography>
          </div>
        </CardContent>
      </Collapse>
    )
  }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: isProductActive ? green[50] : red[50] }}>
      {renderCardHeader()}
      {renderCardMedia()}
      {renderVisibleCardContent()}
      {renderCardActions()}
      {renderCollapsedCardContent()}
    </Card>
  )

  // return (
  //   <Card sx={cardSx}>
  //     {isCardClickable ? (
  //       <CardActionArea
  //         onClick={() => {
  //           handleOpeningClosingViewProduct()
  //         }}
  //       >
  //         {renderCardActionAreaContent()}
  //       </CardActionArea>
  //     ) : (
  //       renderCardActionAreaContent()
  //     )}
  //     {isActionsVisible ? <CardActions disableSpacing>{renderButtonActions()}</CardActions> : null}
  //     <MoreDetails
  //       selectedProductData={selectedProductData}
  //       openViewProduct={openViewProduct}
  //       handleOpeningClosingViewProduct={() => handleOpeningClosingViewProduct()}
  //     />
  //   </Card>
  // )
}

export default ProductSmartCard
