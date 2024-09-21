import EditIcon from '@mui/icons-material/Edit'
import { CustomisedMenuItemOptionProps } from 'src/models/CustomisedMenuModel'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import { green, red } from '@mui/material/colors'

export const getUserStaticMenuOptionData = ({ forPage = 'allUsers' }: { forPage?: 'allUsers' | 'userByTitle' | null }) => {
  const data: CustomisedMenuItemOptionProps[] = [
    {
      optionTitle: 'Update user',
      optionCode: 'update_user',
      titleColor: 'success.dark',
      OptionIcon: EditIcon,
      iconColor: green[500],
      visible: forPage === 'userByTitle' ? false : true
    },
    {
      optionTitle: 'Delete user',
      optionCode: 'delete_user',
      titleColor: 'error.dark',
      OptionIcon: DeleteForeverSharpIcon,
      iconColor: red[500],
      visible: forPage === 'userByTitle' ? false : true
    }
  ]
  return data
}
