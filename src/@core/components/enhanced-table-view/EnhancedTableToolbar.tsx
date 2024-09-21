import * as React from 'react'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { purple } from '@mui/material/colors'

export interface EnhancedTableToolbarProps {
  numSelected: number
  onDeleteClick?: () => void
  onEditClick?: () => void
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, onDeleteClick, onEditClick } = props
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0
          ? {
              bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
            }
          : { bgcolor: purple[50] })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : null}
      {numSelected > 0 ? (
        <Stack direction='row'>
          <Tooltip title='Delete'>
            <IconButton onClick={() => onDeleteClick?.()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Update'>
            <IconButton onClick={() => onEditClick?.()}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : null}
    </Toolbar>
  )
}

export default EnhancedTableToolbar
