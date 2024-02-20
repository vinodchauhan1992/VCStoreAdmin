import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { CategoryModel } from 'src/models/CategoryModel'

interface Props {
  selectedCategoryData?: CategoryModel | null
  openViewCategory?: boolean | null
  onCloseModal?: () => void
  setOpenViewCategory?: (openViewCategory: boolean) => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ViewCategory = (props: Props) => {
  const { selectedCategoryData, openViewCategory = false, onCloseModal, setOpenViewCategory } = props

  const onClose = () => {
    if (onCloseModal) {
      onCloseModal()
    }

    setOpenViewCategory?.(false)
  }

  const renderDetailsFields = () => {
    return (
      <>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category id'
            placeholder='Category id'
            value={selectedCategoryData?.id ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category title'
            placeholder='Category title'
            value={selectedCategoryData?.title ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category code'
            placeholder='Category code'
            value={selectedCategoryData?.code ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category image url'
            placeholder='Category image url'
            value={selectedCategoryData?.image ?? ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category added on'
            placeholder='Category added on'
            value={selectedCategoryData?.dateAdded ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label='Category updated on'
            placeholder='Category updated on'
            value={selectedCategoryData?.dateModified ?? 'N/A'}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            disabled
            fullWidth
            label='Category description'
            placeholder='Category description'
            value={selectedCategoryData?.description ?? 'N/A'}
            multiline
            minRows={3}
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
          />
        </Grid>
      </>
    )
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openViewCategory ? openViewCategory : false}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
              Category view
            </Typography>
            <Button autoFocus color='inherit' onClick={onClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <CardContent>
          <form>
            <Grid container spacing={7}>
              {renderDetailsFields()}
            </Grid>
          </form>
        </CardContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ViewCategory
