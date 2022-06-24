import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Dialog,
  useTheme,
  useMediaQuery,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import React from 'react'
import { useHistory, Prompt } from 'react-router-dom'
import Select from 'react-select'
import { useState, useEffect, useRef } from 'react'
import { components } from 'react-select'
import { Toast } from 'primereact/toast'
import { constants } from './DataConstants'
// import axios from "axios";
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/themes/saga-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { teal } from '@material-ui/core/colors'
import { SearchOutlined } from '@material-ui/icons'
import { useStyles, fieldWidth } from './Styles'
import { connect } from 'react-redux'
import {
  getColleagueAPI,
  getUserGroupAPI,
  getUserGroupActiveAPI,
  postTaskLogsAPI,
  putUserDetailsAPI,
  putUserDetailsCamundaAPI,
  postFileAttachmentAPI,
  getUserAPI,
} from '../../api/Fetch'
import { UtilityFunctions } from '../../util/UtilityFunctions'
import { routes, extensions, life } from '../../util/Constants'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { allMessages } from '../../util/Messages'
import { admins } from '../../util/Constants'

const Input = styled('input')({
  display: 'none',
})

function UserCreate({ rolesArray, appFuncList, userDetail }: any) {
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme()
  const { DEFAULT, DASHBOARD, USERCONFIG_USERCREATE } = routes
  const active = useMediaQuery(theme.breakpoints.down(750))
  const forbutton = useMediaQuery(theme.breakpoints.down(400))
  const width = useMediaQuery(theme.breakpoints.up('md'))
  const dialogwidth = width ? 600 : fieldWidth
  const [roleNames, setRoleNames] = React.useState<any>('')
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [empIdInput, setEmpIdInput] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [middleName, setMiddleName] = React.useState('')
  const [requestType, setRequestType] = React.useState('')
  const [additionalInfo, setAdditionalInfo] = React.useState('')
  const [shoutOut, setShoutOut] = React.useState('')
  // const [selectEmployeeID, setSelectEmployeeID] = React.useState<any>();
  const [referenceDocData, setReferenceDocData] = React.useState<Array<any>>([])
  const [employeeID, setEmployeeID] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [designation, setDesignation] = React.useState('')
  const [status, setStatus] = React.useState('A')
  const [comments, setComments] = React.useState('')
  const [wrongExtn, setWrongExtn] = React.useState(false)
  const [referenceDoc, setReferenceDoc] = React.useState<any>('')
  const [viewLogEl, setViewLogEl] = React.useState(null)
  const viewLogOpen = Boolean(viewLogEl)
  const [emplAvailable, setEmpAvailable] = React.useState(false)
  const [roleAccess, setRoleAccess] = React.useState('')
  const [groupAccess, setGroupAccess] = React.useState('')
  // const [groups, setGroups] = React.useState<any>('')
  const [groupInput, setGroupInput] = React.useState<any>([])
  // const [groupOpen, setGroupOpen] = React.useState(false)
  const [cancelOpenApprove, setCancelOpenApprove] = React.useState(false)
  const [cancelOpenSubmit, setCancelOpenSubmit] = React.useState(false)
  const [back, setBack] = React.useState(false)
  const [openAdditional, setOpenAdditional] = useState(false)
  const [colleagueData, setColleagueData] = React.useState('')
  const [submitFn, setSubmitFn] = React.useState<any>()
  const [errorRequestType, setErrorRequestType] = React.useState('')
  const [errorEmployeeId, setErrorEmployeeId] = React.useState('')
  const [errorStatus, setErrorStatus] = React.useState('')
  const [errorRoles, setErrorRoles] = React.useState('')
  const [errorGroups, setErrorGroups] = React.useState('')
  const [checkCount, setCheckCount] = React.useState(1)
  const [failureCount, setFailureCount] = React.useState(0)
  const [disabled, setDisabled] = React.useState(false)
  const [effectiveDate, setEffectiveDate] = useState<any>(
    `${new Date().toISOString().split('T')[0]}`
  )
  const [errorEffectiveDate, setErrorEffectiveDate] = useState<any>('')
  const [dateDifference, setDateDifference] = useState<any>(0)
  //
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  const [isSuccessCall, setIsSuccessCall] = React.useState(true)
  const [returnText, setReturnText] = React.useState('')
  const [attachmentUrlArr, setAttachmentUrlArr] = React.useState<Array<string>>(
    []
  )
  const [logDataIn, setLogDataIn] = React.useState({})
  const [isPageModified, setIsPageModified] = React.useState(false)
  //
  //integration changes start
  const [roles, setRoles] = useState([])
  const [groupsData, setGroupsData] = useState([])
  const toast = useRef<any>(null)
  const focusRequestType = useRef<any>(null)
  const focusEmpId = useRef<any>(null)
  const focusStatus = useRef<any>(null)
  const focusRole = useRef<any>(null)
  const focusGroup = useRef<any>(null)
  const focusEffectiveDate = useRef<any>(null)
  //integration changes start
  // useEffect(() => {
  //   setGroupInput(groups)
  // }, [groups])

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
    // menu:(provided: any, state: any)=>({
    //   ...provided,
    //   height:"300px"
    // })
  }
  //integration changes start

  useEffect(() => {
    //focusRequestType.current.focus()
    // getUserGroupAPI &&
    //   getUserGroupAPI()
    getUserGroupActiveAPI &&
      getUserGroupActiveAPI()
        .then((res) => {
          console.log(res.data)
          const groupValues = res.data.usergroups.map((group: any) => {
            return {
              label: group.groupName,
              value: group.groupId,
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: group.status,
              locationHierarchy: group.locationHierarchy,
              productHierarchy: group.productHierarchy,
            }
          })
          setGroupsData(groupValues)
          console.log(groupValues)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [])

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
        setIsSuccessCall(false)
        toast.current.show([
          {
            severity: 'success',
            summary: '',
            detail: `${returnText}\n${allMessages.success.successCopy}`,
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
                  detail: `${returnText}.\n ${allMessages.success.successCopy}`,
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
                  detail: `${returnText}.\n ${allMessages.success.successCopy}`,
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
  }, [rolesArray, userDetail])

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
  const roleSelectStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }

  const handleReset = () => {
    setEmpIdInput('')
    setFirstName('')
    setMiddleName('')
    setLastName('')
    setEmail('')
    setDesignation('')
    setStatus('A')
    setRoleNames([])
    setGroupInput([])
    // setGroups([])
    setColleagueData('')
    setComments('')
    setReferenceDocData([])
  }

  const handleFileUpload = (event: any) => {
    console.log(event.target.files)
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
    setIsPageModified(true)
    // if (e.target.value !== '') {
    if (e.value !== '') {
      setErrorRequestType('')
      setErrorStatus('')
    }
    // if (e.target.value.toLowerCase() === 'new') {
    if (e.value.toLowerCase() === 'new') {
      // setStatus('W')
      setRoleAccess('new_role')
      setGroupAccess('new_group')
    }
    // if (e.target.value.toLowerCase() === 'modify') {
    if (e.value.toLowerCase() === 'modify') {
      // setStatus('W')
      if (status === 'D') {
        setRoleAccess('rem_role')
        setGroupAccess('rem_group')
      } else {
        setRoleAccess('mod_role')
        setGroupAccess('mod_group')
      }

      // setStatus('A')
    }
    // if (e.target.value.toLowerCase() === 'remove') {
    if (e.value.toLowerCase() === 'remove') {
      // setStatus('W')
      setRoleAccess('rem_role')
      setGroupAccess('rem_group')
      // setStatus('A')
    }
    // setRequestType(e.target.value)
    setRequestType(e.value)
    // checkIt(e.target.value, emplAvailable)
    checkIt(e.value, emplAvailable)
  }
  useEffect(() => {
    console.log(status)
  }, [status])

  const checkIt = (type: string, empAvail: boolean) => {
    if (empIdInput !== '' && type.toLowerCase() === 'new' && empAvail) {
      focusEmpId.current.focus()
      setShoutOut(allMessages.error.existingEmp)
    } else if (
      empIdInput !== '' &&
      (type.toLowerCase() === 'modify' || type.toLowerCase() === 'remove') &&
      !empAvail
    ) {
      focusEmpId.current.focus()
      setShoutOut(allMessages.error.modifyEmp)
    } else {
      setShoutOut('')
    }
  }
  useEffect(() => {
    console.log(requestType)
  }, [requestType])

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
          //   // detail: `${err.response.status} from tasklogapi`,
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
      //required
    />
  )

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
    console.log(selected)
    setIsPageModified(true)
    setGroupInput(selected)
    if (selected.length > 0) setErrorGroups('')
  }

  const groupSelect = (
    <Select
      // options={groupTypes}
      options={groupsData}
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
  //         //className={classes.inputFieldBox}
  //         className={classes.inputFieldBoxPop}
  //         sx={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //         }}
  //       >
  //         {/* <Box> */}
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
  //             // options={groupTypes}
  //             options={groupsData}
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
  //         //className={classes.inputFieldBox}
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

  // useEffect(() => {
  //   if (selectEmployeeID) {
  //     setEmployeeID(selectEmployeeID.user.userId);
  //     setFirstName(selectEmployeeID.user.firstName);
  //     setMiddleName(selectEmployeeID.user.middleName);
  //     setLastName(selectEmployeeID.user.lastName);
  //     setEmail(selectEmployeeID.user.emailId);
  //     setDesignation(selectEmployeeID.user.designation);
  //     setStatus(selectEmployeeID.user.status);
  //     setRoleNames(
  //       selectEmployeeID.roles.map((role: any) => {
  //         return {
  //           label: role.roleId,
  //           value: role.roleId,
  //         };
  //       })
  //     );

  //     setGroupInput(
  //       selectEmployeeID.usergroups.map((group: any) => {
  //         return {
  //           label: group.groupId,
  //           value: group.groupId,
  //           status: group.status,
  //         };
  //       })
  //     );
  //     setGroups(
  //       selectEmployeeID.usergroups.map((group: any) => {
  //         return {
  //           label: group.groupId,
  //           value: group.groupId,
  //           status: group.status,
  //         };
  //       })
  //     );
  //   } else {
  //     setEmployeeID("");
  //     setFirstName("");
  //     setMiddleName("");
  //     setLastName("");
  //     setEmail("");
  //     setDesignation("");
  //     setStatus("");
  //   }
  // }, [selectEmployeeID]);

  const handleOpenViewLog = (e: any) => {
    setViewLogEl(e.currentTarget)
  }
  const handleCloseViewLog = () => {
    setViewLogEl(null)
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
          <Typography variant="body2">
            Request ID:
            <b>0112233</b>
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
            value={constants.viewLogRows}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} of {totalRecords}"
            rows={5}
            style={{
              fontSize: '12px',
              backgroundColor: '#f7f7f7',
              // width: fieldWidth,
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

  // const viewCancel = (
  //   <Dialog open={cancelOpen} onClose={handleCancel}>
  //     <Box
  //       sx={{
  //         //width: dialogwidth,
  //         //border: '3px solid green',
  //         borderRadius: 4,
  //         display: 'flex',
  //         flexDirection: 'column',
  //         p: 1,
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           display: 'flex',
  //           height: 30,
  //           flexDirection: 'row',
  //         }}
  //         className={classes.viewLogTitle}
  //       >
  //         <Box
  //           sx={{
  //             display: 'flex',
  //             flexGrow: 1,
  //             justifyContent: 'center',
  //           }}
  //         >
  //           <Typography variant="subtitle1">Are you Sure?</Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             paddingRight: 2,
  //           }}
  //         >
  //           <button
  //             style={{
  //               border: 0,
  //               padding: 0,
  //               height: 22,
  //               width: 22,
  //             }}
  //             className={classes.closeViewLog}
  //             onClick={handleCancel}
  //           >
  //             <b>X</b>
  //           </button>
  //         </Box>
  //       </Box>
  //       <Box
  //         sx={{
  //           display: 'flex',
  //           p: 2,
  //         }}
  //       >
  //         <Typography variant="body2" color="primary">
  //           All your data will be lost.
  //         </Typography>
  //       </Box>
  //       <Box
  //         sx={{
  //           justifyContent: 'space-between',
  //           display: 'flex',

  //           // textAlign: "center"
  //           p: 2,
  //         }}
  //       >
  //         <Button
  //           size="small"
  //           variant="contained"
  //           color="primary"
  //           onClick={(e) => {
  //             e.preventDefault()
  //             history.goBack()
  //           }}
  //         >
  //           OK
  //         </Button>
  //         <Button
  //           size="small"
  //           variant="contained"
  //           color="primary"
  //           onClick={handleCancel}
  //         >
  //           Cancel
  //         </Button>
  //       </Box>
  //     </Box>
  //   </Dialog>
  // )
  const goBack = () => {
    history.goBack()
  }

  // const getCurrentDate = () => {
  //   let today = new Date()
  //   let dd = String(today.getDate())

  //   let mm = String(today.getMonth() + 1)
  //   let yyyy = String(today.getFullYear())
  //   if (dd < '10') {
  //     dd = '0' + dd
  //   }

  //   if (mm < '10') {
  //     mm = '0' + mm
  //   }
  //   let startdate
  //   startdate = yyyy + '-' + mm + '-' + dd
  //   //console.log(startdate);
  //   return startdate
  // }

  const handleSearchEmployee = (e: any) => {
    e.preventDefault()
    setOpenAdditional(false)
    // let selectedEmp = userData.filter((user: any) => {
    //   return user.user.userId === empIdInput
    // })

    // axios({
    //   method: "GET",
    //   url: `https://sit-api.morrisons.com/colleague/v1/colleagues/${empIdInput}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    //   headers: {
    //     "content-type": "application/json",
    //     Authorization: `Basic dnFhaURSWnpTUWhBNkNQQXkwclNvdHNRQWtSZXBwclg6THhhVk01SllpckJya1FRdQ==`,
    //   },
    // })
    if (empIdInput === '') focusEmpId.current.focus()
    empIdInput !== ''
      ? getUserAPI &&
        getUserAPI(empIdInput)
          .then((res) => {
            setColleagueData('')
            setEmpAvailable(true)
            checkIt(requestType, true)
            setEmployeeID(res.data.userdetails[0].user.userId)
            setFirstName(res.data.userdetails[0].user.firstName)
            setLastName(res.data.userdetails[0].user.lastName)
            setMiddleName(res.data.userdetails[0].user.middleName)
            setEmail(res.data.userdetails[0].user.emailId)
            setDesignation(res.data.userdetails[0].user.designation)
            // setAdditionalInfo(res.data.userdetails[0].user.additionalInfo)
            // if (
            //   res.data.userdetails[0].user.additionalInfo &&
            //   res.data.userdetails[0].user.additionalInfo !== ''
            // ) {
            //   setAdditionalInfo(res.data.userdetails[0].user.additionalInfo)
            // } else {
            getColleagueAPI(empIdInput)
              .then((res: any) => {
                setColleagueData(res.data)
              })
              .catch((err) => setColleagueData(''))
            // }
            setStatus(res.data.userdetails[0].user.status)
            if (res.data.userdetails[0].user.status === 'D') {
              setRoleAccess('rem_role')
              setGroupAccess('rem_group')
            }
            setRoleNames(
              res.data.userdetails[0].roles.map((role: any) => {
                return {
                  label: role.roleName,
                  value: role.roleId,
                }
              })
            )
            setGroupInput(
              res.data.userdetails[0].usergroups.map((group: any) => {
                return {
                  label: group.groupName,
                  value: group.groupId,
                  status: group.status,
                }
              })
            )
            // setGroups(
            //   res.data.userdetails[0].usergroups.map((group: any) => {
            //     return {
            //       label: group.groupName,
            //       value: group.groupId,
            //       status: group.status,
            //     }
            //   })
            // )
            setComments('')
            setReferenceDocData([])
            setErrorRoles('')
            setErrorGroups('')
            // setErrorRequestType('')
            setErrorEmployeeId('')
            setErrorStatus('')
          })
          .catch((err) => {
            setEmpAvailable(false)
            setErrorRoles('')
            setErrorGroups('')
            setErrorRequestType('')
            setErrorEmployeeId('')
            setErrorStatus('')
            getColleagueAPI(empIdInput)
              .then((response: any) => {
                //console.log(response);
                checkIt(requestType, false)
                let userData = response.data
                setEmployeeID(empIdInput)
                setFirstName(userData.FirstName)
                setMiddleName('')
                setLastName(userData.LastName)
                setEmail(userData.email)
                setDesignation(userData.jobRole.jobTitle)
                setColleagueData(userData)
                if (requestType === 'new') {
                  setStatus('W')
                } else {
                  setStatus('A')
                }
                // setStatus('W')
                setRoleNames([])
                setGroupInput([])
                // setGroups([])
                setComments('')
                setReferenceDocData([])
                //setStatus(userData.employee_status);
              })
              .catch((err) => {
                //console.log(err);
                handleReset()
                // toast.current.show({
                //   severity: 'error',
                //   summary: 'Error!',
                //   detail: 'Invalid Employee ID',
                //   life: life,
                //   className: 'login-toast',
                // })
                focusEmpId.current.focus()
                setErrorEmployeeId(allMessages.error.invalidEmployee)
                if (requestType === 'new') {
                  setErrorRequestType('')
                  setErrorStatus('')
                  setStatus('W')
                } else {
                  setErrorRequestType('')
                  setErrorStatus('')
                  setStatus('A')
                }
                setShoutOut('')
              })
          })
      : setErrorEmployeeId(allMessages.error.noEmployeeId)
  }

  const checkForm = async (btnName: string) => {
    let flag = 1
    if (errorRequestType !== '') {
      focusRequestType.current.focus()
      flag = 0
    }
    if (errorEffectiveDate !== '') {
      focusEffectiveDate.current.focus()
      flag = 0
    }
    if (errorStatus !== '') {
      focusStatus.current.focus()
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
    if (empIdInput === '') {
      focusEmpId.current.focus()
      setErrorEmployeeId(allMessages.error.noEmployeeId)
      flag = 0
    }
    if (empIdInput !== '' && email === '' && designation === '') {
      focusEmpId.current.focus()
      setErrorEmployeeId(allMessages.error.noSearchPress)
      flag = 0
    }
    if (status === '') {
      focusStatus.current.focus()
      setErrorStatus(allMessages.error.noStatus)
    }
    if (roleNames.length === 0) {
      focusRole.current.focus()
      setErrorRoles(allMessages.error.noRoles)
      flag = 0
    }
    if (groupInput.length === 0) {
      // if (groups.length === 0) {
      focusGroup.current.focus()
      setErrorGroups(allMessages.error.noGroups)
      flag = 0
    }
    if (flag === 1 && btnName === 'approve') {
      shoutOut === '' && setCancelOpenApprove(true)
    } else if (flag === 1 && btnName === 'submit') {
      shoutOut === '' && setCancelOpenSubmit(true)
    }
    if (flag === 0 || shoutOut !== '') {
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

  const handleCreateRequestforApprove = () => {
    // e.preventDefault()
    setIsProgressLoader(true)
    if (shoutOut === '') {
      setDisabled(true)
      // const colleague: any =
      //   colleagueData && constants.getColleagueDetails(colleagueData)
      // const colleaguestring =
      //   colleagueData &&
      //   `${colleague[0].managerId}#!#${colleague[0].managerName}#!#${colleague[0].managersManagerId}#!#${colleague[0].hiringmanager}#!#${colleague[0].leavingDate}#!#${colleague[0].businessUnit}#!#${colleague[0].locationName}#!#${colleague[0].division}`

      const formData = {
        camunda: {
          submitFlag: 'Approved',
          requestorDetails: {
            emailId: userDetail && userDetail.userdetails[0].user.emailId,
            requestBy: userDetail && userDetail.userdetails[0].user.userId,
            requestDate: new Date().toISOString().split('T')[0],
            requestorName:
              userDetail &&
              userDetail.userdetails[0].user.middleName &&
              userDetail.userdetails[0].user.middleName !== ''
                ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            //requestedDate: new Date().toISOString().split('T')[0],
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
        effectiveDate: effectiveDate,
        user: {
          employeeId: employeeID,
          // EmployeeId: employeeID,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          emailId: email,
          additionalInfo: '',
          // colleagueData !== '' ? colleaguestring : additionalInfo,
          status: status,
          designation: designation.toUpperCase(),
        },
        roles: roleNames
          ? roleNames.map((role: any) => {
              return {
                roleId: role.value,
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
        usergroups: groupInput
          ? groupInput.map((group: any) => {
              return {
                groupId: group.value,
                status: group.status,
              }
            })
          : [],
      }
      console.log(formData)

      // axios
      //   .put(
      //     `https://dev-api.morrisons.com/commercial-workflow/v1/users/userdetails/${employeeID}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
      //     formData,
      //     {
      //       headers: {
      //         "Cache-Control": "no-cache",
      //         Authorization: `Bearer ${accessToken.access_token}`,
      //       },
      //     }
      //   )
      // employeeID &&
      //   roleNames &&
      //   groups &&
      setReturnText('')
      userDetail &&
        putUserDetailsCamundaAPI(formData)
          .then((res) => {
            console.log(res)
            setIsSuccessCall(false)
            setReturnText(`${res.data.comments} with ID ${res.data.requestId}`)
            if (navigator.clipboard) {
              navigator.clipboard.writeText(res.data.requestId)
            }
            // else {
            //   ;(window as any).clipboardData.setData(
            //     'text/plain',
            //     res.data.requestId
            //   )
            // }
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
              camundaRequestId: res.data.businessKey
                ? res.data.businessKey
                : '',
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
                      // toast.current.show({
                      //   severity: 'error',
                      //   summary: 'Error!',
                      //   //detail: `${err.response.status} from tasklistapi`,
                      //   detail: err.response.data.errorMessage,
                      //   // detail: `${err.data.errorMessage} ${statusCode}`,
                      //   life: life,
                      //   className: 'login-toast',
                      // })
                      // logData.attachmentUrl = null
                      // postTasklog(logData)
                    })
                return null
              })
            } else {
              setFailureCount(1)
              setCheckCount(1)
              postTasklog(logData)
            }
            // toast.current.show({
            //   severity: 'success',
            //   summary: '',
            //   detail: res.data.comments,
            //   life: life,
            //   className: 'login-toast',
            // })

            // setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), 6000)
          })
          .catch((err) => {
            setDisabled(false)
            setIsProgressLoader(false)
            setIsSuccessCall(false)
            console.log(err.response)
            // let statusCode = err.status
            //console.log(statusCode)
            // alert(err)
            toast.current.show({
              severity: 'error',
              summary: 'Error!',
              //detail: `${err.response.status} from userdetailapi`,
              detail: err.response.data.errorMessage,
              // detail: `${err.data.errorMessage} ${statusCode}`,
              life: life,
              className: 'login-toast',
            })
            //history.push('/commercial-webapp/dashboard')
          })
    }
    // const formDataforAttachment: any = {
    //   requestId: 'SYSTCS109',
    //   timestamp: '2021-12-12',
    //   userId: employeeID,
    //   role: 'ADMIN',
    //   camundaRequestId: 'C1234567',
    //   actionTaken: 'New',
    //   comments: comments,
    // }

    // const formdata = new FormData()
    // formdata.append('fileIn', referenceDocData)
    // formdata.append(
    //   'postData',
    //   new Blob([JSON.stringify(formDataforAttachment)], {
    //     type: 'application/json',
    //   })
    // )

    // //start
    // postTaskLogsAPI(formData)
    //   .then((res) => {
    //     console.log(res)
    //     let statusCode = res.status
    //     if (statusCode === 200) {
    //       toast.current.show({
    //         severity: 'success',
    //         summary: '',
    //         detail: res.data.message,
    //         life: 6000,
    //         className: 'login-toast',
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response)
    //     let statusCode = err.response.status
    //     console.log(statusCode)
    //     // alert(err)
    //     toast.current.show({
    //       severity: 'error',
    //       summary: 'Error!',
    //       detail: `${err.response.data.errorMessage} ${statusCode}`,
    //       life: 6000,
    //       className: 'login-toast',
    //     })
    //   })
  }

  const handleCreateRequestforSubmit = () => {
    // e.preventDefault()
    setIsProgressLoader(true)
    if (shoutOut === '') {
      setDisabled(true)
      // const colleague: any =
      //   colleagueData && constants.getColleagueDetails(colleagueData)
      // const colleaguestring =
      //   colleagueData &&
      //   `${colleague[0].managerId}#!#${colleague[0].managerName}#!#${colleague[0].managersManagerId}#!#${colleague[0].hiringmanager}#!#${colleague[0].leavingDate}#!#${colleague[0].businessUnit}#!#${colleague[0].locationName}#!#${colleague[0].division}`

      const formData = {
        camunda: {
          submitFlag: 'Submit',
          requestorDetails: {
            emailId: userDetail && userDetail.userdetails[0].user.emailId,
            requestBy: userDetail && userDetail.userdetails[0].user.userId,
            requestDate: new Date().toISOString().split('T')[0],
            requestorName:
              userDetail &&
              userDetail.userdetails[0].user.middleName &&
              userDetail.userdetails[0].user.middleName !== ''
                ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
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
        effectiveDate: effectiveDate,
        user: {
          employeeId: employeeID,
          // EmployeeId: employeeID,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          emailId: email,
          additionalInfo: '',
          // colleagueData !== '' ? colleaguestring : additionalInfo,
          status: status,
          designation: designation.toUpperCase(),
        },
        roles: roleNames
          ? roleNames.map((role: any) => {
              return {
                roleId: role.value,
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
        usergroups: groupInput
          ? groupInput.map((group: any) => {
              return {
                groupId: group.value,
                status: group.status,
              }
            })
          : [],
      }
      console.log(formData)

      // axios
      //   .put(
      //     `https://dev-api.morrisons.com/commercial-workflow/v1/users/userdetails/${employeeID}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
      //     formData,
      //     {
      //       headers: {
      //         "Cache-Control": "no-cache",
      //         Authorization: `Bearer ${accessToken.access_token}`,
      //       },
      //     }
      //   )
      // employeeID &&
      //   roleNames &&
      //   groups &&
      setReturnText('')
      userDetail &&
        putUserDetailsCamundaAPI &&
        putUserDetailsCamundaAPI(formData)
          .then((res) => {
            console.log(res)
            setIsSuccessCall(false)
            setReturnText(`${res.data.comments} with ID ${res.data.requestId}`)
            if (navigator.clipboard) {
              navigator.clipboard.writeText(res.data.requestId)
            }
            // else {
            //   ;(window as any).clipboardData.setData(
            //     'text/plain',
            //     res.data.requestId
            //   )
            // }
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
              requestId: res.data.requestId,
              // timestamp: `${datepart} ${timepart}`,
              timestamp: `${datepart}`,
              userId: userDetail && userDetail.userdetails[0].user.userId,
              role: rolelog,
              camundaRequestId: res.data.businessKey
                ? res.data.businessKey
                : '',
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
                      // toast.current.show({
                      //   severity: 'error',
                      //   summary: 'Error!',
                      //   // detail: `${err.response.status} from tasklistapi`,
                      //   detail: err.response.data.errorMessage,
                      //   // detail: `${err.data.errorMessage} ${statusCode}`,
                      //   life: life,
                      //   className: 'login-toast',
                      // })
                    })
                return null
              })
            } else {
              setFailureCount(1)
              setCheckCount(1)
              postTasklog(logData)
            }
            // toast.current.show({
            //   severity: 'success',
            //   summary: '',
            //   detail: res.data.comments,
            //   life: life,
            //   className: 'login-toast',
            // })

            // setTimeout(() => history.push(`${DEFAULT}${DASHBOARD}`), 6000)
          })
          .catch((err) => {
            setDisabled(false)
            setIsProgressLoader(false)
            setIsSuccessCall(false)
            console.log(err)
            // let statusCode = err.status
            //console.log(statusCode)
            // alert(err)
            toast.current.show({
              severity: 'error',
              summary: 'Error!',
              // detail: `${err.response.status} from userdetailapi`,
              detail: err.response.data.errorMessage,
              // detail: `${err.data.errorMessage} ${statusCode}`,
              life: life,
              className: 'login-toast',
            })
            // history.push('/commercial-webapp/dashboard')
          })
    }
    // const formDataforAttachment: any = {
    //   requestId: 'SYSTCS109',
    //   timestamp: '2021-12-12',
    //   userId: employeeID,
    //   role: 'ADMIN',
    //   camundaRequestId: 'C1234567',
    //   actionTaken: 'New',
    //   comments: comments,
    // }

    // const formdata = new FormData()
    // formdata.append('fileIn', referenceDocData)
    // formdata.append(
    //   'postData',
    //   new Blob([JSON.stringify(formDataforAttachment)], {
    //     type: 'application/json',
    //   })
    // )

    // //start
    // postTaskLogsAPI(formData)
    //   .then((res) => {
    //     console.log(res)
    //     let statusCode = res.status
    //     if (statusCode === 200) {
    //       toast.current.show({
    //         severity: 'success',
    //         summary: '',
    //         detail: res.data.message,
    //         life: 6000,
    //         className: 'login-toast',
    //       })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response)
    //     let statusCode = err.response.status
    //     console.log(statusCode)
    //     // alert(err)
    //     toast.current.show({
    //       severity: 'error',
    //       summary: 'Error!',
    //       detail: `${err.response.data.errorMessage} ${statusCode}`,
    //       life: 6000,
    //       className: 'login-toast',
    //     })
    //   })
  }

  const viewConfirmApprove = (
    <ConfirmBox
      cancelOpen={cancelOpenApprove}
      handleCancel={handleCancelApprove}
      handleProceed={handleCreateRequestforApprove}
      label1="Are you sure to Approve?"
      label2="Please click Ok to proceed"
    />
  )

  const viewConfirmSubmit = (
    <ConfirmBox
      cancelOpen={cancelOpenSubmit}
      handleCancel={handleCancelSubmit}
      handleProceed={handleCreateRequestforSubmit}
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

  const createForm = (
    <Box
      className="createRequest"
      sx={{
        flexDirection: 'column',
        display: 'flex',
        p: 2,
        paddingLeft: '40px',
        paddingRight: '30px',
        textAlign: 'left',
        // width:"100%"
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
            paddingBottom: '20px',
            paddingTop: '10px',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">Create Request</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: !active ? 'row' : 'column',
            }}
          >
            {/* <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            <button className={classes.backButton} onClick={handleOpenViewLog}>
              View Log
            </button>
          </Box>
          <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            |
          </Box> */}
            <Box
              sx={{
                paddingLeft: 5,
              }}
            >
              <button
                className="backButton"
                //className={classes.backButton}
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

        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
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
                  // disabled
                >
                  <option disabled value="">
                    --- Select Request Type ---
                  </option>
                  {constants.requestTypes.map((type) => {
                    return (
                      <option value={type.name} key={type.name}>
                        {type.text}
                      </option>
                    )
                  })}
                </select> */}
                <Select
                  value={constants.requestTypes.filter(
                    (item) => item.value === requestType
                  )}
                  // isDisabled={data !== [] ? false : true}
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
          {/* {shoutOut !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {shoutOut}
                </Typography>
              </Box>
            </Box>
          )} */}
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
                {/* {typeAheadSearch} */}
                <OutlinedInput
                  value={empIdInput}
                  inputRef={focusEmpId}
                  onKeyPress={(e) => {}}
                  onChange={(e) => {
                    // if (e.target.value === '') {
                    setEmpAvailable(false)
                    // }
                    setIsPageModified(true)
                    setEmpIdInput(e.target.value)
                    setFirstName('')
                    setMiddleName('')
                    setLastName('')
                    setEmail('')
                    setDesignation('')
                    setErrorEmployeeId('')
                    setOpenAdditional(false)
                  }}
                  className={classes.inputFields}
                  style={{ backgroundColor: 'white' }}
                  placeholder="Search Employee ID"
                  required={true}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearchEmployee} edge="end">
                        <SearchOutlined />
                      </IconButton>
                    </InputAdornment>
                  }
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
          {shoutOut !== '' && (
            <Box className={classes.eachRow}>
              <Box className={classes.inputLabel}></Box>
              <Box className={classes.inputFieldBox} justifyContent="center">
                <Typography variant="subtitle2" color="error">
                  {shoutOut}
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
                  placeholder=""
                  className={classes.inputFields}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  value={firstName}
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
                  placeholder=""
                  className={classes.inputFields}
                  onChange={(e) => {
                    setMiddleName(e.target.value)
                  }}
                  value={middleName}
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
                  placeholder=""
                  className={classes.inputFields}
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  value={lastName}
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
                  placeholder=""
                  className={classes.inputFields}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  value={email}
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
                    placeholder=""
                    disabled
                    className={classes.designationField}
                    onChange={(e) => {
                      setDesignation(e.target.value)
                    }}
                    value={designation}
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

            <Box className={classes.inputFieldBox}>{groupSelect}</Box>
          </Box>
          {/* {groups.length === 0 && errorGroups !== '' && ( */}
          {groupInput.length === 0 && errorGroups !== '' && (
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
                  placeholder="Please provide comments"
                  onChange={(e) => {
                    setIsPageModified(true)
                    setComments(e.target.value)
                  }}
                  value={comments}
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
                // size="small"
              >
                <span className="addUserGroup">Additional Data</span>
              </button>
            </Box>
          </Box>

          <Box
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
            >
              <Button
                variant="contained"
                color="primary"
                // className={
                //   UtilityFunctions.isHidden(
                //     '8',
                //     appFuncList ? appFuncList : [],
                //     'reject'
                //   )
                //     ? classes.hideit
                //     : classes.whiteButton
                // }
                className={classes.hideit}
                size="small"
              >
                Reject
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: !forbutton ? 'row' : 'column',
                alignItems: !forbutton ? 'center' : 'center',
                justifyContent: !forbutton ? 'space-between' : 'center',
              }}
            >
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
                // onClick={handleCreateRequestforSubmit}
                onClick={handleSubmitAfterDialog}
                disabled={disabled}
                // onClick={() => {
                //   setSubmitFn(handleCreateRequestforSubmit)
                // }}
              >
                Submit
              </Button>

              <Button
                variant="contained"
                color="primary"
                // className={
                //   UtilityFunctions.isHidden(
                //     '8',
                //     appFuncList ? appFuncList : [],
                //     'reassign'
                //   )
                //     ? classes.hideit
                //     : classes.buttons
                // }
                className={classes.hideit}
                size="small"
              >
                Reassign
              </Button>

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
                // onClick={() => setSubmitFn(handleCreateRequestforApprove)}
                // onClick={handleCreateRequestforApprove}
                onClick={handleApproveAfterDialog}
                disabled={disabled}
              >
                Approve
              </Button>
            </Box>
          </Box>
        </form>
        <LoadingComponent showLoader={isProgressLoader} />
      </div>
    </Box>
  )
  useEffect(() => {
    console.log(isSuccessCall)
  }, [isSuccessCall])

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
            {viewLog}
            {viewAdditionalInfo}
            {viewConfirmApprove}
            {viewConfirmSubmit}
            {viewConfirmBack}
          </Grid>
          {/* </Grid> */}
        </Box>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    rolesArray: state.loginReducer.rolesArray,
    appFuncList: state.loginReducer.appFuncList,
    userDetail: state.loginReducer.userDetail,
  }
}
export default connect(mapStateToProps, null)(UserCreate)
