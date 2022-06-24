import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { teal } from '@material-ui/core/colors'
import { connect } from 'react-redux'
import { useStyles } from './Styles'
import {
  inprogressTaskDetails,
  inprogressTaskTableHeaders,
} from './tableHeader'
import { reset_myinprogressAction } from '../../redux/Actions/PendingAction/Action'
import { routes } from '../../util/Constants'
import { getStatusWithLimitNewCamundaAPI } from '../../api/Fetch'

function InprogressTask(props: any) {
  const { myinprogressTasks, reset_myinprogressAction, userDetail } = props
  const { DEFAULT, DASHBOARD } = routes
  const history = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const [globalFilter, setGlobalFilter] = useState('')
  const [inProgressTasksDetails, setInprogressTasksDetails] = useState([])
  const active = useMediaQuery(theme.breakpoints.down(700))
  const active1 = useMediaQuery(theme.breakpoints.between(370, 700))

  const goBack = () => {
    reset_myinprogressAction()
    history.goBack()
  }
  useEffect(() => {
    return () => {
      reset_myinprogressAction()
    }
  }, [])
  useEffect(() => {
    if (!myinprogressTasks) history.push(`${DEFAULT}${DASHBOARD}`)
  }, [myinprogressTasks, history, DEFAULT, DASHBOARD])
  useEffect(() => {
    if (myinprogressTasks) {
      //setInprogressTasksDetails(myinprogressTasks[0].tasks)
      getStatusWithLimitNewCamundaAPI &&
        getStatusWithLimitNewCamundaAPI(
          userDetail &&
            userDetail.userdetails &&
            userDetail.userdetails[0].user.userId,
          myinprogressTasks[0].details
        ).then((res) => {
          if (res.data && res.data.status) {
            const pendingStatusDetails = res.data.status.filter(
              (item: any) => item.details.toLowerCase() === 'myrequestedtasks'
            )
            setInprogressTasksDetails(pendingStatusDetails[0].tasks)
          }
        })
    }
  }, [myinprogressTasks])
  return (
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
                      My Task {'>'} Requested
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
                    value={inProgressTasksDetails}
                    rowHover
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} of {totalRecords}"
                    stateStorage="session"
                    stateKey="dt-state-demo-session-inprogresstask"
                    rows={10}
                    style={{
                      width: '100%',
                    }}
                    scrollable
                    scrollHeight="flex"
                    globalFilter={globalFilter}
                    emptyMessage="No users found."
                    showGridlines
                    //loading={manageUserLoading}
                  >
                    {inprogressTaskTableHeaders.map((column) => {
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
                  {/* ) : (
                <DataTable
                  value={inProgressTasksDetails}
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
                  scrollable
                  scrollHeight="flex"
                  globalFilter={globalFilter}
                  emptyMessage="No users found."
                  showGridlines
                  //loading={manageUserLoading}
                >
                  {inprogressTaskTableHeaders.map((column) => {
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
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => {
  return {
    //mypendingAction: state.pendingActionReducer.mypendingAction,
    myinprogressTasks: state.pendingActionReducer.myinprogressTasks,
    userDetail: state.loginReducer.userDetail,
    // mygroupPendingAction: state.pendingActionReducer.mygroupPendingAction,
    // mygroupUnassignTasks: state.pendingActionReducer.mygroupUnassignTasks,
  }
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_myinprogressAction: () => dispatch(reset_myinprogressAction()),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(InprogressTask)
