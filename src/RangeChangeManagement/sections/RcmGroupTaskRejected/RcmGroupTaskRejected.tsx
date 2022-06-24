import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  styled,
  Dialog,
} from '@material-ui/core'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { teal } from '@material-ui/core/colors'
import { useStyles } from './Styles'
import { Toast } from 'primereact/toast'
import { pendingActionDetails, rejectedTableHeaders } from './tableHeader'
// import { reset_mygroupunassignAction } from '../../../redux/Actions/PendingAction'
import { routes, life } from '../../../util/Constants'
import {
  putClaimTaskAPI,
  getAllActiveUsersAPI,
  claimEventsCamunda,
  postFileAttachmentRangeResetAPI,
} from '../../../api/Fetch'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import { allMessages } from '../../../util//Messages'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import { reset_range_grouppendingAction } from '../../../redux/Actions/PendingAction/Action'

const Input = styled('input')({
  display: 'none',
})

function RcmGroupTaskRejected(props: any) {
  const {
    // reset_mygroupunassignAction,
    userDetail,
    reset_range_grouppendingAction,
    eventGroupPendingAction,
  } = props
  const { DEFAULT, DASHBOARD } = routes
  const theme = useTheme()
  const active = useMediaQuery(theme.breakpoints.down(700))
  const active1 = useMediaQuery(theme.breakpoints.between(370, 700))
  const classes = useStyles()
  const history = useHistory()
  const [globalFilter, setGlobalFilter] = useState('')
  const [unassignUser, setUnassignUser] = useState<any>([])
  const [checkCount, setCheckCount] = React.useState(1)
  const [failureCount, setFailureCount] = React.useState(0)
  const toast = useRef<any>(null)
  const [myPendingActions, setMyPendingActions] = useState([])
  //
  const [assigneeUsers, setAssigneeUsers] = useState([])
  const [userAssigned, setUserAssigned] = useState<any>()
  const [openAssignDialog, setOpenAssignDialog] = React.useState(false)
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [comments, setComments] = useState('')
  //

  const goBack = () => {
    setUnassignUser([])
    reset_range_grouppendingAction()
    history.goBack()
  }

  useEffect(() => {
    return () => {
      reset_range_grouppendingAction()
    }
  }, [])

  useEffect(() => {
    if (eventGroupPendingAction && eventGroupPendingAction[0].tasks != []) {
      console.log(eventGroupPendingAction[0].tasks)
      setMyPendingActions(
        eventGroupPendingAction[0].tasks.filter(
          (item: any) => item.timeFilter === 'Rejected'
        )
      )
    } else {
      history.push(`${DEFAULT}${DASHBOARD}`)
    }
  }, [])

  //   useEffect(() => {
  //     getAllActiveUsersAPI().then((res: any) => {
  //       const userDetails = res.data.userdetails.map((val: any) => {
  //         return {
  //           email: val.user.emailId,
  //           label: val.user.middleName
  //             ? val.user.firstName + val.user.middleName + val.user.lastName
  //             : val.user.firstName + ' ' + val.user.lastName,
  //           value: val.user.emailId,
  //           userId: val.user.userId,
  //           roles: val.roles.map((role: any) => {
  //             return {
  //               roleId: role.roleName,
  //             }
  //           }),
  //         }
  //       })
  //       console.log(userDetails)
  //       setAssigneeUsers(userDetails)
  //     })
  //   }, [])

  // useEffect(() => {
  //   return () => {
  //     sessionStorage.removeItem('dt-state-demo-session-unassignworkflow')
  //     reset_mygroupunassignAction()
  //   }
  // }, [])
  // useEffect(() => {
  //   if (!mygroupUnassignTasks) history.push(`${DEFAULT}${DASHBOARD}`)
  // }, [mygroupUnassignTasks, history, DEFAULT, DASHBOARD])
  // useEffect(() => {
  //   if (mygroupUnassignTasks) {
  //     setMyPendingActions(mygroupUnassignTasks[0].tasks)
  //   }
  // }, [mygroupUnassignTasks])

  // useEffect(() => {
  //   console.log(unassignUser)
  // }, [unassignUser])

  // useEffect(() => {
  //   // console.log('Check count: ', checkCount)
  //   // console.log('Failure count: ', failureCount)
  //   let detail
  //   let severity
  //   if (checkCount === 0) {
  //     if (failureCount === 0) {
  //       detail = allMessages.success.successAssign
  //       severity = 'success'
  //     } else if (failureCount > 0) {
  //       detail = allMessages.error.errorAssign
  //       severity = 'error'
  //     }
  //     setIsProgressLoader(false)
  //     toast.current.show([
  //       {
  //         severity: severity,
  //         summary: '',
  //         detail: detail,
  //         life: life,
  //         className: 'login-toast',
  //       },
  //     ])
  //     // setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), life)
  //   }
  // }, [checkCount, DASHBOARD, DEFAULT, history, failureCount])

  // const handleAssign = () => {
  //   setIsProgressLoader(true)
  //   if (unassignUser.length > 0) {
  //     setFailureCount(unassignUser.length)
  //     setCheckCount(unassignUser.length)
  //     const assignPayload = {
  //       requestorDetails: {
  //         emailId: userDetail && userDetail.userdetails[0].user.emailId,
  //         requestBy: userDetail && userDetail.userdetails[0].user.userId,
  //         requestorName:
  //           userDetail &&
  //           userDetail.userdetails[0].user.middleName &&
  //           userDetail.userdetails[0].user.middleName !== ''
  //             ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
  //             : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
  //         requestType: 'complete',
  //         requestDate: new Date().toISOString().split('T')[0],
  //       },
  //       requestorRoles:
  //         userDetail &&
  //         userDetail.userdetails[0].roles.map((role: any) => {
  //           return {
  //             roleId: role.roleId,
  //           }
  //         }),
  //       //submitFlag: 'Assign',
  //     }
  //     const taskIds =
  //       unassignUser && unassignUser.map((item: any) => item.taskId)

  //     for (let i = 0; i < taskIds.length; i++) {
  //       putClaimTaskAPI &&
  //         putClaimTaskAPI(assignPayload, taskIds[i])
  //           .then((res) => {
  //             console.log(res.data)
  //             setFailureCount((prevState) => prevState - 1)
  //             setCheckCount((prevState) => prevState - 1)
  //             // if (res.data.status.toLowerCase() !== 'failed') {
  //             // setIsProgressLoader(false)
  //             // toast.current.show({
  //             //   severity: 'success',
  //             //   summary: taskIds[i],
  //             //   detail: res.data.comments,
  //             //   life: life,
  //             //   className: 'login-toast',
  //             // })
  //             // } else {
  //             //   toast.current.show({
  //             //     severity: 'error',
  //             //     summary: 'Error!',
  //             //     detail: res.data.comments,
  //             //     life: 6000,
  //             //     className: 'login-toast',
  //             //   })
  //             // }
  //           })
  //           .catch((err) => {
  //             setCheckCount((prevState) => prevState - 1)
  //             // setIsProgressLoader(false)
  //             // toast.current.show({
  //             //   severity: 'error',
  //             //   summary: 'Error!',
  //             //   //detail: `${err.response.status} from tasklistapi`,
  //             //   detail: err.response.data.errorMessage,
  //             //   life: life,
  //             //   className: 'login-toast',
  //             // })
  //           })
  //     }
  //   }
  // }

  //   const claimPayload = userAssigned && {
  //     requestorDetails: {
  //       emailId: userAssigned.email,
  //       requestBy: userAssigned.userId,
  //       requesterName: userAssigned.label,
  //       requestType: 'complete',
  //       requestDate: new Date().toISOString().split('T')[0],
  //     },
  //     requestorRoles: userAssigned.roles,
  //   }

  //   const handleAssignedUser = (e: any) => {
  //     if (e) {
  //       setUserAssigned(e)
  //       console.log(e)
  //     } else {
  //       setUserAssigned('')
  //     }
  //   }

  //   const handleAssignToOtherClose = () => {
  //     setOpenAssignDialog(false)
  //     setUserAssigned(null)
  //   }

  //   const handleAssignTask = () => {
  //     if (unassignUser) {
  //       setOpenAssignDialog(false)
  //       setIsProgressLoader(true)
  //       let taskId = unassignUser && unassignUser.taskId

  //       if (uploadedFile) {
  //         // setFailureCount(referenceDocData.length)
  //         // setCheckCount(referenceDocData.length)
  //         // referenceDocData.map((rf) => {
  //         const formdata1 = new FormData()
  //         // formdata1.append('fileIn', referenceDocData.data)
  //         formdata1.append('fileIn', uploadedFile)
  //         // formdata1.append('fileIn', rf.data)
  //         postFileAttachmentRangeResetAPI &&
  //           postFileAttachmentRangeResetAPI(formdata1, unassignUser.eventId)
  //             .then((res: any) => {
  //               console.log(res.data)
  //               claimEventsCamunda(taskId, claimPayload)
  //                 .then((res: any) => {
  //                   console.log(res.data)
  //                   setIsProgressLoader(false)
  //                   toast.current.show({
  //                     severity: 'success',
  //                     summary: taskId,
  //                     detail: res.data.comments,
  //                     life: life,
  //                     className: 'login-toast',
  //                   })
  //                 })
  //                 .catch((err: any) => {
  //                   console.log(err)
  //                   setIsProgressLoader(false)
  //                   toast.current.show({
  //                     severity: 'error',
  //                     summary: 'Error!',
  //                     //detail: `${err.response.status} from tasklistapi`,
  //                     detail: err.response.data.errorMessage
  //                       ? err.response.data.errorMessage
  //                       : '',
  //                     life: life,
  //                     className: 'login-toast',
  //                   })
  //                 })
  //             })
  //             .catch((err: any) => {
  //               console.log(err)
  //               toast.current.show({
  //                 severity: 'error',
  //                 summary: 'Error!',
  //                 //detail: `${err.response.status} from tasklistapi`,
  //                 detail: 'Error uploading file',
  //                 life: life,
  //                 className: 'login-toast',
  //               })
  //             })
  //         // })
  //       } else {
  //         claimEventsCamunda(taskId, claimPayload)
  //           .then((res: any) => {
  //             console.log(res.data)
  //             setIsProgressLoader(false)
  //             toast.current.show({
  //               severity: 'success',
  //               summary: taskId,
  //               detail: res.data.comments,
  //               life: life,
  //               className: 'login-toast',
  //             })
  //           })
  //           .catch((err: any) => {
  //             console.log(err)
  //             setIsProgressLoader(false)
  //             toast.current.show({
  //               severity: 'error',
  //               summary: 'Error!',
  //               //detail: `${err.response.status} from tasklistapi`,
  //               detail: err.response.data.errorMessage
  //                 ? err.response.data.errorMessage
  //                 : '',
  //               life: life,
  //               className: 'login-toast',
  //             })
  //           })
  //       }
  //     }
  //   }

  //   const handleFileUpload = (event: any) => {
  //     console.log(event.target.files[0])
  //     setUploadedFile(event.target.files[0])
  //   }

  //   const assignToOtherDialog = (
  //     <Dialog
  //       open={openAssignDialog}
  //       onClose={handleAssignToOtherClose}
  //       fullWidth
  //       classes={{
  //         paperFullWidth: classes.placeholderDialog,
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           // width: small ? "600px" : "260px",
  //           // height: "250px",
  //           border: '3px solid green',
  //           borderRadius: 5,
  //           padding: '10px',
  //         }}
  //       >
  //         <DialogHeader
  //           title="Add placeholder Products"
  //           onClose={handleAssignToOtherClose}
  //         />
  //         {/* <Box sx={{ p: 3 }}> */}
  //         <Grid container spacing={2} style={{ padding: '10px' }}>
  //           <Grid item xs={12}>
  //             {/* <div> */}
  //             <Typography variant="body2" color="primary">
  //               Select User
  //             </Typography>
  //             <AutocompleteSelect
  //               value={userAssigned}
  //               options={assigneeUsers}
  //               onChange={handleAssignedUser}
  //               placeholder="Select User"
  //               // ref={focusResetType}
  //             />

  //             {/* </div> */}
  //           </Grid>
  //           <Grid item xs={12}>
  //             {/* <div> */}
  //             <Typography variant="body2" color="primary">
  //               Select Reason
  //               <br />
  //               {/* </div> */}
  //               {/* <div> */}
  //               <input
  //                 type="text"
  //                 value={uploadedFile ? uploadedFile.name : ''}
  //                 onClick={() => document.getElementById('selectedFile')!.click()}
  //                 className={classes.uploadTextfield}
  //                 placeholder="No file selected"
  //                 readOnly
  //               />
  //               <Input
  //                 type="file"
  //                 id="selectedFile"
  //                 accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //                 onChange={handleFileUpload}
  //                 required
  //               />
  //               <button
  //                 type="button"
  //                 onClick={() => document.getElementById('selectedFile')!.click()}
  //                 className={classes.uploadButton}
  //               >
  //                 Browse...
  //               </button>
  //             </Typography>
  //             {/* </div> */}
  //           </Grid>
  //           <Grid item xs={12}>
  //             {/* <div> */}
  //             <Typography variant="body2" color="primary">
  //               Comments
  //               <br />
  //               <textarea
  //                 rows={5}
  //                 className={classes.comments}
  //                 value={comments}
  //                 onChange={(e: any) => setComments(e.target.value)}
  //               />
  //             </Typography>
  //             {/* </div> */}
  //           </Grid>
  //           <Grid
  //             item
  //             xs={12}
  //             style={{
  //               textAlign: 'right',
  //             }}
  //           >
  //             <Button
  //               // type="submit"
  //               variant="contained"
  //               color="primary"
  //               className={classes.dialogButton}
  //               disabled={!userAssigned}
  //               onClick={handleAssignTask}
  //             >
  //               Assign
  //             </Button>
  //           </Grid>
  //         </Grid>
  //         {/* </Box> */}
  //       </Box>
  //     </Dialog>
  //   )

  return (
    <>
      <Toast
        ref={toast}
        position="bottom-left"
        onRemove={() => {
          history.push(`${DEFAULT}${DASHBOARD}`)
        }}
      />
      <div className="manageUser">
        <div className="manageRequest">
          <div className={classes.root}>
            <div className={classes.value}>
              <Grid container className={classes.container}>
                <Grid item sm={12} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: active ? 'column' : 'row',
                      justifyContent: 'space-between',
                      p: 2,
                      width: '100%',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexGrow: 1,
                      }}
                    >
                      <Typography variant="h6">
                        Group Task {'>'} Rejected
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: active
                          ? active1
                            ? 'row'
                            : 'column'
                          : 'row',
                        alignItems: 'start',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <input
                          type="text"
                          value={globalFilter}
                          onChange={(e) => setGlobalFilter(e.target.value)}
                          placeholder={' Search details here '}
                          style={{
                            width: '200px',
                          }}
                        />
                      </Box>
                      <Box
                        // sx={{
                        //   paddingLeft: 20,
                        // }}
                        sx={{
                          paddingLeft: !active ? 20 : 0,
                          paddingTop: active && !active1 && '10px',
                          width: '100%',
                          textAlign: active1 ? 'end' : 'start',
                        }}
                      >
                        <button
                          //className={classes.backButton}
                          className="backButton"
                          onClick={goBack}
                          type="button"
                        >
                          <svg
                            className="MuiSvgIcon-root"
                            focusable="false"
                            viewBox="0 0 34 34"
                            aria-hidden="true"
                          >
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                          </svg>
                          Back
                        </button>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2,
                    }}
                  >
                    {/* {!active ? ( */}
                    <DataTable
                      value={myPendingActions}
                      rowHover
                      paginator
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                      currentPageReportTemplate="{first} - {last} of {totalRecords}"
                      stateStorage="session"
                      stateKey="dt-state-demo-session-unassignworkflow"
                      rows={10}
                      style={{
                        width: '100%',
                      }}
                      selection={unassignUser}
                      onSelectionChange={(e) => {
                        console.log(e.value)
                        setUnassignUser(e.value)
                      }}
                      scrollable
                      scrollHeight="flex"
                      globalFilter={globalFilter}
                      emptyMessage="No users found."
                      showGridlines
                      //loading={manageUserLoading}
                    >
                      {rejectedTableHeaders.map((column) => {
                        return (
                          <Column
                            key={column.field}
                            field={column.field}
                            header={column.headerName}
                            bodyStyle={{
                              fontSize: '12px',
                              width: column.width,
                              overflowX: 'auto',
                            }}
                            headerStyle={{
                              fontSize: '12px',
                              width: column.width,
                              backgroundColor: teal[900],
                              color: 'white',
                            }}
                            // body={
                            //   column.field === 'requestedId' && requestIdTemplate
                            // }
                            sortable
                          />
                        )
                      })}
                    </DataTable>
                  </Box>
                  {/* <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'right',
                      p: 2,
                      width: '100%',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      // type="submit"
                      // size="small"
                      // onClick={handleAssign}
                      onClick={() => unassignUser && setOpenAssignDialog(true)}
                    >
                      Assign to Other
                    </Button>
                  </Box> */}
                </Grid>
              </Grid>
              <LoadingComponent showLoader={isProgressLoader} />
            </div>
          </div>
        </div>
      </div>
      {/* {assignToOtherDialog} */}
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    eventGroupPendingAction: state.pendingActionReducer.eventGroupPendingAction,
    userDetail: state.loginReducer.userDetail,
  }
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_range_grouppendingAction: () =>
      dispatch(reset_range_grouppendingAction()),
  }
}
// export default connect(mapStateToProps, matchDispatchToProps)(RcmPendingActions)
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(RcmGroupTaskRejected)
