import { Column } from 'primereact/column'
// import {  } from 'primereact/tooltip'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'
// import './TooltipDemo.css'
import { Toast } from 'primereact/toast'
import {
  Buyers,
  BuyingAssistants,
  manageEventPublishCols,
  manageTaskPublishCols,
  manageTaskPublishRows,
  Merchandisers,
  OwnBrandManagers,
  RangeResetManagers,
  SeniorBuyingManagers,
  SupplyChainSpecialists,
  CategoryDirectors,
  // classOptions,
  // resetTypes,
  groups,
  categories,
  departments,
  wastageRanges,
  yesOrNo,
  userGroupOptions,
  // manageEventDummyData,
  // ManagePageApiData,
} from './DataConstants'
import {
  Grid,
  useTheme,
  Typography,
  Button,
  TextField,
  Tooltip,
  Box,
  Dialog,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  useMediaQuery,
  MenuItem,
  Select,
  OutlinedInput,
  Paper,
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import { Autocomplete } from '@material-ui/lab'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import { ConfirmedBodyStyle, ConfirmedHeaderStyle, useStyles } from './styles'
import { life, routes, extensions } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import {
  getProductHierarchyListAPI,
  getUsersAPIByEmailAndRole,
  // getManageEventByEventIdAPI,
  getUsersAPIByRole,
  // putManageEventByEventIdAPI,
  claimEventsCamunda,
  getResetTypes,
  getEventDetailsById,
  publishEventsCamunda,
  getWastageRanges,
  postFileAttachmentRangeResetAPI,
  putCamundaMileStoneUpdate,
  deleteEventsCamunda,
  getPlanogramClasses,
} from '../../../api/Fetch'
import SearchSelect from '../../components/SearchSelect/SearchSelect'
import ConfirmCheckSign from '../../components/ConfirmCheck/ConfirmCheckSign'
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'
import { connect } from 'react-redux'
import {
  // resetErrorFile,
  // resetFile,
  // setFile,
  resetTaskFile,
} from '../../../redux/Actions/FileUpload'
import '../../../styles/global/helpers.css'
import { findAllByDisplayValue } from '@testing-library/react'
import { styled } from '@material-ui/styles'

const Input = styled('input')({
  display: 'none',
})
function ManageEventCreate(props: any) {
  const {
    // fileErrorData,
    fileManageData,
    // setFile,
    // resetErrorFile,
    resetTaskFile,
  } = props

  const location = useLocation<any>()
  const history = useHistory()
  const theme1 = useTheme()
  const aboveSm = useMediaQuery(theme1.breakpoints.up('sm'))
  const classes = useStyles()

  const { DEFAULT, RANGEAMEND_EVENTDASH, RANGEAMEND_MANAGE } = routes

  const [resetTypes, setResetTypes] = useState<any>()
  const [eventDetails, setEventDetails] = useState<any>()
  const [team, setTeam] = useState<any>()
  const [eventName, setEventName] = useState<any>('')
  const [group, setGroup] = useState<any>('')
  const [category, setCategory] = useState<any>('')
  const [department, setDepartment] = useState<any>('')
  const [taskDetails, setTaskDetails] = useState<any>()
  const [taskDetails2, setTaskDetails2] = useState<any>()
  // const [taskDetails, setTaskDetails] = useState<any>()
  const [singleTask, setSingleTask] = useState<any>()
  const [selectTasks, setSelectTasks] = useState<any>()
  const [classValues, setClassValues] = useState<any>()
  const [classConfirmed, setClassConfirmed] = useState<any>()
  const [userGroup, setUserGroup] = useState<any>()
  const [userGroupValue, setUserGroupValue] = useState<any>()
  const [buyer, setBuyer] = useState<any>('')
  const [buyerValue, setBuyerValue] = useState<any>('')
  const [buyerConfirmed, setBuyerConfirmed] = useState<any>(false)
  const [buyingAssistant, setBuyingAssistant] = useState<any>('')
  const [buyingAssistantValue, setBuyingAssistantValue] = useState<any>('')
  const [buyingAssistantConfirmed, setBuyingAssistantConfirmed] =
    useState<any>(false)
  const [ownBrandManager, setOwnBrandManager] = useState<any>('')
  const [ownBrandManagerValue, setOwnBrandManagerValue] = useState<any>('')
  const [ownBrandManagerConfirmed, setOwnBrandManagerConfirmed] =
    useState<any>(false)
  const [seniorBuyingManager, setSeniorBuyingManager] = useState<any>('')
  const [seniorBuyingManagerValue, setSeniorBuyingManagerValue] =
    useState<any>('')
  const [seniorBuyingManagerConfirmed, setSeniorBuyingManagerConfirmed] =
    useState<any>(false)
  const [merchandiser, setMerchandiser] = useState<any>('')
  const [merchandiserValue, setMerchandiserValue] = useState<any>('')
  const [merchandiserConfirmed, setMerchandiserConfirmed] = useState<any>(false)
  const [rangeResetManager, setRangeResetManager] = useState<any>('')
  const [rangeResetManagerValue, setRangeResetManagerValue] = useState<any>('')
  const [rangeResetManagerConfirmed, setRangeResetManagerConfirmed] =
    useState<any>(false)
  const [categoryDirector, setCategoryDirector] = useState<any>('')
  const [categoryDirectorValue, setCategoryDirectorValue] = useState<any>('')
  const [categoryDirectorConfirmed, setCategoryDirectorConfirmed] =
    useState<any>(false)
  const [supplyChainSpecialist, setSupplyChainSpecialist] = useState<any>('')
  const [supplyChainSpecialistValue, setSupplyChainSpecialistValue] =
    useState<any>('')
  const [supplyChainSpecialistConfirmed, setSupplyChainSpecialistConfirmed] =
    useState<any>(false)

  const [classOpen, setClassOpen] = useState(false)
  const [groupsOpen, setGroupsOpen] = useState(false)
  const [updateEventOpen, setUpdateEventOpen] = useState(false)
  const [removeTaskOpen, setRemoveTaskOpen] = useState(false)
  const [saveEventTaskButton, setsaveEventTaskButton] = useState(false)

  const [groupOptions, setGroupOptions] = useState<any>([])
  const [categoryOptions, setCategoryOptions] = useState<any>([])
  const [departmentOptions, setDepartmentOptions] = useState<any>([])
  const [classOptions, setClassOptions] = useState<any>([])
  const [wastageRangeOptions, setWastageRangeOptions] = useState<any>([])
  const [errBuyer, setErrBuyer] = useState<any>(false)
  const [buyerError1, setBuyerError1] = useState<any>('')
  const [errBuyerAssisant, setErrBuyerAssisant] = useState<any>(false)
  const [buyingAssistentError1, setBuyingAssistentError1] = useState<any>('')
  const [errOwnBrandManager, setErrOwnBrandManager] = useState<any>(false)
  const [ownBrandManagerError1, setOwnBrandManagerError1] = useState<any>('')
  const [errSeniorBuyingManager, setErrSeniorBuyingManager] =
    useState<any>(false)
  const [seniorBuyingManagerError1, setSeniorBuyingManagerError1] =
    useState<any>('')
  const [errMerchandiser, setErrMerchandiser] = useState<any>(false)
  const [errRangeResetManager, setErrRangeResetManager] = useState<any>(false)
  const [errCategoryDirector, setErrCategoryDirector] = useState<any>(false)
  const [errSupplyChainSpecialist, setErrSupplyChainSpecialist] =
    useState<any>(false)
  const [merchandiserError1, setMerchandiserError1] = useState<any>('')
  const [rangeResetManagerError1, setRangeResetManagerError1] =
    useState<any>('')
  const [categoryDirectorError1, setCategoryDirectorError1] = useState<any>('')
  const [supChainSpecialistError1, setSupChainSpecialistError1] =
    useState<any>('')
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [confirmEnDis, setConfirmEnDis] = useState<any>(false)
  const [cancelledEvent, setCancelledEvent] = useState<any>(false)
  const [publishVisible, setPublishVisible] = useState(true)
  const [saveVisible, setSaveVisible] = useState(false)
  const [buyerAssign, setBuyerAssign] = useState([])
  const [buyerAssistentAssign, setAssistentAssign] = useState([])
  const [srBuyerAssign, setSrBuyerAssign] = useState([])
  const [ownBrandManAssign, setOwnBrandManAssign] = useState([])
  const [merchandiserAssign, setMerchandiserAssign] = useState([])
  const [rangeResetAssign, setRangeResetAssign] = useState([])
  const [catDirectorAssign, setCatDirectorAssign] = useState([])
  const [supplyChainAssign, setSupplyChainAssign] = useState([])
  const [inputTextareaValue, setInputTextareaValue] = useState<any>('')
  const [roldIdAssign, setRoleIdAssign] = useState<any>('')
  const [grpVal, setGrpVal] = useState('')
  const [catVal, setCatVal] = useState('')
  const [depVal, setDepVal] = useState('')
  const [cptVal, setCptVal] = useState('')
  const [gscopVal, setGscopVal] = useState('')
  const [sotVal, setSotVal] = useState('')

  const [isProgressLoader, setIsProgressLoader] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)

  const [saveConfirm, setSaveConfirm] = useState(false)
  const [removeConfirm, setRemoveConfirm] = useState(false)
  const [publishConfirm, setPublishConfirm] = useState(false)
  const [cancelConfirm, setCancelConfirm] = useState(false)
  const [launchDateConfirm, setLaunchDateConfirm] = useState(false)
  const [launchDateOld, setLaunchDateOld] = useState<any>()
  const [launchDateNew, setLaunchDateNew] = useState<any>()
  const [dueDateErrorCount, setDueDateErrorCount] = useState<any>('')
  const [dueDateErrorOpen, setDueDateErrorOpen] = useState(false)
  const [dueDateErrorTasks, setDueDateErrorTasks] = useState<any>('')
  const [milestone, setMilestone] = useState<any>('')
  const [userAssRadio, setUserAssRadio] = useState<any>()
  const [currentTask, setCurrentTask] = useState<any>()
  const [eventSaved, setEventSaved] = useState(false)
  const [dueDateChangePublish, setDueDateChangePublish] = useState(false)

  // const [referenceDocData, setReferenceDocData] = React.useState<Array<any>>([])
  const [referenceDocData, setReferenceDocData] = React.useState<any>()
  const [wrongExtn, setWrongExtn] = React.useState(false)
  const [attachmentUrlArr, setAttachmentUrlArr] = React.useState<Array<string>>(
    []
  )
  const [emailsHeader, setEmailHeaders] = useState<any>([])
  const [eventPrevName, setEventPrevName] = useState<string>()

  const toast = useRef<any>(null)
  const [toastRemove, setToastRemove] = React.useState('')

  useEffect(() => {
    // return () => resetErrorFile()
    return () => resetTaskFile()
  }, [])

  // useEffect(() => {
  //   if (!fileData[0]) {
  //     history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
  //   } else {
  //     console.log(fileData)
  //     setEventDetails(fileData)
  //     // setEventName(fileData[0]['eventName'])
  //     setEventId()
  //   }
  //   return () => setEventDetails([])
  // }, [])

  const getEventAndTasks = () => {
    getEventDetailsById(fileManageData && fileManageData.id)
      .then((res: any) => {
        let data = res.data
        const eventData = data.eventDetailsList[0].rangeEventRequest
        console.log('EVENTID', eventData)
        const milestoneData = data.eventDetailsList[0].milestones

        // Below original API CALL

        // const eventData = res.data.eventDetailsList[0].rangeEventRequest
        // const milestoneData = res.data.eventDetailsList[0].milestones
        // console.log('EVENTID', eventData)

        const manageList = [
          {
            eventStatus: eventData.eventStatus,
            resetType: eventData.eventHeader.resetType,
            category: eventData.eventHeader.eventHierarchy.category,
            categoryId: eventData.eventHeader.eventHierarchy.categoryId,
            department: eventData.eventHeader.eventHierarchy.department,
            departmentId: eventData.eventHeader.eventHierarchy.departmentId,
            tradeGroup: eventData.eventHeader.eventHierarchy.tradingGroup,
            eventId: eventData.eventId,
            taskIdEvent: eventData.taskId,
            targetDate:
              eventData.eventHeader.eventLaunchDate &&
              eventData.eventHeader.eventLaunchDate.split(' ')[0],
            appDueDate: eventData.eventHeader.rafAppDueDate
              ? eventData.eventHeader.rafAppDueDate.split(' ')[0]
              : null,
            eventName: eventData.eventHeader.eventName,
            planogramClass:
              eventData.eventHeader.inventoryControl.planogramClass,
            clearancePriceCheck:
              eventData.eventHeader.inventoryControl.isClearancePriceApplied,
            orderStopDateCheck:
              eventData.eventHeader.inventoryControl
                .isOrderStopDateCheckRequired,
            stopOrder:
              eventData.eventHeader.inventoryControl.isStopOrderStockRundown,
            wastageRange:
              eventData.eventHeader.inventoryControl.storeWastetiming,
            buyerEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'BUYER',
            },
            buyerAssistantEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'BYAST',
            },
            ownBrandManagerEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'OWNBRM',
            },
            seniorBuyingManagerEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'SRBYM',
            },
            merchandiserEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'MERCH',
            },
            rangeResetManagerEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'RRMNGR',
            },
            categoryDirectorEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'CTDIR',
            },
            supplyChainAnalystEmailId: {
              persona: '',
              emailId: '',
              name: '',
              userId: '',
              roleId: 'SCSPL',
            },
            requesterEmailId: eventData.requester.details.emailId,
            requesterName: eventData.requester.details.name,
            requesteruserId: eventData.requester.details.userId,
            requesterRole: eventData.requester.roles,
            requesterUserGroup: eventData.requester.usergroups,
            requesterPersona: eventData.requester.persona,
          },
        ]

        eventData.eventHeader.eventTeam.team.map((val: any) => {
          // if (val.roles[0].roleId === 'Buyer') {
          //   manageList[0].buyerEmailId = val.details.emailId
          // }
          // if (val.roles[0].roleId === 'Buying Assistant') {
          //   manageList[0].buyerAssistantEmailId = val.details.emailId
          // }
          if (val.persona === 'Buyer') {
            manageList[0].buyerEmailId.persona = val.persona
            manageList[0].buyerEmailId.emailId = val.details.emailId
            manageList[0].buyerEmailId.name = val.details.name
            manageList[0].buyerEmailId.userId = val.details.userId
          }
          if (
            val.persona === 'Buying Assistant' ||
            val.persona === 'Buyer Assistant'
          ) {
            manageList[0].buyerAssistantEmailId.persona = val.persona
            manageList[0].buyerAssistantEmailId.emailId = val.details.emailId
            manageList[0].buyerAssistantEmailId.name = val.details.name
            manageList[0].buyerAssistantEmailId.userId = val.details.userId
          }
          if (val.persona === 'Range Reset Manager') {
            manageList[0].rangeResetManagerEmailId.persona = val.persona
            manageList[0].rangeResetManagerEmailId.emailId = val.details.emailId
            manageList[0].rangeResetManagerEmailId.name = val.details.name
            manageList[0].rangeResetManagerEmailId.userId = val.details.userId
          }

          if (val.persona === 'Own Brand Manager') {
            manageList[0].ownBrandManagerEmailId.persona = val.persona
            manageList[0].ownBrandManagerEmailId.emailId = val.details.emailId
            manageList[0].ownBrandManagerEmailId.name = val.details.name
            manageList[0].ownBrandManagerEmailId.userId = val.details.userId
          }
          if (
            val.persona === 'Sr. Buying Manager' ||
            val.persona === 'Senior Buying Manager'
          ) {
            manageList[0].seniorBuyingManagerEmailId.persona = val.persona
            manageList[0].seniorBuyingManagerEmailId.emailId =
              val.details.emailId
            manageList[0].seniorBuyingManagerEmailId.name = val.details.name
            manageList[0].seniorBuyingManagerEmailId.userId = val.details.userId
          }
          if (
            val.persona === 'Merchandiser' ||
            val.persona === 'Merchendiser'
          ) {
            manageList[0].merchandiserEmailId.persona = val.persona
            manageList[0].merchandiserEmailId.emailId = val.details.emailId
            manageList[0].merchandiserEmailId.name = val.details.name
            manageList[0].merchandiserEmailId.userId = val.details.userId
          }
          if (val.persona === 'Category Director') {
            manageList[0].categoryDirectorEmailId.persona = val.persona
            manageList[0].categoryDirectorEmailId.emailId = val.details.emailId
            manageList[0].categoryDirectorEmailId.name = val.details.name
            manageList[0].categoryDirectorEmailId.userId = val.details.userId
          }
          if (
            val.persona === 'Supply Chain Specialist' ||
            val.persona === 'Supplychain Specialist'
          ) {
            manageList[0].supplyChainAnalystEmailId.persona = val.persona
            manageList[0].supplyChainAnalystEmailId.emailId =
              val.details.emailId
            manageList[0].supplyChainAnalystEmailId.name = val.details.name
            manageList[0].supplyChainAnalystEmailId.userId = val.details.userId
          }
        })
        const manageTeamData = [
          manageList[0].buyerEmailId,
          manageList[0].buyerAssistantEmailId,
          manageList[0].rangeResetManagerEmailId,
          manageList[0].ownBrandManagerEmailId,
          manageList[0].seniorBuyingManagerEmailId,
          manageList[0].merchandiserEmailId,
          manageList[0].categoryDirectorEmailId,
          manageList[0].supplyChainAnalystEmailId,
        ]
        // console.log('TEAMSSSSS', manageTeamData)

        const manageTask = milestoneData.map((milestone: any) => {
          let roleIdUI =
            milestone.assigneeRole === 'Buyer'
              ? 'BUYER'
              : milestone.assigneeRole === 'Buying Assistant' ||
                milestone.assigneeRole === 'Buyer Assistant'
              ? 'BYAST'
              : milestone.assigneeRole === 'Own Brand Manager'
              ? 'OWNBRM'
              : milestone.assigneeRole === 'Senior Buying Manager' ||
                milestone.assigneeRole === 'Sr. Buying Manager'
              ? 'SRBYM'
              : milestone.assigneeRole === 'Merchandiser'
              ? 'MERCH'
              : milestone.assigneeRole === 'Category Director'
              ? 'CTDIR'
              : milestone.assigneeRole === 'Supply Chain Specialist' ||
                milestone.assigneeRole === 'Supplychain Specialist'
              ? 'SCSPL'
              : milestone.assigneeRole === 'Range Reset Manager'
              ? 'RRMNGR'
              : ''
          return {
            taskId2: milestone.milestoneTaskId,
            taskId: milestone.taskName,
            status: milestone.status,
            activeTaskId: milestone.activeTaskId,
            slaDate: milestone.slaDate,
            task: milestone.taskDescription,
            dueDate: milestone.dueDate,
            notifiedDate: milestone.notifyDate,
            healthcheckDate: milestone.healthcheckDate,
            assignedUserGroup: milestone.assigneeRole,
            name: milestone.assigneeDetails.name,
            userId: milestone.assigneeDetails.userId,
            emailId: milestone.assigneeDetails.emailId
              ? milestone.assigneeDetails.emailId
              : '',
            visibility: milestone.visibility, //'ACTIVE',
            roleId: roleIdUI,

            weeksPrior: milestone.weeksPrior,
          }
        })
        console.log(manageTask)
        console.log(manageList)

        let taskList = manageTask.sort((x: any, y: any) =>
          x.taskId.localeCompare(y.taskId, 'en', { numeric: true })
        )
        console.log(taskList)

        setTaskDetails(taskList)
        // setTaskDetails2(manageTask)
        console.log('1')
        setEventDetails(manageList)
        setGroup(manageList[0].tradeGroup)
        setCategory(manageList[0].category)
        setDepartment(manageList[0].department)
        setEmailHeaders([
          manageList[0].buyerEmailId,
          manageList[0].buyerAssistantEmailId,
          manageList[0].ownBrandManagerEmailId,
          manageList[0].seniorBuyingManagerEmailId,
          manageList[0].merchandiserEmailId,
          manageList[0].rangeResetManagerEmailId,
          manageList[0].categoryDirectorEmailId,
          manageList[0].supplyChainAnalystEmailId,
        ])
        setEventPrevName(eventData.eventHeader.eventName)
        let classValue =
          manageList[0].planogramClass &&
          manageList[0].planogramClass.map((c: any) => {
            return {
              value: c,
              label: c,
            }
          })
        setClassValues(classValue)
        // dueDateErrorCount === '' && setLaunchDateOld(manageList[0].targetDate)
        console.log('target date', manageList[0].targetDate)
        !launchDateOld && setLaunchDateOld(manageList[0].targetDate)
        setTeam(manageTeamData)
        if (
          eventData.eventStatus === 'Confirmed' ||
          eventData.eventStatus === 'Published'
        ) {
          console.log('Confirmedddddddd', eventData.eventStatus)
          setConfirmEnDis(true)
        } else if (eventData.eventStatus === 'Cancelled') {
          setCancelledEvent(true)
        }
        setIsProgressLoader(false)
      })
      .catch((err: any) => {
        console.log('EVENTID', err)
        setIsProgressLoader(false)
      })
  }

  useEffect(() => {
    // console.log('manageEventDummyData', manageEventDummyData)
    // console.log('ManagePageApiData', ManagePageApiData) // 1706 //9039 /1644 //9043 ADMIN //9044 RRM //9047
    // console.log(fileErrorData)
    if (fileManageData && fileManageData.id) {
      setIsProgressLoader(true)
      setTableLoading(true)
      console.log(fileManageData)
      setEventName(fileManageData.name)
      // getEventDetailsById(fileErrorData && fileErrorData.id)
      getEventAndTasks()
      setTableLoading(false)
    } else {
      history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
    }
  }, [])

  //apisri
  // useEffect(() => {
  //   getProductHierarchyListAPI &&
  //     getProductHierarchyListAPI('group')
  //       .then((res: any) => {
  //         const grpList = res.data.hierarchyNode.map((item: any) => {
  //           return {
  //             value: item.groupName,
  //             label: item.groupName,
  //             id: item.group,
  //             hierGroup: 'group',
  //           }
  //         })
  //         setGroupOptions(grpList)
  //         console.log('group length: ', grpList.length)
  //       })
  //       .catch((err: any) => setGroupOptions([]))
  // }, [])

  useEffect(() => {
    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('group')
        .then((res: any) => {
          const groupList = res.data.hierarchyNode.map((item: any) => {
            return {
              label: item.groupName,
              value: item.groupName,
              groupName: item.groupName,
            }
          })
          let list = groupList.sort((x: any, y: any) =>
            x.label.localeCompare(y.label)
          )
          console.log(list)
          setGroupOptions(list)
          // console.log(groupList)
        })
        .catch((err: any) => setGroupOptions([]))
  }, [])

  // useEffect(() => {
  //   getResetTypes()
  //     .then((res: any) => {
  //       console.log('getResetTypes', res)
  //       const types = res.data.map((val: any) => {
  //         return {
  //           name: val.configValue,
  //           text: val.configValue,
  //         }
  //       })
  //       setResetTypes(types)
  //     })
  //     .catch((err: any) => {
  //       console.log('getResetTypesERROR', err)
  //     })
  // },[])

  // useEffect(() => {
  //   console.log(group)
  //   getProductHierarchyListAPI &&
  //     getProductHierarchyListAPI('category')
  //       .then((res: any) => {
  //         const categoryList = res.data.hierarchyNode.map((item: any) => {
  //           return {
  //             value: item.categoryName,
  //             label: item.categoryName,
  //             id: item.category,
  //             hierGroup: 'category',
  //             groupName: item.groupName,
  //             groupId: item.group,
  //           }
  //         })
  //         setCategoryOptions(categoryList)

  //         // group &&
  //         //   setCategoryOptions(
  //         //     categoryList.filter((cat: any) => cat.groupId === group.id)
  //         //   )
  //         // group &&
  //         //   console.log(
  //         //     'category length: ',
  //         //     categoryList.filter((cat: any) => cat.groupId === group.id)
  //         //   )
  //       })
  //       .catch((err: any) => setCategoryOptions([]))
  // }, [group])

  useEffect(() => {
    console.log(grpVal)
    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('category')
        .then((res: any) => {
          const categoryList = res.data.hierarchyNode.map((item: any) => {
            return {
              value: item.categoryName,
              label: item.categoryName,
              categoryId: item.category,
              categoryName: item.categoryName,
              groupName: item.groupName,
            }
          })
          let list = categoryList.sort((x: any, y: any) =>
            x.label.localeCompare(y.label)
          )

          grpVal &&
            setCategoryOptions(
              list.filter((cat: any) => cat.groupName === grpVal)
            )
          group &&
            console.log(
              'category length: ',
              categoryList.filter((cat: any) => cat.groupName === grpVal)
            )
        })
        .catch((err: any) => setCategoryOptions([]))
  }, [grpVal])

  // useEffect(() => {
  //   // if (group && category) {
  //   getProductHierarchyListAPI &&
  //     getProductHierarchyListAPI('department')
  //       .then((res: any) => {
  //         const depList = res.data.hierarchyNode.map((item: any) => {
  //           return {
  //             value: item.departmentName,
  //             label: item.departmentName,
  //             id: item.department,
  //             hierGroup: 'department',
  //             groupName: item.groupName,
  //             categoryName: item.categoryName,
  //             groupId: item.group,
  //             categoryId: item.category,
  //           }
  //         })
  //         setDepartmentOptions(depList)
  //         // setDepartmentOptions(
  //         //   depList.filter(
  //         //     (dep: any) =>
  //         //       dep.groupId === group.id && dep.categoryId === category.id
  //         //   )
  //         // )
  //         // console.log(
  //         //   'department length: ',
  //         //   depList.filter(
  //         //     (dep: any) =>
  //         //       dep.groupId === group.id && dep.categoryId === category.id
  //         //   )
  //         // )
  //         // setLoaded(true)
  //       })
  //       .catch((err: any) => {
  //         setDepartmentOptions([])
  //         // setLoaded(true)
  //       })
  //   // }
  // }, [department])

  useEffect(() => {
    if (grpVal && catVal) {
      getProductHierarchyListAPI &&
        getProductHierarchyListAPI('department')
          .then((res: any) => {
            const depList = res.data.hierarchyNode.map((item: any) => {
              return {
                value: item.departmentName,
                label: item.departmentName,
                departmentId: item.department,
                departmentName: item.departmentName,
                groupName: item.groupName,
                categoryName: item.categoryName,
                categoryId: item.category,
              }
            })
            let list = depList.sort((x: any, y: any) =>
              x.label.localeCompare(y.label)
            )

            setDepartmentOptions(
              list.filter(
                (dep: any) =>
                  dep.groupName === grpVal && dep.categoryName === catVal
              )
            )

            console.log(
              'department length: ',
              depList.filter(
                (dep: any) =>
                  dep.groupName === grpVal && dep.categoryName === catVal
              )
            )
            // setLoaded(true)
          })
          .catch((err: any) => {
            setDepartmentOptions([])
            // setLoaded(true)
          })
    }
  }, [catVal])

  useEffect(() => {
    getPlanogramClasses().then((res: any) => {
      const options = res.data.map((item: any) => {
        return {
          value: item.configValue,
          label: item.configValue,
        }
      })
      setClassOptions(options)
    })
  }, [])

  useEffect(() => {
    getWastageRanges()
      .then((res: any) => {
        const options = res.data.map((item: any) => {
          return {
            value: item.configDescription,
            label: item.configDescription,
          }
        })
        console.log(options)
        setWastageRangeOptions(options)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  const userDetailsApi = (rowdata: any) => {
    setIsProgressLoader(true)
    setMilestone(rowdata)
    let roleIdTask = ''
    if (userGroup === 'Buyer') {
      roleIdTask = 'BUYER'
    } else if (
      userGroup === 'Buying Assistant' ||
      userGroup === 'Buyer Assistant'
    ) {
      roleIdTask = 'BYAST'
    } else if (userGroup === 'Own Brand Manager') {
      roleIdTask = 'OWNBRM'
    } else if (
      userGroup === 'Senior Buying Manager' ||
      userGroup === 'Sr. Buying Manager'
    ) {
      roleIdTask = 'SRBYM'
    } else if (userGroup === 'Merchandiser') {
      roleIdTask = 'MERCH'
    } else if (userGroup === 'Range Reset Manager') {
      roleIdTask = 'RRMNGR'
    } else if (userGroup === 'Category Director') {
      roleIdTask = 'CTDIR'
    } else if (
      userGroup === 'Supply Chain Specialist' ||
      userGroup === 'Supplychain Specialist'
    ) {
      roleIdTask = 'SCSPL'
    } else {
      roleIdTask = ''
    }
    {
      userGroup &&
        getUsersAPIByRole &&
        getUsersAPIByRole(roleIdTask)
          .then((res: any) => {
            const userDetails = res.data.userdetails.map((val: any) => {
              return {
                email: val.user.emailId,
                label: val.user.firstName + ' ' + val.user.lastName,
                value: val.user.emailId,
                userId: val.user.userId,
                roleId: val.roles[0].roleId,
              }
            })
            console.log('Buyer userDetails', userDetails)
            if (userGroup === 'Buyer') {
              setBuyerAssign(userDetails)
              // setUserGroupValue(eventDetails[0].buyerEmailId.emailId)
              console.log('taskDetails---taskDetails', taskDetails)
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )

                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'BUYER' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (eventDetails[0].buyerEmailId.emailId === a[0].emailId) {
                  setUserGroupValue(eventDetails[0].buyerEmailId.emailId)
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(eventDetails[0].buyerEmailId.emailId)
                }
              }
            } else if (
              userGroup === 'Buying Assistant' ||
              userGroup === 'Buyer Assistant'
            ) {
              setAssistentAssign(userDetails)
              // setUserGroupValue(eventDetails[0].buyerAssistantEmailId.emailId)
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )
                // let obj = taskDetails.find(
                //   (o: any) => o.emailId === a[0].emailId
                // )
                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'BYAST' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (
                  eventDetails[0].buyerAssistantEmailId.emailId === a[0].emailId
                ) {
                  setUserGroupValue(
                    eventDetails[0].buyerAssistantEmailId.emailId
                  )
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(
                    eventDetails[0].buyerAssistantEmailId.emailId
                  )
                }
              }
            } else if (userGroup === 'Own Brand Manager') {
              setOwnBrandManAssign(userDetails)
              // setUserGroupValue(eventDetails[0].ownBrandManagerEmailId.emailId)
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )
                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'OWNBRM' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (
                  eventDetails[0].ownBrandManagerEmailId.emailId ===
                  a[0].emailId
                ) {
                  setUserGroupValue(
                    eventDetails[0].ownBrandManagerEmailId.emailId
                  )
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(
                    eventDetails[0].ownBrandManagerEmailId.emailId
                  )
                }
              }
            } else if (
              userGroup === 'Senior Buying Manager' ||
              userGroup === 'Sr. Buying Manager'
            ) {
              setSrBuyerAssign(userDetails)
              // setUserGroupValue(
              //   eventDetails[0].seniorBuyingManagerEmailId.emailId
              // )
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )
                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'SRBYM' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (
                  eventDetails[0].seniorBuyingManagerEmailId.emailId ===
                  a[0].emailId
                ) {
                  setUserGroupValue(
                    eventDetails[0].seniorBuyingManagerEmailId.emailId
                  )
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(
                    eventDetails[0].seniorBuyingManagerEmailId.emailId
                  )
                }
              }
            } else if (userGroup === 'Merchandiser') {
              setMerchandiserAssign(userDetails)
              // setUserGroupValue(eventDetails[0].merchandiserEmailId.emailId)
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )
                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'MERCH' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (
                  eventDetails[0].merchandiserEmailId.emailId === a[0].emailId
                ) {
                  setUserGroupValue(eventDetails[0].merchandiserEmailId.emailId)
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(eventDetails[0].merchandiserEmailId.emailId)
                }
              }
            } else if (userGroup === 'Range Reset Manager') {
              setRangeResetAssign(userDetails)
              // setUserGroupValue(
              //   eventDetails[0].rangeResetManagerEmailId.emailId
              // )
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )
                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'RRMNGR' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (
                  eventDetails[0].rangeResetManagerEmailId.emailId ===
                  a[0].emailId
                ) {
                  setUserGroupValue(
                    eventDetails[0].rangeResetManagerEmailId.emailId
                  )
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(
                    eventDetails[0].rangeResetManagerEmailId.emailId
                  )
                }
              }
            } else if (userGroup === 'Category Director') {
              setCatDirectorAssign(userDetails)
              // setUserGroupValue(eventDetails[0].categoryDirectorEmailId.emailId)
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )
                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'CTDIR' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (
                  eventDetails[0].categoryDirectorEmailId.emailId ===
                  a[0].emailId
                ) {
                  setUserGroupValue(
                    eventDetails[0].categoryDirectorEmailId.emailId
                  )
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(
                    eventDetails[0].categoryDirectorEmailId.emailId
                  )
                }
              }
            } else if (
              userGroup === 'Supply Chain Specialist' ||
              userGroup === 'Supplychain Specialist'
            ) {
              setSupplyChainAssign(userDetails)
              // setUserGroupValue(
              //   eventDetails[0].supplyChainAnalystEmailId.emailId
              // )
              if (taskDetails) {
                let a = taskDetails.filter(
                  (t: any) => t.taskId === rowdata.taskId
                )
                let obj = taskDetails.filter((val: any) => {
                  if (val.roleId === 'SCSPL' && val.emailId === a[0].emailId) {
                    return true
                  }
                  return false
                })
                if (
                  eventDetails[0].supplyChainAnalystEmailId.emailId ===
                  a[0].emailId
                ) {
                  setUserGroupValue(
                    eventDetails[0].supplyChainAnalystEmailId.emailId
                  )
                } else if (obj.length !== 0) {
                  setUserGroupValue(a[0].emailId)
                } else {
                  setUserGroupValue(
                    eventDetails[0].supplyChainAnalystEmailId.emailId
                  )
                }
              }
            }
            setIsProgressLoader(false)
          })
          .catch((err: any) => {
            console.log('Buyer ERROR', err)
            setIsProgressLoader(false)
          })
    }
  }
  useEffect(() => {
    userDetailsApi(milestone)
  }, [userGroup])

  const goBack = () => {
    history.goBack()
    resetTaskFile()
  }

  // useEffect(() => {
  // console.log(location.state.data)
  // const data = location.state.data
  // if (fileData) {
  //   console.log(fileData)
  //   setEventDetails(fileData)
  //   setEventName(fileData[0]['eventName'])
  // }
  // setClassValues(
  //   () => {
  //   let classes = data['planogramClass']['className']
  //   let classValues = []
  //   for (var i in classes) {
  //     classValues.push({
  //       label: classes[i],
  //       value: classes[i],
  //     })
  //   }
  //   return classValues
  // }
  // )
  // }, [fileData])

  useEffect(() => {
    console.log(eventDetails)
  }, [eventDetails])

  const radio = <Radio color="primary" />

  const handleClassChange = (selected: any) => {
    console.log(selected)
    setClassValues(selected)
  }

  useEffect(() => {
    let classes = []
    if (classValues) {
      for (var i in classValues) {
        classes.push(classValues[i].value)
      }
    }
    setClassConfirmed(classes)
  }, [classValues])

  const handleClassConfirm = () => {
    handleClassClose()
    console.log('2')
    setEventDetails((prevState: any) => {
      if (prevState[0].hasOwnProperty('planogramClass')) {
        let a = {
          ...prevState[0],
          planogramClass: {
            className: classConfirmed,
          },
        }
        console.log(a)
        return [a]
      }
    })
  }

  const handleClassClose = () => {
    setClassOpen(false)
  }

  const handleUpdateEventClose = () => {
    setUpdateEventOpen(false)
  }
  const handleFileUpload = (event: any) => {
    console.log(event.target.files)
    // setWrongExtn(false)
    setReferenceDocData(event.target.files[0])
    setUploadedFile(event.target.files[0])
    // for (let i = 0; i < event.target.files.length; i++) {
    //   const checkextension = event.target.files[i]
    //     ? new RegExp(
    //         '(' + extensions.join('|').replace(/\./g, '\\.') + ')$',
    //         'i'
    //       ).test(event.target.files[i].name)
    //     : false
    //   const fileSize = event.target.files[i].size / 1024 / 1024
    //   if (
    //     (!checkextension || event.target.files[i].size === 0 || fileSize > 5) &&
    //     event.target.files[i]
    //   ) {
    //     setWrongExtn(true)
    //   }
    //   if (
    //     event.target.files[i] &&
    //     checkextension &&
    //     event.target.files[i].size !== 0 &&
    //     fileSize <= 5
    //   ) {
    //     // let reader = new FileReader();
    //     // reader.readAsDataURL(event.target.files[0]);

    //     // reader.onload = (e: any) => {
    //     //   console.log(e.target.result);
    //     setReferenceDocData((prevState) => [
    //       ...prevState,
    //       {
    //         name: event.target.files[i].name,
    //         data: event.target.files[i],
    //         link: URL.createObjectURL(event.target.files[i]),
    //       },
    //     ])
    //     URL.revokeObjectURL(event.target.files[i])
    //     // };
    //   }
    // }
  }

  useEffect(() => {
    console.log('referenceDocData', referenceDocData)
  }, [referenceDocData])

  const updateEventDialog = (
    <Dialog open={updateEventOpen} onClose={handleUpdateEventClose}>
      <Box
        sx={{
          height: 450,
          // width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className={classes.classDialog}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DialogHeader title="Update Event" onClose={handleUpdateEventClose} />
          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '30px',
            }}
          >
            <strong>Comments</strong>
            <InputTextarea
              value={inputTextareaValue}
              onChange={(e) => setInputTextareaValue(e.target.value)}
              rows={5}
              cols={43}
              autoResize
            />
            <br />
            <strong>Upload Reference Document</strong>
            <input
              type="text"
              value={uploadedFile ? uploadedFile.name : ''}
              onClick={() => document.getElementById('selectedFile')!.click()}
              className={classes.uploadTextfield}
              placeholder="Upload relevant reference document"
              readOnly
            />
            <Input
              type="file"
              id="selectedFile"
              // accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileUpload}
              required
            />
            <button
              type="button"
              onClick={() => document.getElementById('selectedFile')!.click()}
              className={classes.uploadButton}
            >
              Browse...
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            className={classes.buttons}
            // onClick={handleClassConfirm}
            onClick={() => handlePublishEvent('update')}
          >
            Update Event
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
  const handleremoveTaskClose = () => {
    setRemoveTaskOpen(false)
  }
  const removeTaskDialog = (
    <Dialog open={removeTaskOpen} onClose={handleremoveTaskClose}>
      <Box
        sx={{
          height: 250,
          // width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className={classes.classDialog}
      >
        <DialogHeader
          title="Remove / Skip Task"
          onClose={handleremoveTaskClose}
        />
        <Box
          sx={{
            alignItems: 'flex-start',
            // marginTop: '10px',
          }}
        >
          <h6>Are you sure to 'Remove / Skip Task' from the event?</h6>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            size="small"
            className={classes.buttonRemoveTask}
            // onClick={handleClassConfirm}
            onClick={() => setRemoveTaskOpen(false)} // Ended here today to show popups
          >
            No
          </Button>
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonRemoveTask}
            // onClick={handleClassConfirm}
            onClick={() => handlePublishEvent('ModifyAuto')}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
  const handleSaveTaskClose = () => {
    setsaveEventTaskButton(false)
  }
  const saveEventTask = (
    <Dialog open={saveEventTaskButton} onClose={handleSaveTaskClose}>
      <Box
        sx={{
          height: 250,
          // width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className={classes.classDialog}
      >
        <DialogHeader title="Save" onClose={handleSaveTaskClose} />
        <Box
          sx={{
            alignItems: 'flex-start',
            // marginTop: '10px',
          }}
        >
          <h6>Are you sure to confirm the changes made?</h6>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            size="small"
            className={classes.buttonRemoveTask}
            // onClick={handleClassConfirm}
            onClick={() => setsaveEventTaskButton(false)} // Ended here today to show popups
          >
            No
          </Button>
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonRemoveTask}
            // onClick={handleClassConfirm}
            onClick={() => handlePublishEvent('ModifyAuto')}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const classDialog = (
    <Dialog open={classOpen} onClose={handleClassClose}>
      <Box
        sx={{
          height: 450,
          // width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className={classes.classDialog}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DialogHeader title="Add Class" onClose={handleClassClose} />
          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '30px',
            }}
          >
            <AutocompleteSelect
              value={classValues && classValues}
              isMulti={true}
              options={classOptions}
              onChange={handleClassChange}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={handleClassConfirm}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  // const resetTypeTemplate = (rowData: any) => {
  //   console.log('rowData', rowData)
  //   const val = resetTypes.findIndex(
  //     (group: any) => rowData.resetType === group.text
  //   )
  //   return (
  //     <Select
  //       value={val > -1 ? resetTypes[val].name : rowData.resetType}
  //       renderValue={(selected: any) => {
  //         console.log(selected)
  //         if (!selected) return 'Placeholder'
  //         else return selected
  //       }}
  //       onChange={(e) => {
  //         setEventDetails((prevState: any) => {
  //           return [
  //             {
  //               ...prevState[0],
  //               resetType: e.target.value,
  //             },
  //           ]
  //         })
  //       }}
  //       input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
  //     >
  //       {resetTypes.map((type: any) => {
  //         return (
  //           <MenuItem
  //             value={type.name}
  //             key={type.name}
  //             className={classes.muiSelect}
  //           >
  //             {type.text}
  //           </MenuItem>
  //         )
  //       })}
  //     </Select>
  //   )
  // }

  const rafDueDateTemplate = (rowData: any) => {
    return (
      <DatePicker
        // disabled={confirmEnDis ? true : false}
        disabled={confirmEnDis ? false : cancelledEvent}
        format="dd/MM/yy"
        value={rowData['appDueDate'] ? rowData['appDueDate'] : null}
        onChange={(date: any) => {
          let newDate = date.toISOString().split('T')[0]
          let dateVal = newDate
          console.log('3')
          setEventDetails((prevState: any) => {
            return [
              {
                ...prevState[0],
                appDueDate: dateVal,
              },
            ]
          })
        }}
        maxDate={rowData['targetDate']}
        maxDateMessage={allMessages.error.rafDateError}
        minDate={new Date()}
      />
    )
  }

  const handleLaunchDate = (date: any) => {
    console.log('date changed', date)
    // let date1 = new Date(date)
    let newDate = date.toISOString().split('T')[0]
    let dateVal = newDate
    let department = eventDetails && eventDetails[0].department
    let launchDate = date
    if (eventDetails && department && launchDate) {
      // var lDate = new Date(launchDate)
      // console.log(lDate)
      var name =
        department.replace(/ /g, '_') +
        '_' +
        launchDate.getDate() +
        launchDate.toLocaleString('default', { month: 'short' }) +
        launchDate.getFullYear()
      console.log(name)
      setEventName(name)
      console.log('4')
      setEventDetails((prevState: any) => {
        return [
          {
            ...prevState[0],
            targetDate: dateVal,
            eventName: name,
          },
        ]
      })
    } else {
      setEventDetails((prevState: any) => {
        return [
          {
            ...prevState[0],
            targetDate: dateVal,
          },
        ]
      })
    }
    setLaunchDateNew(dateVal)
    setLaunchDateConfirm(true)
  }

  const launchDateTemplate = (rowData: any) => {
    return (
      <DatePicker
        format="dd/MM/yy"
        value={rowData['targetDate']}
        onChange={handleLaunchDate}
        // onChange={(date: any) => {
        //   console.log(date)
        //   // let date1 = new Date(date)
        //   let newDate = date.toISOString().split('T')[0]
        //   let dateVal = newDate
        //   setEventDetails((prevState: any) => {
        //     return [
        //       {
        //         ...prevState[0],
        //         targetDate: dateVal,
        //       },
        //     ]
        //   })
        //   setLaunchDateNew(dateVal)
        //   setLaunchDateConfirm(true)
        // }}
        // minDate={rowData['appDueDate']}
        minDate={new Date()}
        disabled={confirmEnDis ? false : cancelledEvent}
      />
    )
  }
  const cancelLaunchDateChange = () => {
    console.log('5')
    setEventDetails((prevState: any) => {
      return [
        {
          ...prevState[0],
          targetDate: launchDateOld && launchDateOld,
        },
      ]
    })
    // setLaunchDateNew('')
    setLaunchDateConfirm(false)
  }

  const confirmLaunchDateChange = () => {
    setIsProgressLoader(true)
    setTableLoading(true)
    console.log('6')
    setEventDetails((prevState: any) => {
      return [
        {
          ...prevState[0],
          targetDate: launchDateNew && launchDateNew,
        },
      ]
    })
    // setLaunchDateOld('')
    setLaunchDateConfirm(false)
    // handlePublishEvent('ModifyAuto')
    handlePublishEvent('dateChange')
    // getEventAndTasks()
    setTableLoading(false)
  }

  useEffect(() => {
    console.warn(eventDetails)
  }, [eventDetails])

  useEffect(() => {
    if (taskDetails) {
      // setIsProgressLoader(true)
      let newDate = launchDateNew ? new Date(launchDateNew).getTime() : 0
      let oldDate = launchDateOld ? new Date(launchDateOld).getTime() : 0
      let resetDate = launchDateOld
      console.log('date change', launchDateOld, launchDateNew)
      if (newDate != 0 && oldDate !== 0 && newDate !== oldDate) {
        let count: any = ''
        let sysDate = new Date()
        taskDetails.map((task: any) => {
          let taskDueDate = new Date(task.dueDate)
          if (taskDueDate.getTime() < sysDate.getTime()) {
            count =
              count === '' ? count + task.taskId : count + ', ' + task.taskId
          }
        })
        setDueDateErrorCount(count)

        if (count != '') {
          setDueDateErrorTasks(count)
          setDueDateErrorOpen(true)
          // setIsProgressLoader(true)
          setLaunchDateNew('')
        } else {
          // if(oldDate)
          setLaunchDateOld(launchDateNew)
          setLaunchDateNew('')
          // setIsProgressLoader(true)
        }
      }
    }
  }, [taskDetails])

  useEffect(() => {
    console.log('Launch date old', launchDateOld)
  }, [launchDateOld])

  useEffect(() => {
    console.log('Launch date old', launchDateNew)
  }, [launchDateNew])

  const handleDueDateError = () => {
    console.error('setting back', launchDateOld)

    let eventDetailData = eventDetails
    eventDetailData[0].targetDate = launchDateOld
    console.log('new data', eventDetailData)
    // console.log('7')
    setEventDetails([...eventDetailData])

    // handlePublishEvent('ModifyAuto')
    // launchDateOld === eventDetails.targetDate &&
    console.log('new payload', eventDetails)
    setDueDateChangePublish(true)

    setDueDateErrorOpen(false)
  }

  useEffect(() => {
    if (dueDateChangePublish && eventDetails[0].targetDate === launchDateOld) {
      handlePublishEvent('dateChange')
      setDueDateChangePublish(false)
    }
  }, [dueDateChangePublish])

  const confirmDueDateChangeDialog = (
    <ConfirmBox
      cancelOpen={dueDateErrorOpen}
      // handleCancel={cancelLaunchDateChange}
      // handleProceed={() => handlePublishEvent('ModifyAuto')}
      // handleProceed={() => {
      //   setDueDateErrorOpen(false)
      // }}
      handleProceed={handleDueDateError}
      label1="Due Date less than System Date"
      label2={
        <>
          Due Date of Tasks ({dueDateErrorTasks})
          <br />
          is behind System date
          <br />
          Change Launch date to valid date
        </>
      }
    />
  )

  const confirmLaunchDateDialog = (
    <ConfirmBox
      cancelOpen={launchDateConfirm}
      handleCancel={cancelLaunchDateChange}
      // handleProceed={() => handlePublishEvent('ModifyAuto')}
      handleProceed={confirmLaunchDateChange}
      label1="Launch Date Change"
      label2={
        <>
          Are you sure you want to Save the Launch Date changes?
          <br />
          This might affect other values
        </>
      }
    />
  )

  const groupTemplatenotused = (rowData: any) => {
    const val = groups.findIndex((group) => rowData.tradeGroup === group.text)
    console.log(
      'SridharGroup',
      val > -1 ? groups[val].name : rowData.tradeGroup
    )
    return (
      // <Select
      //   value={val > -1 ? groups[val].name : rowData.tradeGroup}
      //   onChange={(e) => {
      //     setEventDetails((prevState: any) => {
      //       return [
      //         {
      //           ...prevState[0],
      //           tradeGroup: e.target.value,
      //         },
      //       ]
      //     })
      //   }}
      //   input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      // >
      //   {groups.map((type) => {
      //     return (
      //       <MenuItem
      //         value={type.value}
      //         key={type.value}
      //         className={classes.muiSelect}
      //       >
      //         {type.label}
      //       </MenuItem>
      //     )
      //   })}
      // </Select>

      <AutocompleteSelect
        value={group}
        options={groupOptions}
        // onChange={handleGroup}
        onChange={(e: any) => {
          if (e) {
            setGroup(e)
            setCategory('')
            setDepartment('')
            setDepartmentOptions([])
            console.log('8')
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  tradeGroup: e.value,
                },
              ]
            })
          } else {
            setGroup('')
            setCategory('')
            setDepartment('')
            setCategoryOptions([])
            setDepartmentOptions([])
          }
        }}
        placeholder="Select Trading Group"
      />
    )
  }

  useEffect(() => {
    console.log('groupOptions', grpVal)
    console.log('categoryOptions', catVal)
    console.log('departmentOptions', depVal)
    console.log('ClearancePricingActionrequired	', cptVal)
    console.log('setGscopVal	', gscopVal)
    console.log('setSotVal	', sotVal)
    console.log('eventDetails	', eventDetails)
    console.log('setTaskDetails	', taskDetails)
  }, [eventDetails])

  useEffect(() => {
    console.log('setTaskDetails Change	', taskDetails)
  }, [taskDetails])

  const eventHandleDetails = (e: any) => {
    console.log('9')
    setEventDetails((prevState: any) => {
      setGrpVal(e.target.value)
      setCatVal('')
      setDepVal('')
      return [
        {
          ...prevState[0],
          tradeGroup: e.target.value,
          category: '',
          department: '',
        },
      ]
    })
  }
  const eventHandleDetailsCategory = (e: any) => {
    let categoryId = e.target.value
    console.log(department)

    let val = categoryOptions.findIndex(
      (cat: any) => categoryId === cat.categoryId
    )
    console.log(val)
    let category = val > -1 && categoryOptions[val].categoryName
    console.log('10')
    setEventDetails((prevState: any) => {
      setCatVal(e.target.value)
      setDepVal('')
      return [
        {
          ...prevState[0],
          category: category,
          categoryId: categoryId,
          department: '',
        },
      ]
    })
  }
  const eventHandleDetailsDepartment = (e: any) => {
    // let department = e.target.value
    let departmentId = e.target.value
    console.log(departmentId)

    let val = departmentOptions.findIndex(
      (dept: any) => departmentId === dept.departmentId
    )
    console.log(val)
    let department = val > -1 && departmentOptions[val].departmentName

    let launchDate = eventDetails[0].targetDate
    // let ldate = eventDetails[0].launchDate
    console.log(department)
    console.log(launchDate)
    if (department && launchDate) {
      var lDate = new Date(launchDate)
      console.log(lDate)
      var name =
        department.replace(/ /g, '_') +
        '_' +
        lDate.getDate() +
        lDate.toLocaleString('default', { month: 'short' }) +
        lDate.getFullYear()
      console.log(name)
      setEventName(name)
      setEventDetails((prevState: any) => {
        setDepVal(e.target.value)
        return [
          {
            ...prevState[0],
            // department: e.target.value,
            department: department,
            departmentId: departmentId,
            eventName: name,
          },
        ]
      })
    } else {
      setEventDetails((prevState: any) => {
        setDepVal(e.target.value)
        return [
          {
            ...prevState[0],
            // department: e.target.value,
            department: department,
            departmentId: departmentId,
          },
        ]
      })
    }
  }

  const groupTemplate = (rowData: any) => {
    setGrpVal(rowData.tradeGroup)
    return (
      <Select
        // value={val > -1 ? groups[val].name : rowData.tradeGroup}
        disabled={confirmEnDis || cancelledEvent}
        value={grpVal}
        onChange={(e) => eventHandleDetails(e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
        renderValue={(selected: any) => {
          console.log(selected)
          if (!selected) return 'Placeholder'
          else return selected
        }}
      >
        {groupOptions.map((type: any) => {
          return (
            <MenuItem
              value={type.value}
              key={type.id}
              className={classes.muiSelect}
            >
              {type.value}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const categoryTemplate = (rowData: any) => {
    const val = categories.findIndex((group) => rowData.category === group.text)
    setCatVal(rowData.category)
    return (
      //   <select
      //     name="category"
      //     id="category"
      //     value={rowData.category}
      //     onChange={(e) => {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             category: e.target.value,
      //           },
      //         ]
      //       })
      //     }}
      //     required
      //   >
      //     <option value="Frozen Food">Frozen Food</option>
      //   </select>
      <Select
        // disabled={confirmEnDis ? true : false}
        disabled={confirmEnDis || cancelledEvent}
        value={catVal}
        onChange={(e) => eventHandleDetailsCategory(e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
        renderValue={(selected: any) => {
          console.log(selected)
          if (!selected) return 'Placeholder'
          else return selected
        }}
      >
        {categoryOptions.map((type: any) => {
          return (
            <MenuItem
              value={type.categoryId}
              key={type.categoryId}
              className={classes.muiSelect}
            >
              {type.value}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const departmentTemplate = (rowData: any) => {
    setDepVal(rowData.department)
    return (
      //   <Typography variant="subtitle2">
      //     <select
      //       name="department"
      //       id="department"
      //       value={rowData.department}
      //       onChange={(e) => {
      //         setEventDetails((prevState: any) => {
      //           return [
      //             {
      //               ...prevState[0],
      //               department: e.target.value,
      //             },
      //           ]
      //         })
      //       }}
      //       required
      //     >
      //       <option value="Frozen Chips">Frozen Chips</option>
      //       <option value="Frozen Vegetables">Frozen Vegetables</option>
      //       <option value="Frozen Fish">Frozen Fish</option>
      //     </select>
      //   </Typography>
      <Select
        // disabled={confirmEnDis}
        disabled={confirmEnDis || cancelledEvent}
        value={depVal}
        onChange={(e) => eventHandleDetailsDepartment(e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
        renderValue={(selected: any) => {
          console.log(selected)
          if (!selected) return 'Placeholder'
          else return selected
        }}
      >
        {departmentOptions.map((type: any) => {
          return (
            <MenuItem
              value={type.departmentId}
              key={type.departmentId}
              className={classes.muiSelect}
            >
              {type.value}
            </MenuItem>
          )
        })}
      </Select>
    )
  }
  const eventUniqueId = (rowData: any) => {
    // console.log('SridharROw', rowData)
    return <span>{rowData.eventId}</span>
  }
  const eventNameTemplate = (rowData: any) => {
    return (
      //   <input
      //     type="text"
      //     value={rowData.eventName}
      //     onChange={(e) => {
      //       if (e.target.value !== null) {
      //         setEventDetails((prevState: any) => {
      //           return [
      //             {
      //               ...prevState[0],
      //               eventName: e.target.value,
      //             },
      //           ]
      //         })
      //       }
      //     }}
      //     style={{
      //       width: '130px',
      //     }}

      //   />
      <OutlinedInput
        // disabled={confirmEnDis}
        disabled={cancelledEvent}
        margin="dense"
        className={classes.muiSelect}
        value={rowData.eventName}
        onChange={(e) => {
          if (e.target.value !== null) {
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  eventName: e.target.value,
                },
              ]
            })
          }
        }}
        // disabled
      />
    )
  }

  const classTemplate = (rowData: any) => {
    console.log('class template', rowData.planogramClass)
    if (rowData['planogramClass']) {
      // if (rowData['planogramClass']['className'][0] != '') {
      if (rowData['planogramClass'] !== []) {
        // let len = rowData['planogramClass']
        //   ? rowData['planogramClass'].length
        //   : '0'
        return (
          <Typography>
            <button
              // disabled={confirmEnDis}
              disabled={confirmEnDis || cancelledEvent}
              className={classes.backButton}
              type="button"
              onClick={() => setClassOpen(true)}
              style={{
                fontSize: '16px',
              }}
            >
              Class({classValues ? classValues.length : '0'})
            </button>
          </Typography>
        )
      } else {
        return (
          <Typography variant="body2">
            <button
              // disabled={confirmEnDis}
              disabled={confirmEnDis || cancelledEvent}
              className={classes.backButton}
              type="button"
              onClick={() => setClassOpen(true)}
            >
              Class(0)
            </button>
          </Typography>
        )
      }
    } else {
      return (
        <Typography variant="body2">
          <button
            // disabled={confirmEnDis}
            disabled={confirmEnDis || cancelledEvent}
            className={classes.backButton}
            type="button"
            onClick={() => setClassOpen(true)}
          >
            Class(0)
          </button>
        </Typography>
      )
    }
  }

  const handleWastagRange = (e: any) => {
    if (e) {
      setEventDetails((prevState: any) => {
        return [
          {
            ...prevState[0],
            wastageRange: e.target.value,
          },
        ]
      })
    }
  }

  const storeWasteProcessTemplate = (rowData: any) => {
    const index = wastageRangeOptions.findIndex(
      (range: any) => range.label === rowData.wastageRange
    )
    return (
      <>
        <Select
          // disabled={confirmEnDis}
          disabled={confirmEnDis || cancelledEvent}
          value={index > -1 && rowData.wastageRange}
          onChange={handleWastagRange}
          input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
          renderValue={(selected: any) => {
            console.log(selected)
            if (!selected) return 'Placeholder'
            else return selected
          }}
        >
          {wastageRangeOptions.map((type: any) => {
            return (
              <MenuItem
                value={type.value}
                key={type.value}
                className={classes.muiSelect}
              >
                {type.label}
              </MenuItem>
            )
          })}
        </Select>
      </>
    )
  }

  const eventHandleDetailsCPT = (e: any) => {
    setEventDetails((prevState: any) => {
      setCptVal(e.target.value)
      return [
        {
          ...prevState[0],
          clearancePriceCheck: e.target.value,
        },
      ]
    })
  }

  const clearancePriceTemplate = (rowData: any) => {
    setCptVal(rowData.clearancePriceCheck)
    return (
      //   <select
      //     value={rowData.clearencePriceCheck}
      //     onChange={(e: any) => {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             clearencePriceCheck: e.target.value,
      //           },
      //         ]
      //       })
      //     }}

      //     // style={{
      //     //     width:"130px"
      //     // }}
      //   >
      //     <option value="Yes">Yes</option>
      //     <option value="No">No</option>
      //   </select>

      <Select
        // disabled={confirmEnDis}
        disabled={confirmEnDis || cancelledEvent}
        // value={
        //   rowData.clearancePriceApplied === 'Yes'
        //     ? 'y'
        //     : rowData.clearancePriceApplied === 'No'
        //     ? 'n'
        //     : rowData.clearancePriceApplied
        // }
        value={cptVal}
        onChange={(e) => eventHandleDetailsCPT(e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type: any) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const eventHandleDetailsGSCOP = (e: any) => {
    setEventDetails((prevState: any) => {
      setGscopVal(e.target.value)
      return [
        {
          ...prevState[0],
          orderStopDateCheck: e.target.value,
        },
      ]
    })
  }

  const GSCOPDateTemplate = (rowData: any) => {
    setGscopVal(rowData.orderStopDateCheck)
    return (
      //   <select
      //     value={rowData.orderStopDateCheck}
      //     onChange={(e: any) => {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             orderStopDateCheck: e.target.value,
      //           },
      //         ]
      //       })
      //     }}
      //     // style={{
      //     //     width:"130px"
      //     // }}
      //   >
      //     <option value="Yes">Yes</option>
      //     <option value="No">No</option>
      //   </select>
      <Select
        // value={
        //   rowData.orderStopDateCheck === 'Yes'
        //     ? 'y'
        //     : rowData.orderStopDateCheck === 'No'
        //     ? 'n'
        //     : rowData.orderStopDateCheck
        // }
        // disabled={confirmEnDis}
        disabled={confirmEnDis || cancelledEvent}
        value={gscopVal}
        onChange={(e) => eventHandleDetailsGSCOP(e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const eventHandleDetailsSOT = (e: any) => {
    setEventDetails((prevState: any) => {
      setSotVal(e.target.value)
      return [
        {
          ...prevState[0],
          stopOrder: e.target.value,
        },
      ]
    })
  }

  const stopOrderTemplate = (rowData: any) => {
    setSotVal(rowData.stopOrder)
    return (
      //   <select
      //     value={rowData.stopOrder}
      //     onChange={(e: any) => {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             stopOrder: e.target.value,
      //           },
      //         ]
      //       })
      //     }}
      //     // style={{
      //     //     width:"130px"
      //     // }}
      //   >
      //     <option value="Yes">Yes</option>
      //     <option value="No">No</option>
      //   </select>
      <Select
        // disabled={confirmEnDis}
        disabled={confirmEnDis || cancelledEvent}
        // value={
        //   rowData.stopOrder === 'Yes'
        //     ? 'y'
        //     : rowData.stopOrder === 'No'
        //     ? 'n'
        //     : rowData.stopOrder
        // }
        value={sotVal}
        onChange={(e) => eventHandleDetailsSOT(e)}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {yesOrNo.map((type) => {
          return (
            <MenuItem
              value={type.name}
              key={type.name}
              className={classes.muiSelect}
            >
              {type.text}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const modifyTasksBasedOnHeaderEmailChange = (
    roleId: any,
    taskUserChange: any,
    dataUser: any
  ) => {
    taskUserChange.forEach((val: any) => {
      if (
        roleId === val.roleId &&
        val.visibility !== 'Removed' &&
        val.status !== 'Completed'
      ) {
        val.emailId = dataUser.emailId
        val.name = dataUser.firstName + ' ' + dataUser.lastName
        val.userId = dataUser.userId
        val.roleId = roleId
      }
    })
    setTaskDetails(taskUserChange)
    // setTaskDetails2(taskUserChange)
  }

  const handleBuyerClick = (name: any, email: any, rowdata: any) => {
    // console.log('taskDetails-taskDetails', taskDetails)
    setUserAssRadio(email)
    let roleId = 'BUYER'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res: any) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setBuyerConfirmed(true)
            setBuyerValue(res.data.userdetails[0].user)
            // const taskUserChange = taskDetails
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  buyerEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            // persons.forEach((val: any) => {
            //   if (
            //     res.data.userdetails[0].roles[0].roleName ===
            //       val.assignedUserGroup &&
            //     val.visibility !== 'Removed'
            //   ) {
            //     val.emailId = dataUser.emailId
            //     val.name = dataUser.firstName + ' ' + dataUser.lastName
            //     val.userId = dataUser.userId
            //   }
            // })
            // setTaskDetails(persons)
            setErrBuyer(false)
            setBuyerError1('')
          })
          .catch((err: any) => {
            console.log('not')
            console.log('allMessages', allMessages)
            setBuyer('')
            setBuyerConfirmed(false)
            setErrBuyer(true)
            setBuyerValue('')
            setBuyerError1(allMessages.error.emailError)
          })
      : setErrBuyer(true)
    setBuyerError1(allMessages.error.emailSearcherror)
  }

  const handleBuyingAssistantClick = (name: any, email: any) => {
    setUserAssRadio(email)
    let roleId = 'BYAST'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res: any) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  buyerAssistantEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            setBuyingAssistantConfirmed(true)
            setBuyingAssistantValue(res.data.userdetails[0].user)
          })
          .catch((err: any) => {
            console.log('not')
            setBuyingAssistant('')
            setBuyingAssistantConfirmed(false)
            setBuyingAssistantValue('')
            setErrBuyerAssisant(true)
            setBuyingAssistentError1(allMessages.error.emailError)
          })
      : setErrBuyerAssisant(true)
    setBuyingAssistentError1(allMessages.error.emailSearcherror)
  }

  const handleOwnBrandManagerClick = (name: any, email: any) => {
    setUserAssRadio(email)
    let roleId = 'OWNBRM'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  ownBrandManagerEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            setOwnBrandManagerConfirmed(true)
            setOwnBrandManagerValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setOwnBrandManager('')
            setOwnBrandManagerConfirmed(false)
            setOwnBrandManagerValue('')
            setErrOwnBrandManager(true)
            setOwnBrandManagerError1(allMessages.error.emailError)
          })
      : setErrOwnBrandManager(true)
    setOwnBrandManagerError1(allMessages.error.emailSearcherror)
  }

  const handleSeniorBuyingManagerClick = (name: any, email: any) => {
    setUserAssRadio(email)
    let roleId = 'SRBYM'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  seniorBuyingManagerEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            setSeniorBuyingManagerConfirmed(true)
            setSeniorBuyingManagerValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setSeniorBuyingManager('')
            setSeniorBuyingManagerConfirmed(false)
            setSeniorBuyingManagerValue('')
            setErrSeniorBuyingManager(true)
            setSeniorBuyingManagerError1(allMessages.error.emailError)
          })
      : setErrSeniorBuyingManager(true)
    setSeniorBuyingManagerError1(allMessages.error.emailSearcherror)
  }

  const handleMerchandiserClick = (name: any, email: any) => {
    setUserAssRadio(email)
    let roleId = 'MERCH'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  merchandiserEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            setMerchandiserConfirmed(true)
            setMerchandiserValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setMerchandiser('')
            setMerchandiserConfirmed(false)
            setMerchandiserValue('')
            setErrMerchandiser(true)
            setMerchandiserError1(allMessages.error.emailError)
          })
      : setErrMerchandiser(true)
    setMerchandiserError1(allMessages.error.emailSearcherror)
  }

  const handleRangeResetManagerClick = (name: any, email: any) => {
    setUserAssRadio(email)
    let roleId = 'RRMNGR'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  rangeResetManagerEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            setRangeResetManagerConfirmed(true)
            setRangeResetManagerValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setRangeResetManager('')
            setRangeResetManagerConfirmed(false)
            setRangeResetManagerValue('')
            setErrRangeResetManager(true)
            setRangeResetManagerError1(allMessages.error.emailError)
          })
      : setErrRangeResetManager(true)
    setRangeResetManagerError1(allMessages.error.emailSearcherror)
  }

  const handleCategoryDirectorClick = (name: any, email: any) => {
    setUserAssRadio(email)
    let roleId = 'CTDIR'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  categoryDirectorEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            setCategoryDirectorConfirmed(true)
            setCategoryDirectorValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setErrCategoryDirector(true)
            setCategoryDirector('')
            setCategoryDirectorConfirmed(false)
            setCategoryDirectorValue('')
            setCategoryDirectorError1(allMessages.error.emailError)
          })
      : setErrCategoryDirector(true)
    setCategoryDirectorError1(allMessages.error.emailSearcherror)
  }

  const handleSupplyChainSpecialistClick = (name: any, email: any) => {
    setUserAssRadio(email)
    let roleId = 'SCSPL'
    email !== ''
      ? getUsersAPIByEmailAndRole &&
        getUsersAPIByEmailAndRole(roleId, email)
          .then((res) => {
            console.log('matched')
            const dataUser = res.data.userdetails[0].user
            setEventDetails((prevState: any) => {
              return [
                {
                  ...prevState[0],
                  supplyChainAnalystEmailId: {
                    emailId: res.data.userdetails[0].user.emailId,
                    name:
                      res.data.userdetails[0].user.firstName +
                      ' ' +
                      res.data.userdetails[0].user.lastName,
                    persona: res.data.userdetails[0].roles[0].roleName,
                    // persona: 'Supply Chain Specialist',
                    roleId: res.data.userdetails[0].roles[0].roleId,
                    userId: res.data.userdetails[0].user.userId,
                  },
                },
              ]
            })
            modifyTasksBasedOnHeaderEmailChange(roleId, taskDetails, dataUser)
            setSupplyChainSpecialistConfirmed(true)
            setSupplyChainSpecialistValue(res.data.userdetails[0].user)
          })
          .catch((err) => {
            console.log('not')
            setSupplyChainSpecialist('')
            setErrSupplyChainSpecialist(true)
            setSupplyChainSpecialistConfirmed(false)
            setSupplyChainSpecialistValue('')
            setSupChainSpecialistError1(allMessages.error.emailError)
          })
      : setErrSupplyChainSpecialist(true)
    setSupChainSpecialistError1(allMessages.error.emailSearcherror)
  }

  const buyerTemplate = (rowData: any) => {
    return (
      // <Autocomplete
      //   value={rowData.buyer}
      //   options={Buyers.map((buyer) => {
      //     return buyer.value
      //   })}
      //   // options={Buyers}
      //   onChange={(event, newValue) => {
      //     console.log(newValue)
      //     if (newValue !== null) {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             buyer: newValue,
      //           },
      //         ]
      //       })
      //     }
      //   }}
      //   classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //   renderInput={(params) => (
      //     <TextField {...params} variant="outlined" size="small" />
      //   )}
      // />
      <Grid
        container
        item
        // xl={7}
        // lg={7}
        // md={7}
        // sm={7}
        xs={12}
        spacing={1}
      >
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.buyerEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              console.log(event.target.value)
              setErrBuyer(false)
              setBuyerConfirmed(false)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      buyerEmailId: { emailId: event.target.value },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Buyer"
            onClick={() =>
              handleBuyerClick(
                'buyerEmail',
                rowData.buyerEmailId.emailId,
                rowData
              )
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          <Typography variant="subtitle2" color="primary">
            {errBuyer && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
          {/* </Typography> */}
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={buyerConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const buyingAssistantTemplate = (rowData: any) => {
    return (
      // <Autocomplete
      //   value={rowData.buyerAssistant}
      //   options={BuyingAssistants.map((buyer) => {
      //     return buyer.value
      //   })}
      //   onChange={(event, newValue) => {
      //     if (newValue !== null) {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             buyerAssistant: newValue,
      //           },
      //         ]
      //       })
      //     }
      //   }}
      //   classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //   renderInput={(params) => (
      //     <TextField {...params} variant="outlined" size="small" />
      //   )}
      // />
      <Grid container item xs={12} spacing={1}>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.buyerAssistantEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              console.log(event.target.value)
              setErrBuyerAssisant(false)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      buyerAssistantEmailId: { emailId: event.target.value },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Buying Assistant"
            onClick={() =>
              handleBuyingAssistantClick(
                'buyerEmail',
                rowData.buyerAssistantEmailId.emailId
              )
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          <Typography variant="subtitle2" color="primary">
            {errBuyerAssisant && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
          {/* </Typography> */}
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={buyingAssistantConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const ownBrandManagerTemplate = (rowData: any) => {
    return (
      // <Autocomplete
      //   value={rowData.ownBrandManager}
      //   options={OwnBrandManagers.map((manager) => {
      //     return manager.value
      //   })}
      //   onChange={(event, newValue) => {
      //     if (newValue !== null) {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             ownBrandManager: newValue,
      //           },
      //         ]
      //       })
      //     }
      //   }}
      //   classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //   renderInput={(params) => (
      //     <TextField {...params} variant="outlined" size="small" />
      //   )}
      // />
      <Grid container item xs={12} spacing={1}>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.ownBrandManagerEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              console.log(event.target.value)
              setErrOwnBrandManager(false)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      ownBrandManagerEmailId: { emailId: event.target.value },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Own Brand Manager"
            onClick={() =>
              handleOwnBrandManagerClick(
                '',
                rowData.ownBrandManagerEmailId.emailId
              )
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          {/* </Typography> */}
          <Typography variant="subtitle2" color="primary">
            {errOwnBrandManager && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={ownBrandManagerConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const seniorBuyingManagerTemplate = (rowData: any) => {
    return (
      // <Autocomplete
      //   value={rowData.seniorBuyingManager}
      //   options={SeniorBuyingManagers.map((manager) => {
      //     return manager.value
      //   })}
      //   onChange={(event, newValue) => {
      //     if (newValue !== null) {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             seniorBuyingManager: newValue,
      //           },
      //         ]
      //       })
      //     }
      //   }}
      //   classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //   renderInput={(params) => (
      //     <TextField {...params} variant="outlined" size="small" />
      //   )}
      // />

      <Grid container item xs={12} spacing={1}>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.seniorBuyingManagerEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              setErrSeniorBuyingManager(false)
              console.log(event.target.value)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      seniorBuyingManagerEmailId: {
                        emailId: event.target.value,
                      },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Senior Buying Manager"
            onClick={() =>
              handleSeniorBuyingManagerClick(
                '',
                rowData.seniorBuyingManagerEmailId.emailId
              )
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          <Typography variant="subtitle2" color="primary">
            {errSeniorBuyingManager && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
          {/* </Typography> */}
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={seniorBuyingManagerConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const merchandiserTemplate = (rowData: any) => {
    return (
      //   <Autocomplete
      //     value={rowData.merchandiser}
      //     options={Merchandisers.map((merch) => {
      //       return merch.value
      //     })}
      //     onChange={(event, newValue) => {
      //       if (newValue !== null) {
      //         setEventDetails((prevState: any) => {
      //           return [
      //             {
      //               ...prevState[0],
      //               merchandiser: newValue,
      //             },
      //           ]
      //         })
      //       }
      //     }}
      //     classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //     renderInput={(params) => (
      //       <TextField {...params} variant="outlined" size="small" />
      //     )}
      //   />
      <Grid container item xs={12} spacing={1}>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.merchandiserEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              setErrMerchandiser(false)
              console.log(event.target.value)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      merchandiserEmailId: { emailId: event.target.value },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Merchandiser"
            onClick={() =>
              handleMerchandiserClick('', rowData.merchandiserEmailId.emailId)
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          <Typography variant="subtitle2" color="primary">
            {errMerchandiser && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
          {/* </Typography> */}
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={merchandiserConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const rangeResetManagerTemplate = (rowData: any) => {
    return (
      // <Autocomplete
      //   value={rowData.rangeResetManager}
      //   options={RangeResetManagers.map((manager) => {
      //     return manager.value
      //   })}
      //   onChange={(event, newValue) => {
      //     if (newValue !== null) {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             rangeResetManager: newValue,
      //           },
      //         ]
      //       })
      //     }
      //   }}
      //   classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //   renderInput={(params) => (
      //     <TextField {...params} variant="outlined" size="small" />
      //   )}
      // />
      <Grid container item xs={12} spacing={1}>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.rangeResetManagerEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              setErrRangeResetManager(false)
              console.log(event.target.value)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      rangeResetManagerEmailId: { emailId: event.target.value },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Range Reset Manager	"
            onClick={() =>
              handleRangeResetManagerClick(
                '',
                rowData.rangeResetManagerEmailId.emailId
              )
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          <Typography variant="subtitle2" color="primary">
            {errRangeResetManager && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
          {/* </Typography> */}
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={rangeResetManagerConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const categoryDirectorTemplate = (rowData: any) => {
    return (
      // <Autocomplete
      //   value={rowData.categoryDirector}
      //   options={CategoryDirectors.map((manager) => {
      //     return manager.value
      //   })}
      //   onChange={(event, newValue) => {
      //     if (newValue !== null) {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             categoryDirector: newValue,
      //           },
      //         ]
      //       })
      //     }
      //   }}
      //   classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //   renderInput={(params) => (
      //     <TextField {...params} variant="outlined" size="small" />
      //   )}
      // />
      <Grid container item xs={12} spacing={1}>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.categoryDirectorEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              setErrCategoryDirector(false)
              console.log(event.target.value)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      categoryDirectorEmailId: { emailId: event.target.value },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Category Director	"
            onClick={() =>
              handleCategoryDirectorClick(
                '',
                rowData.categoryDirectorEmailId.emailId
              )
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          <Typography variant="subtitle2" color="primary">
            {errCategoryDirector && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
          {/* </Typography> */}
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={categoryDirectorConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const supplyChainSplstTemplate = (rowData: any) => {
    return (
      // <Autocomplete
      //   value={rowData.supplyChainAnalyst}
      //   options={SupplyChainSpecialists.map((manager) => {
      //     return manager.value
      //   })}
      //   onChange={(event, newValue) => {
      //     if (newValue !== null) {
      //       setEventDetails((prevState: any) => {
      //         return [
      //           {
      //             ...prevState[0],
      //             supplyChainAnalyst: newValue,
      //           },
      //         ]
      //       })
      //     }
      //   }}
      //   classes={{ input: classes.smallFont, option: classes.smallFontGreen }}
      //   renderInput={(params) => (
      //     <TextField {...params} variant="outlined" size="small" />
      //   )}
      // />
      <Grid container item xs={12} spacing={1}>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          {/* <Typography variant="body2" color="primary"> */}
          <SearchSelect
            value={rowData.supplyChainAnalystEmailId.emailId}
            disabled={confirmEnDis ? false : cancelledEvent}
            // onChange={handleBuyer}
            onChange={(event: any) => {
              setErrSupplyChainSpecialist(false)
              console.log(event.target.value)
              if (event.target.value !== null) {
                setEventDetails((prevState: any) => {
                  return [
                    {
                      ...prevState[0],
                      supplyChainAnalystEmailId: {
                        emailId: event.target.value,
                      },
                    },
                  ]
                })
              }
            }}
            placeholder="Search Supply Chain Splst"
            onClick={() =>
              handleSupplyChainSpecialistClick(
                '',
                rowData.supplyChainAnalystEmailId.emailId
              )
            }
            // onClick={() => console.log('clicked')}
            styles={{
              fontSize: '12px',
            }}
          />
          <Typography variant="subtitle2" color="primary">
            {errSupplyChainSpecialist && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                Please enter a valid Email ID
              </span>
            )}
          </Typography>
          {/* </Typography> */}
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={2}
          style={{ textAlign: 'center' }}
        >
          <ConfirmCheckSign confirmValue={supplyChainSpecialistConfirmed} />
        </Grid>
      </Grid>
    )
  }

  const dueDateTemplate = (rowData: any) => {
    const dueDate = rowData['dueDate']
    return (
      <DatePicker
        // disabled={rowData.visibility === 'Enabled' ? false : true}
        disabled={true}
        // readOnly={rowData.visibility === 'Enabled' ? false : true}
        // readOnly={true}
        format="dd/MM/yy"
        value={dueDate}
        onChange={(date: any) => {
          setTaskDetails((prevState: any) => {
            return prevState.map((state: any) => {
              if (state.dueDate === dueDate) {
                return {
                  ...state,
                  dueDate: date,
                }
              } else {
                return state
              }
            })
          })
        }}
        // className={rowData.visibility === 'Enabled' ? '' : classes.duedate}
        // style={{
        //   //   fontSize: aboveSm ? '0.8rem' : '0.65rem',
        //   background: '#e9ecef',
        // }}
      />
    )
  }

  const notifiedDateTemplate = (rowData: any) => {
    const notifiedDate = rowData['notifiedDate']
    const testDate = new Date(notifiedDate).toString()
    return (
      <DatePicker
        // disabled={rowData.visibility === 'Enabled' ? false : true} //change
        disabled={true}
        // disabled={rowData.visibility === 'Enabled' ? false : true}
        format="dd/MM/yy"
        value={notifiedDate}
        onChange={(date: any) => {
          setTaskDetails((prevState: any) => {
            return prevState.map((state: any) => {
              if (state.notifiedDate === notifiedDate) {
                return {
                  ...state,
                  notifiedDate: date,
                }
              } else {
                return state
              }
            })
          })
        }}
        // className={rowData.visibility === 'Enabled' ? '' : classes.duedate}
        // style={{
        //   //   fontSize: aboveSm ? '0.8rem' : '0.65rem',
        //   width: '150px',
        // }}
      />
    )
  }

  const handleGroupValues = (e: any) => {
    console.log('handleGroupValues', e.target.value)
    setUserGroupValue(e.target.value)
  }

  useEffect(() => {
    console.error(isProgressLoader)
  }, [isProgressLoader])

  const handleGroupsOpen = (rowData: any) => {
    setUserGroupValue(rowData.emailId)
    setSingleTask(rowData)
    setUserGroup(rowData.assignedUserGroup)
    setGroupsOpen(true)
    userDetailsApi(rowData)
  }

  const handleGroupsClose = () => {
    setGroupsOpen(false)
  }

  const handleConfirmGroups = () => {
    setGroupsOpen(false)
    console.log('eventDetailseventDetailseventDetails', eventDetails)
    console.log(currentTask)
    let a = taskDetails.filter((t: any) => t.taskId !== singleTask.taskId)
    let b = singleTask
    if (currentTask) {
      const { email, value, userId, roleId, label } = currentTask
      console.log(currentTask)
      b.assignedUserGroup = userGroup
      // b.manager = userGroupValue
      b.emailId = userGroupValue
      // b.emailId = email
      b.userId = userId
      b.manager = label
      b.name = label
      b.roleId = roleId
      a.push(b)
      a.sort((x: any, y: any) =>
        x.taskId > y.taskId ? 1 : y.taskId > x.taskId ? -1 : 0
      )
      setTaskDetails(a)
    } else {
      const singl = emailsHeader.filter((val: any) => {
        return userGroup == val.persona
      })
      const { emailId, name, persona, roleId, userId } = singl[0]
      console.log('singl', singl)
      b.assignedUserGroup = userGroup
      b.emailId = userGroupValue
      b.userId = userId
      b.manager = name
      b.name = name
      b.roleId = roleId
      a.push(b)
      a.sort((x: any, y: any) =>
        x.taskId > y.taskId ? 1 : y.taskId > x.taskId ? -1 : 0
      )
      setTaskDetails(a)
    }
  }
  const handleUserClick = (event: any, data: any) => {
    // const { email, value, userId, roleId } = data
    // let a = taskDetails.filter((t: any) => t.taskId !== singleTask.taskId)
    // let b = singleTask
    // b.assignedUserGroup = userGroup
    // b.emailId = email
    // b.userId = userId
    // b.manager = value
    // b.name = value
    // b.roleId = roleId
    // a.push(b)
    // a.sort((x: any, y: any) =>
    //   x.taskId > y.taskId ? 1 : y.taskId > x.taskId ? -1 : 0
    // )
    // setTaskDetails(a.sort(sortAlphaNum))
    // setUserAssRadio(email)
    // setCurrentTask(b.taskId)

    setCurrentTask(data)
  }
  const userGroupDialog = (
    <Dialog open={groupsOpen} onClose={handleGroupsClose}>
      <Box
        sx={{
          height: 450,
          // width: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        className={classes.classDialog}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* <Box> */}
          {/* <Box
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
                            <Typography variant="subtitle1">Manage User Group</Typography>
                        </Box>
                        <Box
                            sx={{
                                paddingRight: 2,
                            }}
                        >
                            <button
                                style={{
                                    border: 0,
                                    padding: 0,
                                    height: 22,
                                    width: 22,
                                }}
                                className={classes.closeViewLog}
                                onClick={handleGroupsClose}
                            >
                                <b>X</b>
                            </button>
                        </Box>
                    </Box> */}
          <DialogHeader title="Manage User Group" onClose={handleGroupsClose} />

          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '30px',
            }}
          >
            <Box>
              {/* <select
                value={userGroup && userGroup}
                onChange={(e: any) => {
                  setUserGroup(e.target.value)
                }}
              >
                <option value="buyer">Buyer</option>

                <option value="buyerAssistant">Buying Assistant</option>

                <option value="seniorBuyingManager">
                  Senior Buying Manager
                </option>
                <option value="systemTask">System Task</option>
              </select> */}

              <Select
                value={userGroup && userGroup}
                onChange={(e: any) => {
                  setUserGroup(e.target.value)
                }}
                input={
                  <OutlinedInput
                    margin="dense"
                    //   className={classes.muiSelect}
                  />
                }
                disabled={
                  singleTask && singleTask.status.toLowerCase() === 'completed'
                }
              >
                {userGroupOptions.map((type) => {
                  return (
                    <MenuItem
                      value={type.value}
                      key={type.value}
                      //   className={classes.muiSelect}
                    >
                      {type.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </Box>
            <Box>
              <FormControl
                component="fieldset"
                disabled={
                  singleTask && singleTask.status.toLowerCase() === 'completed'
                }
              >
                <RadioGroup onChange={handleGroupValues}>
                  {userGroup &&
                    userGroup.toLowerCase() === 'buyer' &&
                    // Buyers.map((b: any) => {
                    buyerAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.email}
                          value={b.value}
                          control={radio}
                          // checked={b.email == userAssRadio}
                          checked={b.email == userGroupValue}
                          onClick={(e: any) => handleUserClick(e, b)}
                          // checked={b.email == singleTask.emailId}
                          // checked={
                          //   b.email === eventDetails[0].buyerEmailId.emailId
                          //     ? true
                          //     : false
                          // }
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // onClick={() => () =>
                          //   setUserGroupValue(userGroupValue)}
                          // onChange={(e: any) => handleRadioUserAssignCheck(e)}
                        />
                      )
                    })}
                  {userGroup &&
                    userGroup.toLowerCase() === 'buyer assistant' &&
                    buyerAssistentAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.value}
                          value={b.value}
                          control={radio}
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // checked={b.email == userAssRadio}
                          checked={b.email == userGroupValue}
                          onClick={(e: any) => handleUserClick(e, b)}
                        />
                      )
                    })}

                  {userGroup &&
                    userGroup.toLowerCase() === 'sr. buying manager' &&
                    srBuyerAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.value}
                          value={b.value}
                          control={radio}
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // checked={b.email == userAssRadio}
                          checked={b.email == userGroupValue}
                          onClick={(e: any) => handleUserClick(e, b)}
                        />
                      )
                    })}
                  {userGroup &&
                    userGroup.toLowerCase() === 'own brand manager' &&
                    ownBrandManAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.value}
                          value={b.value}
                          control={radio}
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // checked={b.email == userAssRadio}
                          onClick={(e: any) => handleUserClick(e, b)}
                          checked={b.email == userGroupValue}
                        />
                      )
                    })}
                  {userGroup &&
                    userGroup.toLowerCase() === 'merchandiser' &&
                    merchandiserAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.value}
                          value={b.value}
                          control={radio}
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // checked={b.email == userAssRadio}
                          onClick={(e: any) => handleUserClick(e, b)}
                          checked={b.email == userGroupValue}
                        />
                      )
                    })}
                  {userGroup &&
                    userGroup.toLowerCase() === 'range reset manager' &&
                    rangeResetAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.value}
                          value={b.value}
                          control={radio}
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // checked={b.email == userAssRadio}
                          onClick={(e: any) => handleUserClick(e, b)}
                          checked={b.email == userGroupValue}
                        />
                      )
                    })}
                  {userGroup &&
                    userGroup.toLowerCase() === 'category director' &&
                    catDirectorAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.value}
                          value={b.value}
                          control={radio}
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // checked={b.email == userAssRadio}
                          onClick={(e: any) => handleUserClick(e, b)}
                          checked={b.email == userGroupValue}
                        />
                      )
                    })}
                  {userGroup &&
                    userGroup.toLowerCase() === 'supplychain specialist' &&
                    supplyChainAssign.map((b: any) => {
                      return (
                        <FormControlLabel
                          key={b.value}
                          value={b.value}
                          control={radio}
                          label={b.label}
                          classes={{ label: classes.dialogText }}
                          // checked={b.email == userAssRadio}
                          onClick={(e: any) => handleUserClick(e, b)}
                          checked={b.email == userGroupValue}
                        />
                      )
                    })}
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={handleConfirmGroups}
            disabled={
              singleTask && singleTask.status.toLowerCase() === 'completed'
            }
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const userGroupTemplate = (rowData: any) => {
    return (
      <Typography variant="body2">
        <button
          disabled={rowData.visibility === 'Enabled' ? false : true}
          className={classes.backButton}
          type="button"
          onClick={() => handleGroupsOpen(rowData)}
          style={{
            fontSize: '16px',
          }}
        >
          {rowData.assignedUserGroup}
        </button>
      </Typography>
    )
  }

  const removeTasks = () => {
    console.log('taskDetails', taskDetails)
    let _tasks = taskDetails.filter(
      (value: any) => !selectTasks.includes(value)
    )
    console.log('_tasks', _tasks)
    console.log('selectTasks', selectTasks)
    setTaskDetails(_tasks)
    setSelectTasks(null)
  }

  // { ...value, status: false }

  // const [activeOrDeactive, setActiveOrDeactive] = useState<any>([])
  // const removeTasks = () => {
  //   setTaskDetails([])
  //   console.log('taskDetails', taskDetails)
  //   setTaskDetails(
  //     taskDetails.map((task: any) => {
  //       selectTasks.filter((check: any) => {
  //         if (task.taskId === check.taskId) {
  //           task.status = true
  //         } else {
  //           task.status = false
  //         }
  //       })
  //       return task
  //     })
  // )

  // let activate = taskDetails.filter(
  //   (value: any) => !selectTasks.includes(value)
  // )

  // let deactivate = selectTasks.map((value: any) => {
  //   return { ...value, status: true }
  // })
  // console.log('activate', activate)
  // console.log('deactivate', deactivate)
  // }

  const handleToaster = () => {
    if (
      toastRemove === 'publish' ||
      toastRemove === 'cancel' ||
      toastRemove === 'update'
    ) {
      history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
    }
  }

  const handlePublishEvent = (clickState: any) => {
    setIsProgressLoader(true)
    setToastRemove(clickState)
    console.log(clickState)
    let reviewDecision = ''
    let errorMsg = ''
    let successMsg = ''
    let comments = 'string'
    let eventState = ''

    if (clickState === 'save') {
      reviewDecision = 'ModifySave'
      errorMsg = allMessages.error.errorSave
      successMsg = allMessages.success.successSave
    } else if (clickState === 'remove') {
      reviewDecision = 'ModifySave'
      errorMsg = allMessages.error.errorRemoveTasks
      successMsg = allMessages.success.successRemoveTasks
    } else if (clickState === 'publish') {
      reviewDecision = 'Confirmed'
      errorMsg = allMessages.error.errorPublishEvent
      successMsg = allMessages.success.successPublishEvent
    } else if (clickState === 'update') {
      reviewDecision = 'ModifySave'
      eventState = 'Published'
      comments = inputTextareaValue && inputTextareaValue
      errorMsg = allMessages.error.errorUpdateEvent
      successMsg = allMessages.success.successUpdateEvent
    } else if (clickState === 'dateChange') {
      reviewDecision = 'ModifyAuto'
      errorMsg = allMessages.error.errorSave
      successMsg = allMessages.success.successSave
    } else if (clickState === 'cancel') {
      reviewDecision = 'Cancel'
      eventState = 'Cancelled'
    }
    console.log(reviewDecision)
    console.log(successMsg, errorMsg)

    // if (clickState === 'ModifyAuto') {
    //   setPublishVisible(false)
    //   setSaveVisible(true)
    //   setToastRemove('save')
    // }
    console.error(eventDetails)

    const claimTaskData = {
      requestorDetails: {
        emailId: eventDetails && eventDetails[0].requesterEmailId,
        requestBy: eventDetails && eventDetails[0].requesteruserId,
        requestorName: eventDetails && eventDetails[0].requesterName,
        requestType: 'complete',
        requestDate: new Date().toISOString().split('T')[0],
      },
      // requestorRoles: eventDetails[0].requesterRole,
      requestorRoles: [
        {
          roleId: eventDetails && eventDetails[0].requesterPersona,
        },
      ],
    }

    console.log('Publish Clicked', taskDetails)

    // if (clickState === 'modifySave') {

    if (clickState === 'remove') {
      selectTasks &&
        setTaskDetails(
          taskDetails.map((task: any) => {
            selectTasks.filter((check: any) => {
              if (task.taskId === check.taskId) {
                task.visibility = 'Removed'
              }
            })
            return task
          })
        )
    }

    // console.log('selectedMap', selectedMap)

    const taskDetailsData = taskDetails.map((val: any) => {
      return {
        status: val.status,
        visibility: val.visibility,
        milestoneTaskId: val.taskId2,
        taskName: val.taskId,
        taskDescription: val.task,
        dueDate: val.dueDate,
        notifyDate: val.notifiedDate,
        slaDate: val.slaDate,
        activeTaskId: val.activeTaskId,
        healthcheckDate: val.healthcheckDate,
        // assigneeDetails: {
        //   persona: val.assignedUserGroup,
        //   details: {
        //     name: val.manager,
        //     emailId: val.emailId,
        //     userId: val.userId,
        //   },
        // },
        assigneeDetails: {
          emailId: val.emailId,
          userId: val.userId,
          name: val.name,
        },
        assigneeRole: val.assignedUserGroup,
      }
    })

    // const eventTeamData = team.filter((val: any) => {
    //   const { persona, emailId, userId, name } = val
    //   if (persona && emailId && userId && name) {
    //     return {
    //       // persona: val.persona,
    //       details: {
    //         emailId: val.emailId,
    //         userId: val.userId,
    //         name: val.name,
    //       },
    //     }
    //   }
    // })
    console.log('eventDetailspublishevent-publishEvent', eventDetails)
    const {
      buyerEmailId,
      buyerAssistantEmailId,
      categoryDirectorEmailId,
      merchandiserEmailId,
      ownBrandManagerEmailId,
      rangeResetManagerEmailId,
      seniorBuyingManagerEmailId,
      supplyChainAnalystEmailId,
    } = eventDetails[0]
    const teamArr = [
      buyerEmailId,
      buyerAssistantEmailId,
      categoryDirectorEmailId,
      merchandiserEmailId,
      ownBrandManagerEmailId,
      rangeResetManagerEmailId,
      seniorBuyingManagerEmailId,
      supplyChainAnalystEmailId,
    ]

    const eventTeamData = teamArr.map((val: any) => {
      return {
        persona: val.persona,
        // val.persona === 'Buyer Assistant' ? 'Buying Assistant' : val.persona,
        // : val.persona === 'Senior Buying Manger'
        // ? 'Senior Buying Manager'
        // : val.persona,
        details: {
          emailId: val.emailId,
          userId: val.userId,
          name: val.name,
        },
      }
    })

    const publishEvent = {
      reviewDecision: reviewDecision,
      // reviewDecision: clickState,
      eventId: eventDetails[0].eventId,
      eventStatus:
        reviewDecision === 'Confirmed'
          ? 'Published'
          : eventState !== ''
          ? eventState
          : eventDetails[0].eventStatus,
      requester: {
        persona: eventDetails[0].requesterPersona,
        details: {
          name: eventDetails[0].requesterName,
          emailId: eventDetails[0].requesterEmailId,
          userId: eventDetails[0].requesteruserId,
        },
        roles: eventDetails[0].requesterRole,
        usergroups: eventDetails[0].requesterUserGroup,
      },
      logging: {
        // comments: 'string',
        uploadRef: 'string',
        comments: comments,
        // uploadRef: uploadedFile,
      },
      eventHeader: {
        resetType: eventDetails[0].resetType,
        rafAppDueDate: eventDetails[0].appDueDate
          ? eventDetails[0].appDueDate + ' 01:00:00.00'
          : null,
        eventLaunchDate: eventDetails[0].targetDate + ' 01:00:00.00',
        eventName:
          eventDetails[0].eventName === ''
            ? eventPrevName
            : eventDetails[0].eventName,
        eventHierarchy: {
          tradingGroup: eventDetails[0].tradeGroup,
          category: eventDetails[0].category,
          categoryId: eventDetails[0].categoryId,
          department: eventDetails[0].department,
          departmentId: eventDetails[0].departmentId,
        },
        inventoryControl: {
          planogramClass: classValues
            ? classValues.map((c: any) => {
                return c.value
              })
            : [],
          isClearancePriceApplied: eventDetails[0].clearancePriceCheck,
          isOrderStopDateCheckRequired: eventDetails[0].orderStopDateCheck,
          isStopOrderStockRundown: eventDetails[0].stopOrder,
          storeWastetiming: eventDetails[0].wastageRange,
        },

        eventTeam: {
          team: eventTeamData,
        },
      },
      milestones: taskDetailsData,
    }
    console.log('publishEvent', publishEvent)
    // console.log('publishEventJSON', JSON.stringify(publishEvent))

    // if (referenceDocData.length > 0) {
    if (referenceDocData) {
      // setFailureCount(referenceDocData.length)
      // setCheckCount(referenceDocData.length)
      // referenceDocData.map((rf) => {
      const formdata1 = new FormData()
      // formdata1.append('fileIn', referenceDocData.data)
      formdata1.append('fileIn', referenceDocData)
      // formdata1.append('fileIn', rf.data)
      postFileAttachmentRangeResetAPI &&
        postFileAttachmentRangeResetAPI(formdata1, eventDetails[0].eventId)
          .then((res: any) => {
            console.log(res.data)
            publishEvent.logging.uploadRef = res.data.attachmentUrl
          })
          .catch((err: any) => {})
      // })
    }
    //1 cancel when published
    if (
      clickState === 'cancel' &&
      eventDetails[0].eventStatus === 'Published'
    ) {
      callCancelWhenPublish(
        publishEvent.requester,
        publishEvent.eventId,
        eventDetails[0].eventStatus,
        errorMsg,
        successMsg
      )
      return
    }
    //2 publish when status is draft
    if (eventDetails[0].eventStatus === 'Draft' && clickState === 'publish') {
      claimTaskPublishEventWhenOnDraft(
        eventDetails[0].taskIdEvent,
        claimTaskData,
        eventDetails[0].eventId,
        publishEvent,
        errorMsg,
        successMsg
      )
      return
    } //3 save when status is draft
    if (eventDetails[0].eventStatus === 'Draft' && clickState === 'save') {
      claimTaskPublishEventWhenOnDraft(
        eventDetails[0].taskIdEvent,
        claimTaskData,
        eventDetails[0].eventId,
        publishEvent,
        errorMsg,
        successMsg
      )
      return
    } //4 remove when status is draft
    if (eventDetails[0].eventStatus === 'Draft' && clickState === 'remove') {
      claimTaskPublishEventWhenOnDraft(
        eventDetails[0].taskIdEvent,
        claimTaskData,
        eventDetails[0].eventId,
        publishEvent,
        errorMsg,
        successMsg
      )
      return
    }
    //5 remove when staus is published
    if (
      eventDetails[0].eventStatus === 'Published' &&
      clickState === 'remove'
    ) {
      modifySaveManageEventHeaderAndTasks(
        eventDetails[0].eventId,
        publishEvent,
        errorMsg,
        successMsg,
        clickState
      )
      return
    } //6 update when staus is published
    if (
      eventDetails[0].eventStatus === 'Published' &&
      clickState === 'update'
    ) {
      modifySaveManageEventHeaderAndTasks(
        eventDetails[0].eventId,
        publishEvent,
        errorMsg,
        successMsg,
        clickState
      )
      return
    }
    if (
      eventDetails[0].eventStatus === 'Draft' &&
      clickState === 'dateChange'
    ) {
      claimTaskPublishEventWhenOnDraft(
        eventDetails[0].taskIdEvent,
        claimTaskData,
        eventDetails[0].eventId,
        publishEvent,
        errorMsg,
        successMsg
      )
      return
    } else if (
      eventDetails[0].eventStatus === 'Published' &&
      clickState === 'dateChange'
    ) {
      modifySaveManageEventHeaderAndTasks(
        eventDetails[0].eventId,
        publishEvent,
        errorMsg,
        successMsg,
        clickState
      )
      return
    }

    //   claimEventsCamunda(eventDetails[0].taskIdEvent, claimTaskData)
    //     .then((res: any) => {
    //       console.log('claimEventsCamunda API call', res)
    //       publishEvent &&
    //         publishEventsCamunda(eventDetails[0].eventId, publishEvent)
    //           .then((res: any) => {
    //             console.log('Response publishEvent', res)

    //             getEventAndTasks()
    //             setIsProgressLoader(false)
    //             toast.current.show({
    //               severity: 'success',
    //               summary: 'Success',
    //               detail: successMsg,
    //               life: life,
    //               className: 'login-toast',
    //             })
    //           })
    //           .catch((err: any) => {
    //             console.log('Error publishEvent', err)
    //             const error = err.response
    //             // error && error.response && console.log(error.response.data)
    //             setIsProgressLoader(false)
    //             toast.current.show({
    //               severity: 'error',
    //               summary: 'Error',
    //               detail: error
    //                 ? error.data &&
    //                   error.data.eventAlert &&
    //                   error.data.eventAlert.alertMessage
    //                   ? error.data.eventAlert.alertMessage
    //                   : errorMsg
    //                 : errorMsg,
    //               life: life,
    //               className: 'login-toast',
    //             })
    //           })
    //     })
    //     .catch((err: any) => {
    //       console.log('claimEventsCamunda Error api', err)
    //       setIsProgressLoader(false)
    //       toast.current.show({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: allMessages.error.errorClaim,
    //         life: life,
    //         className: 'login-toast',
    //       })
    //     })
    //   setRemoveTaskOpen(false)
    //   setUpdateEventOpen(false)
    //   setsaveEventTaskButton(false)
  }

  const modifySaveManageEventHeaderAndTasks = (
    eventid: any,
    publishpayload: any,
    errorMsg: any,
    successMsg: any,
    clickState: any
  ) => {
    publishpayload &&
      putCamundaMileStoneUpdate(eventid, publishpayload)
        .then((res: any) => {
          console.log('Response publishEvent', res)

          getEventAndTasks()
          setIsProgressLoader(false)
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: successMsg,
            life: life,
            className: 'login-toast',
          })
        })
        .catch((err: any) => {
          console.log('Error publishEvent', err)
          const error = err.response
          setIsProgressLoader(false)
          getEventAndTasks()
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail:
              clickState === 'remove' &&
              eventDetails[0].eventStatus === 'Published'
                ? allMessages.error.errorRemoveCompletedTasks
                : error
                ? error.data &&
                  error.data.eventAlert &&
                  error.data.eventAlert.alertMessage === null &&
                  error.data.serverResponse &&
                  error.data.serverResponse.errorMessage
                  ? error.data.serverResponse.errorMessage
                  : error.data &&
                    error.data.eventAlert &&
                    error.data.eventAlert.alertMessage
                  ? error.data.eventAlert.alertMessage
                  : errorMsg
                : errorMsg,
            life: life,
            className: 'login-toast',
          })
        })
    setRemoveTaskOpen(false)
    setUpdateEventOpen(false)
    setsaveEventTaskButton(false)
  }

  const claimTaskPublishEventWhenOnDraft = (
    taskid: any,
    claimtask: any,
    eventid: any,
    publishpayload: any,
    errorMsg: any,
    successMsg: any
  ) => {
    claimEventsCamunda(taskid, claimtask)
      .then((res: any) => {
        console.log('claimEventsCamunda API call', res)
        publishpayload &&
          publishEventsCamunda(eventid, publishpayload)
            .then((res: any) => {
              console.log('Response publishEvent', res)

              getEventAndTasks()
              setIsProgressLoader(false)
              toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: successMsg,
                life: life,
                className: 'login-toast',
              })
            })
            .catch((err: any) => {
              console.log('Error publishEvent', err)
              const error = err.response
              getEventAndTasks()
              setIsProgressLoader(false)
              toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error
                  ? error.data &&
                    error.data.eventAlert &&
                    error.data.eventAlert.alertMessage === null &&
                    error.data.serverResponse &&
                    error.data.serverResponse.errorMessage
                    ? error.data.serverResponse.errorMessage
                    : error.data &&
                      error.data.eventAlert &&
                      error.data.eventAlert.alertMessage
                    ? error.data.eventAlert.alertMessage
                    : errorMsg
                  : errorMsg,
                life: life,
                className: 'login-toast',
              })
            })
      })
      .catch((err: any) => {
        console.log('claimEventsCamunda Error api', err)
        setIsProgressLoader(false)
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: allMessages.error.errorClaim,
          life: life,
          className: 'login-toast',
        })
      })
    setRemoveTaskOpen(false)
    setUpdateEventOpen(false)
    setsaveEventTaskButton(false)
  }

  const callCancelWhenPublish = (
    requester: any,
    eventid: any,
    eventstatus: any,
    errorMsg: any,
    successMsg: any
  ) => {
    const reqBody = {
      requester,
      deleteEventRequests: [
        {
          eventId: eventid,
          status: eventstatus,
        },
      ],
    }
    deleteEventsCamunda(reqBody)
      .then((res: any) => {
        console.log(res, 'res')
        setIsProgressLoader(false)
        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: allMessages.success.successCancelEvent,
          life: life,
          className: 'login-toast',
        })
      })
      .catch((err: any) => {
        console.log(err, 'err')
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: allMessages.error.errorCancelEvent,
          life: life,
          className: 'login-toast',
        })
      })
  }

  const confirmSaveDialog = (
    <ConfirmBox
      cancelOpen={saveConfirm}
      handleCancel={() => setSaveConfirm(false)}
      handleProceed={() => handlePublishEvent('save')}
      // handleProceed={() => handlePublishEvent('ModifySave')}
      label1="Confirm 'Save'"
      label2="Are you sure you want to Save the Event changes?"
    />
  )
  const confirmRemoveDialog = (
    <ConfirmBox
      cancelOpen={removeConfirm}
      handleCancel={() => setRemoveConfirm(false)}
      // handleProceed={() => handlePublishEvent('modifySave')}
      handleProceed={() => handlePublishEvent('remove')}
      label1="Confirm 'Remove'"
      label2="Are you sure you want to Remove the Task(s)?"
    />
  )
  const confirmPublishDialog = (
    <ConfirmBox
      cancelOpen={publishConfirm}
      handleCancel={() => setPublishConfirm(false)}
      // handleProceed={() => handlePublishEvent('Confirmed')}
      handleProceed={() => handlePublishEvent('publish')}
      label1="Confirm 'Publish'"
      label2="Are you sure you want to Publish the Event?"
    />
  )

  const confirmCancelDialog = (
    <ConfirmBox
      cancelOpen={cancelConfirm}
      handleCancel={() => setCancelConfirm(false)}
      // handleProceed={() => handlePublishEvent('Confirmed')}
      handleProceed={() => {
        setCancelConfirm(false)
        handlePublishEvent('cancel')
      }}
      label1="Confirm 'Cancel'"
      label2="Are you sure you want to Cancel the Event?"
    />
  )

  const rowClass = (data: any) => {
    return {
      'row-accessories': data.visibility === 'Removed', //"Disabled"
      // 'p-highlight': data.visibility === 'Disabled', //"Disabled"
      cursor: data.visibility === 'Removed', //"Disabled"
    }
  }
  const columnClass = (data: any) => {
    return {
      sridhar: data.visibility === 'Removed', //"Disabled"
    }
  }
  const setSelectTasksChange = (e: any) => {
    let val = e.value
    // e.originalEvent.target.ariaChecked = 'true'
    // console.log(e.originalEvent.target.attributes[2].value)
    console.log('HEllo', e)
    setSelectTasks(val)
  }

  const handleRow = (event: any) => {
    if (event.originalEvent.target.cellIndex === 0) {
      // event.originalEvent.target.outerHTML = ''
      // event.originalEvent.target.ariaChecked = 'false'
      console.log(event.originalEvent.currentTarget)
      // console.log("My checkkk",event.currentTarget.getAttribute("aria-checked"))
      setTaskDetails(
        taskDetails.map((task: any) => {
          if (event.data.taskId === task.taskId) {
            task.visibility = 'Enabled'
          }
          return task
        })
      )

      console.log('onRowClick', event.originalEvent.target, event)
    } else {
      return
    }
  }

  return (
    <>
      <Toast
        ref={toast}
        position="bottom-left"
        // onRemove={() => {
        //   history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
        // }}
        onRemove={handleToaster}
      />
      <LoadingComponent showLoader={isProgressLoader} />

      {/* <Paper className={classes.root} elevation={0}> */}
      <div
        className="manageUser" //className={classes.root}
      >
        <div className={classes.value}>
          <Grid item container spacing={2}>
            <Grid
              container
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              style={{ paddingBottom: '20px' }}
            >
              <Grid item sm={10} xs={12}>
                <Typography variant="h6" color="primary">
                  Manage Event - {eventName && eventName}
                </Typography>
              </Grid>

              <Grid
                item
                sm={2}
                xs={12}
                style={{
                  textAlign: aboveSm ? 'right' : 'left',
                }}
              >
                <Typography color="primary">
                  <button className="backButton" onClick={goBack}>
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
                </Typography>
              </Grid>
            </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <DataTable
                  value={eventDetails && eventDetails}
                  // value={rangeEventRequest && rangeEventRequest}
                  scrollable
                  showGridlines
                  style={{
                    height: '100%',
                  }}
                  loading={tableLoading}
                >
                  {manageEventPublishCols.map((col: any, index: any) => {
                    return (
                      <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        body={
                          (col.field === 'targetDate' && launchDateTemplate) ||
                          // (col.field === 'resetType' && resetTypeTemplate) ||
                          (col.field === 'appDueDate' && rafDueDateTemplate) ||
                          (col.field === 'tradeGroup' && groupTemplate) ||
                          (col.field === 'category' && categoryTemplate) ||
                          (col.field === 'department' && departmentTemplate) ||
                          (col.field === 'uniqueId' && eventUniqueId) ||
                          (col.field === 'eventName' && eventNameTemplate) ||
                          (col.field === 'clearancePriceCheck' &&
                            clearancePriceTemplate) ||
                          (col.field === 'orderStopDateCheck' &&
                            GSCOPDateTemplate) ||
                          (col.field === 'stopOrder' && stopOrderTemplate) ||
                          (col.field === 'buyer' && buyerTemplate) ||
                          (col.field === 'planogramClass' && classTemplate) ||
                          (col.field === 'wastageRange' &&
                            storeWasteProcessTemplate) ||
                          (col.field === 'buyerAssistant' &&
                            buyingAssistantTemplate) ||
                          (col.field === 'ownBrandManager' &&
                            ownBrandManagerTemplate) ||
                          (col.field === 'seniorBuyingManager' &&
                            seniorBuyingManagerTemplate) ||
                          (col.field === 'merchandiser' &&
                            merchandiserTemplate) ||
                          (col.field === 'rangeResetManager' &&
                            rangeResetManagerTemplate) ||
                          (col.field === 'categoryDirector' &&
                            categoryDirectorTemplate) ||
                          (col.field === 'supplyChainSplst' &&
                            supplyChainSplstTemplate)
                        }
                        style={ConfirmedBodyStyle(col.width)}
                        headerStyle={ConfirmedHeaderStyle(col.width)}
                      />
                    )
                  })}
                </DataTable>
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                {/* <Typography variant="subtitle1">Manage Tasks</Typography> */}
                <Typography variant="h6" color="primary">
                  Manage Task
                </Typography>
              </Grid>

              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <DataTable
                  value={taskDetails && taskDetails}
                  selectionMode={selectTasks > 0 ? 'single' : 'checkbox'}
                  selection={selectTasks}
                  // selection={true}
                  onSelectionChange={(e) => setSelectTasksChange(e)}
                  scrollable
                  showGridlines
                  // sortField="taskId"
                  // rowStyle={{ background: 'red' }}
                  rowClassName={rowClass}
                  onRowClick={handleRow}
                  loading={tableLoading}
                >
                  <Column
                    // selectionMode="multiple"
                    selectionMode={'multiple'}
                    headerStyle={{
                      width: '50px',
                      color: 'white',
                      backgroundColor: theme1.palette.primary.main,
                    }}
                  ></Column>

                  {manageTaskPublishCols.map((col: any, index: any) => {
                    return (
                      <Column
                        // style={{
                        //   //   fontSize: aboveSm ? '0.8rem' : '0.65rem',
                        //   background: '#e9ecef',
                        // }}
                        key={index}
                        field={col.field}
                        header={col.header}
                        body={
                          (col.field === 'dueDate' && dueDateTemplate) ||
                          (col.field === 'notifiedDate' &&
                            notifiedDateTemplate) ||
                          (col.field === 'assignedUserGroup' &&
                            userGroupTemplate)
                        }
                        style={ConfirmedBodyStyle(col.width)}
                        sortable={col.field === 'taskId'}
                        headerStyle={ConfirmedHeaderStyle(col.width)}
                      />
                    )
                  })}
                </DataTable>
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid item xl={5} lg={5} md={5} />

              <Grid item container xl={7} lg={7} md={7} sm={12} xs={12}>
                <Grid
                  item
                  container
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  spacing={3}
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {eventDetails && eventDetails[0].eventStatus === 'Draft' ? (
                    <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        // type="submit"
                        // onClick={removeTasks}
                        // onClick={() => handlePublishEvent('Cancel')}
                        // onClick={() => setRemoveTaskOpen(true)}
                        onClick={() => setRemoveConfirm(true)}
                      >
                        Remove Task
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        // type="submit"
                        // onClick={removeTasks}
                        // onClick={() => handlePublishEvent('Cancel')}
                        // onClick={() => setRemoveTaskOpen(true)}
                        onClick={() => setCancelConfirm(true)}
                        disabled={
                          eventDetails &&
                          eventDetails[0].eventStatus.toLowerCase() ===
                            'cancelled'
                        }
                      >
                        Cancel Event
                      </Button>
                    </Grid>
                  )}
                  {eventDetails && eventDetails[0].eventStatus === 'Draft' ? (
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        // type="submit"
                        // onClick={() => handlePublishEvent('ModifySave')}
                        // onClick={() => setsaveEventTaskButton(true)}
                        onClick={() => setSaveConfirm(true)}
                      >
                        Save
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        // type="submit"
                        // onClick={() => handlePublishEvent('ModifySave')}
                        // onClick={() => setsaveEventTaskButton(true)}
                        onClick={() => setRemoveConfirm(true)}
                        disabled={
                          eventDetails &&
                          eventDetails[0].eventStatus.toLowerCase() ===
                            'cancelled'
                        }
                      >
                        Remove Task
                      </Button>
                    </Grid>
                  )}

                  <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                    {eventDetails && eventDetails[0].eventStatus === 'Draft' ? (
                      <Tooltip
                        title={
                          publishVisible
                            ? 'Click on save to save the data.'
                            : ''
                        }
                      >
                        <span>
                          <Button
                            // disabled={publishVisible}
                            variant="contained"
                            color="primary"
                            // type="submit"
                            // onClick={() => handlePublishEvent('Confirmed')}
                            onClick={() => setPublishConfirm(true)}
                          >
                            Publish Event
                          </Button>
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Click on save to save the data.">
                        <span>
                          <Button
                            // disabled={publishVisible}
                            variant="contained"
                            color="primary"
                            // type="submit"
                            // onClick={() => handlePublishEvent('Confirmed')}
                            onClick={() => setUpdateEventOpen(true)}
                            disabled={
                              eventDetails &&
                              eventDetails[0].eventStatus.toLowerCase() ===
                                'cancelled'
                            }
                          >
                            Update Event
                          </Button>
                        </span>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      {/* </Paper> */}
      {classDialog}
      {userGroupDialog}
      {updateEventDialog}
      {/* {removeTaskDialog}
      {saveEventTask} */}
      {confirmSaveDialog}
      {confirmRemoveDialog}
      {confirmPublishDialog}
      {confirmCancelDialog}
      {confirmLaunchDateDialog}
      {confirmDueDateChangeDialog}
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    // fileData: state.fileReducer.fileData,
    // fileErrorData: state.fileReducer.fileErrorData,
    fileManageData: state.fileReducer.fileManageData,
  }
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    // setFile: (fileData: any) => dispatch(setFile(fileData)),
    // resetFile: () => dispatch(resetFile),
    // resetErrorFile: () => dispatch(resetErrorFile()),
    resetTaskFile: () => dispatch(resetTaskFile()),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ManageEventCreate)
