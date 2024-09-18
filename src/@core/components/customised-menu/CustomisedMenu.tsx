import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'
import { styled, alpha } from '@mui/material/styles'
import Menu, { MenuProps } from '@mui/material/Menu'
import DeleteForeverSharp from '@mui/icons-material/DeleteForeverSharp'
import { amber, red } from '@mui/material/colors'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}))

export interface CustomisedMenuProps {
  cardData?: any | null
  menuOptions?: CustomisedMenuItemOptionProps[] | null
  onMenuClick?: ({ event, cardData }: { event: React.MouseEvent<HTMLElement>; cardData?: any | null }) => void
  onMenuItemClick?: ({
    cardData,
    selectedMenuOption,
    isClickedOutside
  }: {
    cardData?: any | null
    selectedMenuOption?: CustomisedMenuItemOptionProps | null
    isClickedOutside: boolean
  }) => void
}

const CustomisedMenu = (props: CustomisedMenuProps) => {
  const { cardData, onMenuClick, onMenuItemClick, menuOptions } = props

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    if (onMenuClick) {
      onMenuClick({ cardData, event })
    }
  }
  const handleOnMenuClose = (isClickedOutside: boolean, option?: CustomisedMenuItemOptionProps) => {
    setAnchorEl(null)
    if (onMenuItemClick) {
      onMenuItemClick({ cardData, selectedMenuOption: option, isClickedOutside })
    }
  }

  const getOptionIcon = (option: CustomisedMenuItemOptionProps) => {
    if (option.OptionIcon) {
      const { OptionIcon } = option
      return (
        <OptionIcon
          style={{ fill: option?.iconColor && option.iconColor !== '' ? option.iconColor : 'default' }}
        ></OptionIcon>
      )
    }
    return null
  }

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleOnMenuClose(false)}
      >
        {menuOptions?.map((option, index) => {
          if (option?.visible === undefined || option?.visible === null || option.visible) {
            return (
              <MenuItem
                key={`${index.toString()}`}
                onClick={() => handleOnMenuClose(false, option)}
                sx={{ color: option?.titleColor && option.titleColor !== '' ? option.titleColor : 'default' }}
              >
                {getOptionIcon(option)}
                {option.optionTitle}
              </MenuItem>
            )
          }
          return null
        })}
      </StyledMenu>
    </div>
  )
}

export default CustomisedMenu
