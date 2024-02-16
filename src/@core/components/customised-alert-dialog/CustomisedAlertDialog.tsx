import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface DialogButtonProps {
  title: string
  autoFocus: boolean
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  onClick?: (buttonIndex: number, buttonData: DialogButtonProps, dataIndex: number) => void
}

interface Props {
  dataIndex?: number
  dialogTitle?: string
  dialogMessage?: string
  dialogButtons?: DialogButtonProps[]
  isDialogOpen?: boolean
  setIsDialogOpen?: () => void
}

const CustomisedAlertDialog = (props: Props) => {
  const { dataIndex = 0, dialogTitle, dialogMessage, dialogButtons, isDialogOpen = false, setIsDialogOpen } = props

  const renderDialogActions = () => {
    if (dialogButtons && dialogButtons.length > 0) {
      return (
        <DialogActions>
          {dialogButtons?.map((dialogButton: DialogButtonProps, index: number) => {
            return (
              <Button
                color={dialogButton?.color ?? 'secondary'}
                variant={dialogButton?.variant ?? 'outlined'}
                onClick={() => dialogButton?.onClick?.(index, dialogButton, dataIndex)}
                key={index}
                autoFocus={dialogButton?.autoFocus ?? false}
              >
                {dialogButton.title}
              </Button>
            )
          })}
        </DialogActions>
      )
    }

    return null
  }

  return (
    <Dialog
      open={isDialogOpen}
      onClose={setIsDialogOpen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{dialogMessage}</DialogContentText>
      </DialogContent>
      {renderDialogActions()}
    </Dialog>
  )
}

export default CustomisedAlertDialog
