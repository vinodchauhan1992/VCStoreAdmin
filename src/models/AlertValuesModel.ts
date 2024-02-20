import { AlertColor } from '@mui/material/Alert'

export interface AlertValuesModel {
  severity: AlertColor
  message?: string
  isVisible: boolean
}
