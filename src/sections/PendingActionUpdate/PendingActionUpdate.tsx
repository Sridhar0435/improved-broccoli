import {
  Box,
  Typography,
  Button,
  Dialog,
  useTheme,
  useMediaQuery,
  OutlinedInput,
  Paper,
  Grid,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { styled } from '@material-ui/styles'
import { components } from 'react-select'
import Select from 'react-select'
import { connect } from 'react-redux'
import { teal } from '@material-ui/core/colors'
import { Toast } from 'primereact/toast'
import React, { useRef, useEffect, useState } from 'react'
import { useHistory, Prompt } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { fieldWidth, useStyles } from './Styles'
import { taskList } from '../../util/Constants'
import {
  getColleagueAPI,
  getUserGroupAPI,
  getUserGroupActiveAPI,
  putUserDetailsAPI,
  putUserDetailsCamundaAPI,
  postTaskLogsAPI,
  getTasklistsAPI,
  getTasklogsAPI,
  postFileAttachmentAPI,
  putRejectTaskAPI,
  putClaimTaskAPI,
  putCompleteTaskAPI,
  getUserIdAPI,
} from '../../api/Fetch'
import { UtilityFunctions } from '../../util/UtilityFunctions'
import { constants } from '../UserCreate/DataConstants'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { reset_pendingAction } from '../../redux/Actions/PendingAction'
import { pendingActionUpdateTableHeaders } from './tableHeader'
import { routes, extensions, life } from '../../util/Constants'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { allMessages } from '../../util/Messages'
import { admins } from '../../util/Constants'
// import { viewLogTemp } from '../Dashboard/DataConstant'

const Input = styled('input')({
  display: 'none',
})

function PendingActionUpdate(props: any) {
  const {
    empDetails,
    reset_empID,
    rolesArray,
    appFuncList,
    userDetail,
    pendingActionDetails,
    reset_pendingAction,
  } = props
  const { DEFAULT, DASHBOARD_PENDINGACTION, DASHBOARD } = routes
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const active = useMediaQuery(theme.breakpoints.down(750))
  const forbutton = useMediaQuery(theme.breakpoints.down(400))
  const between = useMediaQuery(theme.breakpoints.between(450, 750))
  const width = useMediaQuery(theme.breakpoints.up('md'))
  const dialogwidth = width ? 600 : fieldWidth

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [middleName, setMiddleName] = React.useState('')
  const [requestType, setRequestType] = React.useState('')
  const [selectEmployeeID, setSelectEmployeeID] = React.useState<any>('')
  const [requestedId, setRequestedId] = React.useState('')
  const [taskId, setTaskId] = React.useState('')
  const [employeeID, setEmployeeID] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [designation, setDesignation] = React.useState<any>('')
  const [status, setStatus] = React.useState('')
  const [statusWithValue, setStatusWithValue] = React.useState('')
  const [comments, setComments] = React.useState('')
  const [comments1, setComments1] = React.useState('')
  const [wrongExtn, setWrongExtn] = React.useState(false)
  const [referenceDoc, setReferenceDoc] = React.useState<any>('')
  const [viewLogEl, setViewLogEl] = React.useState(false)
  const viewLogOpen = Boolean(viewLogEl)
  const [roleAccess, setRoleAccess] = React.useState('')
  const [groupAccess, setGroupAccess] = React.useState('')
  const [groupData, setGroupData] = React.useState<Array<any>>([])
  // const [groups, setGroups] = React.useState([])
  const [groupInput, setGroupInput] = React.useState([])
  // const [groupOpen, setGroupOpen] = React.useState(false)
  const [cancelOpenApprove, setCancelOpenApprove] = React.useState(false)
  const [cancelOpenSubmit, setCancelOpenSubmit] = React.useState(false)
  const [cancelOpenReassign, setCancelOpenReassign] = React.useState(false)
  const [cancelOpenReject, setCancelOpenReject] = React.useState(false)
  const [back, setBack] = React.useState(false)
  const [additionalInfo, setAdditionalInfo] = React.useState('')
  const [openAdditional, setOpenAdditional] = React.useState(false)
  const [colleagueData, setColleagueData] = React.useState('')
  const [errorReassign, setErrorReassign] = React.useState('')
  const [errorRequestType, setErrorRequestType] = React.useState('')
  const [errorEmployeeId, setErrorEmployeeId] = React.useState('')
  const [errorStatus, setErrorStatus] = React.useState('')
  const [errorRoles, setErrorRoles] = React.useState('')
  const [errorGroups, setErrorGroups] = React.useState('')
  const [checkCount, setCheckCount] = React.useState(1)
  const [failureCount, setFailureCount] = React.useState(0)
  const [disabled, setDisabled] = React.useState(false)
  const [roles, setRoles] = React.useState([])
  const [roleNames, setRoleNames] = React.useState([])
  const [tasks, setTasks] = React.useState(taskList)
  const [referenceDocData, setReferenceDocData] = React.useState<Array<any>>([])
  const [taskSelected, setTaskSelected] = React.useState<any>('')
  const [taskOpen, setTaskOpen] = React.useState(false)
  const [viewLogRows, setViewLogRows] = React.useState<Array<any>>([])
  const [pendingActionDetailsTemp, setPendingActionDetailsTemp] =
    React.useState<Array<any>>([])
  const toast = useRef<any>(null)
  //
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  const [isSuccessCall, setIsSuccessCall] = React.useState(true)
  const [returnText, setReturnText] = React.useState('')
  const [attachmentUrlArr, setAttachmentUrlArr] = React.useState<Array<string>>(
    []
  )
  const [logDataIn, setLogDataIn] = React.useState({})
  const [isPageModified, setIsPageModified] = React.useState(false)

  const [effectiveDate, setEffectiveDate] = useState<any>(
    `${new Date().toISOString().split('T')[0]}`
  )

  const [errorEffectiveDate, setErrorEffectiveDate] = useState<any>('')
  //
  const focusRequestType = useRef<any>(null)
  const focusEmpId = useRef<any>(null)
  const focusStatus = useRef<any>(null)
  const focusRole = useRef<any>(null)
  const focusGroup = useRef<any>(null)
  const focusEffectiveDate = useRef<any>(null)
  //
  const [requestorEmailId, setRequestorEmailId] = React.useState('')
  const [requestorUserId, setRequestorUserId] = React.useState('')
  const [requestorName, setRequestorName] = React.useState('')
  const [requestorRoles, setRequestorRoles] = React.useState<Array<any>>([])
  //

  useEffect(() => {
    setErrorReassign('')
    return () => reset_pendingAction()
  }, [])

  useEffect(() => {
    if (!pendingActionDetails) {
      history.push(`${DEFAULT}${DASHBOARD_PENDINGACTION}`)
    } else {
      console.log(pendingActionDetails[0])
      setSelectEmployeeID(pendingActionDetails[0])
      setTasks(taskList)
      setPendingActionDetailsTemp(
        JSON.parse(JSON.stringify(pendingActionDetails))
      )

      if (rolesArray) {
        const rolelist =
          userDetail &&
          userDetail.userdetails &&
          userDetail.userdetails[0].roles.map((rl: any) => rl.roleId)
        let adminqn = false
        for (let ad = 0; ad < admins.length; ad++) {
          if (rolelist.includes(admins[ad])) {
            adminqn = true
            break
          }
        }
        const rolesArrayCopy = JSON.parse(JSON.stringify(rolesArray))
        const rolesValues =
          // rolesArrayCopy &&
          // rolesArrayCopy.roles.map((role: any) => {
          //   return {
          //     label: role.roleName,
          //     value: role.roleId,
          //     roleId: role.roleId,
          //     roleName: role.roleName,
          //     roleDesc: role.roleDesc,
          //   }
          // })
          rolesArrayCopy && adminqn
            ? rolesArrayCopy.roles.map((role: any) => {
                return {
                  label: role.roleName,
                  value: role.roleId,
                  roleId: role.roleId,
                  roleName: role.roleName,
                  roleDesc: role.roleDesc,
                }
              })
            : rolesArrayCopy.roles
                .filter((role: any) => !admins.includes(role.roleId))
                .map((role: any) => {
                  return {
                    label: role.roleName,
                    value: role.roleId,
                    roleId: role.roleId,
                    roleName: role.roleName,
                    roleDesc: role.roleDesc,
                  }
                })
        setRoles(rolesValues)
        console.log(rolesValues)
      }

      // getUserGroupAPI &&
      //   getUserGroupAPI()
      getUserGroupActiveAPI &&
        getUserGroupActiveAPI()
          .then((res) => {
            const groupValues = res.data.usergroups.map((group: any) => {
              return {
                label: group.groupName,
                value: group.groupId,
                groupId: group.groupId,
                groupName: group.groupName,
                status: group.status,
              }
            })
            setGroupData(groupValues)
          })
          .catch((err) => {
            console.log(err)
          })
    }
  }, [
    rolesArray,
    empDetails,
    history,
    pendingActionDetails,
    DASHBOARD_PENDINGACTION,
    DEFAULT,
    userDetail,
  ])

  useEffect(() => {
    if (selectEmployeeID) {
      console.log(
        new Date(selectEmployeeID.requestTimestamp).toISOString().split('T')[0]
      )
      const date = new Date(selectEmployeeID.requestTimestamp)
        .toISOString()
        .split('T')[0]
      console.log(date)
    }
  }, [selectEmployeeID])

  useEffect(() => {
    // console.log('Check count: ', checkCount)
    // console.log('Failure count: ', failureCount)
    let detail = ''
    let severity = ''
    if (referenceDocData.length === 0) {
      if (checkCount === 0) {
        // if (failureCount === 0 && referenceDocData.length === 0) {
        if (failureCount === 0) {
          detail = allMessages.success.successPost
          severity = 'success'
          // } else if (failureCount === 0 && referenceDocData.length > 0) {
          //   detail = allMessages.success.successPostAttach
          //   severity = 'success'
          // } else if (failureCount > 0 && referenceDocData.length === 0) {
        } else if (failureCount > 0) {
          detail = allMessages.error.logpostFailureSingle
          severity = 'error'
          // } else if (failureCount > 0 && referenceDocData.length > 0) {
          //   detail = `${failureCount} ${allMessages.error.logpostFailureAttach}`
          //   severity = 'error'
        }
        setIsProgressLoader(false)
        toast.current.show([
          {
            severity: 'success',
            summary: '',
            detail: `${returnText}`,
            life: life,
            className: 'login-toast',
          },
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
    } else {
      if (checkCount === 0) {
        const attachListString = attachmentUrlArr.join('#!#')
        console.log(logDataIn)
        const data = {
          ...logDataIn,
          attachmentUrl: attachListString,
        }
        logDataIn &&
          postTaskLogsAPI &&
          postTaskLogsAPI(data)
            .then((res) => {
              if (failureCount === 0) {
                detail = allMessages.success.successAttach
                severity = 'success'
              } else if (failureCount > 0) {
                detail = `${failureCount} ${allMessages.error.logFailureAttach}`
                severity = 'error'
              }
              setIsProgressLoader(false)
              toast.current.show([
                {
                  severity: 'success',
                  summary: '',
                  detail: `${returnText}`,
                  life: life,
                  className: 'login-toast',
                },
                {
                  severity: severity,
                  summary: '',
                  detail: detail,
                  life: life,
                  className: 'login-toast',
                },
              ])
              // setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), life)
            })
            .catch((err) => {
              detail = allMessages.error.logpostFailureSingle
              severity = 'error'
              setIsProgressLoader(false)
              toast.current.show([
                {
                  severity: 'success',
                  summary: '',
                  detail: `${returnText}`,
                  life: life,
                  className: 'login-toast',
                },
                {
                  severity: severity,
                  summary: '',
                  detail: detail,
                  life: life,
                  className: 'login-toast',
                },
              ])
              // setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), life)
            })
      }
    }
  }, [
    checkCount,
    DASHBOARD,
    DEFAULT,
    history,
    failureCount,
    referenceDocData,
    returnText,
    logDataIn,
    attachmentUrlArr,
  ])

  useEffect(() => {
    if (requestedId && requestedId !== '') {
      getTasklogsAPI &&
        getTasklogsAPI(requestedId)
          .then((res) => {
            console.log(res.data)
            setViewLogRows([...res.data.tasklogs])
            let commentStr = ''
            // for (let i = 0; i < res.data.tasklogs.length; i++) {
            //   commentStr =
            //     commentStr +
            //     `${res.data.tasklogs[i].timestamp} ${res.data.tasklogs[i].comments}\n`
            // }
            commentStr =
              res.data.tasklogs[res.data.tasklogs.length - 1].comments
            setComments1(commentStr)
            setPendingActionDetailsTemp(
              pendingActionDetailsTemp &&
                pendingActionDetailsTemp.map((item: any) => {
                  item.comments = commentStr
                  return item
                })
            )
          })
          .catch((err) => {
            setViewLogRows([])
          })
      // setViewLogRows(viewLogTemp)
    }
  }, [requestedId])

  useEffect(() => {
    if (status === 'D' && requestType !== 'modify' && requestType !== '') {
      // setErrorRequestType(allMessages.error.deletedError)
      focusStatus.current.focus()
      setErrorStatus(allMessages.error.deletedError)
    }
    if (
      status === 'I' &&
      requestType !== 'modify' &&
      requestType !== 'remove' &&
      requestType !== ''
    ) {
      // setErrorRequestType(allMessages.error.inactiveError)
      focusStatus.current.focus()
      setErrorStatus(allMessages.error.inactiveError)
    }
    if (status === 'W' && requestType !== 'new' && requestType !== '') {
      // setErrorRequestType(allMessages.error.inprogressError)
      focusStatus.current.focus()
      setErrorStatus(allMessages.error.inprogressError)
    }
  }, [status, requestType])

  const goBack = () => {
    reset_pendingAction()
    history.goBack()
  }
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }

  const roleSelectStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }
  const onstatusChange = (e: any) => {
    setIsPageModified(true)
    // setStatus(e.target.value)
    setStatus(e.value)
    // if (e.target.value !== '') {
    if (e.value !== '') {
      setErrorStatus('')
      setErrorRequestType('')
    }
    // if (e.target.value === 'D') {
    if (e.value === 'D') {
      setRoleAccess('rem_role')
      setGroupAccess('rem_group')
    } else {
      setRoleAccess('mod_role')
      setGroupAccess('mod_group')
    }
  }
  const onrequestTypeChange = (e: any) => {
    // if (e.target.value !== '') {
    if (e.value !== '') {
      setErrorRequestType('')
      setErrorStatus('')
    }
    // setRequestType(e.target.value)
    setRequestType(e.value)
  }
  useEffect(() => {
    console.log(requestType)
    if (requestType.toLowerCase() === 'new') {
      setGroupAccess('mod_group')
      setRoleAccess('mod_role')
    } else if (requestType.toLowerCase() === 'modify') {
      setGroupAccess('mod_group')
      setRoleAccess('mod_role')
      // setStatus('A')
    } else if (requestType.toLowerCase() === 'remove') {
      setGroupAccess('rem_group')
      setRoleAccess('rem_role')
      // setStatus('A')
    }
  }, [requestType])
  const handleFileUpload = (event: any) => {
    setWrongExtn(false)
    // setReferenceDoc(event.target.files[0])
    for (let i = 0; i < event.target.files.length; i++) {
      const checkextension = event.target.files[i]
        ? new RegExp(
            '(' + extensions.join('|').replace(/\./g, '\\.') + ')$',
            'i'
          ).test(event.target.files[i].name)
        : false
      const fileSize = event.target.files[i].size / 1024 / 1024
      if (
        (!checkextension || event.target.files[i].size === 0 || fileSize > 5) &&
        event.target.files[i]
      ) {
        setWrongExtn(true)
      }
      if (
        event.target.files[i] &&
        checkextension &&
        event.target.files[i].size !== 0 &&
        fileSize <= 5
      ) {
        // let reader = new FileReader();
        // reader.readAsDataURL(event.target.files[0]);

        // reader.onload = (e: any) => {
        //   console.log(e.target.result);
        setIsPageModified(true)
        setReferenceDocData((prevState) => [
          ...prevState,
          {
            name: event.target.files[i].name,
            data: event.target.files[i],
            link: URL.createObjectURL(event.target.files[i]),
          },
        ])
        URL.revokeObjectURL(event.target.files[i])
        // };
      }
    }
  }
  const Option = (props: any) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => {}}
          />{' '}
          <label>{props.label}</label>
        </components.Option>
      </div>
    )
  }

  const handleRoleChange1 = (selected: any) => {
    setIsPageModified(true)
    console.log(selected)
    setRoleNames(selected)
    if (selected.length > 0) setErrorRoles('')
  }

  const handleEffectiveDate = (e: any) => {
    setIsPageModified(true)
    setEffectiveDate(e)
  }
  useEffect(() => {
    const systemDate = new Date().toISOString().split('T')[0]
    console.log(systemDate)
    var date1 = new Date(effectiveDate)
    console.log(effectiveDate)
    var date2 = new Date(systemDate)
    var date3 = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
    console.log(date3)
    if (date3 < 0 || date3 > 14) {
      setErrorEffectiveDate(allMessages.error.effectiveDateError)
    } else {
      setErrorEffectiveDate('')
    }
  }, [effectiveDate])

  const postTasklog = (logData: any) => {
    postTaskLogsAPI &&
      postTaskLogsAPI(logData)
        .then((res) => {
          setFailureCount((prevState) => prevState - 1)
          setCheckCount((prevState) => prevState - 1)
          // toast.current.show({
          //   severity: 'success',
          //   summary: '',
          //   detail: res.data.message,
          //   life: life,
          //   className: 'login-toast',
          // })
        })
        .catch((err) => {
          setCheckCount((prevState) => prevState - 1)
          // toast.current.show({
          //   severity: 'error',
          //   summary: 'Error!',
          //   //detail: `${err.response.status} from tasklogapi`,
          //   detail: err.response.data.errorMessage,
          //   // detail: `${err.data.errorMessage} ${statusCode}`,
          //   life: life,
          //   className: 'login-toast',
          // })
        })
  }
  const roleSelect1 = (
    <Select
      options={roles}
      isMulti
      ref={focusRole}
      onChange={handleRoleChange1}
      components={{
        Option,
      }}
      value={roleNames}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      className={classes.multiSelect}
      styles={roleSelectStyle}
      isDisabled={
        UtilityFunctions.isHidden(
          '8',
          appFuncList ? appFuncList : [],
          roleAccess
        )
          ? true
          : false
      }
    />
  )
  React.useEffect(() => {
    setRequestedId(selectEmployeeID.requestId)
    if (selectEmployeeID) {
      getTasklistsAPI &&
        getTasklistsAPI(selectEmployeeID.requestId)
          .then((res) => {
            setTaskId(res.data.tasklists[0].taskId)
            setRequestType(
              res.data.tasklists[0].requestData.camunda &&
                res.data.tasklists[0].requestData.camunda.requestorDetails &&
                res.data.tasklists[0].requestData.camunda.requestorDetails
                  .requestType
                ? res.data.tasklists[0].requestData.camunda.requestorDetails
                    .requestType
                : 'modify'
            )
            setEffectiveDate(
              res.data.tasklists[0].requestData.effectiveDate && effectiveDate
                ? `${
                    new Date(res.data.tasklists[0].requestData.effectiveDate)
                      .toISOString()
                      .split('T')[0]
                  }`
                : effectiveDate
            )
            //setEffectiveDate(new Date(res.data.tasklists[0].requestData.effectiveDate).toISOString().split('T')[0])
            setEmployeeID(res.data.tasklists[0].requestData.user.employeeId)
            setFirstName(res.data.tasklists[0].requestData.user.firstName)
            setMiddleName(res.data.tasklists[0].requestData.user.middleName)
            setLastName(res.data.tasklists[0].requestData.user.lastName)
            setEmail(res.data.tasklists[0].requestData.user.emailId)
            setRequestorUserId(
              res.data.tasklists[0].requestData.camunda.requestorDetails
                .requestBy
            )
            setRequestorEmailId(
              res.data.tasklists[0].requestData.camunda.requestorDetails.emailId
            )
            setRequestorName(
              res.data.tasklists[0].requestData.camunda.requestorDetails
                .requestorName
                ? res.data.tasklists[0].requestData.camunda.requestorDetails
                    .requestorName
                : ''
            )
            setRequestorRoles(
              res.data.tasklists[0].requestData.camunda.requestorRoles
            )
            // setAdditionalInfo(
            //   res.data.tasklists[0].requestData.user.additionalInfo
            // )
            // if (
            //   res.data.tasklists[0].requestData.user.additionalInfo &&
            //   res.data.tasklists[0].requestData.user.additionalInfo !== ''
            // ) {
            //   setAdditionalInfo(
            //     res.data.tasklists[0].requestData.user.additionalInfo
            //   )
            // } else {
            getColleagueAPI(res.data.tasklists[0].requestData.user.employeeId)
              .then((res: any) => {
                setColleagueData(res.data)
              })
              .catch((err) => setColleagueData(''))
            // }
            setDesignation(res.data.tasklists[0].requestData.user.designation)
            if (res.data.tasklists[0].requestData.user.status === 'D') {
              setStatus(res.data.tasklists[0].requestData.user.status)
              setStatusWithValue('DELETED')
            } else if (res.data.tasklists[0].requestData.user.status === 'W') {
              setStatus(res.data.tasklists[0].requestData.user.status)
              setStatusWithValue('INPROGRESS')
            } else if (res.data.tasklists[0].requestData.user.status === 'I') {
              setStatus(res.data.tasklists[0].requestData.user.status)
              setStatusWithValue('INACTIVE')
            } else {
              setStatus(res.data.tasklists[0].requestData.user.status)
              setStatusWithValue('ACTIVE')
            }
            setRoleNames(
              res.data.tasklists[0].requestData.roles.map((role: any) => {
                const roleName =
                  roles &&
                  roles
                    .filter((roleA: any) => roleA.roleId === role.roleId)
                    .map((r: any) => r.roleName)
                return {
                  label: roleName,
                  value: role.roleId,
                }
              })
            )
            setGroupInput(
              res.data.tasklists[0].requestData.usergroups.map((group: any) => {
                const groupName =
                  groupData &&
                  groupData
                    .filter((grpA: any) => grpA.groupId === group.groupId)
                    .map((g: any) => g.groupName)
                return {
                  label: groupName,
                  value: group.groupId,
                  status: group.status,
                }
              })
            )
            // setGroups(
            //   res.data.tasklists[0].requestData.usergroups.map((group: any) => {
            //     const groupName =
            //       groupData &&
            //       groupData
            //         .filter((grpA: any) => grpA.groupId === group.groupId)
            //         .map((g: any) => g.groupName)
            //     return {
            //       label: groupName,
            //       value: group.groupId,
            //       status: group.status,
            //     }
            //   })
            // )
          })
          .catch((err) => {
            setEmployeeID('')
            setFirstName('')
            setMiddleName('')
            setLastName('')
            setEmail('')
            setDesignation('')
            setStatus('')
            setRoleNames([])
            setGroupInput([])
            // setGroups([])
          })

      // setComments(selectEmployeeID.comments)
    } else {
      setEmployeeID('')
      setFirstName('')
      setMiddleName('')
      setLastName('')
      setEmail('')
      setDesignation('')
      setStatus('')
      setRoleNames([])
      setGroupInput([])
      // setGroups([])
    }
  }, [selectEmployeeID, groupData, roles])
  // const handleOpenGroups = (e: any) => {
  //   e.preventDefault()
  //   setGroupOpen(true)
  // }
  // const handleCloseGroups = (e: any) => {
  //   e.preventDefault()
  //   setGroupInput(groups)
  //   setGroupOpen(false)
  // }
  // const updateGroups = () => {
  //   setGroups(groupInput)
  //   setGroupOpen(false)
  // }

  const handleGroupsInput = (selected: any) => {
    setIsPageModified(true)
    setGroupInput(selected)
    if (selected.length > 0) setErrorGroups('')
  }
  const groupSelect = (
    <Select
      // options={groupTypes}
      options={groupData}
      isMulti
      ref={focusGroup}
      onChange={handleGroupsInput}
      components={{
        Option,
      }}
      value={groupInput}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      className={classes.multiSelect}
      styles={customStyles}
      isDisabled={
        UtilityFunctions.isHidden(
          '8',
          appFuncList ? appFuncList : [],
          groupAccess
        )
          ? true
          : false
      }
    />
  )
  // const viewGroups = (
  //   <Dialog onClose={handleCloseGroups} open={groupOpen}>
  //     <Box
  //       sx={{
  //         height: 450,
  //         // width: dialogwidth,
  //         width: 'auto',
  //         p: 2,
  //         display: 'flex',
  //         flexDirection: 'column',
  //         justifyContent: 'space-between',
  //       }}
  //     >
  //       <Box
  //         // className={classes.inputFieldBox}
  //         className={classes.inputFieldBoxPop}
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             display: 'flex',
  //             height: 30,
  //             flexDirection: 'row',
  //           }}
  //           className={classes.viewLogTitle}
  //         >
  //           <Box
  //             sx={{
  //               display: 'flex',
  //               flexGrow: 1,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <Typography variant="subtitle1">Add Groups</Typography>
  //           </Box>
  //           <Box
  //             sx={{
  //               paddingRight: 2,
  //             }}
  //           >
  //             <button
  //               type="button"
  //               style={{
  //                 border: 0,
  //                 padding: 0,
  //                 height: 22,
  //                 width: 22,
  //               }}
  //               className={classes.closeViewLog}
  //               onClick={handleCloseGroups}
  //             >
  //               <b>X</b>
  //             </button>
  //           </Box>
  //         </Box>
  //         <Box
  //           sx={{
  //             alignItems: 'flex-start',
  //             marginTop: '30px',
  //           }}
  //         >
  //           <Select
  //             options={groupData}
  //             isMulti
  //             onChange={handleGroupsInput}
  //             components={{
  //               Option,
  //             }}
  //             value={groupInput}
  //             closeMenuOnSelect={false}
  //             hideSelectedOptions={false}
  //             className={classes.multiSelect}
  //             styles={customStyles}
  //             isDisabled={
  //               UtilityFunctions.isHidden(
  //                 '8',
  //                 appFuncList ? appFuncList : [],
  //                 groupAccess
  //               )
  //                 ? true
  //                 : false
  //             }
  //           />
  //         </Box>
  //       </Box>
  //       <Box
  //         sx={{
  //           display: 'flex',
  //           justifyContent: 'end',
  //         }}
  //         // className={classes.inputFieldBox}
  //         className={classes.inputFieldBoxPop}
  //       >
  //         <Button
  //           // type="submit"
  //           variant="contained"
  //           color="primary"
  //           onClick={updateGroups}
  //           disabled={
  //             UtilityFunctions.isHidden(
  //               '8',
  //               appFuncList ? appFuncList : [],
  //               groupAccess
  //             )
  //               ? true
  //               : false
  //           }
  //         >
  //           Save
  //         </Button>
  //       </Box>
  //     </Box>
  //   </Dialog>
  // )
  const handleOpenTasks = (e: any) => {
    console.log('open task')
    e.preventDefault()
    setTaskOpen(true)
  }
  const handleCloseTasks = (e: any) => {
    e.preventDefault()
    console.log('close')
    setTaskOpen(false)
  }

  const unAssignTasks = () => {
    let _tasks = tasks.filter((value) => !taskSelected.includes(value))
    setTasks(_tasks)
    setTaskSelected('')
    setTaskOpen(false)
  }

  const manageTasks = (
    <Dialog onClose={handleCloseTasks} open={taskOpen}>
      <Box
        sx={{
          height: 500,
          // width: dialogwidth,
          width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          // className={classes.inputFieldBox}
          className={classes.inputFieldBoxPop}
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: 30,
              flexDirection: 'row',
            }}
            className={classes.viewLogTitle}
          >
            <Box
              sx={{
                display: 'flex',
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="subtitle1">Manage Tasks</Typography>
            </Box>
            <Box
              sx={{
                paddingRight: 2,
              }}
            >
              <button
                type="button"
                style={{
                  border: 0,
                  padding: 0,
                  height: 22,
                  width: 22,
                }}
                className={classes.closeViewLog}
                onClick={handleCloseTasks}
              >
                <b>X</b>
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '50px',
            }}
          >
            <DataTable
              value={tasks}
              selection={taskSelected}
              onSelectionChange={(e) => setTaskSelected(e.value)}
              className="p-datatable-sm"
              showGridlines
              scrollable
              scrollHeight="flex"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{
                  width: '40px',
                  backgroundColor: teal[900],
                  color: 'white',
                }}
              ></Column>
              <Column
                field="label"
                header="Task"
                headerStyle={{
                  // width: "40px",
                  backgroundColor: teal[900],
                  color: 'white',
                }}
              >
                Tasks
              </Column>
              <Column
                field="count"
                header="Count"
                headerStyle={{
                  // width: "40px",
                  backgroundColor: teal[900],
                  color: 'white',
                }}
              >
                Count
              </Column>
            </DataTable>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            type="button"
            className={classes.whiteButton}
            onClick={unAssignTasks}
            disabled={!taskSelected || !taskSelected.length}
          >
            Unassign
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
  const handleOpenViewLog = (e: any) => {
    if (viewLogRows.length > 0) setViewLogEl(e.currentTarget)
  }
  const handleCloseViewLog = () => {
    setViewLogEl(false)
  }

  const attachmentTemplate = (rowData: any) => {
    let values = []
    if (rowData.attachmentUrl) {
      const urls = rowData.attachmentUrl.split('#!#')
      for (let i = 0; i < urls.length; i++) {
        const namepart = urls[i].substr(urls[i].lastIndexOf('/') + 1)
        const part = namepart.split('-', 2).join('-').length
        values.push({
          name: namepart.substr(part + 1),
          data: urls[i],
        })
      }
    }
    // return rowData.attachmentUrl ? (
    //   <a
    //     href={rowData.attachmentUrl}
    //     target="popup"
    //     className={classes.backButton}
    //   >
    //     <AttachFileIcon fontSize="small" />
    //   </a>
    // ) : (
    //   rowData.attachmentUrl
    // )
    return rowData.attachmentUrl ? (
      <div>
        {values.map((item) => (
          <div key={item.name}>
            &#8226;{'  '}
            <a href={item.data} target="popup" className={classes.attachIcon}>
              {item.name}
            </a>
          </div>
        ))}
      </div>
    ) : (
      rowData.attachmentUrl
    )
  }

  const viewAdditionalInfo = (
    <Dialog
      open={openAdditional}
      onClose={() => {
        setOpenAdditional((prevState) => !prevState)
      }}
      fullWidth={true}
      // maxWidth={false}
      classes={{ paperScrollPaper: classes.customMaxWidth }}
    >
      <Box
        sx={{
          // width: fieldWidth,
          // border: '3px solid green',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            flexGrow: 1,
            // width: fieldWidth,
            justifyContent: 'center',
          }}
          className={classes.viewLogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Additional Data</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              type="button"
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={() => {
                setOpenAdditional((prevState) => !prevState)
              }}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
          }}
        ></Box>
        <Box
          sx={{
            // justifyContent: "center",
            display: 'flex',
            // width: fieldWidth,
            // textAlign: "center"
          }}
        >
          <DataTable
            value={
              // additionalInfo ? constants.getAdditionalInfo(additionalInfo) : []
              colleagueData
                ? constants.getColleagueDetails(colleagueData)
                : additionalInfo
                ? constants.getAdditionalInfo(additionalInfo)
                : []
            }
            // paginator
            // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rows={1}
            style={{
              fontSize: '12px',
              //backgroundColor: "#f7f7f7",
              width: '100%',
            }}
            showGridlines
            className={`p-datatable-sm ${classes.viewlogTable}`}
            // className={classes.viewlogTable}
            scrollable
            scrollHeight="flex"
          >
            {constants.getAdditionalInfoHeader.map((column: any) => {
              return (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.headerName}
                  bodyStyle={{
                    fontSize: '12px',
                    width: column.width,
                    overflowX: 'auto',
                    height: '100px',
                  }}
                  headerStyle={{
                    fontSize: '12px',
                    width: column.width,
                    backgroundColor: teal[900],
                    color: 'white',
                  }}
                ></Column>
              )
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  )

  const viewLog = (
    <Dialog
      open={viewLogOpen}
      onClose={handleCloseViewLog}
      fullWidth={true}
      // maxWidth={false}
      classes={{ paperScrollPaper: classes.customMaxWidth }}
    >
      <Box
        sx={{
          // width: dialogwidth,
          // border: '3px solid green',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            flexGrow: 1,
            // width: fieldWidth,
            justifyContent: 'center',
          }}
          className={classes.viewLogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Logs</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              type="button"
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={handleCloseViewLog}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 2,
          }}
        >
          <Typography variant="body2" style={{ overflowX: 'auto' }}>
            Request ID:<b> {requestedId}</b>
            {/* Request ID:<b> {taskId}</b> */}
          </Typography>
        </Box>
        <Box
          sx={{
            // justifyContent: "center",
            display: 'flex',

            // textAlign: "center"
          }}
        >
          <DataTable
            value={viewLogRows}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} of {totalRecords}"
            rows={5}
            style={{
              fontSize: '12px',
              // backgroundColor: '#f7f7f7',
              width: '100%',
            }}
            className={`p-datatable-sm ${classes.viewlogTable}`}
            scrollable
            scrollHeight="flex"
          >
            {constants.viewLogColumns.map((column) => {
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
                  body={column.field === 'attachmentUrl' && attachmentTemplate}
                ></Column>
              )
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  )
  const handleCancelApprove = (e: any) => {
    // let text = 'are you really want to go back? All your Data will be lost.'
    // if (window.confirm(text) === true) {
    //   history.goBack()
    // }
    e.preventDefault()
    setCancelOpenApprove((p) => !p)
  }

  const handleCancelSubmit = (e: any) => {
    // let text = 'are you really want to go back? All your Data will be lost.'
    // if (window.confirm(text) === true) {
    //   history.goBack()
    // }
    e.preventDefault()
    setCancelOpenSubmit((p) => !p)
  }

  const handleBack = (e: any) => {
    e.preventDefault()
    setBack((p) => !p)
  }

  const handleCancelReassign = (e: any) => {
    // let text = 'are you really want to go back? All your Data will be lost.'
    // if (window.confirm(text) === true) {
    //   history.goBack()
    // }
    e.preventDefault()
    setCancelOpenReassign((p) => !p)
  }

  const handleCancelReject = (e: any) => {
    // let text = 'are you really want to go back? All your Data will be lost.'
    // if (window.confirm(text) === true) {
    //   history.goBack()
    // }
    e.preventDefault()
    setCancelOpenReject((p) => !p)
  }

  const checkForm = (btnName: string) => {
    let flag = 1
    if (errorRequestType !== '') {
      focusRequestType.current.focus()
      flag = 0
    }
    if (errorStatus !== '') {
      focusStatus.current.focus()
      flag = 0
    }
    if (errorEffectiveDate !== '') {
      // if (
      //   btnName === 'reject'

      // ) {
      // } else {
      //   focusEffectiveDate.current.focus()
      //   flag = 0
      // }
      focusEffectiveDate.current.focus()
      flag = 0
    }
    if (
      requestType !== 'new' &&
      requestType !== 'modify' &&
      requestType !== 'remove'
    ) {
      focusRequestType.current.focus()
      setErrorRequestType(allMessages.error.noRequestType)
      flag = 0
    }
    if (employeeID === '') {
      focusEmpId.current.focus()
      setErrorEmployeeId(allMessages.error.noEmployeeId)
      flag = 0
    }
    if (status === '') {
      focusStatus.current.focus()
      setErrorStatus(allMessages.error.noStatus)
      flag = 0
    }
    if (roleNames.length === 0) {
      if (
        btnName === 'reject'
        // &&
        // requestorRoles
        //   .map((item: any) => item.roleId)
        //   .toString()
        //   .includes('JML')
      ) {
      } else {
        focusRole.current.focus()
        setErrorRoles(allMessages.error.noRoles)
        flag = 0
      }
    }
    if (groupInput.length === 0) {
      // if (groups.length === 0) {
      if (
        btnName === 'reject'
        // &&
        // requestorRoles
        //   .map((item: any) => item.roleId)
        //   .toString()
        //   .includes('JML')
      ) {
      } else {
        focusGroup.current.focus()
        setErrorGroups(allMessages.error.noGroups)
        flag = 0
      }
    }
    if (btnName === 'reassign' && flag === 1) {
      setIsProgressLoader(true)
      setDisabled(true)
      requestorUserId &&
        getUserIdAPI &&
        getUserIdAPI(requestorUserId)
          .then((res: any) => {
            setErrorReassign(allMessages.error.errorReassign)
            setIsProgressLoader(false)
            setDisabled(false)
            window.scrollTo(0, 0)
          })
          .catch((err: any) => {
            setErrorReassign('')
            setIsProgressLoader(false)
            setDisabled(false)
            setCancelOpenReassign(true)
          })
    }
    if (flag === 1 && btnName === 'approve') {
      setCancelOpenApprove(true)
    } else if (flag === 1 && btnName === 'submit') {
      setCancelOpenSubmit(true)
    } else if (flag === 1 && btnName === 'reject') {
      setCancelOpenReject(true)
    }
    if (flag === 0 && btnName !== 'reassign') {
      window.scrollTo(0, 0)
    }
  }
  const handleApproveAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('approve')
    // canSubmit && shoutOut === '' && setCancelOpenApprove(true)
  }
  const handleBackAfterDialog = (e: any) => {
    e.preventDefault()
    setBack(true)
  }

  const handleSubmitAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('submit')
    // canSubmit && shoutOut === '' && setCancelOpenSubmit(true)
  }

  const handleReassignAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('reassign')
  }

  const handleRejectAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('reject')
  }

  const handleUpdateUserforApprove = () => {
    setIsProgressLoader(true)
    setDisabled(true)
    const formData = {
      camunda: {
        submitFlag: 'Approved',
        requestorDetails: {
          emailId: userDetail && userDetail.userdetails[0].user.emailId,
          requestBy: userDetail && userDetail.userdetails[0].user.userId,
          requestDate: new Date().toISOString().split('T')[0],
          // requestedDate: new Date().toISOString().split('T')[0],
          requestType: requestType,
        },
        requestorRoles:
          userDetail &&
          userDetail.userdetails[0].roles.map((role: any) => {
            return {
              roleId: role.roleId,
            }
          }),
      },
      user: {
        employeeId: employeeID,
        // EmployeeId: employeeID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId: email,
        additionalInfo: '',
        // colleagueData !== '' ? colleaguestring : additionalInfo,
        designation: designation.toUpperCase(),
        status: status,
      },
      roles: roleNames
        ? roleNames.map((role: any) => {
            return {
              roleId: role.value,
            }
          })
        : [],
      usergroups: groupInput
        ? groupInput.map((group: any) => {
            return {
              groupId: group.value,
              status: group.status,
            }
          })
        : [],
      // usergroups: groups
      //   ? groups.map((group: any) => {
      //       return {
      //         groupId: group.value,
      //         status: group.status,
      //       }
      //     })
      //   : [],
    }
    setReturnText('')
    userDetail &&
      putUserDetailsCamundaAPI(formData)
        .then((res) => {
          console.log(res)
          setReturnText(`${res.data.comments} with ID ${res.data.requestId}`)
          if (navigator.clipboard) {
            navigator.clipboard.writeText(res.data.requestId)
          }
          const rolelog =
            userDetail &&
            userDetail.userdetails[0].roles
              .map((role: any) => role.roleId)
              .join(',')
          console.log(rolelog)
          const time = new Date().toISOString()
          const datepart = time.split('T')[0]
          const timepart = time.split('T')[1].split('.')[0]
          const logData = {
            // requestId: userDetail && userDetail.userdetails[0].user.userId,
            requestId: res.data.requestId,
            // timestamp: `${datepart} ${timepart}`,
            timestamp: `${datepart}`,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            role: rolelog,
            camundaRequestId: res.data.businessKey ? res.data.businessKey : '',
            actionTaken: 'Approved',
            comments: comments,
            attachmentUrl: null,
          }
          setLogDataIn({ ...logData })
          if (referenceDocData.length > 0) {
            setFailureCount(referenceDocData.length)
            setCheckCount(referenceDocData.length)
            referenceDocData.map((rf) => {
              const formdata1 = new FormData()
              formdata1.append('fileIn', rf.data)
              userDetail &&
                postFileAttachmentAPI &&
                postFileAttachmentAPI(formdata1, employeeID)
                  .then((res) => {
                    // logData.attachmentUrl = res.data.attachmentUrl
                    setAttachmentUrlArr((prevState) => [
                      ...prevState,
                      res.data.attachmentUrl,
                    ])
                    setFailureCount((prevState) => prevState - 1)
                    setCheckCount((prevState) => prevState - 1)
                    // postTasklog(logData)
                  })
                  .catch((err) => {
                    setCheckCount((prevState) => prevState - 1)
                  })
              return null
            })
          } else {
            setFailureCount(1)
            setCheckCount(1)
            postTasklog(logData)
          }
        })
        .catch((err) => {
          setDisabled(false)
          setIsProgressLoader(false)
          console.log(err.response)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            //detail: `${err.response.status} from userdetailapi`,
            detail: err.response.data.errorMessage,
            // detail: `${err.response.data.errorMessage} ${statusCode}`,
            life: life,
            className: 'login-toast',
          })
          //history.push('/commercial-webapp/dashboard')
        })
  }

  const handleUpdateUserforSubmit = () => {
    setDisabled(true)
    setIsProgressLoader(true)
    // const formData = {
    //   requestorDetails: {
    //     emailId: userDetail && userDetail.userdetails[0].user.emailId,
    //     requestBy: userDetail && userDetail.userdetails[0].user.userId,
    //     requestDate: new Date().toISOString().split('T')[0],
    //     requestType: 'Approve',
    //   },
    //   requestorRoles:
    //     userDetail &&
    //     userDetail.userdetails[0].roles.map((role: any) => {
    //       return {
    //         roleId: role.roleId,
    //       }
    //     }),
    // }
    const formData = {
      routing: 'moreinfo',
      camunda: {
        requestorDetails: {
          emailId: userDetail && userDetail.userdetails[0].user.emailId,
          requestBy: userDetail && userDetail.userdetails[0].user.userId,
          requestorName:
            userDetail &&
            userDetail.userdetails[0].user.middleName &&
            userDetail.userdetails[0].user.middleName !== ''
              ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
              : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
          requestDate: new Date().toISOString().split('T')[0],
          requestType: requestType,
          comments: comments,
        },
        requestorRoles:
          userDetail &&
          userDetail.userdetails[0].roles.map((role: any) => {
            return {
              roleId: role.roleId,
            }
          }),
      },
      effectiveDate: effectiveDate,
      user: {
        employeeId: employeeID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId: email,
        additionalInfo: '',
        // colleagueData !== '' ? colleaguestring : additionalInfo,
        designation: designation.toUpperCase(),
        status: status,
      },
      roles: roleNames
        ? roleNames.map((role: any) => {
            return {
              roleId: role.value,
            }
          })
        : [],
      usergroups: groupInput
        ? groupInput.map((group: any) => {
            return {
              groupId: group.value,
              status: group.status,
            }
          })
        : [],
      // usergroups: groups
      //   ? groups.map((group: any) => {
      //       return {
      //         groupId: group.value,
      //         status: group.status,
      //       }
      //     })
      //   : [],
    }
    setReturnText('')
    pendingActionDetails &&
      putCompleteTaskAPI &&
      putCompleteTaskAPI(formData, pendingActionDetails[0].taskId)
        .then((res) => {
          console.log(res)
          setIsSuccessCall(false)
          setReturnText(res.data.status)
          const rolelog =
            userDetail &&
            userDetail.userdetails[0].roles
              .map((role: any) => role.roleId)
              .join(',')
          const time = new Date().toISOString()
          const datepart = time.split('T')[0]
          const timepart = time.split('T')[1].split('.')[0]
          const logData = {
            // requestId: userDetail && userDetail.userdetails[0].user.userId,
            requestId: pendingActionDetails[0].requestId,
            // timestamp: `${datepart} ${timepart}`,
            timestamp: `${datepart}`,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            role: rolelog,
            camundaRequestId: pendingActionDetails[0].businessKey,
            actionTaken: 'Submitted',
            comments: comments,
            attachmentUrl: null,
          }
          setLogDataIn({ ...logData })
          if (referenceDocData.length > 0) {
            setFailureCount(referenceDocData.length)
            setCheckCount(referenceDocData.length)
            referenceDocData.map((rf) => {
              const formdata1 = new FormData()
              formdata1.append('fileIn', rf.data)
              userDetail &&
                postFileAttachmentAPI &&
                postFileAttachmentAPI(formdata1, employeeID)
                  .then((res) => {
                    setAttachmentUrlArr((prevState) => [
                      ...prevState,
                      res.data.attachmentUrl,
                    ])
                    setFailureCount((prevState) => prevState - 1)
                    setCheckCount((prevState) => prevState - 1)
                  })
                  .catch((err) => {
                    setCheckCount((prevState) => prevState - 1)
                  })
              return null
            })
          } else {
            setFailureCount(1)
            setCheckCount(1)
            postTasklog(logData)
          }
        })
        .catch((err) => {
          setDisabled(false)
          setIsProgressLoader(false)
          setIsSuccessCall(false)
          console.log(err.response)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            //detail: `${err.response.status} from userdetailapi`,
            detail: err.response.data.errorMessage,
            // detail: `${err.response.data.errorMessage} ${statusCode}`,
            life: life,
            className: 'login-toast',
          })
          //history.push('/commercial-webapp/dashboard')
        })
  }

  const handleApprove = () => {
    setDisabled(true)
    setIsProgressLoader(true)
    // const formData = {
    //   requestorDetails: {
    //     emailId: userDetail && userDetail.userdetails[0].user.emailId,
    //     requestBy: userDetail && userDetail.userdetails[0].user.userId,
    //     requestDate: new Date().toISOString().split('T')[0],
    //     requestType: 'Approve',
    //   },
    //   requestorRoles:
    //     userDetail &&
    //     userDetail.userdetails[0].roles.map((role: any) => {
    //       return {
    //         roleId: role.roleId,
    //       }
    //     }),
    // }
    const formData = {
      routing: 'Approved',
      camunda: {
        requestorDetails: {
          emailId: userDetail && userDetail.userdetails[0].user.emailId,
          requestBy: userDetail && userDetail.userdetails[0].user.userId,
          requestorName:
            userDetail &&
            userDetail.userdetails[0].user.middleName &&
            userDetail.userdetails[0].user.middleName !== ''
              ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
              : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
          requestDate: new Date().toISOString().split('T')[0],
          requestType: requestType,
          comments: comments,
        },
        requestorRoles:
          userDetail &&
          userDetail.userdetails[0].roles.map((role: any) => {
            return {
              roleId: role.roleId,
            }
          }),
      },
      effectiveDate: effectiveDate,
      user: {
        employeeId: employeeID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId: email,
        additionalInfo: '',
        designation: designation.toUpperCase(),
        status: status,
      },
      roles: roleNames
        ? roleNames.map((role: any) => {
            return {
              roleId: role.value,
            }
          })
        : [],
      usergroups: groupInput
        ? groupInput.map((group: any) => {
            return {
              groupId: group.value,
              status: group.status,
            }
          })
        : [],
      // usergroups: groups
      //   ? groups.map((group: any) => {
      //       return {
      //         groupId: group.value,
      //         status: group.status,
      //       }
      //     })
      //   : [],
    }
    setReturnText('')
    pendingActionDetails &&
      putCompleteTaskAPI &&
      putCompleteTaskAPI(formData, pendingActionDetails[0].taskId)
        .then((res) => {
          console.log(res)
          setIsSuccessCall(false)
          setReturnText(res.data.status)
          const rolelog =
            userDetail &&
            userDetail.userdetails[0].roles
              .map((role: any) => role.roleId)
              .join(',')
          const time = new Date().toISOString()
          const datepart = time.split('T')[0]
          const timepart = time.split('T')[1].split('.')[0]
          const logData = {
            // requestId: userDetail && userDetail.userdetails[0].user.userId,
            requestId: pendingActionDetails[0].requestId,
            // timestamp: `${datepart} ${timepart}`,
            timestamp: `${datepart}`,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            role: rolelog,
            camundaRequestId: pendingActionDetails[0].businessKey,
            actionTaken: 'Approved',
            comments: comments,
            attachmentUrl: null,
          }
          setLogDataIn({ ...logData })
          if (referenceDocData.length > 0) {
            setFailureCount(referenceDocData.length)
            setCheckCount(referenceDocData.length)
            referenceDocData.map((rf) => {
              const formdata1 = new FormData()
              formdata1.append('fileIn', rf.data)
              userDetail &&
                postFileAttachmentAPI &&
                postFileAttachmentAPI(formdata1, employeeID)
                  .then((res) => {
                    // logData.attachmentUrl = res.data.attachmentUrl
                    setAttachmentUrlArr((prevState) => [
                      ...prevState,
                      res.data.attachmentUrl,
                    ])
                    setFailureCount((prevState) => prevState - 1)
                    setCheckCount((prevState) => prevState - 1)
                    // postTasklog(logData)
                  })
                  .catch((err) => {
                    setCheckCount((prevState) => prevState - 1)
                  })
              return null
            })
          } else {
            setFailureCount(1)
            setCheckCount(1)
            postTasklog(logData)
          }
        })
        .catch((err) => {
          setDisabled(false)
          setIsProgressLoader(false)
          setIsSuccessCall(false)
          console.log(err.response)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            //detail: `${err.response.status} from RejectTaskAPI`,
            detail: err.response.data.errorMessage,
            // detail: `${err.response.data.errorMessage} ${statusCode}`,
            life: life,
            className: 'login-toast',
          })
        })
  }

  const handleReassign = () => {
    // e.preventDefault()
    setIsProgressLoader(true)
    setDisabled(true)
    const formData = {
      requestorDetails: {
        //emailId: userDetail && userDetail.userdetails[0].user.emailId,
        emailId: requestorEmailId,
        //requestBy: userDetail && userDetail.userdetails[0].user.userId,
        requestBy: requestorUserId,
        requestorName: requestorName,
        requestDate: new Date().toISOString().split('T')[0],
        // requestType: requestType,
        requestType: 'moreinfo',
      },
      // requestorRoles:
      //   userDetail &&
      //   userDetail.userdetails[0].roles.map((role: any) => {
      //     return {
      //       roleId: role.roleId,
      //     }
      //   }),
      requestorRoles: requestorRoles,
      // submitFlag: 'Reassign',
    }
    console.log(formData)
    setReturnText('')
    pendingActionDetails &&
      putClaimTaskAPI &&
      putClaimTaskAPI(formData, pendingActionDetails[0].taskId)
        // putClaimTaskAPI(formData, `${pendingActionDetails[0].taskId}moreinfo`)
        .then((res) => {
          console.log(res)
          // setIsSuccessCall(false)
          setReturnText(res.data.comments)
          // const formData2 = {
          //   requestorDetails: {
          //     emailId: userDetail && userDetail.userdetails[0].user.emailId,
          //     requestBy: userDetail && userDetail.userdetails[0].user.userId,
          //     requestDate: new Date().toISOString().split('T')[0],
          //     requestType: 'Approve',
          //   },
          //   requestorRoles:
          //     userDetail &&
          //     userDetail.userdetails[0].roles.map((role: any) => {
          //       return {
          //         roleId: role.roleId,
          //       }
          //     }),
          // }
          const formData2 = {
            routing: 'Approved',
            camunda: {
              requestorDetails: {
                emailId: userDetail && userDetail.userdetails[0].user.emailId,
                requestBy: userDetail && userDetail.userdetails[0].user.userId,
                requestorName:
                  userDetail &&
                  userDetail.userdetails[0].user.middleName &&
                  userDetail.userdetails[0].user.middleName !== ''
                    ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                    : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
                requestDate: new Date().toISOString().split('T')[0],
                requestType: requestType,
                comments: comments,
              },
              requestorRoles:
                userDetail &&
                userDetail.userdetails[0].roles.map((role: any) => {
                  return {
                    roleId: role.roleId,
                  }
                }),
            },
            effectiveDate: effectiveDate,
            user: {
              employeeId: employeeID,
              firstName: firstName,
              middleName: middleName,
              lastName: lastName,
              emailId: email,
              additionalInfo: '',
              designation: designation.toUpperCase(),
              status: status,
            },
            roles: roleNames
              ? roleNames.map((role: any) => {
                  return {
                    roleId: role.value,
                  }
                })
              : [],
            // usergroups: groupInput
            //   ? groupInput.map((group: any) => {
            //       return {
            //         groupId: group.value,
            //         status: group.status,
            //       }
            //     })
            //   : [],
            usergroups: groupInput
              ? groupInput.map((group: any) => {
                  return {
                    groupId: group.value,
                    status: group.status,
                  }
                })
              : [],
          }
          pendingActionDetails &&
            putCompleteTaskAPI &&
            putCompleteTaskAPI(formData2, pendingActionDetails[0].taskId)
              .then((res: any) => {
                setIsSuccessCall(false)
                // setReturnText(res.data.comments)
                const rolelog =
                  userDetail &&
                  userDetail.userdetails[0].roles
                    .map((role: any) => role.roleId)
                    .join(',')
                const time = new Date().toISOString()
                const datepart = time.split('T')[0]
                const timepart = time.split('T')[1].split('.')[0]
                const logData = {
                  // requestId: userDetail && userDetail.userdetails[0].user.userId,
                  requestId: pendingActionDetails[0].requestId,
                  // timestamp: `${datepart} ${timepart}`,
                  timestamp: `${datepart}`,
                  userId: userDetail && userDetail.userdetails[0].user.userId,
                  role: rolelog,
                  camundaRequestId: pendingActionDetails[0].businessKey,
                  actionTaken: 'Reassigned',
                  comments: comments,
                  attachmentUrl: null,
                }
                setLogDataIn({ ...logData })
                if (referenceDocData.length > 0) {
                  setFailureCount(referenceDocData.length)
                  setCheckCount(referenceDocData.length)
                  referenceDocData.map((rf) => {
                    const formdata1 = new FormData()
                    formdata1.append('fileIn', rf.data)
                    userDetail &&
                      postFileAttachmentAPI &&
                      postFileAttachmentAPI(formdata1, employeeID)
                        .then((res) => {
                          setAttachmentUrlArr((prevState) => [
                            ...prevState,
                            res.data.attachmentUrl,
                          ])
                          setFailureCount((prevState) => prevState - 1)
                          setCheckCount((prevState) => prevState - 1)
                        })
                        .catch((err) => {
                          setCheckCount((prevState) => prevState - 1)
                        })
                    return null
                  })
                } else {
                  setFailureCount(1)
                  setCheckCount(1)
                  postTasklog(logData)
                }
              })
              .catch((err: any) => {
                setDisabled(false)
                setIsProgressLoader(false)
                setIsSuccessCall(false)
                toast.current.show({
                  severity: 'error',
                  summary: 'Error!',
                  detail: `${err.response.data.errorMessage} while Reassigning task`,
                  life: life,
                  className: 'login-toast',
                })
              })
        })
        .catch((err) => {
          setDisabled(false)
          setIsProgressLoader(false)
          setIsSuccessCall(false)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            // detail: `${err.response.status} from RejectTaskAPI`,
            detail: err.response.data.errorMessage,
            // detail: `${err.response.data.errorMessage} ${statusCode}`,
            life: life,
            className: 'login-toast',
          })
        })
  }

  const handleReject = () => {
    // e.preventDefault()
    setDisabled(true)
    setIsProgressLoader(true)
    // const formData = {
    //   // requestorDetails: {
    //   requestorDetails: {
    //     emailId: userDetail && userDetail.userdetails[0].user.emailId,
    //     requestBy: userDetail && userDetail.userdetails[0].user.userId,
    //     requestDate: new Date().toISOString().split('T')[0],
    //     requestType: 'Reject',
    //   },
    //   requestorRoles:
    //     userDetail &&
    //     userDetail.userdetails[0].roles.map((role: any) => {
    //       return {
    //         roleId: role.roleId,
    //       }
    //     }),
    //   // },
    //   taskId: pendingActionDetails[0].taskId,
    // }
    const formData = {
      routing: 'Rejected',
      camunda: {
        requestorDetails: {
          emailId: userDetail && userDetail.userdetails[0].user.emailId,
          requestBy: userDetail && userDetail.userdetails[0].user.userId,
          requestorName:
            userDetail &&
            userDetail.userdetails[0].user.middleName &&
            userDetail.userdetails[0].user.middleName !== ''
              ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
              : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
          requestDate: new Date().toISOString().split('T')[0],
          requestType: requestType,
          comments: comments,
        },
        requestorRoles:
          userDetail &&
          userDetail.userdetails[0].roles.map((role: any) => {
            return {
              roleId: role.roleId,
            }
          }),
      },
      effectiveDate: effectiveDate ? effectiveDate : '',
      user: {
        employeeId: employeeID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId: email,
        additionalInfo: '',
        // colleagueData !== '' ? colleaguestring : additionalInfo,
        designation: designation.toUpperCase(),
        status: status,
      },
      roles: roleNames
        ? roleNames.map((role: any) => {
            return {
              roleId: role.value,
            }
          })
        : [],
      // usergroups: groupInput
      //   ? groupInput.map((group: any) => {
      //       return {
      //         groupId: group.value,
      //         status: group.status,
      //       }
      //     })
      //   : [],
      usergroups: groupInput
        ? groupInput.map((group: any) => {
            return {
              groupId: group.value,
              status: group.status,
            }
          })
        : [],
    }
    setReturnText('')
    pendingActionDetails &&
      // putRejectTaskAPI &&
      // putRejectTaskAPI(formData, pendingActionDetails[0].businessKey)
      putCompleteTaskAPI &&
      putCompleteTaskAPI(formData, pendingActionDetails[0].taskId)
        .then((res) => {
          console.log(res)
          setIsSuccessCall(false)
          setReturnText(res.data.status)
          const rolelog =
            userDetail &&
            userDetail.userdetails[0].roles
              .map((role: any) => role.roleId)
              .join(',')
          const time = new Date().toISOString()
          const datepart = time.split('T')[0]
          const timepart = time.split('T')[1].split('.')[0]
          const logData = {
            // requestId: userDetail && userDetail.userdetails[0].user.userId,
            requestId: pendingActionDetails[0].requestId,
            // timestamp: `${datepart} ${timepart}`,
            timestamp: `${datepart}`,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            role: rolelog,
            camundaRequestId: pendingActionDetails[0].businessKey,
            actionTaken: 'Rejected',
            comments: comments,
            attachmentUrl: null,
          }
          setLogDataIn({ ...logData })
          if (referenceDocData.length > 0) {
            setFailureCount(referenceDocData.length)
            setCheckCount(referenceDocData.length)
            referenceDocData.map((rf) => {
              const formdata1 = new FormData()
              formdata1.append('fileIn', rf.data)
              userDetail &&
                postFileAttachmentAPI &&
                postFileAttachmentAPI(formdata1, employeeID)
                  .then((res) => {
                    // logData.attachmentUrl = res.data.attachmentUrl
                    setAttachmentUrlArr((prevState) => [
                      ...prevState,
                      res.data.attachmentUrl,
                    ])
                    setFailureCount((prevState) => prevState - 1)
                    setCheckCount((prevState) => prevState - 1)
                    // postTasklog(logData)
                  })
                  .catch((err) => {
                    setCheckCount((prevState) => prevState - 1)
                  })
              return null
            })
          } else {
            setFailureCount(1)
            setCheckCount(1)
            postTasklog(logData)
          }
        })
        .catch((err) => {
          setDisabled(false)
          setIsProgressLoader(false)
          setIsSuccessCall(false)
          console.log(err.response)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            //detail: `${err.response.status} from RejectTaskAPI`,
            detail: err.response.data.errorMessage,
            // detail: `${err.response.data.errorMessage} ${statusCode}`,
            life: life,
            className: 'login-toast',
          })
        })
  }

  const viewConfirmApprove = (
    <ConfirmBox
      cancelOpen={cancelOpenApprove}
      handleCancel={handleCancelApprove}
      // handleProceed={handleUpdateUserforApprove}
      handleProceed={handleApprove}
      label1="Are you sure to Approve?"
      label2="Please click Ok to proceed"
    />
  )

  const viewConfirmSubmit = (
    <ConfirmBox
      cancelOpen={cancelOpenSubmit}
      handleCancel={handleCancelSubmit}
      handleProceed={handleUpdateUserforSubmit}
      label1="Are you sure to Submit?"
      label2="Please click Ok to proceed"
    />
  )

  const viewConfirmBack = (
    <ConfirmBox
      cancelOpen={back}
      handleCancel={handleBack}
      handleProceed={goBack}
      label1="Sure to go Back?"
      label2="All your data will be lost"
    />
  )

  const viewConfirmReassign = (
    <ConfirmBox
      cancelOpen={cancelOpenReassign}
      handleCancel={handleCancelReassign}
      handleProceed={handleReassign}
      label1="Are you sure to Reassign?"
      label2="Please click Ok to proceed"
    />
  )

  const viewConfirmReject = (
    <ConfirmBox
      cancelOpen={cancelOpenReject}
      handleCancel={handleCancelReject}
      handleProceed={handleReject}
      label1="Are you sure to Reject?"
      label2="Please click Ok to proceed"
    />
  )

  const createForm = (
    <Box
      className="createRequest"
      sx={{
        flexDirection: 'column',
        display: 'flex',
        p: 2,
        paddingLeft: '40px',
        paddingRight: '30px',
        // [theme.breakpoints.up("sm")]: {
        //   paddingLeft: 30,
        //   paddingRight: 30,
        // },
        // [theme.breakpoints.down("sm")]: {
        //   paddingLeft: 10,
        //   paddingRight: 20,
        // },
        textAlign: 'left',
        // width: width ? 700 : fieldWidth,
      }}
    >
      <div className="createRequestContainer">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            // [theme.breakpoints.up("sm")]: {
            //   flexDirection: "row",
            // },
            // [theme.breakpoints.down("sm")]: {
            //   flexDirection: "column",
            // },
            // paddingBottom: '20px',
            // paddingTop: '10px',
            // width: fieldWidth
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">My Task {'>'} Pending-</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                paddingLeft: 5,
              }}
            >
              <button
                type="button"
                className={classes.backButton}
                onClick={handleOpenViewLog}
                disabled={viewLogRows.length > 0 ? false : true}
              >
                <span className="addUserGroup univPadding">
                  {' '}
                  View Log ({viewLogRows.length})
                </span>
              </button>
            </Box>
            <Box
              sx={{
                paddingLeft: 5,
              }}
            >
              {' '}
            </Box>
            <Box
              sx={{
                paddingLeft: 5,
              }}
            >
              <button
                //className={classes.backButton}
                className="backButton"
                onClick={goBack}
                // onClick={handleBackAfterDialog}
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
        <Box sx={{ overflow: 'auto' }} className={classes.inputLabelHead}>
          <Typography variant="subtitle1">{requestedId}</Typography>
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <Box className={classes.eachRow}>
            <Box
              className="manageUser"
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {active ? (
                forbutton ? (
                  <DataTable
                    //value={pendingActionDetails}
                    value={pendingActionDetailsTemp}
                    //paginator
                    //paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    //rows={1}
                    emptyMessage="No data found."
                    style={{
                      width: 200,
                      fontSize: '12px',
                    }}
                    // className={`p-datatable-sm ${classes.viewlogTable}`}
                    scrollable
                    showGridlines
                    scrollHeight="flex"
                    //loading={manageUserLoading}
                  >
                    {pendingActionUpdateTableHeaders.map((column) => {
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
                          //   (column.field === "roles" && roleTemplate) ||
                          //   (column.field === "requestedId" && requestIdTemplate)
                          // }
                          sortable
                        />
                      )
                    })}
                  </DataTable>
                ) : (
                  <DataTable
                    //value={pendingActionDetails}
                    value={pendingActionDetailsTemp}
                    //paginator
                    //paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    //rows={1}
                    emptyMessage="No data found."
                    style={{
                      width: !between ? '350px' : '400px',
                      fontSize: '12px',
                    }}
                    // className={`p-datatable-sm ${classes.viewlogTable}`}
                    scrollable
                    showGridlines
                    scrollHeight="flex"
                    //loading={manageUserLoading}
                  >
                    {pendingActionUpdateTableHeaders.map((column) => {
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
                          //   (column.field === "roles" && roleTemplate) ||
                          //   (column.field === "requestedId" && requestIdTemplate)
                          // }
                          sortable
                        />
                      )
                    })}
                  </DataTable>
                )
              ) : (
                <DataTable
                  //value={pendingActionDetails}
                  value={pendingActionDetailsTemp}
                  //paginator
                  //paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  //rows={1}
                  emptyMessage="No data found."
                  style={{
                    width: '670px',
                    fontSize: '12px',
                  }}
                  // className={`p-datatable-sm ${classes.viewlogTable}`}
                  scrollable
                  showGridlines
                  scrollHeight="flex"
                  //loading={manageUserLoading}
                >
                  {pendingActionUpdateTableHeaders.map((column) => {
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
                        //   (column.field === "roles" && roleTemplate) ||
                        //   (column.field === "requestedId" && requestIdTemplate)
                        // }
                        sortable
                      />
                    )
                  })}
                </DataTable>
              )}
            </Box>
          </Box>
          {errorReassign !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {errorReassign}
                </Typography>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: !active ? 'row' : 'column',
              // [theme.breakpoints.up("sm")]: {
              //   flexDirection: "row",
              // },
              // [theme.breakpoints.down("sm")]: {
              //   flexDirection: "column",
              // },
              // alignItems: "baseline",
            }}
            className={classes.eachRow}
          >
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">
                Request Type &nbsp;
                <span
                  style={{
                    color: '#ff0000',
                  }}
                >
                  *
                </span>
              </Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="subtitle2">
                {/* <select
                  name="requesttype"
                  ref={focusRequestType}
                  id="requesttype"
                  className={classes.selectField}
                  defaultValue=""
                  onChange={onrequestTypeChange}
                  required
                  disabled
                >
                  {constants.requestTypes.map((type) => {
                    return (
                      type.name.toLowerCase() === requestType && (
                        <option value={type.name} key={type.name}>
                          {type.text}
                        </option>
                      )
                    )
                  })}
                </select> */}
                <Select
                  value={constants.requestTypes.filter(
                    (item) => item.value === requestType
                  )}
                  isDisabled={true}
                  isLoading={false}
                  // components={{
                  //   Option,
                  // }}
                  placeholder={'Select..'}
                  ref={focusRequestType}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={constants.requestTypes}
                  onChange={onrequestTypeChange}
                  className={classes.multiSelect}
                  styles={customStyles}
                  //value={hierLevel}
                />
              </Typography>
            </Box>
          </Box>
          {errorRequestType !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {errorRequestType}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">
                Employee ID &nbsp;
                <span
                  style={{
                    color: '#ff0000',
                  }}
                >
                  *
                </span>
              </Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="subtitle2">
                <input
                  type="text"
                  ref={focusEmpId}
                  className={classes.inputFields}
                  value={employeeID}
                  onChange={() => {}}
                  disabled
                />
              </Typography>
            </Box>
          </Box>
          {errorEmployeeId !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {errorEmployeeId}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">First Name</Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="subtitle2">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  // placeholder="eg. Mike"
                  className={classes.inputFields}
                  // onChange={e => {
                  //   setFirstName(e.target.value);
                  // }}
                  value={firstName}
                  onChange={() => {}}
                  disabled
                />
              </Typography>
            </Box>
          </Box>
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">Middle Name</Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="subtitle2">
                <input
                  type="text"
                  name="middlename"
                  id="middlename"
                  //placeholder="eg. Dallas"
                  className={classes.inputFields}
                  // onChange={e => {
                  //   setMiddleName(e.target.value);
                  // }}
                  value={middleName}
                  onChange={() => {}}
                  disabled
                />
              </Typography>
            </Box>
          </Box>
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">Last Name</Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="subtitle2">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  // placeholder="eg. Black"
                  className={classes.inputFields}
                  // onChange={e => {
                  //   setLastName(e.target.value);
                  // }}
                  value={lastName}
                  onChange={() => {}}
                  disabled
                />
              </Typography>
            </Box>
          </Box>

          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">Email ID</Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="subtitle2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  //  placeholder="eg. abc.xyz@morrisonsplc.co.uk"
                  className={classes.inputFields}
                  // onChange={e => {
                  //   setEmail(e.target.value);
                  // }}
                  value={email}
                  onChange={() => {}}
                  disabled
                />
              </Typography>
            </Box>
          </Box>
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">Job Title</Typography>
            </Box>

            <Box
              className={classes.inputFieldBox}
              sx={{
                // [theme.breakpoints.up("sm")]: {
                //   flexDirection: "row",
                //   width: 400,
                // },
                // [theme.breakpoints.down("sm")]: {
                //   flexDirection: "column",
                //   width: fieldWidth,
                // },
                flexDirection: !active ? 'row' : 'column',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  // flexGrow: 1,
                  display: 'flex',
                }}
              >
                <Typography variant="subtitle2">
                  <input
                    type="text"
                    // placeholder="designation"
                    disabled
                    className={classes.designationField}
                    value={designation}
                    onChange={() => {}}
                  />
                </Typography>
              </Box>
              {/* <Box
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: 'x-large',
                display: 'flex',
              }}
            >
              {width && <>|</>}
            </Box> */}
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                &nbsp;
              </Box>
            </Box>
          </Box>
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">
                Status &nbsp;
                <span
                  style={{
                    color: '#ff0000',
                  }}
                >
                  *
                </span>
              </Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="subtitle2">
                {/* <select
                  name="status"
                  id="status"
                  ref={focusStatus}
                  className={classes.selectField}
                  defaultValue=""
                  onChange={onstatusChange}
                  required
                  // disabled={requestType === 'new' && status === 'W'}
                  disabled={
                    UtilityFunctions.isHidden(
                      '8',
                      appFuncList ? appFuncList : [],
                      'status'
                    ) ||
                    requestType === 'new' ||
                    requestType === 'remove'
                  }
                >
                  {requestType === 'new'
                    ? constants.statuses
                        .filter((type) => type.statusID.toLowerCase() === 'w')
                        .map((type) => {
                          return (
                            <option
                              value={type.statusID}
                              key={type.statusID}
                              // selected={type.statusID === status ? true : false}
                            >
                              {type.text}
                            </option>
                          )
                        })
                    : // : requestType === 'modify'
                      // ? constants.statuses
                      //     .filter((type) => type.statusID.toLowerCase() !== 'w')
                      //     .map((type) => {
                      //       return (
                      //         <option
                      //           value={type.statusID}
                      //           key={type.statusID}
                      //           selected={type.statusID === status ? true : false}
                      //         >
                      //           {type.text}
                      //         </option>
                      //       )
                      //     })
                      // : requestType === 'remove'
                      // ? constants.statuses
                      //     .filter(
                      //       (type) => type.statusID.toLowerCase() !== 'w'
                      //       // &&
                      //       // type.statusID.toLowerCase() !== 'i'
                      //     )
                      //     .map((type) => {
                      //       return (
                      //         <option
                      //           value={type.statusID}
                      //           key={type.statusID}
                      //           selected={type.statusID === status ? true : false}
                      //         >
                      //           {type.text}
                      //         </option>
                      //       )
                      //     })
                      constants.statuses.map((type) => {
                        return (
                          <option
                            value={type.statusID}
                            key={type.statusID}
                            selected={type.statusID === status ? true : false}
                          >
                            {type.text}
                          </option>
                        )
                      })}
                </select> */}
                <Select
                  value={
                    requestType === 'new'
                      ? constants.statuses.filter((i) => i.value === 'W')
                      : constants.statuses.filter((i) => i.value === status)
                  }
                  isDisabled={
                    UtilityFunctions.isHidden(
                      '8',
                      appFuncList ? appFuncList : [],
                      'status'
                    ) ||
                    requestType === 'new' ||
                    requestType === 'remove'
                  }
                  isLoading={false}
                  // components={{
                  //   Option,
                  // }}
                  ref={focusStatus}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={constants.statuses}
                  onChange={onstatusChange}
                  className={classes.multiSelect}
                  styles={customStyles}
                  //value={hierLevel}
                />
              </Typography>
            </Box>
          </Box>
          {errorStatus !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {errorStatus}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">
                Role &nbsp;
                <span
                  style={{
                    color: '#ff0000',
                  }}
                >
                  *
                </span>
              </Typography>
            </Box>

            <Box className={classes.inputFieldBox}>{roleSelect1}</Box>
          </Box>
          {roleNames.length === 0 && errorRoles !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {errorRoles}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">
                User Group &nbsp;
                <span
                  style={{
                    color: '#ff0000',
                  }}
                >
                  *
                </span>
              </Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              {/* <Typography variant="subtitle1"> */}
              {/* {groups ? (
                groups.length > 0 ? (
                  <button
                    type="button"
                    className={classes.backButton}
                    onClick={handleOpenGroups}
                    ref={focusGroup}
                  >
                    <span className="addUserGroup">
                      Groups ( {groups.length} )
                    </span>
                  </button>
                ) : (
                  <button
                    // className={
                    //   UtilityFunctions.isHidden(
                    //     '8',
                    //     appFuncList ? appFuncList : [],
                    //     groupAccess
                    //   )
                    //     ? classes.hideit
                    //     : classes.backButton
                    // }
                    type="button"
                    className={classes.backButton}
                    disabled={UtilityFunctions.isHidden(
                      '8',
                      appFuncList ? appFuncList : [],
                      groupAccess
                    )}
                    onClick={handleOpenGroups}
                    ref={focusGroup}
                  >
                    Add
                  </button>
                )
              ) : (
                <button
                  type="button"
                  className={classes.backButton}
                  onClick={handleOpenGroups}
                  ref={focusGroup}
                >
                  Add
                </button>
              )} */}
              {groupSelect}
              &nbsp;&nbsp; &nbsp;&nbsp;
              <button
                // className={
                //   UtilityFunctions.isHidden(
                //     '8',
                //     appFuncList ? appFuncList : [],
                //     'manage_task'
                //   )
                //     ? classes.hideit
                //     : classes.backButton
                // }
                type="button"
                className={classes.hideit}
                onClick={handleOpenTasks}
              >
                Manage Task ( {tasks.length} )
              </button>
              {/* </Typography> */}
            </Box>
          </Box>
          {groupInput.length === 0 && errorGroups !== '' && (
            // {groups.length === 0 && errorGroups !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {errorGroups}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">
                Effective Date &nbsp;
                <span
                  style={{
                    color: '#ff0000',
                  }}
                >
                  *
                </span>
              </Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  format="dd/MM/yyyy"
                  inputVariant="outlined"
                  value={effectiveDate}
                  // ref={focusLaunchDate}
                  // onChange={handleLaunchDate}
                  // maxDate={new Date('08/04/2022')}
                  onChange={(e: any) =>
                    handleEffectiveDate(e.toISOString().split('T')[0])
                  }
                  // KeyboardButtonProps={{
                  //   'aria-label': 'change date',
                  // }}
                  emptyLabel="Enter Effective Date"
                  TextFieldComponent={(props: any) => (
                    <OutlinedInput
                      margin="dense"
                      inputRef={focusEffectiveDate}
                      onClick={props.onClick}
                      value={props.value}
                      onChange={props.onChange}
                      className={classes.dateFields}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
            </Box>
          </Box>
          {errorEffectiveDate !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {errorEffectiveDate}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={classes.eachRow}>
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">Reference Document</Typography>
            </Box>

            <Box
              // className={classes.inputFieldBox}
              sx={{
                // [theme.breakpoints.up("sm")]: {
                //   flexDirection: "row",
                // },
                // [theme.breakpoints.down("sm")]: {
                //   flexDirection: "column",
                // },
                flexDirection: !active ? 'row' : 'column',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  // flexGrow: 1,
                  display: 'flex',
                }}
              >
                <Typography variant="subtitle2" className="browseArea">
                  {
                    <input
                      type="text"
                      // value={referenceDoc ? referenceDoc.name : ''}
                      onClick={() =>
                        document.getElementById('selectedFile')!.click()
                      }
                      className={classes.uploadTextfield}
                      placeholder="No file selected"
                      readOnly
                    />
                  }
                  <Input
                    type="file"
                    id="selectedFile"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById('selectedFile')!.click()
                    }
                    className={classes.uploadButton}
                  >
                    Browse...
                  </button>
                </Typography>
              </Box>
              <Box
                sx={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  fontSize: 'x-large',
                  display: 'flex',
                }}
              >
                {/* {width && <>|</>}
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <button className={classes.backButton}>view(3)</button> */}
              </Box>
            </Box>
          </Box>
          {wrongExtn ? (
            // && referenceDocData.length > 0
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox}>
                <Typography variant="subtitle2" color={'secondary'}>
                  {allMessages.error.invalidExtension}
                </Typography>
              </Box>
            </Box>
          ) : null}
          {referenceDocData.length > 0 && (
            <Box className={classes.eachRow}>
              {/* <Box
              sx={{
                flexDirection: 'column',
                display: 'flex',
              }}
              className={classes.inputFieldBox}
            > */}
              {/* {referenceDocData.map((p: any) => (
                <Box className={classes.inputFieldBox} sx={{}} key={p.name}>
                  <a href={p.link} target="popup">
                    {p.name}
                  </a>
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      const newone = referenceDocData.filter(
                        (dat) => dat.name !== p.name
                      )
                      setReferenceDocData([...newone])
                    }}
                  >
                    X
                  </Button>
                </Box>             
              ))} */}
              <Box className={classes.inputLabel}></Box>
              <Box
                // className={!active ? classes.filelist : classes.inputFieldBox}
                className={classes.inputFieldBox}
                sx={{ overflow: 'auto' }}
              >
                <table>
                  <tbody>
                    {referenceDocData.map((p: any, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Button
                              onClick={(e) => {
                                e.preventDefault()
                                const newone = referenceDocData.filter(
                                  (dat) => dat.name !== p.name
                                )
                                setReferenceDocData([...newone])
                                if (newone.length === 0) {
                                  setWrongExtn(false)
                                }
                              }}
                              color="primary"
                              size="small"
                              style={{
                                justifyContent: 'flex-start',
                                minWidth: '30px',
                              }}
                            >
                              X
                            </Button>
                          </td>
                          <td>
                            <a href={p.link} target="popup">
                              {p.name}
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Box>
            </Box>
            // </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              // [theme.breakpoints.up("sm")]: {
              //   flexDirection: "row",
              // },
              // [theme.breakpoints.down("sm")]: {
              //   flexDirection: "column",
              // },
              flexDirection: !active ? 'row' : 'column',
              paddingTop: '20px',
            }}
          >
            <Box className={classes.inputLabel}>
              <Typography variant="subtitle2">Comments</Typography>
            </Box>

            <Box className={classes.inputFieldBox}>
              <Typography variant="body2">
                <textarea
                  cols={10}
                  rows={5}
                  className={classes.textArea}
                  placeholder={comments1}
                  onChange={(e) => {
                    setIsPageModified(true)
                    setComments(e.target.value)
                  }}
                  // value={comments}
                />
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: !active ? 'row' : 'column' }}
          >
            <Box className={classes.inputLabel}> &nbsp;</Box>
            <Box className={classes.inputFieldBox}>
              <button
                type="button"
                className={
                  UtilityFunctions.isHidden(
                    '8',
                    appFuncList ? appFuncList : [],
                    'addl_data'
                  )
                    ? classes.hideit
                    : classes.backButton
                }
                disabled={
                  UtilityFunctions.isHidden(
                    '8',
                    appFuncList ? appFuncList : [],
                    'addl_data'
                  )
                    ? true
                    : colleagueData || additionalInfo
                    ? false
                    : true
                }
                onClick={(e) => {
                  e.preventDefault()
                  setOpenAdditional((prevState) => !prevState)
                }}
              >
                <span className="addUserGroup">Additional Data</span>
              </button>
            </Box>
          </Box>

          <Box
            className="buttonContainer"
            sx={{
              display: 'flex',
              flexDirection: !active ? 'row' : 'column',
              alignItems: !active ? 'center' : 'center',
              paddingTop: '30px',
              justifyContent: !active ? 'space-between' : 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: !forbutton ? 'row' : 'column',
                alignItems: !forbutton ? 'center' : 'center',
                justifyContent: !forbutton ? 'space-between' : 'center',
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: !forbutton ? 'row' : 'column',
                alignItems: !forbutton ? 'center' : 'center',
                justifyContent: !forbutton ? 'space-between' : 'center',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className={
                  UtilityFunctions.isHidden(
                    '8',
                    appFuncList ? appFuncList : [],
                    'reject'
                  )
                    ? classes.hideit
                    : classes.whiteButton
                }
                size="small"
                // onClick={handleReject}
                onClick={handleRejectAfterDialog}
                disabled={disabled}
              >
                <span className="reSet">Reject</span>
              </Button>
              <div className="resetReassign">
                <Button
                  // type="submit"
                  variant="contained"
                  color="primary"
                  className={
                    UtilityFunctions.isHidden(
                      '8',
                      appFuncList ? appFuncList : [],
                      'submit'
                    )
                      ? classes.hideit
                      : classes.submitButton
                  }
                  size="small"
                  // onClick={handleUpdateUserforSubmit}
                  onClick={handleSubmitAfterDialog}
                  disabled={disabled}
                >
                  Submit
                </Button>
              </div>
              <div className="resetReassign">
                <Button
                  variant="contained"
                  color="primary"
                  className={
                    UtilityFunctions.isHidden(
                      '8',
                      appFuncList ? appFuncList : [],
                      'reassign'
                    )
                      ? classes.hideit
                      : classes.buttons
                  }
                  size="small"
                  // onClick={handleReassign}
                  onClick={handleReassignAfterDialog}
                  disabled={
                    requestorRoles
                      .map((item: any) => item.roleId)
                      .toString()
                      .includes('JML')
                      ? true
                      : disabled
                  }
                >
                  Reassign
                </Button>
              </div>
              <div className="resetReassign">
                <Button
                  // type="submit"
                  variant="contained"
                  color="primary"
                  className={
                    UtilityFunctions.isHidden(
                      '8',
                      appFuncList ? appFuncList : [],
                      'approve'
                    )
                      ? classes.hideit
                      : classes.buttons
                  }
                  size="small"
                  // onClick={handleUpdateUserforApprove}
                  // onClick={handleApprove}
                  onClick={handleApproveAfterDialog}
                  disabled={disabled}
                >
                  <span className="reSet">Approve</span>
                </Button>
              </div>
            </Box>
          </Box>
        </form>
        <LoadingComponent showLoader={isProgressLoader} />
      </div>
    </Box>
  )

  return (
    <>
      <Prompt
        when={isPageModified && isSuccessCall}
        message={allMessages.success.promptMessage}
      />
      <Toast
        ref={toast}
        position="bottom-left"
        onRemove={() => {
          history.push(`${DEFAULT}${DASHBOARD}`)
        }}
      />
      <Paper className={classes.root} elevation={0}>
        <Box sx={{ flexGrow: 1, p: 1, display: 'flex' }}>
          {/* <Grid container spacing={1}> */}
          <Grid
            container
            item
            xs={12}
            className={classes.text}
            alignItems="center"
            justifyContent="center"
          >
            {createForm}
            {/* {viewGroups} */}
            {manageTasks}
            {viewLog}
            {viewAdditionalInfo}
            {viewConfirmApprove}
            {viewConfirmSubmit}
            {viewConfirmReassign}
            {viewConfirmReject}
            {viewConfirmBack}
          </Grid>
          {/* </Grid> */}
        </Box>
      </Paper>
    </>
  )
}

const mapStatetoProps = (state: any) => {
  return {
    empDetails: state.manageUserReducer.empDetails,
    rolesArray: state.loginReducer.rolesArray,
    appFuncList: state.loginReducer.appFuncList,
    userDetail: state.loginReducer.userDetail,
    pendingActionDetails: state.pendingActionReducer.pendingActionDetails,
  }
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_pendingAction: () => dispatch(reset_pendingAction()),
  }
}

export default connect(
  mapStatetoProps,
  matchDispatchToProps
)(PendingActionUpdate)
