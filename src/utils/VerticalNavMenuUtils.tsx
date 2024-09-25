import DashboardIcon from '@mui/icons-material/Dashboard'
import ErrorIcon from '@mui/icons-material/Error'
import { AdminMenusModel } from 'src/models/AdminMenusModel'

import AccountGroupIcon from 'mdi-material-ui/AccountGroup'
import ListStatusIcon from 'mdi-material-ui/ListStatus'
import LightningBoltCircleIcon from 'mdi-material-ui/LightningBoltCircle'
import FolderInformationIcon from 'mdi-material-ui/FolderInformation'
import CheckNetworkIcon from 'mdi-material-ui/CheckNetwork'
import MenuOpenIcon from 'mdi-material-ui/MenuOpen'
import MenuIcon from 'mdi-material-ui/Menu'
import ShapeCirclePlusIcon from 'mdi-material-ui/ShapeCirclePlus'
import ChartPpfIcon from 'mdi-material-ui/ChartPpf'
import LoginIcon from 'mdi-material-ui/Login'
import FlagIcon from 'mdi-material-ui/Flag'
import CityIcon from 'mdi-material-ui/City'
import DomainIcon from 'mdi-material-ui/Domain'
import BookmarkIcon from 'mdi-material-ui/Bookmark'
import ArrowDownCircleIcon from 'mdi-material-ui/ArrowDownCircle'

export const getVerticalNavMenuIcon = (menuData?: AdminMenusModel | null) => {
  if (menuData) {
    const menuTitle = menuData?.menuTitle?.toLowerCase() ?? ''
    switch (menuTitle) {
      case 'login':
        return LoginIcon

      case 'dashboard':
        return DashboardIcon

      case 'menus':
        return MenuIcon

      case 'submenus':
        return MenuOpenIcon

      case 'menu statuses':
        return CheckNetworkIcon

      case 'users':
        return AccountGroupIcon

      case 'user roles':
        return LightningBoltCircleIcon

      case 'user statuses':
        return ListStatusIcon

      case 'file folders':
        return FolderInformationIcon

      case 'categories':
        return ShapeCirclePlusIcon

      case 'products':
        return ChartPpfIcon

      case 'brands':
        return BookmarkIcon

      case 'countries':
        return FlagIcon

      case 'states':
        return DomainIcon

      case 'cities':
        return CityIcon

      case 'user dropdown menu':
        return ArrowDownCircleIcon

      default:
        return ErrorIcon
    }
  }
  return ErrorIcon
}
