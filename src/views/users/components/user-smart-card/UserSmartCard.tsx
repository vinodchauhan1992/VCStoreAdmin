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
import { getFormattedCurrencyWithSymbol } from 'src/utils/CurrencyUtils'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import VerifiedIcon from '@mui/icons-material/Verified'
import PriceCheckRounded from '@mui/icons-material/PriceCheckRounded'
import CancelIcon from '@mui/icons-material/Cancel'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import CustomisedMenu from 'src/@core/components/customised-menu/CustomisedMenu'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'
import Skeleton from '@mui/material/Skeleton'
import Rating from '@mui/material/Rating'
import { UserModel } from 'src/models/UserModel'
import { getUserStaticMenuOptionData } from '../../staticData/staticMenuOptions'

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
  userData?: UserModel | null
  isButtonsVisible?: boolean
  isButton1Visible?: boolean
  isButton2Visible?: boolean
  isButton3Visible?: boolean
  button1Text?: string
  button2Text?: string
  button3Text?: string
  onButton1Click?: (dataIndex: number, userData?: UserModel | null) => void
  onButton2Click?: (dataIndex: number, userData?: UserModel | null) => void
  onButton3Click?: (dataIndex: number, userData?: UserModel | null) => void
  forPage?: 'allUsers' | 'userByTitle' | null
  cardSx?: any
}

