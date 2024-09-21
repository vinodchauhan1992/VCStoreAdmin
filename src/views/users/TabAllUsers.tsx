/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'
import CustomisedErrorEmpty from 'src/@core/components/customised-error-empty/CustomisedErrorEmpty'
import CustomisedAlertDialog from 'src/@core/components/customised-alert-dialog/CustomisedAlertDialog'
import EditUser from './editUser/EditUser'
import UserSmartCard from './components/user-smart-card/UserSmartCard'
import Grid from '@mui/material/Grid'
import CustomisedSearchField from 'src/@core/components/customised-search-field/CustomisedSearchField'
import { UserReducer, useAppDispatch, useAppSelector } from 'src/redux/reducers'
import { useRouter } from 'next/router'
import { UserModel } from 'src/models/UserModel'

const TabAllUsers = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  // @ts-ignore
  const allUsersDataResult = useAppSelector(UserReducer.selectAllUsersDataResult)
  // @ts-ignore
  const deletedUserResponse = useAppSelector(UserReducer.selectDeletedUserResponse)

  // ** State
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null)
  const [openEditUser, setOpenEditUser] = useState<boolean>(false)
  const [searchedText, setSearchedText] = useState<string>('')
  const [searchedUsers, setSearchedUsers] = useState<UserModel[]>([])

  const callAllUsersApi = async () => {
    dispatch({ type: 'FETCH_ALL_USERS' })
  }

  useEffect(() => {
    callAllUsersApi()
  }, [])

  useEffect(() => {
    setSearchedUsers(allUsersDataResult?.dataArray ?? [])
  }, [allUsersDataResult?.dataArray])

  const searchUsers = () => {
    if (searchedText && searchedText !== '') {
      const filtered = allUsersDataResult?.dataArray?.filter(
        entry =>
          Object.values(entry.id).some(val => typeof val === 'string' && val.includes(searchedText)) ||
          Object.values(entry.email).some(val => typeof val === 'string' && val.includes(searchedText)) ||
          Object.values(entry.username).some(val => typeof val === 'string' && val.includes(searchedText)) ||
          Object.values(entry.name.firstname).some(val => typeof val === 'string' && val.includes(searchedText)) ||
          Object.values(entry.name.lastname).some(val => typeof val === 'string' && val.includes(searchedText)) ||
          Object.values(entry.phone).some(val => typeof val === 'string' && val.includes(searchedText))
      )
      setSearchedUsers(filtered)
    } else {
      setSearchedUsers(allUsersDataResult?.dataArray ?? [])
    }
  }

  useEffect(() => {
    searchUsers()
  }, [searchedText])

  const resetSelectedUser = () => {
    setSelectedUser(null)
    setIsDialogOpen(false)
    setOpenEditUser(false)
  }

  const deleteUser = async () => {
    dispatch({ type: 'DELETE_USER', payload: { userId: selectedUser?.id } })
  }

  useEffect(() => {
    if (deletedUserResponse?.isCompleted) {
      resetSelectedUser()
      if (deletedUserResponse?.succeeded) {
        dispatch(UserReducer.resetDeletedUserResponse())
        callAllUsersApi()
      } else {
        dispatch(UserReducer.resetDeletedUserResponse())
      }
    }
  }, [deletedUserResponse])

  const onDeleteClick = async (user: UserModel) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const onEditClick = async (user: UserModel) => {
    setSelectedUser(user)
    setOpenEditUser(true)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const renderEmpty = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='No users found!'
          type='empty'
          message={allUsersDataResult?.message ?? ''}
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderEmptySearch = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='No search results found!'
          type='empty'
          message='Users not found for the searched item'
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderError = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedErrorEmpty
          title='Error!'
          type='empty'
          message={allUsersDataResult?.message ?? ''}
        ></CustomisedErrorEmpty>
      </Grid>
    )
  }

  const renderCards = () => {
    if (searchedUsers && searchedUsers.length > 0) {
      return searchedUsers.map((userData, index) => {
        return (
          <Grid key={`${index.toString()}`} item xs={12} sm={4}>
            <UserSmartCard
              userData={userData}
              onButton1Click={() => onDeleteClick(userData)}
              onButton2Click={() => onEditClick(userData)}
              dataIndex={index}
            />
          </Grid>
        )
      })
    }

    return null
  }

  const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchedText(event.target.value)
  }

  const renderSearchField = () => {
    return (
      <Grid item xs={12} sm={12}>
        <CustomisedSearchField placeholderText='Search user' value={searchedText} onChange={handleSearch} />
      </Grid>
    )
  }

  const renderData = () => {
    if (allUsersDataResult?.isCompleted && !allUsersDataResult?.succeeded) {
      return renderError()
    }
    if (!allUsersDataResult?.dataArray || allUsersDataResult.dataArray.length <= 0) {
      return renderEmpty()
    }

    return (
      <>
        {renderSearchField()}
        {searchedUsers && searchedUsers.length > 0 ? renderCards() : renderEmptySearch()}
      </>
    )
  }

  const renderWholeMainData = () => {
    return (
      <Grid container spacing={7}>
        {renderData()}
      </Grid>
    )
  }

  const renderAlertDialog = () => {
    return (
      <CustomisedAlertDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={handleDialogOpen}
        dialogTitle='Delete user!'
        dialogMessage={`Are you sure you want to delete ${`${selectedUser?.name?.firstname} ${selectedUser?.name?.lastname}`} user with id = ${
          selectedUser?.id
        } ?`}
        dialogButtons={[
          {
            title: 'Yes',
            onClick: () => {
              deleteUser()
            },
            autoFocus: true,
            color: 'error'
          },
          {
            title: 'No',
            onClick: () => {
              setIsDialogOpen(false)
              resetSelectedUser()
            },
            autoFocus: false,
            color: 'success'
          }
        ]}
      />
    )
  }

  // const renderEditUserDialog = () => {
  //   return (
  //     <EditUser
  //       selectedUserData={selectedUser}
  //       openEditUser={openEditUser}
  //       setOpenEditUser={setOpenEditUser}
  //       setSelectedUser={setSelectedUser}
  //       onCloseModal={() => {
  //         resetSelectedUser()
  //         callAllUsersApi()
  //       }}
  //     ></EditUser>
  //   )
  // }

  return (
    <div>
      <CardContent>
        {renderAlertDialog()}
        {renderWholeMainData()}
      </CardContent>
      {/* {renderEditUserDialog()} */}
    </div>
  )
}

export default TabAllUsers
