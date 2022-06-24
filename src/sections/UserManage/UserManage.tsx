import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { userTableHeaders } from './tableheader'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primereact/resources/primereact.css'
import { connect } from 'react-redux'
import { set_empID } from '../../redux/Actions/ManageUser/Action'
import { teal } from '@material-ui/core/colors'
import { useEffect } from 'react'
import { getAllUsersAPI } from '../../api/Fetch'
import { useStyles } from './Styles'
import { routes } from '../../util/Constants'
import { constants } from '../../sections/UserCreate/DataConstants'

function UserManage(props: any) {
  const { set_empID } = props
  const history = useHistory()
  const classes = useStyles()
  const { DEFAULT, USERCONFIG_USERUPDATE } = routes
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [manageUserData, setManageUserData] = React.useState<any>()
  const [manageUserLoading, setManageUserLoading] = React.useState(false)
  const theme = useTheme()
  const active = useMediaQuery(theme.breakpoints.down('sm'))

  const handleNameClick = (e: any) => {
    console.log(e.target.value)
    const selectedRow = manageUserData.filter(
      (row: any) => row.userId === e.target.value
    )
    set_empID(selectedRow)
    console.log(selectedRow)
    history.push(`${DEFAULT}${USERCONFIG_USERUPDATE}`)
  }

  //change start
  useEffect(() => {
    getAllUsersAPI()
      .then((res) => {
        console.log(res.data.userdetails)
        const userValues = res.data.userdetails
          .filter((user: any) => user.user.status !== 'W')
          .map((user: any) => {
            return {
              userId: user.user.userId,
              firstName: user.user.firstName,
              middleName: user.user.middleName,
              lastName: user.user.lastName,
              emailId: user.user.emailId,
              additionalInfo: user.user.additionalInfo,
              designation: user.user.designation,
              status: constants.statuses
                // .filter((stat: any) => stat.statusID === user.user.status)
                .filter((stat: any) => stat.value === user.user.status)
                //.map((stat: any) => stat.text)
                .map((stat: any) => stat.label)
                .toString(),
              // status: user.user.status,
              roles: user.roles,
              usergroups: user.usergroups,
            }
          })
        console.log(userValues)
        setManageUserData(userValues)
      })
      .catch((err) => {
        console.log(err)
      })
    return () => {
      setManageUserData([])
    }
  }, [])

  useEffect(() => {
    if (manageUserData) {
      setManageUserLoading(false)
    } else {
      setManageUserLoading(true)
    }
  }, [manageUserData])

  const roleTemplate = (rowData: any) => {
    let roles = ''
    rowData.roles.map((role: any) => {
      if (roles) {
        roles = roles + ',\n' + role.roleName
      } else {
        roles = role.roleName
      }
      return null
    })
    // console.log(roles)
    return <div className={classes.exploreButton}>{roles}</div>
  }
  const groupTemplate = (rowData: any) => {
    let groups = ''
    rowData.usergroups.map((group: any) => {
      if (groups) {
        groups = groups + ',\n' + group.groupName
      } else {
        groups = group.groupName
      }
      return null
    })
    return <div className={classes.exploreButton}>{groups}</div>
  }
  //   const emailTemplate = (rowData: any) => {
  //     return (
  //       <a href={`mailto:${rowData.emailId}`} className={classes.links}>
  //         {rowData.emailId}
  //       </a>
  //     );
  //   };
  const userIdTemplate = (rowData: any) => {
    return (
      <button
        className={classes.exploreButtonforid}
        value={rowData.userId}
        onClick={handleNameClick}
        type="button"
      >
        {rowData.userId}
      </button>
    )
  }

  //end

  //   const nameTemplate = (rowData: any) => {
  //     return (
  //       <button
  //         className={classes.exploreButton}
  //         value={rowData.empID}
  //         onClick={handleNameClick}
  //       >
  //         {rowData.firstName}
  //       </button>
  //     );
  //   };

  return (
    <div
      className="manageUser" //className={classes.root}
    >
      <div className={classes.value}>
        <Grid container className={classes.container}>
          <Grid item sm={12} xs={12} className="manageRequest">
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
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                }}
              >
                <Typography variant="h6">Manage Users</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <input
                  type="text"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder={' Search User details '}
                  style={{
                    width: '200px',
                  }}
                />
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
                value={manageUserData}
                rowHover
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                currentPageReportTemplate="{first} - {last} of {totalRecords}"
                stateStorage="session"
                stateKey="dt-state-demo-session-usermanage"
                rows={10}
                style={{
                  width: '100%',
                }}
                scrollable
                scrollHeight="flex"
                globalFilter={globalFilter}
                emptyMessage="No users found."
                showGridlines
                loading={manageUserLoading}
              >
                {userTableHeaders.map((column) => {
                  return (
                    <Column
                      key={column.field}
                      field={column.field}
                      header={column.headerName}
                      bodyStyle={{
                        fontSize: '12px',
                        width: column.width,
                      }}
                      headerStyle={{
                        fontSize: '12px',
                        width: column.width,
                        backgroundColor: teal[900],
                        color: 'white',
                      }}
                      body={
                        (column.field === 'roles' && roleTemplate) ||
                        (column.field === 'userId' && userIdTemplate) ||
                        (column.field === 'usergroups' && groupTemplate)
                      }
                      sortable
                    />
                  )
                })}
              </DataTable>
              {/* ) : (
                <DataTable
                  value={manageUserData}
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
                  loading={manageUserLoading}
                >
                  {userTableHeaders.map((column) => {
                    return (
                      <Column
                        key={column.field}
                        field={column.field}
                        header={column.headerName}
                        bodyStyle={{
                          fontSize: '12px',
                          width: column.width,
                        }}
                        headerStyle={{
                          fontSize: '12px',
                          width: column.width,
                          backgroundColor: teal[900],
                          color: 'white',
                        }}
                        body={
                          (column.field === 'roles' && roleTemplate) ||
                          (column.field === 'userId' && userIdTemplate) ||
                          (column.field === 'usergroups' && groupTemplate)
                        }
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
  )
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    set_empID: (empid: any) => dispatch(set_empID(empid)),
  }
}

export default connect(null, matchDispatchToProps)(UserManage)