const UserSmartCard = (props: Props) => {
  const {
    dataIndex = 0,
    userData,
    isButtonsVisible = true,
    isButton1Visible = true,
    isButton2Visible = true,
    isButton3Visible = false,
    button1Text = 'Delete user',
    button2Text = 'Update user',
    button3Text = 'More details',
    onButton1Click,
    onButton2Click,
    onButton3Click,
    cardSx = { maxWidth: 345 },
    forPage = 'allUsers'
  } = props

  const [expanded, setExpanded] = React.useState(false)
  const [isAvatarLoading, setIsAvatarLoading] = React.useState(false)
  const [isProductImgLoading, setIsProductImgLoading] = React.useState(false)

  const isProfit = userData?.userStatus === 'Active' ? true : false
  const isUserActive = userData?.userStatusID === '4b2736cc-8424-4faa-91fd-a1eb02926a73' ? true : false

  React.useEffect(() => {
    setIsAvatarLoading(true)
    setIsProductImgLoading(true)
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const onMenuItemClick = (
    isClickedOutside: boolean,
    cardData?: UserModel | null,
    selectedMenuOption?: CustomisedMenuItemOptionProps | null
  ) => {
    if (!isClickedOutside) {
      switch (selectedMenuOption?.optionCode) {
        case 'update_user':
          onButton2Click?.(dataIndex, cardData)
          break

        case 'delete_user':
          onButton1Click?.(dataIndex, cardData)
          break

        default:
          break
      }
    }
  }

  const isAvatarUrlValid = () => {
    return userData?.imageData?.imageUrl && userData.imageData.imageUrl !== '' ? true : false
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
        variant='circular'
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
          src={isAvatarUrlValid() ? userData?.imageData?.imageUrl : ''}
          sx={{
            bgcolor: 'white',
            color: 'white',
            border: '2px solid orange',
            blockSize: '80px',
            inlineSize: '80px'
          }}
          aria-label='user-image'
          variant='circular'
        >
          {!isAvatarUrlValid() ? getAvatarText(`${userData?.name?.firstname} ${userData?.name?.lastname}`) : null}
        </Avatar>
        {getSkeleton(isAvatarLoading)}
      </>
    )
  }

  const renderCardHeader = () => {
    return (
      <CardHeader
        avatar={getAvatarComponent()}
        action={
          <CustomisedMenu
            cardData={userData}
            menuOptions={getUserStaticMenuOptionData({ forPage })}
            onMenuItemClick={({ cardData, selectedMenuOption, isClickedOutside }) =>
              onMenuItemClick(isClickedOutside, cardData, selectedMenuOption)
            }
          />
        }
        title={`${userData?.name?.firstname} ${userData?.name?.lastname}`}
        subheader={
          <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 1, marginBottom: 1 }}>
            {`${userData?.username}`}
          </Typography>
        }
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
            image={userData?.imageData?.imageUrl ?? ''}
            hidden={isProductImgLoading ? true : false}
            alt={`${userData?.name?.firstname} With ${userData?.username}`}
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
              icon={isUserActive ? <VerifiedIcon /> : <CancelIcon />}
              label={userData?.userStatus}
              size='medium'
              color={isUserActive ? 'success' : 'error'}
            />
            <Chip label={userData?.userRole} size='medium' color='warning' />
            <Chip label={userData?.userType} size='medium' color='info' />
          </Stack>
          <Divider variant='middle' sx={{ backgroundColor: amber[100], marginTop: 5 }} />
          <Stack spacing={2} sx={{}}>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
              {`Date of birth: ${userData?.dateOfBirth ? convertDateIntoReadableFormat(userData.dateOfBirth) : 'N/A'}`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'start' }}>
              {`Email: ${userData?.email ?? 'N/A'}`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'start' }}>
              {`Phone: ${userData?.phone ?? 'N/A'}`}
            </Typography>
          </Stack>

          <Divider variant='middle' sx={{ backgroundColor: amber[100], marginTop: 5 }} />
          <Stack spacing={2} sx={{}}>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary' }}>
              {`Address: ${userData?.address?.address ?? 'N/A'}`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'start' }}>
              {`City: ${userData?.address?.city ?? 'N/A'}`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'start' }}>
              {`State: ${userData?.address?.state ?? 'N/A'}`}
            </Typography>
            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'start' }}>
              {`Zip code: ${userData?.address?.zipcode ?? 'N/A'}`}
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
            <IconButton aria-label={button1Text} size='large' onClick={() => onButton1Click?.(dataIndex, userData)}>
              <DeleteForeverSharpIcon color='error' />
            </IconButton>
          </Tooltip>
        ) : null}
        {isButton2Visible ? (
          <Tooltip title={button2Text} arrow>
            <IconButton aria-label={button2Text} size='large' onClick={() => onButton2Click?.(dataIndex, userData)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {isButton3Visible ? (
          <Tooltip title={button3Text} arrow>
            <IconButton aria-label={button3Text} size='large' onClick={() => onButton3Click?.(dataIndex, userData)}>
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
              {`User ID: ${userData?.id ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'white', marginTop: 2 }}>
              {`User Role ID: ${userData?.userRoleID ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'white', marginTop: 2 }}>
              {`User Status ID: ${userData?.userStatusID ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'white', marginTop: 2 }}>
              {`User added on: ${userData?.dateAdded ? convertDateIntoReadableFormat(userData.dateAdded) : 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'white', marginTop: 2 }}>
              {`User modified on: ${
                userData?.dateModified ? convertDateIntoReadableFormat(userData.dateModified) : 'N/A'
              }`}
            </Typography>
          </div>
          <Divider variant='middle' sx={{ backgroundColor: amber[100], marginTop: 8, marginBottom: 8 }} />
          <div style={{ backgroundColor: amber[300], borderRadius: 10, padding: 15 }}>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {`Image name: ${userData?.imageData?.name ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Image folder: ${userData?.imageData?.fileFolderName ?? 'N/A'}`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Image size: ${userData?.imageData?.size ?? 0} kb`}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', marginTop: 2 }}>
              {`Full path: ${userData?.imageData?.fullPath ?? 'N/A'}`}
            </Typography>
          </div>
          {/* <Divider variant='middle' sx={{ backgroundColor: amber[100], marginTop: 8, marginBottom: 8 }} />
          <div style={{ backgroundColor: 'InfoBackground', borderRadius: 10, padding: 15 }}>
            <Typography variant='h6' sx={{ color: 'text.secondary' }}>
              Description:
            </Typography>
            <Typography variant='body2' sx={{ color: cyan[800] }}>
              {`${userData?.description ?? 'N/A'}`}
            </Typography>
          </div> */}
        </CardContent>
      </Collapse>
    )
  }

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: isUserActive ? green[50] : red[50], ...cardSx }}>
      {renderCardHeader()}
      {renderCardMedia()}
      {renderVisibleCardContent()}
      {renderCardActions()}
      {renderCollapsedCardContent()}
    </Card>
  )
}

export default UserSmartCard
