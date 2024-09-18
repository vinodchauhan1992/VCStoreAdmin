import * as React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
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
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import VerifiedIcon from '@mui/icons-material/Verified'
import CancelIcon from '@mui/icons-material/Cancel'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import CustomisedMenu from 'src/@core/components/customised-menu/CustomisedMenu'
import { getBrandStaticMenuOptionData } from 'src/views/brands/staticData/staticMenuOptions'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'
import Skeleton from '@mui/material/Skeleton'
import { BrandsModel } from 'src/models/BrandsModel'

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
  brandData?: BrandsModel | null
  isButtonsVisible?: boolean
  isButton1Visible?: boolean
  isButton2Visible?: boolean
  isButton3Visible?: boolean
  button1Text?: string
  button2Text?: string
  button3Text?: string
  onButton1Click?: (dataIndex: number, brandData?: BrandsModel | null) => void
  onButton2Click?: (dataIndex: number, brandData?: BrandsModel | null) => void
  onButton3Click?: (dataIndex: number, brandData?: BrandsModel | null) => void
  forPage?: 'allBrands' | 'brandByTitle' | null
  cardSx?: any
}

const BrandSmartCard = (props: Props) => {
  const {
    dataIndex = 0,
    brandData,
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
    forPage = 'allBrands'
  } = props

  const [expanded, setExpanded] = React.useState(false)
  const [isProductImgLoading, setIsProductImgLoading] = React.useState(false)

  const isBrandActive = brandData?.isActive ?? false

  React.useEffect(() => {
    setIsProductImgLoading(true)
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const onMenuItemClick = (
    isClickedOutside: boolean,
    cardData?: BrandsModel | null,
    selectedMenuOption?: CustomisedMenuItemOptionProps | null
  ) => {
    if (!isClickedOutside) {
      switch (selectedMenuOption?.optionCode) {
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

  const getAvatarComponent = () => {
    return (
      <>
        <Avatar
          sx={{
            bgcolor: amber[300],
            color: isBrandActive ? 'success.dark' : 'error.dark',
            border: '1px solid orange'
          }}
          aria-label='brand-title-avatar'
          variant='rounded'
        >
          {getAvatarText(brandData?.title)}
        </Avatar>
      </>
    )
  }

  const isToShowMenu = (brandStaticDataArr: CustomisedMenuItemOptionProps[]) => {
    let showMenu = false
    brandStaticDataArr.map(brandStaticData => {
      if (brandStaticData?.visible) {
        showMenu = brandStaticData.visible
      }
    })
    return showMenu
  }

  const renderCardHeader = () => {
    const brandStaticDataArr = getBrandStaticMenuOptionData({ forPage })
    return (
      <CardHeader
        avatar={getAvatarComponent()}
        action={
          isToShowMenu(brandStaticDataArr) ? (
            <CustomisedMenu
              cardData={brandData}
              menuOptions={brandStaticDataArr}
              onMenuItemClick={({ cardData, selectedMenuOption, isClickedOutside }) =>
                onMenuItemClick(isClickedOutside, cardData, selectedMenuOption)
              }
            />
          ) : null
        }
        title={brandData?.title}
        subheader={`${brandData?.code}`}
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
        <div style={{ flex: 1, backgroundColor: 'white' }}>
          <CardMedia
            sx={{
              blockSize: isProductImgLoading ? productImageUnloadedBlockSize : productImageLoadedBlockSize,
              inlineSize: isProductImgLoading ? productImageUnloadedInlineSize : productImageLoadedInlineSize,
              position: isProductImgLoading ? 'absolute' : 'relative',
            }}
            component='img'
            onLoad={e => onProductImageLoaded(e)}
            onError={e => onProductImageLoadingError(e)}
            image={brandData?.brandLogo?.imageUrl ?? ''}
            hidden={isProductImgLoading ? true : false}
            alt={`${brandData?.title} By ${brandData?.title}`}
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
              icon={isBrandActive ? <VerifiedIcon /> : <CancelIcon />}
              label={isBrandActive ? 'Active' : 'Inactive'}
              size='medium'
              color={isBrandActive ? 'success' : 'error'}
            />
            <Chip label={brandData?.code} size='medium' color='info' />
          </Stack>
          <Stack spacing={5} sx={{ marginTop: 5 }}>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
              {`Brand ID: ${brandData?.id ?? 'N/A'}`}
            </Typography>
            <Divider variant='middle' sx={{ backgroundColor: amber[100] }} />
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Brand added on: ${brandData?.dateAdded ? convertDateIntoReadableFormat(brandData.dateAdded) : 'N/A'}`}
            </Typography>
            <Divider variant='middle' sx={{ backgroundColor: amber[100] }} />
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Brand modified on: ${
                brandData?.dateModified ? convertDateIntoReadableFormat(brandData.dateModified) : 'N/A'
              }`}
            </Typography>
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
            <IconButton aria-label={button1Text} size='large' onClick={() => onButton1Click?.(dataIndex, brandData)}>
              <DeleteForeverSharpIcon color='error' />
            </IconButton>
          </Tooltip>
        ) : null}
        {isButton2Visible ? (
          <Tooltip title={button2Text} arrow>
            <IconButton aria-label={button2Text} size='large' onClick={() => onButton2Click?.(dataIndex, brandData)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {isButton3Visible ? (
          <Tooltip title={button3Text} arrow>
            <IconButton aria-label={button3Text} size='large' onClick={() => onButton3Click?.(dataIndex, brandData)}>
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
          <div style={{ backgroundColor: amber[300], borderRadius: 10, padding: 15 }}>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {`Image name: ${brandData?.brandLogo?.name ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Image folder: ${brandData?.brandLogo?.fileFolderName ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Image size: ${brandData?.brandLogo?.size ?? 0} kb`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Full path: ${brandData?.brandLogo?.fullPath ?? 'N/A'}`}
            </Typography>
          </div>
          <Divider variant='middle' sx={{ backgroundColor: amber[100], marginTop: 8, marginBottom: 8 }} />
          <div style={{ backgroundColor: 'InfoBackground', borderRadius: 10, padding: 15 }}>
            <Typography variant='h6' sx={{ color: 'text.secondary' }}>
              Description:
            </Typography>
            <Typography variant='body2' sx={{ color: cyan[800] }}>
              {`${brandData?.description ?? 'N/A'}`}
            </Typography>
          </div>
        </CardContent>
      </Collapse>
    )
  }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: isBrandActive ? green[50] : red[50], ...cardSx }}>
      {renderCardHeader()}
      {renderCardMedia()}
      {renderVisibleCardContent()}
      {renderCardActions()}
      {renderCollapsedCardContent()}
    </Card>
  )
}

export default BrandSmartCard
