import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from '@material-ui/core'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { teal } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import { useStyles } from './Styles'
import { Toast } from 'primereact/toast'
import {
  groupPendingActionDetails,
  groupPendingActionTableHeaders,
} from './tableHeaders'
import { reset_mygrouppendingAction } from '../../redux/Actions/PendingAction/Action'
import { routes, life } from '../../util/Constants'
import {
  putClaimTaskAPI,
  getStatusWithLimitNewCamundaAPI,
} from '../../api/Fetch'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { allMessages } from '../../util/Messages'
import ErrorIcon from '@material-ui/icons/Error'
import LightTooltip from '../../RangeChangeManagement/components/LightToolTip/LightTooltip'

function GroupPendingAction(props: any) {
  const { reset_mygrouppendingAction, mygroupPendingAction, userDetail } = props
  const { DEFAULT, DASHBOARD } = routes
  const theme = useTheme()
  const classes = useStyles()
  const history = useHistory()
  const [globalFilter, setGlobalFilter] = useState('')
  const [unassignUser, setUnassignUser] = useState<any>([])
  const [checkCount, setCheckCount] = React.useState(1)
  const [failureCount, setFailureCount] = React.useState(0)
  const toast = useRef<any>(null)
  const [myGroupPendingActionDetails, setMyGroupPendingActionDetails] =
    useState([])
  //
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  //
  const active = useMediaQuery(theme.breakpoints.down(700))
  const active1 = useMediaQuery(theme.breakpoints.between(370, 700))
  const [isDisabled, setIsDisabled] = React.useState(false)

  const goBack = () => {
    reset_mygrouppendingAction()
    history.goBack()
  }
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('dt-state-demo-session-grouppendingaction')
      reset_mygrouppendingAction()
    }
  }, [])
  useEffect(() => {
    if (!mygroupPendingAction) history.push(`${DEFAULT}${DASHBOARD}`)
  }, [mygroupPendingAction, history, DEFAULT, DASHBOARD])
  useEffect(() => {
    if (mygroupPendingAction) {
      //setMyGroupPendingActionDetails(mygroupPendingAction[0].tasks)
      getStatusWithLimitNewCamundaAPI &&
        getStatusWithLimitNewCamundaAPI(
          userDetail &&
            userDetail.userdetails &&
            userDetail.userdetails[0].user.userId,
          mygroupPendingAction[0].details
        ).then((res) => {
          if (res.data && res.data.status) {
            const pendingStatusDetails = res.data.status.filter(
              (item: any) =>
                item.details.toLowerCase() === 'mygrouppendingtasks'
            )
            setMyGroupPendingActionDetails(pendingStatusDetails[0].tasks)
          }
        })
    }
  }, [mygroupPendingAction])

  useEffect(() => {
    console.log(unassignUser)
  }, [unassignUser])

  useEffect(() => {
    console.log('starting')
    if (unassignUser.length > 0) {
      console.log('length greater than zero')
      for (let i = 0; i < unassignUser.length; i++) {
        if (unassignUser && unassignUser[i].approved === true) {
          setIsDisabled(true)
          break
        } else {
          setIsDisabled(false)
        }
      }
    } else {
      console.log('length less than one')
      setIsDisabled(false)
    }
  }, [unassignUser])

  useEffect(() => {
    // console.log('Check count: ', checkCount)
    // console.log('Failure count: ', failureCount)
    let detail
    let severity
    if (checkCount === 0) {
      if (failureCount === 0) {
        detail = allMessages.success.successAssign
        severity = 'success'
      } else if (failureCount > 0) {
        detail = allMessages.error.errorAssign
        severity = 'error'
      }
      setIsProgressLoader(false)
      toast.current.show([
        {
          severity: severity,
          summary: '',
          detail: detail,
          life: life,
          className: 'login-toast',
        },
      ])
      // setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), life)
    }
  }, [checkCount, DASHBOARD, DEFAULT, history, failureCount])

  const handleAssign = () => {
    if (unassignUser.length > 0) {
      setIsProgressLoader(true)
      setFailureCount(unassignUser.length)
      setCheckCount(unassignUser.length)
      unassignUser.map((item: any) => {
        if (item.approved === false) {
          const assignPayload = {
            requestorDetails: {
              emailId: userDetail && userDetail.userdetails[0].user.emailId,
              requestBy: userDetail && userDetail.userdetails[0].user.userId,
              requestorName:
                userDetail &&
                userDetail.userdetails[0].user.middleName &&
                userDetail.userdetails[0].user.middleName !== ''
                  ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                  : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
              requestType: 'complete',
              requestDate: new Date().toISOString().split('T')[0],
            },
            requestorRoles:
              userDetail &&
              userDetail.userdetails[0].roles.map((role: any) => {
                return {
                  roleId: role.roleId,
                }
              }), // submitFlag: 'Assign',
          }
          putClaimTaskAPI &&
            putClaimTaskAPI(assignPayload, item.taskId)
              .then((res) => {
                console.log(res.data)
                setFailureCount((prevState) => prevState - 1)
                setCheckCount((prevState) => prevState - 1)
              })
              .catch((err) => {
                setCheckCount((prevState) => prevState - 1)
              })
        } else {
          setCheckCount((prevState) => prevState - 1)
        }
      })
    }
  }

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
  //       // submitFlag: 'Assign',
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
  //             //   // detail: `${err.response.status} from tasklistapi`,
  //             //   detail: err.response.data.errorMessage,
  //             //   life: life,
  //             //   className: 'login-toast',
  //             // })
  //           })
  //     }
  //   }
  // }

  const requestIdTemplate = (rowData: any) => {
    if (rowData.approved === false) {
      return <div className={classes.validRequestId}>{rowData.requestId}</div>
    } else {
      return (
        <div>
          {rowData.requestId}
          <LightTooltip
            title="This request id already approved and waiting for effective date.Please do not assign it again"
            position={'right'}
            icon={<ErrorIcon color="error" fontSize="small" />}
          />
        </div>
      )
    }
  }
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
                        Group Task {'>'} Pending
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
                      value={myGroupPendingActionDetails}
                      rowHover
                      paginator
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                      currentPageReportTemplate="{first} - {last} of {totalRecords}"
                      stateStorage="session"
                      stateKey="dt-state-demo-session-grouppendingaction"
                      rows={10}
                      style={{
                        width: '100%',
                      }}
                      selection={unassignUser}
                      onSelectionChange={(e) => setUnassignUser(e.value)}
                      scrollable
                      scrollHeight="flex"
                      globalFilter={globalFilter}
                      emptyMessage="No users found."
                      showGridlines
                      //loading={manageUserLoading}
                    >
                      <Column
                        selectionMode="multiple"
                        headerStyle={{
                          width: '3em',
                          backgroundColor: teal[900],
                          color: 'white',
                        }}
                      ></Column>
                      {groupPendingActionTableHeaders.map((column) => {
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
                            body={
                              column.field === 'requestId' && requestIdTemplate
                            }
                            sortable
                          />
                        )
                      })}
                    </DataTable>
                    {/* ) : (
                  <DataTable
                    value={myGroupPendingActionDetails}
                    rowHover
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} of {totalRecords}"
                    stateStorage="session"
                    stateKey="dt-state-demo-session"
                    rows={10}
                    style={{
                      width: '100%',
                    }}
                    selection={unassignUser}
                    onSelectionChange={(e) => setUnassignUser(e.value)}
                    scrollable
                    scrollHeight="flex"
                    globalFilter={globalFilter}
                    emptyMessage="No users found."
                    showGridlines
                    //loading={manageUserLoading}
                  >
                    <Column
                      selectionMode="multiple"
                      headerStyle={{
                        width: '3em',
                        backgroundColor: teal[900],
                        color: 'white',
                      }}
                    ></Column>
                    {groupPendingActionTableHeaders.map((column) => {
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
                )} */}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      p: 2,
                      width: '100%',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      // type="submit"
                      size="small"
                      onClick={handleAssign}
                      disabled={isDisabled}
                    >
                      Assign to Me
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <LoadingComponent showLoader={isProgressLoader} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    mygroupPendingAction: state.pendingActionReducer.mygroupPendingAction,
    userDetail: state.loginReducer.userDetail,
    // mygroupUnassignTasks: state.pendingActionReducer.mygroupUnassignTasks,
  }
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_mygrouppendingAction: () => dispatch(reset_mygrouppendingAction()),
  }
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(GroupPendingAction)
