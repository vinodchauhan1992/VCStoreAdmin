// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import apiPathsConfig from '../../configs/apiPathsConfig'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { httpDeleteRequest, httpGetRequest } from 'src/services/AxiosApi'
import { CategoryModel } from 'src/models/CategoryModel'
import { StyledTableCell } from 'src/@core/components/customised-table/styled-table-cell/StyledTableCell'
import { StyledTableRow } from 'src/@core/components/customised-table/styled-table-row/StyledTableRow'
import { styled } from '@mui/material/styles'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginRight: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAllCategories = () => {
  // ** State
  const [allCategoriesData, setAllCategoriesData] = useState<CategoryModel[]>([])
  const [isErrored, setIsErrored] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)

  const callAllCategoriesApi = async () => {
    const response = await httpGetRequest({ apiUrlPath: apiPathsConfig.getAllCategoriesApiPath })
    if (response.isSucceded) {
      setAllCategoriesData(response?.responseData?.data ?? [])
      setMessage(response?.responseData?.message ?? null)
    } else {
      setIsErrored(true)
      setMessage(response?.responseData?.message ?? null)
    }
  }

  useEffect(() => {
    callAllCategoriesApi()
  }, [])

  const onDeleteClick = async (category: CategoryModel) => {
    const response = await httpDeleteRequest({ apiUrlPath: `${apiPathsConfig.deleteCategoryApiPath}/${category.id}` })
    if (response.isSucceded) {
      callAllCategoriesApi()
    }
  }

  const renderDataTable = () => {
    if (allCategoriesData && allCategoriesData.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Dates</StyledTableCell>
                <StyledTableCell>Manage</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCategoriesData.map((category: CategoryModel) => (
                <StyledTableRow
                  hover
                  key={category?.title}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <StyledTableCell>{category?.id}</StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {category?.title}
                      </Typography>
                      <Typography variant='caption'>{category?.code}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {`Added On: ${category?.dateAdded ?? 'N/A'}`}
                      </Typography>
                      <Typography variant='caption'>{`Modified On: ${category?.dateModified ?? 'N/A'}`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ButtonStyled color='error' variant='outlined' onClick={() => onDeleteClick(category)}>
                      <Typography color='error' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Delete
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='info' variant='outlined' onClick={() => onDeleteClick(category)}>
                      <Typography color='info' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        Edit
                      </Typography>
                    </ButtonStyled>
                    <ButtonStyled color='success' variant='outlined' onClick={() => onDeleteClick(category)}>
                      <Typography color='success' sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        View
                      </Typography>
                    </ButtonStyled>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
  }

  const renderEmpty = () => {
    return (
      <CustomisedErrorEmpty title='No categories found!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
    )
  }

  const renderError = () => {
    return <CustomisedErrorEmpty title='Error!' type='empty' message={message ?? ''}></CustomisedErrorEmpty>
  }

  const renderData = () => {
    if (isErrored) {
      return renderError()
    }
    if (!allCategoriesData || allCategoriesData.length <= 0) {
      return renderEmpty()
    }

    return renderDataTable()
  }

  return <CardContent>{renderData()}</CardContent>
}

export default TabAllCategories
