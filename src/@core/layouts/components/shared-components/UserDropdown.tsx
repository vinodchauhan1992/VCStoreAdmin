// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import { LoginReducer, UserDropdownMenusReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { UDMSModel } from 'src/models/UserDropdownMenusModel'
import { getIconForUserDropdownMenu } from 'src/utils/AppBarUtils'

const defaultAvatarUrl = '/images/avatars/1.png'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const dispatch = useAppDispatch()

  // @ts-ignore
  const loggedInUser = useAppSelector(LoginReducer.selectLoggedInUser)
  // @ts-ignore
  const allUDMSDataResult = useAppSelector(UserDropdownMenusReducer.selectAllUDMSDataResult)

  // ** Hooks
  const router = useRouter()

  const callAllUdmsApi = () => {
    dispatch({ type: 'FETCH_ALL_UDMS' })
  }

  useEffect(() => {
    callAllUdmsApi()
  }, [])

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const getUserInfo = () => {
    let userInfo = { fullName: 'Not logged in', avatarUrl: defaultAvatarUrl, userRole: 'None' }
    const userData = loggedInUser?.data?.user ?? null
    if (loggedInUser?.data?.jwtToken && userData) {
      let fullName = 'Not logged in'
      if (userData?.name?.firstname) {
        fullName = userData.name.firstname
      }
      if (userData?.name?.lastname) {
        fullName = `${fullName} ${userData.name.lastname}`
      }
      let userRole = 'None'
      if (userData?.userRole) {
        userRole = userData.userRole
      }
      userInfo = {
        fullName: fullName,
        avatarUrl: userData?.imageData?.imageUrl ?? defaultAvatarUrl,
        userRole: userRole
      }
    }
    return userInfo
  }

  const onLogoutPress = () => {
    dispatch(LoginReducer.wipeoutLoggedInUser())
    router.push('/login')
  }

  const handleDropdownClose = (udmsData?: UDMSModel | null) => {
    setAnchorEl(null)
    if (udmsData?.menuPath && udmsData.menuPath !== '') {
      router.push(udmsData.menuPath)
    } else {
      if (udmsData?.menuPath?.toLowerCase() === 'n/a') {
        if (udmsData?.title?.toLowerCase() === 'logout') {
          onLogoutPress()
        }
      }
    }
  }

  const renderMenuItem = () => {
    return allUDMSDataResult?.dataArray?.map((udmsData, index) => {
      const IconForUserDropdownMenu = getIconForUserDropdownMenu({ udmsData })
      return (
        <>
          {index % 3 === 0 && index !== 0 ? <Divider /> : null}
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose(udmsData)}>
            <Box sx={styles}>
              <IconForUserDropdownMenu sx={{ marginRight: 2 }}></IconForUserDropdownMenu>
              {udmsData?.title}
            </Box>
          </MenuItem>
        </>
      )
    })
  }

  const renderUserDropdownMenu = () => {
    if (loggedInUser?.data?.jwtToken) {
      return (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleDropdownClose()}
          sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ pt: 2, pb: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge
                overlap='circular'
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar
                  alt={getUserInfo().fullName}
                  src={getUserInfo().avatarUrl}
                  sx={{ width: '2.5rem', height: '2.5rem' }}
                />
              </Badge>
              <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 600 }}>{getUserInfo().fullName}</Typography>
                <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                  {getUserInfo().userRole}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider sx={{ mt: 0, mb: 1 }} />
          {renderMenuItem()}
          {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <AccountOutline sx={{ marginRight: 2 }} />
              Profile
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <EmailOutline sx={{ marginRight: 2 }} />
              Inbox
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <MessageOutline sx={{ marginRight: 2 }} />
              Chat
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <CogOutline sx={{ marginRight: 2 }} />
              Settings
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <CurrencyUsd sx={{ marginRight: 2 }} />
              Pricing
            </Box>
          </MenuItem>
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
            <Box sx={styles}>
              <HelpCircleOutline sx={{ marginRight: 2 }} />
              FAQ
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem sx={{ py: 2 }} onClick={() => onLogoutPress()}>
            <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
            Logout
          </MenuItem> */}
        </Menu>
      )
    }
    return null
  }

  const renderUserDropdown = () => {
    if (loggedInUser?.data?.jwtToken) {
      return (
        <>
          <Badge
            overlap='circular'
            onClick={handleDropdownOpen}
            sx={{ ml: 2, cursor: 'pointer' }}
            badgeContent={<BadgeContentSpan />}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar
              alt={getUserInfo().fullName}
              onClick={handleDropdownOpen}
              sx={{ width: 40, height: 40 }}
              src={getUserInfo().avatarUrl}
            />
          </Badge>
          {renderUserDropdownMenu()}
        </>
      )
    }
    return null
  }

  return <Fragment>{renderUserDropdown()}</Fragment>
}

export default UserDropdown
