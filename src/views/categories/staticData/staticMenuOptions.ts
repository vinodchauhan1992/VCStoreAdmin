import EditIcon from '@mui/icons-material/Edit'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import { green, red } from '@mui/material/colors'
import { MaxDiscuntPercentagesDataModel } from 'src/models/ProductsModel'

export const getCategoryStaticMenuOptionData = ({
  forPage = 'allCategories'
}: {
  forPage?: 'allCategories' | 'categoryByTitle' | null
}) => {
  const data: CustomisedMenuItemOptionProps[] = [
    {
      optionTitle: 'Update category',
      optionCode: 'update_category',
      titleColor: 'success.dark',
      OptionIcon: EditIcon,
      iconColor: green[500],
      visible: forPage === 'categoryByTitle' ? false : true
    },
    {
      optionTitle: 'Delete category',
      optionCode: 'delete_category',
      titleColor: 'error.dark',
      OptionIcon: DeleteForeverSharpIcon,
      iconColor: red[500],
      visible: forPage === 'categoryByTitle' ? false : true
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
