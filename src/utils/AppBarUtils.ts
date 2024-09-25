import { UDMSModel } from 'src/models/UserDropdownMenusModel'
import ErrorIcon from '@mui/icons-material/Error'
import AccountOutlineIcon from 'mdi-material-ui/AccountOutline'
import LogoutIcon from 'mdi-material-ui/Logout'

export const getIconForUserDropdownMenu = ({ udmsData }: { udmsData: UDMSModel }) => {
  if (udmsData) {
    const menuTitle = udmsData?.title?.toLowerCase() ?? ''
    switch (menuTitle) {
      case 'profile':
        return AccountOutlineIcon

      case 'logout':
        return LogoutIcon

      default:
        return ErrorIcon
    }
  }
  return ErrorIcon
}
