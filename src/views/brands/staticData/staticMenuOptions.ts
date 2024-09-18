import EditIcon from '@mui/icons-material/Edit'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import { blue, green, red } from '@mui/material/colors'
import VisibilityIcon from '@mui/icons-material/Visibility'
import InventoryIcon from '@mui/icons-material/Inventory'
import { MaxDiscuntPercentagesDataModel } from 'src/models/ProductsModel'

export const getBrandStaticMenuOptionData = ({
  forPage = 'allBrands'
}: {
  forPage?: 'allBrands' | 'brandByTitle' | null
}) => {
  const data: CustomisedMenuItemOptionProps[] = [
    {
      optionTitle: 'Update product',
      optionCode: 'update_product',
      titleColor: 'success.dark',
      OptionIcon: EditIcon,
      iconColor: green[500],
      visible: forPage === 'brandByTitle' ? false : true
    },
    {
      optionTitle: 'Delete product',
      optionCode: 'delete_product',
      titleColor: 'error.dark',
      OptionIcon: DeleteForeverSharpIcon,
      iconColor: red[500],
      visible: forPage === 'brandByTitle' ? false : true
    }
  ]
  return data
}

export const getMaxDiscountPercentagesDataArray = () => {
  const dataArr: MaxDiscuntPercentagesDataModel[] = []
  for (let index = 1; index <= 100; index++) {
    dataArr.push({
      title: `${index.toString()}`,
      code: index
    })
  }
  return dataArr
}
