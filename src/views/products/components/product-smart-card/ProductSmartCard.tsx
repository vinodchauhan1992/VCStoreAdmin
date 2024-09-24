import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { ProductsDataModel } from 'src/models/ProductsModel'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import { amber, cyan, green, grey, red } from '@mui/material/colors'
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
import Skeleton from '@mui/material/Skeleton'
import Rating from '@mui/material/Rating'
import { useTheme } from '@emotion/react'

const productImageLoadedBlockSize = '220px'
const productImageLoadedInlineSize = '100%'
const productImageUnloadedBlockSize = '0px'
const productImageUnloadedInlineSize = '0px'

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
  forPage?: 'allProducts' | 'productByTitle' | null
  cardSx?: any
}

const ProductSmartCard = (props: Props) => {
  const theme: any = useTheme()

  const {
    dataIndex = 0,
    productData,
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
    cardSx = { maxWidth: 345 },
    onShowBrandDetailsClick,
    onShowStockDetailsClick,
    forPage = 'allProducts'
  } = props

  const [expanded, setExpanded] = React.useState(false)
  const [isAvatarLoading, setIsAvatarLoading] = React.useState(false)
  const [isProductImgLoading, setIsProductImgLoading] = React.useState(false)

  const isProfit = productData?.productData?.priceDetails?.isProfit ?? false
  const isProductActive = productData?.productData?.isActive ?? false

  React.useEffect(() => {
    setIsAvatarLoading(true)
    setIsProductImgLoading(true)
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const onMenuItemClick = (
    isClickedOutside: boolean,
    cardData?: ProductsDataModel | null,
    selectedMenuOption?: CustomisedMenuItemOptionProps | null
  ) => {
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

  const onAvatarLoaded = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsAvatarLoading(false)
  }

  const onAvatarLoadingError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e?.nativeEvent?.type === 'error') {
      setIsAvatarLoading(true)
    }
  }

  const getSkeleton = (loading: boolean, skeletonSx?: any) => {
    return loading ? (
      <Skeleton
        animation='wave'
        sx={{
          blockSize: '80px',
          inlineSize: '80px',
          borderRadius: 1,
          position: 'absolute',
          backgroundColor: grey[400],
          ...skeletonSx
        }}
        variant='rectangular'
      ></Skeleton>
    ) : null
  }

  const getAvatarComponent = () => {
    return (
      <>
        <Avatar
          imgProps={{
            onLoad: e => onAvatarLoaded(e),
            onError: e => onAvatarLoadingError(e)
          }}
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
          {!isAvatarUrlValid() ? getAvatarText(productData?.brandDetails?.title) : null}
        </Avatar>
        {getSkeleton(isAvatarLoading)}
      </>
    )
  }

  const renderCardSubheader = () => {
    return (
      <>
        <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 1, marginBottom: 1 }}>
          {`${productData?.brandDetails?.title}`}
        </Typography>
        <Rating
          name='half-rating-read'
          defaultValue={productData?.productData?.rating?.count ?? 0}
          precision={0.5}
          readOnly
          max={productData?.productData?.rating?.rate ?? 5}
        />
      </>
    )
  }

  const renderCardHeader = () => {
    return (
      <CardHeader
        avatar={getAvatarComponent()}
        action={
          <CustomisedMenu
            cardData={productData}
            menuOptions={getStaticMenuOptionData({ forPage })}
            onMenuItemClick={({ cardData, selectedMenuOption, isClickedOutside }) =>
              onMenuItemClick(isClickedOutside, cardData, selectedMenuOption)
            }
          />
        }
        title={productData?.productData?.title}
        subheader={renderCardSubheader()}
      />
    )
  }

  const onProductImageLoaded = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsProductImgLoading(false)
  }

  const onProductImageLoadingError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e?.nativeEvent?.type === 'error') {
      setIsProductImgLoading(true)
    }
  }

  const renderCardMedia = () => {
    return (
      <>
        <div style={{ flex: 1 }}>
          <CardMedia
            sx={{
              blockSize: isProductImgLoading ? productImageUnloadedBlockSize : productImageLoadedBlockSize,
              inlineSize: isProductImgLoading ? productImageUnloadedInlineSize : productImageLoadedInlineSize,
              position: isProductImgLoading ? 'absolute' : 'relative'
            }}
            component='img'
            onLoad={e => onProductImageLoaded(e)}
            onError={e => onProductImageLoadingError(e)}
            image={productData?.productData?.imageData?.imageUrl ?? ''}
            hidden={isProductImgLoading ? true : false}
            alt={`${productData?.productData?.title} By ${productData?.brandDetails?.title}`}
          ></CardMedia>
          {isProductImgLoading ? (
            <Skeleton
              animation='wave'
              sx={{
                blockSize: productImageLoadedBlockSize,
                inlineSize: productImageLoadedInlineSize,
                backgroundColor: grey[400]
              }}
              variant='rectangular'
            ></Skeleton>
          ) : null}
        </div>
      </>
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
              color={isProductActive && isProfit ? 'success' : 'error'}
              variant='outlined'
              onClick={() => onShowBrandDetailsClick?.(dataIndex, productData)}
            />
            <Chip
              label='Stock details'
              size='medium'
              color={isProductActive && isProfit ? 'success' : 'error'}
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
              <DeleteForeverSharpIcon />
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
          <div
            style={{
              backgroundColor: theme?.palette?.mode === 'light' ? amber[300] : amber[900],
              borderRadius: 10,
              padding: 15
            }}
          >
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
          <Divider variant='middle' sx={{ backgroundColor: amber[100], marginTop: 8, marginBottom: 8 }} />
          <div style={{ backgroundColor: 'InfoBackground', borderRadius: 10, padding: 15 }}>
            <Typography variant='h6' sx={{ color: cyan[900] }}>
              Description:
            </Typography>
            <Typography variant='body2' sx={{ color: cyan[800] }}>
              {`${productData?.productData?.description ?? 'N/A'}`}
            </Typography>
          </div>
        </CardContent>
      </Collapse>
    )
  }

  const getCardColor = () => {
    if (isProductActive && isProfit) {
      return theme?.palette?.mode === 'light' ? green[50] : green[900]
    }
    return theme?.palette?.mode === 'light' ? red[50] : red[900]
  }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: getCardColor(), ...cardSx }}>
      {renderCardHeader()}
      {renderCardMedia()}
      {renderVisibleCardContent()}
      {renderCardActions()}
      {renderCollapsedCardContent()}
    </Card>
  )
}

export default ProductSmartCard
