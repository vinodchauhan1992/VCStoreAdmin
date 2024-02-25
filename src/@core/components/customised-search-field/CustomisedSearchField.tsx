import { ChangeEvent } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  placeholderText?: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const CustomisedSearchField = (props: Props) => {
  const { placeholderText = 'Search', onChange, value } = props

  return (
    <Paper component='form' sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholderText}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={changeEvent => onChange?.(changeEvent)}
        value={value}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default CustomisedSearchField
