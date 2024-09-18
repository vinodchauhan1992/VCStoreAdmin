import EditIcon from '@mui/icons-material/Edit'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import { blue, green, red } from '@mui/material/colors'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InventoryIcon from '@mui/icons-material/Inventory';

export const getStaticMenuOptionData = () => {
  const data: CustomisedMenuItemOptionProps[] = [
    {
      optionTitle: 'Show brand details',
      optionCode: 'show_brand_details',
      titleColor: 'info.dark',
      OptionIcon: VisibilityIcon,
      iconColor: blue[500]
    },
    {
      optionTitle: 'Show stock details',
      optionCode: 'show_stock_details',
      titleColor: 'info.dark',
      OptionIcon: InventoryIcon,
      iconColor: blue[500]
    },
    {
      optionTitle: 'Update product',
      optionCode: 'update_product',
      titleColor: 'success.dark',
      OptionIcon: EditIcon,
      iconColor: green[500]
    },
    {
      optionTitle: 'Delete product',
      optionCode: 'delete_product',
      titleColor: 'error.dark',
      OptionIcon: DeleteForeverSharpIcon,
      iconColor: red[500]
    }
  ]
  return data
}
