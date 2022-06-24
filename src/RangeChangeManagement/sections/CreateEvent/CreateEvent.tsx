import {
  makeStyles,
  Grid,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Dialog,
  useTheme,
  useMediaQuery,
  Paper,
  Select,
  OutlinedInput,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
  withStyles,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import InfoIcon from '@material-ui/icons/Info'
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { useEffect, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import DateFnsUtils from '@date-io/date-fns'
import { useHistory, Prompt } from 'react-router-dom'
import { yesOrNo, errorArrayMessage } from './DataConstants'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import { useStyles } from './styles'
import SearchSelect from '../../components/SearchSelect/SearchSelect'
import { routes, life } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import '../../../index.css'
import {
  createEventsCamunda,
  getPlanogramClasses,
  getWastageRanges,
  // getProductHierarchyAPI,
  // putUserGroupAPI,
  getProductHierarchyListAPI,
  getResetTypes,
  getUsersAPIByEmailAndRole,
  patchRangeResetEvents,
  patchUpdateRangeResets,
  publishEventsCamunda,
  getEventDetailsById,
  claimEventsCamunda,
} from '../../../api/Fetch'
import ConfirmCheckSign from '../../components/ConfirmCheck/ConfirmCheckSign'
import { connect } from 'react-redux'
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import {
  setFile,
  resetFile,
  setErrorFile,
  resetErrorFile,
  setTaskFile,
} from '../../../redux/Actions/FileUpload'
import LightTooltip from '../../components/LightToolTip/LightTooltip'
// import styled from 'styled-components'

function CreateEvent(props: any) {
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.up(768))
  const {
    userDetail,
    setFile,
    resetFile,
    fileData,
    fileErrorData,
    setErrorFile,
    resetErrorFile,
    setTaskFile,
  } = props

  const {
    DEFAULT,
    RANGEAMEND_CREATE,
    RANGEAMEND_MANAGE_TASK,
    RANGEAMEND_EVENTDASH,
    RANGEAMEND_MANAGE,
  } = routes

  // const [uniqueId, setUniqueId] = useState<any>("");
  // const [uniqueIdError, setUniqueIdError] = useState<any>("");
  const [errorData, setErrorData] = useState<any>('')

  const [resetType, setResetType] = useState<any>('')
  const [resetTypeError, setResetTypeError] = useState<any>('')
  const [classValues, setClassValues] = useState<any>()
  const [confirmClassValues, setConfirmClassValues] = useState<any>()
  const [classFormData, setClassFormData] = useState<any>()
  const [group, setGroup] = useState<any>('')
  const [groupError, setGroupError] = useState<any>('')
  const [category, setCategory] = useState<any>('')
  const [categoryError, setCategoryError] = useState<any>('')
  const [department, setDepartment] = useState<any>('')
  const [departmentError, setDepartmentError] = useState<any>('')
  const [rafDueDate, setRafDueDate] = useState<any>(null)
  const [rafDueDateError, setRafDueDateError] = useState<any>('')
  const [launchDate, setLaunchDate] = useState<any>(
    null
    // `${new Date().toISOString().split('T')[0]}`
  )
  const [launchDateError, setLaunchDateError] = useState<any>('')
  const [eventName, setEventName] = useState<any>('')
  const [storeWasteProcess, setStoreWasteProcess] = useState<any>(null)
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
  const [clearancePriceApplied, setClearancePriceApplied] = useState<any>('Y')
  const [orderStopDateCheck, setStopDateCheck] = useState<any>('Y')
  const [stopOrder, setStopOrder] = useState<any>('Y')

  const [classOpen, setClassOpen] = useState(false)

  const [errMessage, setErrMessage] = useState<any>(false)
  const [errRafDueDate, setErrRafdueDate] = useState<any>(false)
  const [errReset, setErrReset] = useState<any>(false)
  const [errGroup, setErrGroup] = useState<any>(false)
  const [errCategory, setErrCategory] = useState<any>(false)
  const [errDepartment, setErrDepartment] = useState<any>(false)
  const [errLaunchDate, setErrLaunchDate] = useState<any>(false)
  const [errEventName, setErrEventName] = useState<any>(false)
  const [errWastageRange, setErrWastageRange] = useState<any>(false)
  const [errPlanogramClass, setErrPlanogramClass] = useState<any>(false)
  const [errBuyer, setErrBuyer] = useState<any>(false)
  const [errBuyerAssisant, setErrBuyerAssisant] = useState<any>(false)
  const [errOwnBrandManager, setErrOwnBrandManager] = useState<any>(false)
  const [errSeniorBuyingManager, setErrSeniorBuyingManager] =
    useState<any>(false)
  const [errMerchandiser, setErrMerchandiser] = useState<any>(false)
  const [errRangeResetManager, setErrRangeResetManager] = useState<any>(false)
  const [errCategoryDirector, setErrCategoryDirector] = useState<any>(false)
  const [errSupplyChainSpecialist, setErrSupplyChainSpecialist] =
    useState<any>(false)
  const [errClearancePrice, setErrClearancePrice] = useState<any>(false)
  const [errOrderStopDate, setErrOrderStopDate] = useState<any>(false)
  const [errStopOrder, setErrStopOrder] = useState<any>(false)
  const [errCamunda, setErrCamunda] = useState<any>(false)

  const [errorMessageValues, setErrorMessageValues] = useState<any>('')
  const [rafDueDateError1, setRafDueDateError1] = useState<any>('')
  const [resetError1, setResetError1] = useState<any>('')
  const [tradingGError1, setTradingGError1] = useState<any>('')
  const [categoryError1, setCategoryGError1] = useState<any>('')
  const [departmentError1, setDepartmentError1] = useState<any>('')
  const [launchError1, setLaunchError1] = useState<any>('')
  const [eventNameErr1, setEventNameErr1] = useState<any>('')
  const [planogramClassError1, setPlanogramClassError1] = useState<any>('')
  const [wastageRangeError1, setWastageRangeError1] = useState<any>('')
  const [buyerError1, setBuyerError1] = useState<any>('')
  const [buyingAssistentError1, setBuyingAssistentError1] = useState<any>('')
  const [ownBrandManagerError1, setOwnBrandManagerError1] = useState<any>('')
  const [seniorBuyingManagerError1, setSeniorBuyingManagerError1] =
    useState<any>('')
  const [merchandiserError1, setMerchandiserError1] = useState<any>('')
  const [rangeResetManagerError1, setRangeResetManagerError1] =
    useState<any>('')
  const [categoryDirectorError1, setCategoryDirectorError1] = useState<any>('')
  const [supChainSpecialistError1, setSupChainSpecialistError1] =
    useState<any>('')
  const [clearancePriceError1, setClearancePriceError1] = useState<any>('')
  const [orderStopDateError1, setOrderStopDateError1] = useState<any>('')
  const [stopOrderError1, setStopOrderError1] = useState<any>('')
  const [camundaError1, setCamundaError1] = useState<any>('')

  const [productHierValues, setProductHierValues] = useState<any>([])
  const [disableSave, setDisableSave] = React.useState(false)
  const [disableCreate, setDisableCreate] = React.useState(false)
  const [disablePublish, setDisablePublish] = React.useState(false)

  const [errorCheck, setErrorCheck] = useState(-1)

  const toast = useRef<any>(null)
  const focusResetType = useRef<any>(null)
  const focusGroup = useRef<any>(null)
  const focusDepartment = useRef<any>(null)
  const focusCategory = useRef<any>(null)
  const focusLaunchDate = useRef<any>(null)
  const focusEventName = useRef<any>(null)
  const focusRafDueDate = useRef<any>(null)
  const focusBuyer = useRef<any>(null)
  const focusCategoryDirector = useRef<any>(null)
  const focusSeniorBuyingManager = useRef<any>(null)
  const focusBuyingAssistant = useRef<any>(null)
  const focusMerchandiser = useRef<any>(null)
  const focusSupplyChainSpecialist = useRef<any>(null)
  const focusOwnBrandManager = useRef<any>(null)
  const focusRangeRestManager = useRef<any>(null)

  const [resetOptions, setResetOptions] = useState<any>([])
  const [classOptions, setClassOptions] = useState<any>([])
  const [wastageRanges, setWastageRanges] = useState<any>([])
  const [groupOptions, setGroupOptions] = useState<any>([])
  const [categoryOptions, setCategoryOptions] = useState<any>([])
  const [departmentOptions, setDepartmentOptions] = useState<any>([])

  const [cancelOpenApprove, setCancelOpenApprove] = React.useState(false)
  const [cancelOpenPublish, setCancelOpenPublish] = React.useState(false)
  const [cancelOpenSave, setCancelOpenSave] = React.useState(false)
  const [back, setBack] = React.useState(false)
  const [isPageModified, setIsPageModified] = React.useState(false)
  const [isSuccessCall, setIsSuccessCall] = React.useState(true)
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  const [toastRemove, setToastRemove] = React.useState('')
  const [toastRemovePublish, setToastRemovePublish] = React.useState('')

  // useEffect(() => {
  //   console.log(rafDueDateError1)
  // }, [rafDueDateError1])

  // const LightTooltip = withStyles((theme) => ({
  //   tooltip: {
  //     backgroundColor: theme.palette.common.white,
  //     color: 'rgba(0, 0, 0, 0.87)',
  //     boxShadow: theme.shadows[1],
  //     fontSize: 11,
  //   },
  // }))(Tooltip)

  useEffect(() => {
    return () => resetErrorFile()
  }, [])

  const checkErrorMessages2 = (item: any) => {
    console.log(item && item)
    let newData = item
    // item.name && setEventName(item.name)
    let errorArray = item.errorMessage.split(',')
    if (!item.errorMessage.includes(',')) {
      errorArray.push('')
    }
    console.log(errorArray)
    console.log(errorArray.length)
    let count = 0

    errorArray.map((err: any) => {
      let oneError = err.split(' : ')
      let key = oneError[0]
      let value = oneError[1]
      console.log(key, ' : ', value)

      // if (key === 'AppDue Date') {
      if (key === errorArrayMessage.appDueDate) {
        // setRafDueDateError1(value)
        newData.appDueDateError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Reset Type') {
      if (key === errorArrayMessage.resetType) {
        console.log(key)
        console.log(value)

        newData.resetTypeError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Trading Group') {
      if (key === errorArrayMessage.tradingGroup) {
        newData.tradingGroupError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Category') {
      if (key === errorArrayMessage.category) {
        newData.categoryError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Department') {
      if (key === errorArrayMessage.department) {
        newData.departmentError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Launch Date') {
      if (key === errorArrayMessage.launchDate) {
        newData.targetDateError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      if (key === errorArrayMessage.eventName) {
        newData.eventNameError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Planogram Class') {
      if (key === errorArrayMessage.planogramClass) {
        newData.planogramClassError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }
      // if (key === 'Wastage Range') {
      if (key === errorArrayMessage.wastageRange) {
        newData.wastageRangeError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Buyer') {
      //   console.log('executing buyer if')
      if (key === errorArrayMessage.buyer) {
        newData.buyerError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Buying Assistant') {
      if (key === errorArrayMessage.buyingAssistant) {
        newData.buyerAssistantError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Category Director') {
      if (key === errorArrayMessage.categoryDirector) {
        newData.categoryDirectorError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Sr. Buying Manager') {
      if (key === errorArrayMessage.srBuyingManager) {
        newData.seniorBuyingManagerError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Merchandiser') {
      if (key === errorArrayMessage.merchandiser) {
        newData.merchandiserError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }
      // if (key === 'Range Reset Manager') {
      if (key === errorArrayMessage.rangeResetManager) {
        newData.rangeResetManagerError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Own Brand Manager') {
      if (key === errorArrayMessage.ownBrandManager) {
        newData.ownBrandManagerError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }

      // if (key === 'Supply Chain Specialist') {
      if (key === errorArrayMessage.supplyChainSpecialist) {
        newData.supplyChainAnalystError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }
      if (key === errorArrayMessage.clearancePriceCheck) {
        newData.clearancePriceError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }
      if (key === errorArrayMessage.orderStopDateCheck) {
        newData.orderStopDateError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }
      if (key === errorArrayMessage.stopOrder) {
        newData.stopOrderError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }
      if (key === errorArrayMessage.camundaError) {
        newData.camundaError = value
        console.log(newData)
        count = count + 1
        // setErrorFile(newData)
      }
    })
    console.log(count)
    console.log(errorArray.length)
    if (count === errorArray.length - 1) {
      return newData
    }
  }

  // const checkErrorMessages = (item: any) => {
  //   console.log(item && item)

  //   item.name && setEventName(item.name)
  //   let errorArray = item.errorMessage.split(',')
  //   console.log(errorArray)
  //   let count = 0

  //   errorArray.map((err: any) => {
  //     let oneError = err.split(' : ')
  //     let key = oneError[0]
  //     let value = oneError[1]
  //     console.log(key, ' : ', value)

  //     if (key === 'AppDue Date') {
  //       // setRafDueDateError1(value)
  //       let newData = item
  //       newData.appDueDatError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Reset Type') {
  //       console.log(key)
  //       console.log(value)
  //       let newData = item
  //       newData.resetTypeError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Trading Group') {
  //       let newData = item
  //       newData.tradingGroupError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Category') {
  //       let newData = item
  //       newData.categoryError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Department') {
  //       let newData = item
  //       newData.departmentError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Launch Date') {
  //       let newData = item
  //       newData.targetDateError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Planogram Class') {
  //       let newData = item
  //       newData.planogramClassError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }
  //     if (key === 'Wastage Range') {
  //       let newData = item
  //       newData.wastageRangeError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Buyer') {
  //       console.log('executing buyer if')
  //       let newData = item
  //       newData.buyerError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Buying Assistant') {
  //       let newData = item
  //       newData.buyerAssistantError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Category Director') {
  //       let newData = item
  //       newData.categoryDirectorError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Sr. Buying Manager') {
  //       let newData = item
  //       newData.seniorBuyingManagerError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Merchandiser') {
  //       let newData = item
  //       newData.merchandiserError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }
  //     if (key === 'Range Reset Manager') {
  //       let newData = item
  //       newData.rangeResetManagerError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Own Brand Manager') {
  //       let newData = item
  //       newData.ownBrandManagerError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }

  //     if (key === 'Supply Chain Specialist') {
  //       let newData = item
  //       newData.supplyChainAnalystError = value
  //       console.log(newData)
  //       count = count + 1
  //       setErrorFile(newData)
  //     }
  //   })
  //   console.log(count)
  //   console.log(errorArray.length)
  //   if (count === errorArray.length - 1) {
  //     console.log('count', count)
  //     checkForErrors(fileErrorData)
  //   }

  //   // errorArray.map((err: any) => {
  //   //   let oneError = err.split(' : ')
  //   //   let key = oneError[0]
  //   //   let value = oneError[1]
  //   //   console.log(key, ' : ', value)

  //   //   if (key === 'AppDue Date') {
  //   //     setErrRafdueDate(true)
  //   //     setRafDueDateError1(value)
  //   //     if (item.hasOwnProperty('appDueDate')) {
  //   //       setRafDueDate(item.appDueDate)
  //   //     } else {
  //   //       setRafDueDate(null)
  //   //     }
  //   //   } else {
  //   //     console.log(item.appDueDate)
  //   //     item.appDueDate && setRafDueDate(item.appDueDate)
  //   //   }

  //   //   if (key === 'Reset Type') {
  //   //     if (item.hasOwnProperty('resetType')) {
  //   //       setResetType({ value: item.resetType, label: item.resetType })
  //   //     }
  //   //     setErrReset(true)
  //   //     setResetError1(value)
  //   //   } else {
  //   //     item.resetType &&
  //   //       setResetType({ value: item.resetType, label: item.resetType })
  //   //   }

  //   //   if (key === 'Trading Group') {
  //   //     if (!item.hasOwnProperty('tradeGroup')) {
  //   //       setErrGroup(true)
  //   //       setTradingGError1(value)
  //   //       setGroup([])
  //   //     } else {
  //   //       item.tradeGroup &&
  //   //         setGroup({
  //   //           value: item.tradeGroup,
  //   //           label: item.tradeGroup,
  //   //           groupName: item.tradeGroup,
  //   //         })
  //   //     }
  //   //   }

  //   //   if (key === 'Category') {
  //   //     if (!item.hasOwnProperty('category') || errBuyer) {
  //   //       setErrCategory(true)
  //   //       setCategoryGError1(value)
  //   //       setCategory([])
  //   //     } else {
  //   //       item.category &&
  //   //         setCategory({
  //   //           value: item.category,
  //   //           label: item.category,
  //   //           categoryId: item.categoryId,
  //   //           categoryName: item.category,
  //   //         })
  //   //     }
  //   //   }

  //   //   if (key === 'Department') {
  //   //     if (!item.hasOwnProperty('department')) {
  //   //       setErrDepartment(true)
  //   //       setDepartmentError1(value)
  //   //       setDepartment([])
  //   //     } else {
  //   //       item.department &&
  //   //         setDepartment({
  //   //           value: item.department,
  //   //           label: item.department,
  //   //           departmentId: item.departmentId,
  //   //           departmentName: item.department,
  //   //         })
  //   //     }
  //   //   }

  //   //   if (key === 'Launch Date') {
  //   //     setErrLaunchDate(true)
  //   //     setLaunchError1(value)
  //   //     if (item.hasOwnProperty('targetDate')) {
  //   //       setLaunchDate(item.targetDate)
  //   //     } else {
  //   //       setLaunchDate(null)
  //   //     }
  //   //   } else {
  //   //     console.log(item.targetDate)
  //   //     item.targetDate && setLaunchDate(item.targetDate)
  //   //   }

  //   //   // if(key==='Planogram Class'){

  //   //   //   let classValues = value.planogramClass
  //   //   //   console.log(classValues)
  //   //   //   if (classValues && classValues.length > 0) {
  //   //   //     setConfirmClassValues(classValues.className)
  //   //   //   }
  //   //   // }

  //   //   if (key === 'Buyer') {
  //   //     console.log('executing buyer if')
  //   //     setBuyerConfirmed(false)
  //   //     setBuyer(item.buyerEmailId)
  //   //     setErrBuyer(true)
  //   //     setBuyerValue('')
  //   //     setBuyerError1(value)
  //   //   }
  //   //   // else {
  //   //   //   console.log('executing buyer else')
  //   //   //   setBuyerConfirmed(true)
  //   //   //   setBuyer(item.buyerEmailId)
  //   //   // }

  //   //   if (key === 'Buying Assistant') {
  //   //     setBuyingAssistantConfirmed(false)
  //   //     setBuyingAssistant(item.buyerAssistantEmailId)
  //   //     setErrBuyerAssisant(true)
  //   //     setBuyingAssistantValue('')
  //   //     setBuyingAssistentError1(value)
  //   //   }
  //   //   // else {
  //   //   //   setBuyingAssistantConfirmed(true)
  //   //   //   setBuyingAssistant(item.buyerAssistantEmailId)
  //   //   // }

  //   //   if (key === 'Category Director') {
  //   //     setCategoryDirectorConfirmed(false)
  //   //     setCategoryDirector(item.categoryDirectorEmailId)
  //   //     setErrCategoryDirector(true)
  //   //     setCategoryDirectorValue('')
  //   //     setCategoryDirectorError1(value)
  //   //   }
  //   //   // else {
  //   //   //   setCategoryDirectorConfirmed(true)
  //   //   //   setCategoryDirector(item.categoryDirectorEmailId)
  //   //   // }

  //   //   if (key === 'Sr. Buying Manager') {
  //   //     setSeniorBuyingManagerConfirmed(false)
  //   //     setSeniorBuyingManager(item.seniorBuyingManagerEmailId)
  //   //     setErrSeniorBuyingManager(true)
  //   //     setSeniorBuyingManagerValue('')
  //   //     setSeniorBuyingManagerError1(value)
  //   //   }
  //   //   // else {
  //   //   //   setSeniorBuyingManagerConfirmed(true)
  //   //   //   setSeniorBuyingManager(item.seniorBuyingManagerEmailId)
  //   //   // }

  //   //   if (key === 'Merchandiser') {
  //   //     setMerchandiserConfirmed(false)
  //   //     setMerchandiser(item.merchandiserEmailId)
  //   //     setErrMerchandiser(true)
  //   //     setMerchandiserValue('')
  //   //     setMerchandiserError1(value)
  //   //   }
  //   //   // else {
  //   //   //   setMerchandiserConfirmed(true)
  //   //   //   setMerchandiser(item.merchandiserEmailId)
  //   //   // }

  //   //   if (key === 'Range Reset Manager ') {
  //   //     setRangeResetManagerConfirmed(false)
  //   //     setRangeResetManager(item.rangeResetManagerEmailId)
  //   //     setErrRangeResetManager(true)
  //   //     setRangeResetManagerValue('')
  //   //     setRangeResetManagerError1(value)
  //   //   }
  //   //   // else {
  //   //   //   setRangeResetManagerConfirmed(true)
  //   //   //   setRangeResetManager(item.rangeResetManagerEmailId)
  //   //   // }

  //   //   if (key === 'Own Brand Manager ') {
  //   //     setOwnBrandManagerConfirmed(false)
  //   //     setOwnBrandManager(item.ownBrandManagerEmailId)
  //   //     setErrOwnBrandManager(true)
  //   //     setOwnBrandManagerValue('')
  //   //     setOwnBrandManagerError1(value)
  //   //   }
  //   //   // else {
  //   //   //   setOwnBrandManagerConfirmed(true)
  //   //   //   setOwnBrandManager(item.ownBrandManagerEmailId)
  //   //   // }

  //   //   if (key === 'Supply Chain Specialist') {
  //   //     setSupplyChainSpecialistConfirmed(false)
  //   //     setSupplyChainSpecialist(item.supplyChainAnalystEmailId)
  //   //     setErrSupplyChainSpecialist(true)
  //   //     setSupplyChainSpecialistValue('')
  //   //     setSupChainSpecialistError1(value)
  //   //   }
  //   //   // else {
  //   //   //   setSupplyChainSpecialistConfirmed(true)
  //   //   //   setSupplyChainSpecialist(item.supplyChainAnalystEmailId)
  //   //   // }
  //   // })
  // }

  const checkForErrors = (value: any) => {
    if (value) {
      if (value.hasOwnProperty('appDueDateError')) {
        setErrRafdueDate(true)
        console.log('appDueDateError')
        setRafDueDateError1(value.appDueDateError)
        if (value.hasOwnProperty('appDueDate')) {
          if (value.appDueDate) {
            const date = new Date(value.appDueDate)
            setRafDueDate(date.toISOString().split('T')[0])
          }
        } else {
          setRafDueDate(null)
        }
      } else {
        console.log(value.appDueDate)
        if (value.appDueDate) {
          const date = new Date(value.appDueDate)
          setRafDueDate(date.toISOString().split('T')[0])
        }
      }

      if (value.hasOwnProperty('resetTypeError')) {
        // setBuyer(value.buyerEmailId)
        if (value.hasOwnProperty('resetType')) {
          setResetType({ value: value.resetType, label: value.resetType })
        }
        setErrReset(true)
        // setErrBuyer(true)
        setResetError1(value.resetTypeError)
      } else {
        value.resetType &&
          setResetType({ value: value.resetType, label: value.resetType })
      }
      if (!value.hasOwnProperty('tradeGroup')) {
        setErrGroup(true)
        setTradingGError1(value.tradingGroupError)
      } else {
        value.tradeGroup &&
          setGroup({
            value: value.tradeGroup,
            label: value.tradeGroup,
            groupName: value.tradeGroup,
          })
        if (value.hasOwnProperty('categoryError')) {
          setErrCategory(true)
          setCategoryGError1(value.categoryError)
        } else {
          value.tradeGroup &&
            setGroup({
              value: value.tradeGroup,
              label: value.tradeGroup,
              groupName: value.tradeGroup,
            })
          value.category &&
            setCategory({
              value: value.category,
              label: value.category,
              categoryId: value.categoryId,
              categoryName: value.category,
            })
          if (value.hasOwnProperty('departmentError')) {
            setErrDepartment(true)
            setDepartmentError1(value.departmentError)
          } else {
            value.tradeGroup &&
              setGroup({
                value: value.tradeGroup,
                label: value.tradeGroup,
                groupName: value.tradeGroup,
              })
            value.category &&
              setCategory({
                value: value.category,
                label: value.category,
                categoryId: value.categoryId.toString(),
                categoryName: value.category,
              })
            value.department &&
              setDepartment({
                value: value.department,
                label: value.department,
                departmentId: value.departmentId.toString(),
                departmentName: value.department,
              })
          }
        }
      }

      if (value.hasOwnProperty('targetDateError')) {
        setErrLaunchDate(true)
        setLaunchError1(value.targetDateError)
        if (value.hasOwnProperty('targetDate')) {
          if (value.targetDate) {
            const date = new Date(value.targetDate)
            setLaunchDate(date.toISOString().split('T')[0])
          }
        } else {
          setLaunchDate(null)
        }
      } else {
        console.log(value.targetDate)
        if (value.targetDate) {
          const date = new Date(value.targetDate)
          setLaunchDate(date.toISOString().split('T')[0])
        }
      }

      if (value.hasOwnProperty('eventNameError')) {
        setErrLaunchDate(true)
        setLaunchError1(value.eventNameError)
        if (value.hasOwnProperty('name')) {
          if (value.name) {
            setEventName(value.name)
          }
        } else {
          setEventName('')
        }
      } else {
        console.log(value.name)
        if (value.name) {
          setEventName(value.name)
        }
      }

      if (value.hasOwnProperty('planogramClassError')) {
        setErrPlanogramClass(true)
        setPlanogramClassError1(value.planogramClassError)
      } else {
        if (value.hasOwnProperty('planogramClass')) {
          let planogramClass = value.planogramClass
          if (planogramClass && planogramClass.hasOwnProperty('className')) {
            let classes = planogramClass.className
            let classValue = []
            for (var i = 0; i < classes.length; i++) {
              classValue.push({
                value: classes[i],
                label: classes[i],
              })
            }
            console.log(classValue)
            setClassValues(classValue)
            setConfirmClassValues(classValue)
          }
        }
      }

      if (value.hasOwnProperty('wastageRangeError')) {
        setErrWastageRange(true)
        setWastageRangeError1(value.wastageRangeError)
      } else {
        if (
          value.hasOwnProperty('wastageRange') &&
          value.hasOwnProperty('wastageRangeText')
        ) {
          let val = value.wastageRange
          let label = value.wastageRangeText
          setStoreWasteProcess({ value: val, label: label })
        }
      }

      if (value.hasOwnProperty('buyerError')) {
        setBuyerConfirmed(false)
        setBuyer(value.buyerEmailId)
        setErrBuyer(true)
        setBuyerValue('')
        setBuyerError1(value.buyerError)
      } else {
        setBuyerConfirmed(true)
        setBuyer(value.buyerEmailId)
      }

      if (value.hasOwnProperty('categoryDirectorError')) {
        setCategoryDirectorConfirmed(false)
        setCategoryDirector(value.categoryDirectorEmailId)
        setErrCategoryDirector(true)
        setCategoryDirectorValue('')
        setCategoryDirectorError1(value.categoryDirectorError)
      } else {
        setCategoryDirectorConfirmed(true)
        setCategoryDirector(value.categoryDirectorEmailId)
      }

      if (value.hasOwnProperty('seniorBuyingManagerError')) {
        setSeniorBuyingManagerConfirmed(false)
        setSeniorBuyingManager(value.seniorBuyingManagerEmailId)
        setErrSeniorBuyingManager(true)
        setSeniorBuyingManagerValue('')
        setSeniorBuyingManagerError1(value.seniorBuyingManagerError)
      } else {
        setSeniorBuyingManagerConfirmed(true)
        setSeniorBuyingManager(value.seniorBuyingManagerEmailId)
      }

      if (value.hasOwnProperty('buyerAssistantError')) {
        setBuyingAssistantConfirmed(false)
        setBuyingAssistant(value.buyerAssistantEmailId)
        setErrBuyerAssisant(true)
        setBuyingAssistantValue('')
        setBuyingAssistentError1(value.buyerAssistantError)
      } else {
        setBuyingAssistantConfirmed(true)
        setBuyingAssistant(value.buyerAssistantEmailId)
      }

      if (value.hasOwnProperty('merchandiserError')) {
        setMerchandiserConfirmed(false)
        setMerchandiser(value.merchandiserEmailId)
        setErrMerchandiser(true)
        setMerchandiserValue('')
        setMerchandiserError1(value.merchandiserError)
      } else {
        setMerchandiserConfirmed(true)
        setMerchandiser(value.merchandiserEmailId)
      }

      if (value.hasOwnProperty('supplyChainAnalystError')) {
        setSupplyChainSpecialistConfirmed(false)
        setSupplyChainSpecialist(value.supplyChainAnalystEmailId)
        setErrSupplyChainSpecialist(true)
        setSupplyChainSpecialistValue('')
        setSupChainSpecialistError1(value.supplyChainAnalystError)
      } else {
        setSupplyChainSpecialistConfirmed(true)
        setSupplyChainSpecialist(value.supplyChainAnalystEmailId)
      }

      if (value.hasOwnProperty('ownBrandManagerError')) {
        setOwnBrandManagerConfirmed(false)
        setOwnBrandManager(value.ownBrandManagerEmailId)
        setErrOwnBrandManager(true)
        setOwnBrandManagerValue('')
        setOwnBrandManagerError1(value.ownBrandManagerError)
      } else {
        setOwnBrandManagerConfirmed(true)
        setOwnBrandManager(value.ownBrandManagerEmailId)
      }

      if (value.hasOwnProperty('rangeResetManagerError')) {
        setRangeResetManagerConfirmed(false)
        setRangeResetManager(value.rangeResetManagerEmailId)
        setErrRangeResetManager(true)
        setRangeResetManagerValue('')
        setRangeResetManagerError1(value.rangeResetManagerError)
      } else {
        setRangeResetManagerConfirmed(true)
        setRangeResetManager(value.rangeResetManagerEmailId)
      }
      // if (value.hasOwnProperty('targetDate')) {
      //   setLaunchDate(value.targetDate)
      // }
      // let classValues = value.planogramClass
      // console.log(classValues)
      // if (classValues && classValues.length > 0) {
      //   setConfirmClassValues(classValues.className)
      // }

      if (value.name) {
        setEventName(value.name)
      }
      if (value.hasOwnProperty('clearancePriceError')) {
        setErrClearancePrice(true)
        setClearancePriceError1(value.clearancePriceError)
        setClearancePriceApplied(null)
      } else {
        setClearancePriceApplied(value.clearancePriceCheck)
      }
      if (value.hasOwnProperty('orderStopDateError')) {
        setErrOrderStopDate(true)
        setOrderStopDateError1(value.orderStopDateError)
        setStopDateCheck(null)
      } else {
        setStopDateCheck(value.orderStopDateCheck)
      }
      if (value.hasOwnProperty('stopOrderError')) {
        setErrStopOrder(true)
        setStopOrderError1(value.stopOrderError)
        setStopOrder(null)
      } else {
        setStopOrder(value.stopOrder)
      }

      if (value.hasOwnProperty('camundaError')) {
        setErrCamunda(true)
        setCamundaError1(value.camundaError)
      }
    }
  }

  useEffect(() => {
    if (fileErrorData.hasOwnProperty('buyerEmailId')) {
      // checkForErrors(fileErrorData)
      // checkErrorMessages(fileErrorData)
      let data = checkErrorMessages2(fileErrorData)
      data && checkForErrors(data)
    }
  }, [])

  // useEffect(() => {
  //   if (storeWasteProcess) {
  //     let data = storeWasteProcess.value
  //     let waste = data.replace('_', ' ')
  //     let newWaste = waste.split('_')
  //     console.log(newWaste)
  //     let newData = `Week +${newWaste[0]}\\ +${newWaste[1]}`
  //     console.log(newData)
  //   }
  // }, [storeWasteProcess])

  useEffect(() => {
    getResetTypes().then((res: any) => {
      const options = res.data.map((item: any) => {
        return {
          value: item.configValue,
          label: item.configValue,
        }
      })
      setResetOptions(options)
    })
  }, [])

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
    getWastageRanges().then((res: any) => {
      const options = res.data.map((item: any) => {
        return {
          value: item.configValue,
          label: item.configDescription,
        }
      })

      setWastageRanges(options)
      // setStoreWasteProcess(options[0])
    })
  }, [])

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
          // console.log(list)
          setGroupOptions(list)
          // console.log(groupList)
        })
        .catch((err: any) => setGroupOptions([]))
  }, [])

  useEffect(() => {
    console.log(group)
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

          group &&
            setCategoryOptions(
              list.filter((cat: any) => cat.groupName === group.groupName)
            )
          // group &&
          //   console.log(
          //     'category length: ',
          //     categoryList.filter((cat: any) => cat.groupId === group.id)
          //   )
        })
        .catch((err: any) => setCategoryOptions([]))
  }, [group])

  useEffect(() => {
    if (group && category) {
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
                  dep.groupName === group.groupName &&
                  dep.categoryName === category.categoryName
              )
            )
            // console.log(
            //   'department length: ',
            //   depList.filter(
            //     (dep: any) =>
            //       dep.groupId === group.id && dep.categoryId === category.id
            //   )
            // )
            // setLoaded(true)
          })
          .catch((err: any) => {
            setDepartmentOptions([])
            // setLoaded(true)
          })
    }
  }, [category])

  // useEffect(() => {
  //   getProductHierarchyListAPI &&
  //     getProductHierarchyListAPI('department')
  //       .then((res: any) => {
  //         const hierarchyList = res.data.hierarchyNode.map((item: any) => {
  //           return {
  //             groupId: item.group,
  //             groupName: item.groupName,
  //             categoryId: item.category,
  //             categoryName: item.categoryName,
  //             departmentId: item.department,
  //             departmentName: item.departmentName,
  //           }
  //         })
  //         setProductHierValues(hierarchyList)
  //         console.log(hierarchyList)
  //       })
  //       .catch((err: any) => setProductHierValues([]))
  // }, [])

  // useEffect(() => {
  //   if (productHierValues) {
  //     let data: any = []
  //     productHierValues.map((item: any) => {
  //       if (!data) {
  //         data.push({
  //           value: item.groupId,
  //           label: item.groupName,
  //           groupId: item.groupId,
  //           groupName: item.groupName,
  //         })
  //       } else if (
  //         data.findIndex((d: any) => d.groupId === item.groupId) === -1
  //       ) {
  //         data.push({
  //           value: item.groupName,
  //           label: item.groupName,
  //           groupId: item.groupId,
  //           groupName: item.groupName,
  //         })
  //       }
  //     })
  //     console.log(data)
  //     setGroupOptions(data)
  //   }
  // }, [productHierValues])

  // useEffect(() => {
  //   if (group) {
  //     let data: any = []
  //     productHierValues.map((item: any) => {
  //       if (
  //         data.findIndex((d: any) => d.categoryId === item.categoryId) === -1
  //       ) {
  //         if (group.value === item.groupName) {
  //           data.push({
  //             value: item.categoryId,
  //             label: item.categoryName,
  //             categoryId: item.categoryId,
  //             categoryName: item.categoryName,
  //           })
  //         }
  //       }
  //     })
  //     console.log(data)
  //     setCategoryOptions(data)
  //   }
  // }, [group])

  // useEffect(() => {
  //   if (category) {
  //     let data: any = []
  //     productHierValues.map((item: any) => {
  //       if (
  //         data.findIndex((d: any) => d.departmentId === item.departmentId) ===
  //         -1
  //       ) {
  //         if (item.categoryName === category.label) {
  //           data.push({
  //             value: item.departmentId,
  //             label: item.departmentName,
  //             departmentId: item.departmentId,
  //             departmentName: item.departmentName,
  //           })
  //         }
  //       }
  //     })
  //     console.log(data)
  //     setDepartmentOptions(data)
  //   }
  // }, [category])

  // useEffect(() => {
  //   // if (!fileErrorData) {
  //   // if (!fileErrorData.name) {
  //   if (eventName === '') {
  //     if (department && launchDate) {
  //       var lDate = new Date(launchDate)
  //       console.log(lDate)
  //       var name =
  //         department.departmentName.replace(/ /g, '_') +
  //         '_' +
  //         lDate.getDate() +
  //         lDate.toLocaleString('default', { month: 'short' }) +
  //         lDate.getFullYear()
  //       console.log(name)
  //       setEventName(name)
  //     }
  //   }
  //   // } else {
  //   //   setEventName(fileErrorData.name)
  //   // }
  //   // }
  // }, [department, launchDate, eventName])

  // useEffect(() => {
  //   if (name !== '' && eventName === '') {
  //     setEventName(name)
  //   }
  // }, [name, eventName])

  useEffect(() => {
    if (confirmClassValues && confirmClassValues.length > 0) {
      // console.log(confirmClassValues)
      setClassFormData(() => {
        return confirmClassValues.map((class1: any) => class1.value)
      })
    } else {
      setClassFormData(null)
    }
  }, [confirmClassValues])

  const goBack = () => {
    history.goBack()
    resetErrorFile()
  }

  const requiredStar = (
    <>
      &nbsp;
      <span
        style={{
          color: '#ff0000',
        }}
      >
        *
      </span>
    </>
  )

  // const handleUniqueId = (e: any) => {
  //   setUniqueId(e.target.value);
  //   if (e.target.value !== "") {
  //     setUniqueIdError("");
  //   }
  // };

  useEffect(() => {
    if (resetType !== 'Rapid Response' && !rafDueDate) {
      setRafDueDateError1('')
      setErrRafdueDate(false)
    }
  }, [resetType])

  const handleResetType = (e: any) => {
    if (e) {
      setErrReset(false)
      setResetType(e)
      setErrReset(false)
      setResetError1('')
      setIsPageModified(true)
      console.log(e)
    } else {
      setResetType('')
    }
    // setResetType(e.target.value)
    // if (e.target.value !== '') {
    //   setResetTypeError('')
    // }
  }

  const handleGroup = (e: any) => {
    if (e) {
      setErrGroup(false)
      setErrCategory(false)
      setErrDepartment(false)
      setIsPageModified(true)
      setGroup(e)
      setCategory('')
      setDepartment('')
      setDepartmentOptions([])
    } else {
      setGroup('')
      setCategory('')
      setDepartment('')
      setCategoryOptions([])
      setDepartmentOptions([])
    }
  }
  // setGroup(e.target.value)
  // if (e.target.value !== '') {
  //   setGroupError('')
  // }
  const handleCategory = (e: any) => {
    if (e) {
      setErrCategory(false)
      setErrDepartment(false)
      setIsPageModified(true)
      setCategory(e)
      setDepartment('')
    } else {
      setCategory('')
      setDepartment('')
      setDepartmentOptions([])
    }

    // setCategory(e.target.value)
    // if (e.target.value !== '') {
    //   setCategoryError('')
    // }
  }
  const handleDepartment = (e: any) => {
    if (e) {
      setErrDepartment(false)
      setIsPageModified(true)
      setDepartment(e)
      setErrEventName(false)
      setEventNameErr1('')
    } else {
      setDepartment('')
    }

    // setDepartment(e.target.value)
    // if (e.target.value !== '') {
    //   setDepartmentError('')
    // }
  }

  const handleWastageRange = (e: any) => {
    console.log(e)
    setErrWastageRange(false)
    setWastageRangeError1('')
    setStoreWasteProcess(e)
    setIsPageModified(true)
  }

  const handleBuyer = (e: any) => {
    setBuyerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setBuyer('')
    } else {
      setErrBuyer(false)
      setBuyer(value)
      setIsPageModified(true)
    }

    // setBuyer(e)
    // if (e) {
    //   setBuyerError('')
    // }
  }

  const handleBuyingAssistant = (e: any) => {
    setBuyingAssistantConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setBuyingAssistant('')
    } else {
      setErrBuyerAssisant(false)
      setBuyingAssistant(value)
      setIsPageModified(true)
    }
  }

  const handleOwnBrandManager = (e: any) => {
    setOwnBrandManagerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setOwnBrandManager('')
    } else {
      setErrOwnBrandManager(false)
      setOwnBrandManager(value)
      setIsPageModified(true)
    }
  }
  const handleSeniorBuyingManager = (e: any) => {
    setSeniorBuyingManagerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setSeniorBuyingManager('')
    } else {
      setErrSeniorBuyingManager(false)
      setSeniorBuyingManager(value)
      setIsPageModified(true)
    }
  }
  const handleMerchandiser = (e: any) => {
    setMerchandiserConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setMerchandiser('')
    } else {
      setErrMerchandiser(false)
      setMerchandiser(value)
      setIsPageModified(true)
    }
  }

  const handleRangeResetManager = (e: any) => {
    setRangeResetManagerConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setRangeResetManager('')
    } else {
      setErrRangeResetManager(false)
      setRangeResetManager(value)
      setIsPageModified(true)
    }
  }
  const handleCategoryDirector = (e: any) => {
    setCategoryDirectorConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setCategoryDirector('')
    } else {
      setErrCategoryDirector(false)
      setCategoryDirector(value)
      setIsPageModified(true)
    }
  }
  const handleSupplyChainSpecialist = (e: any) => {
    setSupplyChainSpecialistConfirmed(false)
    const value = e.target.value
    if (value === null || value === undefined || value === '') {
      setSupplyChainSpecialist('')
    } else {
      setErrSupplyChainSpecialist(false)
      setSupplyChainSpecialist(value)
      setIsPageModified(true)
    }
  }

  const handleClearancePrice = (e: any) => {
    setErrClearancePrice(false)
    setClearancePriceError1('')
    setClearancePriceApplied(e.target.value)
    setIsPageModified(true)
  }

  const handleStopDateCheck = (e: any) => {
    setErrOrderStopDate(false)
    setOrderStopDateError1('')
    setStopDateCheck(e.target.value)
    setIsPageModified(true)
  }

  const handleStopOrder = (e: any) => {
    setErrStopOrder(false)
    setStopOrderError1('')
    setStopOrder(e.target.value)
    setIsPageModified(true)
  }
  const handleRafDueDate = (e: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    // console.log(newDate)
    // const date = e.target.value
    // setRafDueDate(date)
    // const appDate: any = new Date(date)
    // const date1: any = new Date(launchDate && launchDate)
    // console.log(appDate)
    // console.log(date1)
    // if (launchDate) {
    //   const diffTime = appDate - date1
    //   console.log(diffTime)
    //   if (diffTime > 0) {
    //     setRafDueDateError(
    //       '‘RAF / App Due Date’ should not be greater than ‘Launch Date’'
    //     )
    //     focusRafDueDate.current.focus()
    //   } else {
    //     setRafDueDateError('')
    //   }
    // }
    if (launchDate !== null) {
      console.log(launchDate)
      if (e <= launchDate) {
        setRafDueDate(e)
        setErrRafdueDate(false)
        setRafDueDateError1('')
      } else {
        setErrRafdueDate(true)
        setRafDueDateError1(allMessages.error.rafDateError)
      }
    } else {
      setRafDueDate(e)
    }
    setIsPageModified(true)
  }

  const handleRafDateClear = (e: any) => {
    e.stopPropagation()
    setRafDueDate(null)
    setErrRafdueDate(false)
    setRafDueDateError1('')
    setIsPageModified(true)
  }

  // useEffect(() => {
  //   let today = new Date().toISOString().split('T')[0]
  //   if (launchDate < today) {
  //     setErrLaunchDate(true)
  //     setLaunchError1('Cannot be less than today')
  //     // setLaunchDate(null)
  //   } else {
  //     setErrLaunchDate(false)
  //     setLaunchError1('')
  //   }
  // }, [launchDate])

  // useEffect(() => {
  //   console.log('start')
  //   if (launchDate && launchDate !== null) {
  //     console.log('going')
  //     const systemDate = new Date().toISOString().split('T')[0]
  //     console.log(launchDate)
  //     var date1 = new Date(launchDate)
  //     console.log(launchDate)
  //     var date2 = new Date(systemDate)
  //     var date3 = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
  //     console.log(date3)
  //     // if (date3 < 0 || date3 > 14) {
  //     if (date3 < 0) {
  //       // setLaunchDate(null)
  //       setErrLaunchDate(true)
  //       setLaunchError1(allMessages.error.launchDateerror)
  //     } else {
  //       setErrLaunchDate(false)
  //       setLaunchError1('')
  //     }
  //   }
  // }, [launchDate])

  useEffect(() => {
    console.log('start')
    const systemDate = new Date().toISOString().split('T')[0]
    console.log(rafDueDate)
    var date0 = new Date(rafDueDate)
    var date1 = new Date(launchDate)
    console.log(rafDueDate)
    var date2 = new Date(systemDate)
    // var date3 = (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
    // console.log(date3)
    if (
      // rafDueDate &&
      rafDueDate !== null &&
      // launchDate &&
      launchDate === null
    ) {
      console.log('1')
      if (date0 < date2) {
        setErrRafdueDate(true)
        setRafDueDateError1(allMessages.error.rafDateerror1)
      } else {
        setErrRafdueDate(false)
        setErrRafdueDate('')
      }
    } else if (
      // rafDueDate &&
      rafDueDate === null &&
      // launchDate &&
      launchDate !== null
    ) {
      console.log('2')
      if (date1 < date2) {
        setErrLaunchDate(true)
        setLaunchError1(allMessages.error.launchDateerror)
      } else {
        setErrLaunchDate(false)
        setLaunchError1('')
      }
    } else if (
      // rafDueDate &&
      rafDueDate !== null &&
      // launchDate &&
      launchDate !== null
    ) {
      console.log('3')
      if (date0 > date1 && date1 < date2) {
        console.log('a')
        setErrRafdueDate(true)
        //  setRafDueDateError1(allMessages.error.launchDateerror)
        setRafDueDateError1(allMessages.error.rafDateError)
        setErrLaunchDate(true)
        setLaunchError1(allMessages.error.launchDateerror)
      } else if (date0 > date1 && date1 >= date2) {
        console.log('b')
        setErrRafdueDate(true)
        //  setRafDueDateError1(allMessages.error.launchDateerror)
        setRafDueDateError1(allMessages.error.rafDateError)
        setErrLaunchDate(false)
        setLaunchError1('')
      } else if (date0 < date2 && date1 > date2) {
        console.log('c')
        setErrRafdueDate(true)
        setRafDueDateError1(allMessages.error.rafDateerror1)
        setErrLaunchDate(false)
        setLaunchError1('')
      } else if (date1 < date2 && date0 > date2) {
        console.log('d')
        setErrRafdueDate(false)
        setErrRafdueDate('')
        setErrLaunchDate(true)
        setLaunchError1(allMessages.error.launchDateerror)
      } else if (date1 < date2 && date0 < date2) {
        console.log('e')
        setErrRafdueDate(true)
        setRafDueDateError1(allMessages.error.rafDateerror1)
        setErrLaunchDate(true)
        setLaunchError1(allMessages.error.launchDateerror)
      } else if (date0 < date1 && date0 < date2) {
        console.log('f')
        setErrRafdueDate(true)
        setRafDueDateError1(allMessages.error.rafDateerror1)
        setErrLaunchDate(false)
        setLaunchError1('')
      } else {
        console.log('g')
        setErrRafdueDate(false)
        setErrRafdueDate('')
        setErrLaunchDate(false)
        setLaunchError1('')
      }
    }
  }, [rafDueDate, launchDate])

  const handleLaunchDate = (e: any) => {
    // let today = new Date().toISOString().split('T')[0]
    // setLaunchDate(e)
    // if (e >= today) {
    //   if (rafDueDate !== null) {
    //     if (rafDueDate <= e) {
    //       setErrRafdueDate(false)
    //       // setErrLaunchDate(false)
    //       // setLaunchError1('')
    //       setRafDueDateError1('')
    //     } else {
    //       setErrRafdueDate(true)
    //       // setErrLaunchDate(false)
    //       // setLaunchError1('')
    //       setRafDueDateError1(allMessages.error.rafDateError)
    //     }
    //   }
    // }

    // setIsPageModified(true)

    console.log(e)
    setLaunchDate(e)
    if (rafDueDate !== null) {
      if (e >= rafDueDate) {
        setErrRafdueDate(false)
        // setErrLaunchDate(false)
        // setLaunchError1('')
        setRafDueDateError1('')
      } else {
        setErrRafdueDate(true)
        //setErrLaunchDate(false)
        //setLaunchError1('')
        setRafDueDateError1(allMessages.error.rafDateError)
      }
    }
    // else {
    //   setErrLaunchDate(false)
    //   setLaunchError1('')
    // }
    setIsPageModified(true)
  }

  const handleLaunchDateClear = (e: any) => {
    e.stopPropagation()
    setLaunchDate(null)
    setErrLaunchDate(false)
    setLaunchError1('')
    setIsPageModified(true)
  }

  // const handleFinaliseLineDetail = (date: any) => {
  //     const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
  //     console.log(newDate)
  //     setLaunchDate(date);
  // };

  // const RafDueDateComponent = forwardRef((props:any, ref:any) => (
  //     <KeyboardDatePicker
  //         format="dd/MM/yyyy"
  //         inputVariant='outlined'
  //         value={rafDueDate}
  //         ref={ref}
  //         onChange={handleRafDueDate}
  //         KeyboardButtonProps={{
  //             'aria-label': 'change date',
  //         }}
  //         required
  //     />
  // ))

  const buttonText = 'Create & Publish Events'
  const radio = <Radio color="primary" />

  const handleClassChange = (selected: any) => {
    console.log(selected)
    setErrPlanogramClass(false)
    setPlanogramClassError1('')
    // setClassValues(selected)
    setConfirmClassValues(selected)
    setIsPageModified(true)
    // if (selected.length > 0) setErrorRoles('')
  }

  const handleClassConfirm = () => {
    // const classData=classValues && classValues.map((class:any)=>{class.value})
    // console.log(classData)
    setConfirmClassValues(classValues)
    handleClassClose()
  }

  const handleClassClose = () => {
    setClassOpen(false)
  }

  // const handleBuyerClick = () => {
  //   console.log('clicked')
  //   let roleId = 'BUYER'
  //   buyer !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, buyer)
  //         .then((res: any) => {
  //           console.log('matched')
  //           setBuyerConfirmed(true)
  //           setBuyerValue(res.data.userdetails[0].user)
  //           setErrBuyer(false)
  //           setBuyerError1('')
  //         })
  //         .catch((err: any) => {
  //           console.log('not')
  //           setBuyer('')
  //           setBuyerConfirmed(false)
  //           setErrBuyer(true)
  //           setBuyerValue('')
  //           setBuyerError1(allMessages.error.emailError)
  //         })
  //     : setErrBuyer(true)
  //   setBuyerError1(allMessages.error.emailSearcherror)
  // }

  // const handleBuyingAssistantClick = () => {
  //   let roleId = 'BYAST'
  //   buyingAssistant !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, buyingAssistant)
  //         .then((res: any) => {
  //           console.log('matched')
  //           setBuyingAssistantConfirmed(true)
  //           setBuyingAssistantValue(res.data.userdetails[0].user)
  //           setErrBuyerAssisant(false)
  //           setBuyingAssistentError1('')
  //         })
  //         .catch((err: any) => {
  //           console.log('not')
  //           setBuyingAssistant('')
  //           setBuyingAssistantConfirmed(false)
  //           setBuyingAssistantValue('')
  //           setErrBuyerAssisant(true)
  //           setBuyingAssistentError1(allMessages.error.emailError)
  //         })
  //     : setErrBuyerAssisant(true)
  //   setBuyingAssistentError1(allMessages.error.emailSearcherror)
  // }

  // const handleOwnBrandManagerClick = () => {
  //   let roleId = 'OWNBRM'
  //   ownBrandManager !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, ownBrandManager)
  //         .then((res) => {
  //           console.log('matched')
  //           setOwnBrandManagerConfirmed(true)
  //           setOwnBrandManagerValue(res.data.userdetails[0].user)
  //           setErrOwnBrandManager(false)
  //           setOwnBrandManagerError1('')
  //         })
  //         .catch((err) => {
  //           console.log('not')
  //           setOwnBrandManager('')
  //           setOwnBrandManagerConfirmed(false)
  //           setOwnBrandManagerValue('')
  //           setErrOwnBrandManager(true)
  //           setOwnBrandManagerError1(allMessages.error.emailError)
  //         })
  //     : setErrOwnBrandManager(true)
  //   setOwnBrandManagerError1(allMessages.error.emailSearcherror)
  // }

  // const handleSeniorBuyingManagerClick = () => {
  //   let roleId = 'SRBYM'
  //   seniorBuyingManager !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, seniorBuyingManager)
  //         .then((res) => {
  //           console.log('matched')
  //           setSeniorBuyingManagerConfirmed(true)
  //           setSeniorBuyingManagerValue(res.data.userdetails[0].user)
  //           setErrSeniorBuyingManager(false)
  //           setSeniorBuyingManagerError1('')
  //         })
  //         .catch((err) => {
  //           console.log('not')
  //           setSeniorBuyingManager('')
  //           setSeniorBuyingManagerConfirmed(false)
  //           setSeniorBuyingManagerValue('')
  //           setErrSeniorBuyingManager(true)
  //           setSeniorBuyingManagerError1(allMessages.error.emailError)
  //         })
  //     : setErrSeniorBuyingManager(true)
  //   setSeniorBuyingManagerError1(allMessages.error.emailSearcherror)
  // }

  // const handleMerchandiserClick = () => {
  //   let roleId = 'MERCH'
  //   merchandiser !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, merchandiser)
  //         .then((res) => {
  //           console.log('matched')
  //           setMerchandiserConfirmed(true)
  //           setMerchandiserValue(res.data.userdetails[0].user)
  //           setErrMerchandiser(false)
  //           setMerchandiserError1('')
  //         })
  //         .catch((err) => {
  //           console.log('not')
  //           setMerchandiser('')
  //           setMerchandiserConfirmed(false)
  //           setMerchandiserValue('')
  //           setErrMerchandiser(true)
  //           setMerchandiserError1(allMessages.error.emailError)
  //         })
  //     : setErrMerchandiser(true)
  //   setMerchandiserError1(allMessages.error.emailSearcherror)
  // }

  // const handleRangeResetManagerClick = () => {
  //   let roleId = 'RRMNGR'
  //   rangeResetManager !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, rangeResetManager)
  //         .then((res) => {
  //           console.log('matched')
  //           setRangeResetManagerConfirmed(true)
  //           setRangeResetManagerValue(res.data.userdetails[0].user)
  //           setErrRangeResetManager(false)
  //           setRangeResetManagerError1('')
  //         })
  //         .catch((err) => {
  //           console.log('not')
  //           setRangeResetManager('')
  //           setRangeResetManagerConfirmed(false)
  //           setRangeResetManagerValue('')
  //           setErrRangeResetManager(true)
  //           setRangeResetManagerError1(allMessages.error.emailError)
  //         })
  //     : setErrRangeResetManager(true)
  //   setRangeResetManagerError1(allMessages.error.emailSearcherror)
  // }

  // const handleCategoryDirectorClick = () => {
  //   let roleId = 'CTDIR'
  //   categoryDirector !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, categoryDirector)
  //         .then((res) => {
  //           console.log('matched')
  //           setCategoryDirectorConfirmed(true)
  //           setCategoryDirectorValue(res.data.userdetails[0].user)
  //           setErrCategoryDirector(false)
  //           setCategoryDirectorError1('')
  //         })
  //         .catch((err) => {
  //           console.log('not')
  //           setCategoryDirector('')
  //           setCategoryDirectorConfirmed(false)
  //           setCategoryDirectorValue('')
  //           setErrCategoryDirector(true)
  //           setCategoryDirectorError1(allMessages.error.emailError)
  //         })
  //     : setErrCategoryDirector(true)
  //   setCategoryDirectorError1(allMessages.error.emailSearcherror)
  // }

  // const handleSupplyChainSpecialistClick = () => {
  //   let roleId = 'SCSPL'
  //   supplyChainSpecialist !== ''
  //     ? getUsersAPIByEmailAndRole &&
  //       getUsersAPIByEmailAndRole(roleId, supplyChainSpecialist)
  //         .then((res) => {
  //           console.log('matched')
  //           setSupplyChainSpecialistConfirmed(true)
  //           setSupplyChainSpecialistValue(res.data.userdetails[0].user)
  //           setErrSupplyChainSpecialist(false)
  //           setSupChainSpecialistError1('')
  //         })
  //         .catch((err) => {
  //           console.log('not')
  //           setSupplyChainSpecialist('')
  //           setSupplyChainSpecialistConfirmed(false)
  //           setSupplyChainSpecialistValue('')
  //           setErrSupplyChainSpecialist(true)
  //           setSupChainSpecialistError1(allMessages.error.emailError)
  //         })
  //     : setErrSupplyChainSpecialist(true)
  //   setSupChainSpecialistError1(allMessages.error.emailSearcherror)
  // }

  const classDialog = (
    <Dialog open={classOpen} onClose={handleClassClose}>
      <Box
        sx={{
          height: 450,
          width: 'auto',
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
              value={classValues}
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

  // const validateResetType = () => {
  //   if (!resetType) {
  //     setResetTypeError('Please select a reset type')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateDepartment = () => {
  //   if (!department) {
  //     setDepartmentError('Please select a department')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateGroup = () => {
  //   if (!group) {
  //     setGroupError('Please select a group')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateCategory = () => {
  //   if (!category) {
  //     setCategoryError('Please select a category')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // const validateBuyer = () => {
  //   if (!buyer) {
  //     setBuyerError('Please select a Buyer')
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  // useEffect(() => {
  //   if (uniqueIdError !== "") {
  //     focusUniqueId.current.focus();
  //   }
  // });

  useEffect(() => {
    if (resetTypeError !== '') {
      focusResetType.current.focus()
    }
  }, [resetTypeError])

  useEffect(() => {
    if (groupError !== '') {
      focusGroup.current.focus()
    }
  }, [groupError])

  useEffect(() => {
    if (categoryError !== '') {
      focusCategory.current.focus()
    }
  }, [categoryError])

  useEffect(() => {
    if (departmentError !== '') {
      focusDepartment.current.focus()
    }
  }, [departmentError])

  const checkForm = async (btnName: string) => {
    let flag = 1
    if (!resetType || resetType === null || resetType === undefined) {
      flag = 0
      setErrReset(true)
      setResetError1(allMessages.error.noRequestType)
      focusResetType.current.focus()
    }
    if (resetType.value === 'Rapid Response' && !rafDueDate) {
      flag = 0
      setErrRafdueDate(true)
      setRafDueDateError1(allMessages.error.noRafDueDate)
    }
    if (errRafDueDate) {
      flag = 0
    }
    if (errLaunchDate) {
      flag = 0
    }
    if (!group || group === null || group === undefined) {
      flag = 0
      setErrGroup(true)
      setTradingGError1(allMessages.error.noTradingGroup)
      focusGroup.current.focus()
    }
    // if (!category || category === null || category === undefined) {
    //   flag = 0
    //   setErrCategory(true)
    //   setCategoryGError1(allMessages.error.noCategory)
    //   focusCategory.current.focus()
    // }
    // if (!department || department === null || department === undefined) {
    //   flag = 0
    //   setErrDepartment(true)
    //   setDepartmentError1(allMessages.error.noDepartment)
    //   focusDepartment.current.focus()
    // }
    if (
      (!department || department === null || department === undefined) &&
      eventName === ''
    ) {
      flag = 0
      setErrEventName(true)
      setEventNameErr1(allMessages.error.noEventName)
      focusEventName.current.focus()
    }
    if (errEventName) {
      flag = 0
    }
    if (!launchDate || launchDate === null || launchDate === undefined) {
      flag = 0
      setErrLaunchDate(true)
      setLaunchError1(allMessages.error.noLaunchDate)
      // focusLaunchDate.current.focus()
    }
    if (eventName === '') {
      if (department && launchDate) {
        var lDate = new Date(launchDate)
        console.log(lDate)
        var name =
          department.departmentName.replace(/ /g, '_') +
          '_' +
          lDate.getDate() +
          lDate.toLocaleString('default', { month: 'short' }) +
          lDate.getFullYear()
        console.log(name)
        setEventName(name)
      } else {
        setErrEventName(true)
        setEventNameErr1(allMessages.error.noEventName)
        focusEventName.current.focus()
      }
    } else {
      setErrEventName(false)
      setEventNameErr1('')
      // focusEventName.current.focus()
    }
    if (errBuyer) {
      flag = 0
    }
    if (
      !buyer ||
      buyer === null ||
      buyer === undefined
      // ||
      // buyerConfirmed === false
    ) {
      flag = 0
      setErrBuyer(true)
      setBuyerError1(allMessages.error.emailSearcherror)
      focusBuyer.current.focus()
    }
    // if (buyerConfirmed === false && buyer !== '') {
    //   flag = 0
    //   setErrBuyer(true)
    //   setBuyerError1(allMessages.error.emailSearcherror)
    // }
    if (errBuyerAssisant) {
      flag = 0
    }
    if (
      !buyingAssistant ||
      buyingAssistant === null ||
      buyingAssistant === undefined
      // ||
      // buyingAssistantConfirmed === false
    ) {
      flag = 0
      setErrBuyerAssisant(true)
      setBuyingAssistentError1(allMessages.error.emailSearcherror)
      focusBuyingAssistant.current.focus()
    }
    // if (buyingAssistantConfirmed === false) {
    //   flag = 0
    //   setErrBuyerAssisant(true)
    //   setBuyingAssistentError1('please search buying assitant')
    // }
    if (errOwnBrandManager) {
      flag = 0
    }
    if (
      !ownBrandManager ||
      ownBrandManager === null ||
      ownBrandManager === undefined
      //  ||
      // buyingAssistantConfirmed === false
    ) {
      flag = 0
      setErrOwnBrandManager(true)
      setOwnBrandManagerError1(allMessages.error.emailSearcherror)
      focusOwnBrandManager.current.focus()
    }
    // if (ownBrandManagerConfirmed === false) {
    //   flag = 0
    //   setErrOwnBrandManager(true)
    //   setOwnBrandManagerError1('search own brande manager')
    // }
    if (errSeniorBuyingManager) {
      flag = 0
    }
    if (
      !seniorBuyingManager ||
      seniorBuyingManager === null ||
      seniorBuyingManager === undefined
      //  ||
      // seniorBuyingManagerConfirmed === false
    ) {
      flag = 0
      setErrSeniorBuyingManager(true)
      setSeniorBuyingManagerError1(allMessages.error.emailSearcherror)
      focusSeniorBuyingManager.current.focus()
    }
    // if (seniorBuyingManagerConfirmed === false) {
    //   flag = 0
    //   setErrSeniorBuyingManager(true)
    //   setSeniorBuyingManagerError1('Please search senior buying manager')
    // }
    if (errMerchandiser) {
      flag = 0
    }
    if (
      !merchandiser ||
      merchandiser === null ||
      merchandiser === undefined
      // ||
      // merchandiserConfirmed === false
    ) {
      flag = 0
      setErrMerchandiser(true)
      setMerchandiserError1(allMessages.error.emailSearcherror)
      focusMerchandiser.current.focus()
    }
    // if (merchandiserConfirmed === false) {
    //   flag = 0
    //   setErrMerchandiser(true)
    //   setMerchandiserError1('Please search merchandiser')
    // }
    if (errRangeResetManager) {
      flag = 0
    }
    if (
      !rangeResetManager ||
      rangeResetManager === null ||
      rangeResetManager === undefined
      //  ||
      // rangeResetManagerConfirmed === false
    ) {
      flag = 0
      setErrRangeResetManager(true)
      setRangeResetManagerError1(allMessages.error.emailSearcherror)
      focusRangeRestManager.current.focus()
    }
    // if (rangeResetManagerConfirmed === false) {
    //   flag = 0
    //   setErrRangeResetManager(true)
    //   setRangeResetManagerError1('Please search range reset manager')
    // }
    if (errCategoryDirector) {
      flag = 0
    }
    if (
      !categoryDirector ||
      categoryDirector === null ||
      categoryDirector === undefined
      // ||
      // categoryDirectorConfirmed === false
    ) {
      flag = 0
      setErrCategoryDirector(true)
      setCategoryDirectorError1(allMessages.error.emailSearcherror)
      focusCategoryDirector.current.focus()
    }
    // if (categoryDirectorConfirmed === false) {
    //   flag = 0
    //   setErrCategoryDirector(true)
    //   setCategoryDirectorError1('Please search category director')
    // }
    if (errSupplyChainSpecialist) {
      flag = 0
    }
    if (
      !supplyChainSpecialist ||
      supplyChainSpecialist === null ||
      supplyChainSpecialist === undefined
      //  ||
      // supplyChainSpecialistConfirmed === false
    ) {
      flag = 0
      setErrSupplyChainSpecialist(true)
      setSupChainSpecialistError1(allMessages.error.emailSearcherror)
      focusSupplyChainSpecialist.current.focus()
    }
    // if (supplyChainSpecialistConfirmed === false) {
    //   flag = 0
    //   setErrSupplyChainSpecialist(true)
    //   setSupChainSpecialistError1('Please search supply chain specialist')
    // }
    if (flag === 1 && btnName === 'save') {
      setToastRemove('save')
      // setCancelOpenApprove(true)
      setCancelOpenSave(true)
    }
    if (flag === 1 && btnName === 'create') {
      setToastRemove('create')
      setCancelOpenApprove(true)
    }
    if (flag === 1 && btnName === 'publish') {
      setToastRemove('publish')
      setCancelOpenPublish(true)
    }
  }

  const handleToaster = () => {
    if (toastRemove === 'save') {
      history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
      // history.push(`${DEFAULT}${RANGEAMEND_MANAGE_TASK}`)
    } else if (toastRemove === 'publish') {
      if (toastRemovePublish === 'success') {
        history.push(`${DEFAULT}${RANGEAMEND_MANAGE_TASK}`)
      } else {
        history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
      }
    } else if (toastRemove === 'create') {
      history.push(`${DEFAULT}${RANGEAMEND_MANAGE_TASK}`)
      // history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
    } else {
      history.push(`${DEFAULT}`)
    }
  }

  // useEffect(() => {
  //   if (resetType.value !== 'rapid') {
  //     setErrRafdueDate(false)
  //     setRafDueDateError1('')
  //   }
  //   if (resetType.value === 'rapid' && rafDueDate !== '') {
  //     setErrRafdueDate(false)
  //     setRafDueDateError1('')
  //   }
  // }, [resetType, rafDueDate])

  const handleSaveAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('save')
  }
  const handleCancelSave = (e: any) => {
    e.preventDefault()
    setCancelOpenSave((p) => !p)
  }

  const createFormData = () => {
    const formData = {
      rangeResets: [
        {
          // uniqueId: uniqueId,
          resetType: resetType.value,
          tradeGroup: group.groupName,
          categoryId: category ? category.categoryId : null,
          category: category ? category.categoryName : null,
          department: department ? department.departmentName : null,
          departmentId: department ? department.departmentId : null,
          targetDate: `${launchDate} ${'01:00:00.00'}`,
          appDueDate: rafDueDate ? `${rafDueDate} ${'01:00:00.00'}` : null,
          name: eventName,
          planogramClass: classFormData
            ? {
                className: classFormData,
              }
            : null,
          wastageRange: storeWasteProcess
            ? storeWasteProcess.value
              ? storeWasteProcess.value
              : 'Week +4\\ +7'
            : 'Week +4\\ +7',
          // buyer: buyer,
          // buyerId: buyerValue.userId,
          // buyerEmailId: buyerValue.emailId,
          // buyer: buyerValue.middleName
          //   ? `${buyerValue.firstName} ${buyerValue.middleName} ${buyerValue.lastName}`
          //   : `${buyerValue.firstName} ${buyerValue.lastName}`,
          buyerEmailId: buyer,
          // buyerAssistantId: buyingAssistantValue.userId,
          // buyerAssistantEmailId: buyingAssistantValue.emailId,
          // buyerAssistant: buyingAssistantValue.middleName
          //   ? `${buyingAssistantValue.firstName} ${buyingAssistantValue.middleName} ${buyingAssistantValue.lastName}`
          //   : `${buyingAssistantValue.firstName} ${buyingAssistantValue.lastName}`,
          buyerAssistantEmailId: buyingAssistant,
          // ownBrandManagerId: ownBrandManagerValue.userId,
          // ownBrandManagerEmailId: ownBrandManagerValue.emailId,
          // ownBrandManager: ownBrandManagerValue.middleName
          //   ? `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.middleName} ${ownBrandManagerValue.lastName}`
          //   : `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.lastName}`,
          ownBrandManagerEmailId: ownBrandManager,
          // seniorBuyingManagerId: seniorBuyingManagerValue.userId,
          // seniorBuyingManagerEmailId: seniorBuyingManagerValue.emailId,
          // seniorBuyingManager: seniorBuyingManagerValue.middleName
          //   ? `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.middleName} ${seniorBuyingManagerValue.lastName}`
          //   : `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.lastName}`,
          seniorBuyingManagerEmailId: seniorBuyingManager,
          // merchandiserId: merchandiserValue.userId,
          // merchandiserEmailId: merchandiserValue.emailId,
          // merchandiser: merchandiserValue.middleName
          //   ? `${merchandiserValue.firstName} ${merchandiserValue.middleName} ${merchandiserValue.lastName}`
          //   : `${merchandiserValue.firstName} ${merchandiserValue.lastName}`,
          merchandiserEmailId: merchandiser,
          // rangeResetManagerId: rangeResetManagerValue.userId,
          // rangeResetManagerEmailId: rangeResetManagerValue.emailId,
          // rangeResetManager: rangeResetManagerValue.middleName
          //   ? `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.middleName} ${rangeResetManagerValue.lastName}`
          //   : `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.lastName}`,
          rangeResetManagerEmailId: rangeResetManager,
          // categoryDirectorId: categoryDirectorValue.userId,
          // categoryDirectorEmailId: categoryDirectorValue.emailId,
          // categoryDirector: categoryDirectorValue.middleName
          //   ? `${categoryDirectorValue.firstName} ${categoryDirectorValue.middleName} ${categoryDirectorValue.lastName}`
          //   : `${categoryDirectorValue.firstName} ${categoryDirectorValue.lastName}`,
          categoryDirectorEmailId: categoryDirector,
          // supplyChainAnalystId: supplyChainSpecialistValue.userId,
          // supplyChainAnalystEmailId: supplyChainSpecialistValue.emailId,
          // supplyChainAnalyst: supplyChainSpecialistValue.middleName
          //   ? `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.middleName} ${supplyChainSpecialistValue.lastName}`
          //   : `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.lastName}`,
          supplyChainAnalystEmailId: supplyChainSpecialist,
          clearancePriceCheck: clearancePriceApplied
            ? clearancePriceApplied
            : 'Y',
          orderStopDateCheck: orderStopDateCheck ? orderStopDateCheck : 'Y',
          stopOrder: stopOrder ? stopOrder : 'Y',
          fileName: null,
          createdById: userDetail && userDetail.userdetails[0].user.userId,
          createdByName: userDetail && userDetail.userdetails[0].user.emailId,
          // middleName &&
          // userDetail.userdetails[0].user.middleName != ''
          //   ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
          //   : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
        },
      ],
    }
    console.log(formData)
    return formData
  }

  const handleCreateSave = (e: any) => {
    setIsProgressLoader(true)
    // const formData = {
    //   rangeResets: [
    //     {
    //       // uniqueId: uniqueId,
    //       resetType: resetType.value,
    //       tradeGroup: group.groupName,
    //       categoryId: category.categoryId,
    //       category: category.categoryName,
    //       department: department.departmentName,
    //       departmentId: department.departmentId,
    //       targetDate: `${launchDate} ${'01:00:00.00'}`,
    //       appDueDate: rafDueDate ? `${rafDueDate} ${'01:00:00.00'}` : null,
    //       name: eventName,
    //       planogramClass: classFormData
    //         ? {
    //             className: classFormData,
    //           }
    //         : null,
    //       wastageRange: storeWasteProcess
    //         ? storeWasteProcess.value
    //           ? storeWasteProcess.value
    //           : null
    //         : null,
    //       // buyer: buyer,
    //       // buyerId: buyerValue.userId,
    //       // buyerEmailId: buyerValue.emailId,
    //       // buyer: buyerValue.middleName
    //       //   ? `${buyerValue.firstName} ${buyerValue.middleName} ${buyerValue.lastName}`
    //       //   : `${buyerValue.firstName} ${buyerValue.lastName}`,
    //       buyerEmailId: buyer,
    //       // buyerAssistantId: buyingAssistantValue.userId,
    //       // buyerAssistantEmailId: buyingAssistantValue.emailId,
    //       // buyerAssistant: buyingAssistantValue.middleName
    //       //   ? `${buyingAssistantValue.firstName} ${buyingAssistantValue.middleName} ${buyingAssistantValue.lastName}`
    //       //   : `${buyingAssistantValue.firstName} ${buyingAssistantValue.lastName}`,
    //       buyerAssistantEmailId: buyingAssistant,
    //       // ownBrandManagerId: ownBrandManagerValue.userId,
    //       // ownBrandManagerEmailId: ownBrandManagerValue.emailId,
    //       // ownBrandManager: ownBrandManagerValue.middleName
    //       //   ? `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.middleName} ${ownBrandManagerValue.lastName}`
    //       //   : `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.lastName}`,
    //       ownBrandManagerEmailId: ownBrandManager,
    //       // seniorBuyingManagerId: seniorBuyingManagerValue.userId,
    //       // seniorBuyingManagerEmailId: seniorBuyingManagerValue.emailId,
    //       // seniorBuyingManager: seniorBuyingManagerValue.middleName
    //       //   ? `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.middleName} ${seniorBuyingManagerValue.lastName}`
    //       //   : `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.lastName}`,
    //       seniorBuyingManagerEmailId: seniorBuyingManager,
    //       // merchandiserId: merchandiserValue.userId,
    //       // merchandiserEmailId: merchandiserValue.emailId,
    //       // merchandiser: merchandiserValue.middleName
    //       //   ? `${merchandiserValue.firstName} ${merchandiserValue.middleName} ${merchandiserValue.lastName}`
    //       //   : `${merchandiserValue.firstName} ${merchandiserValue.lastName}`,
    //       merchandiserEmailId: merchandiser,
    //       // rangeResetManagerId: rangeResetManagerValue.userId,
    //       // rangeResetManagerEmailId: rangeResetManagerValue.emailId,
    //       // rangeResetManager: rangeResetManagerValue.middleName
    //       //   ? `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.middleName} ${rangeResetManagerValue.lastName}`
    //       //   : `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.lastName}`,
    //       rangeResetManagerEmailId: rangeResetManager,
    //       // categoryDirectorId: categoryDirectorValue.userId,
    //       // categoryDirectorEmailId: categoryDirectorValue.emailId,
    //       // categoryDirector: categoryDirectorValue.middleName
    //       //   ? `${categoryDirectorValue.firstName} ${categoryDirectorValue.middleName} ${categoryDirectorValue.lastName}`
    //       //   : `${categoryDirectorValue.firstName} ${categoryDirectorValue.lastName}`,
    //       categoryDirectorEmailId: categoryDirector,
    //       // supplyChainAnalystId: supplyChainSpecialistValue.userId,
    //       // supplyChainAnalystEmailId: supplyChainSpecialistValue.emailId,
    //       // supplyChainAnalyst: supplyChainSpecialistValue.middleName
    //       //   ? `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.middleName} ${supplyChainSpecialistValue.lastName}`
    //       //   : `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.lastName}`,
    //       supplyChainAnalystEmailId: supplyChainSpecialist,
    //       clearancePriceCheck: clearancePriceApplied,
    //       orderStopDateCheck: orderStopDateCheck,
    //       stopOrder: stopOrder,
    //       fileName: 'string',
    //       createdById: userDetail && userDetail.userdetails[0].user.userId,
    //       createdByName:
    //         userDetail && userDetail.userdetails[0].user.middleName
    //           ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
    //           : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
    //     },
    //   ],
    // }

    const formData = createFormData()
    console.log(formData)

    patchRangeResetEvents(formData)
      .then((res: any) => {
        setIsSuccessCall(false)
        // let newVal = [formData.rangeResets[0], ...fileData]
        // setFile(newVal)
        console.log(res.data)
        // if (errorCheck && errorCheck > -1) {
        if (fileErrorData) {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed' ||
            res.data[0].status.toLowerCase() === 'published'
          ) {
            setDisableSave(true)
            setDisableCreate(true)
            setDisablePublish(true)
            let newVal = [res.data[0], ...fileData]
            let _tasks = newVal.filter(
              (value: any) => fileErrorData.errorId !== value.errorId
            )
            setFile(_tasks)
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              detail: `Event created with Event ID ${res.data[0].id}`,
              life: life,
              className: 'login-toast',
            })
          } else if (res.data[0].status.toLowerCase().includes('duplicate')) {
            toast.current.show({
              severity: 'error',
              summary: 'Error',
              detail: `${res.data[0].status}`,
              life: life,
              className: 'login-toast',
            })
            setDisableSave(false)
          } else {
            console.log(res.data[0])
            // setErrorData(res.data[0])
            setDisableSave(false)
            // setErrorFile(res.data[0])
            // checkForErrors(res.data[0])
            // checkErrorMessages(res.data[0])
            checkForErrors(checkErrorMessages2(res.data[0]))
          }
        } else {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed' ||
            res.data[0].status.toLowerCase() === 'published'
          ) {
            setDisableSave(true)
            setDisableCreate(true)
            setDisablePublish(true)
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              detail: `Event created with Event ID ${res.data[0].id}`,
              life: life,
              className: 'login-toast',
            })
          } else if (res.data[0].status.toLowerCase().includes('duplicate')) {
            toast.current.show({
              severity: 'error',
              // summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              summary: 'Error',
              detail: `${res.data[0].status}`,
              life: life,
              className: 'login-toast',
            })
            setDisableSave(false)
          } else {
            setDisableSave(false)
            // checkForErrors(res.data[0])
            // checkErrorMessages(res.data[0])
            checkForErrors(checkErrorMessages2(res.data[0]))
            // setErrorFile(res.data[0])
            // checkForErrors(res.data[0])
            // checkErrorMessages(fileErrorData)
          }
        }
        setIsProgressLoader(false)
      })
      .catch((err: any) => {
        setIsSuccessCall(false)
        setIsProgressLoader(false)
        setDisableSave(false)
        console.log(err)
        toast.current.show({
          severity: 'error',
          summary: 'Error!',
          // detail: err.response.data.errorMessage,
          life: life,
          className: 'login-toast',
        })
      })
    // history.push({
    //   pathname: `${DEFAULT}${RANGEAMEND_MANAGE_TASK}`,
    //   search: `?event=${formData['eventName']}`, // query string
    //   state: {
    //     // location state
    //     data: formData,
    //   },
    // })
    // } else {
    //   console.log('fail')
    //   toast.current.show({
    //     severity: 'error',
    //     summary: '',
    //     detail: 'Please fill all the essential fields',
    //     life: 2000,
    //   })
    // }
  }

  useEffect(() => {
    console.log(isSuccessCall)
  }, [isSuccessCall])
  const handleBack = (e: any) => {
    e.preventDefault()
    setBack((p) => !p)
  }
  const viewConfirmSave = (
    <ConfirmBox
      cancelOpen={cancelOpenSave}
      handleCancel={handleCancelSave}
      handleProceed={handleCreateSave}
      // label1="Are you sure to Save?"
      label1="Are you sure to Create Event?"
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

  const createCamundaFormData = (data: any) => {
    const formdata1 = {
      requests: [
        {
          submitType: 'new',
          eventId: data.id,
          eventStatus: data.status,
          requester: {
            persona:
              userDetail &&
              userDetail.userdetails[0].user.middleName &&
              userDetail.userdetails[0].user.middleName != ''
                ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            details: {
              emailId: userDetail && userDetail.userdetails[0].user.emailId,
              userId: userDetail && userDetail.userdetails[0].user.userId,
              name:
                userDetail &&
                userDetail.userdetails[0].user.middleName &&
                userDetail.userdetails[0].user.middleName != ''
                  ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                  : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            },
            roles:
              userDetail &&
              userDetail.userdetails[0].roles.map((role: any) => {
                return {
                  roleId: role.roleId,
                }
              }),
            usergroups:
              userDetail &&
              userDetail.userdetails[0].usergroups.map((group: any) => {
                return {
                  groupId: group.groupId,
                  status: group.status,
                }
              }),
          },
          eventHeader: {
            resetType: data.resetType,
            rafAppDueDate: data.appDueDate ? data.appDueDate : null,
            eventLaunchDate: data.targetDate,
            eventName: data.name,
            eventHierarchy: {
              tradingGroup: data.tradeGroup,
              category: data.category,
              department: data.department,
            },
            inventoryControl: {
              planogramClass: data.planogramClass
                ? data.planogramClass.className
                : null,
              storeWastetiming: data.wastageRange,
              orderStopDateCheckRequired: data.orderStopDateCheck,
              stopOrderStockRundown: data.stopOrder,
              clearancePriceCheck: data.clearancePriceCheck,
            },
            eventTeam: {
              team: [
                {
                  persona: 'Buyer',
                  details: {
                    emailId: data.buyerEmailId,
                    userId: data.buyerId,
                    name: data.buyer,
                  },
                },
                {
                  persona: 'Category Director',
                  details: {
                    emailId: data.categoryDirectorEmailId,
                    userId: data.categoryDirectorId,
                    name: data.categoryDirector,
                  },
                },
                {
                  persona: 'Sr. Buying Manager',
                  details: {
                    emailId: data.seniorBuyingManagerEmailId,
                    userId: data.seniorBuyingManagerId,
                    name: data.seniorBuyingManager,
                  },
                },
                {
                  persona: 'Buying Assistant',
                  details: {
                    emailId: data.buyerAssistantEmailId,
                    userId: data.buyerAssistantId,
                    name: data.buyerAssistant,
                  },
                },
                {
                  persona: 'Merchandiser',
                  details: {
                    emailId: data.merchandiserEmailId,
                    userId: data.merchandiserId,
                    name: data.merchandiser,
                  },
                },
                {
                  persona: 'Supplychain Specialist',
                  details: {
                    emailId: data.supplyChainAnalystEmailId,
                    userId: data.supplyChainAnalystId,
                    name: data.supplyChainAnalyst,
                  },
                },
                {
                  persona: 'Own Brand Manager',
                  details: {
                    emailId: data.ownBrandManagerEmailId,
                    userId: data.ownBrandManagerId,
                    name: data.ownBrandManager,
                  },
                },
                {
                  persona: 'Range Reset Manager',
                  details: {
                    emailId: data.rangeResetManagerEmailId,
                    userId: data.rangeResetManagerId,
                    name: data.rangeResetManager,
                  },
                },
              ],
            },
          },
        },
      ],
    }
    return formdata1
  }

  const handleCreateAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('create')
  }
  const handleCancelCreate = (e: any) => {
    e.preventDefault()
    setCancelOpenApprove((p) => !p)
  }

  const handleCreateEvent = () => {
    // const formData = {
    //   rangeResets: [
    //     {
    //       // uniqueId: uniqueId,
    //       resetType: resetType.value,
    //       tradeGroup: group.groupName,
    //       categoryId: category.categoryId,
    //       category: category.categoryName,
    //       department: department.departmentName,
    //       departmentId: department.departmentId,
    //       targetDate: `${launchDate} ${'01:00:00.00'}`,
    //       appDueDate: rafDueDate ? `${rafDueDate} ${'01:00:00.00'}` : null,
    //       name: eventName,
    //       planogramClass: {
    //         className: classFormData ? classFormData : [],
    //       },
    //       wastageRange: storeWasteProcess
    //         ? storeWasteProcess.value
    //           ? storeWasteProcess.value
    //           : null
    //         : null,
    //       // buyer: buyer,
    //       // buyer: buyer,
    //       // buyerId: buyerValue.userId,
    //       // buyerEmailId: buyerValue.emailId,
    //       // buyer: buyerValue.middleName
    //       //   ? `${buyerValue.firstName} ${buyerValue.middleName} ${buyerValue.lastName}`
    //       //   : `${buyerValue.firstName} ${buyerValue.lastName}`,
    //       buyerEmailId: buyer,
    //       // buyerAssistantId: buyingAssistantValue.userId,
    //       // buyerAssistantEmailId: buyingAssistantValue.emailId,
    //       // buyerAssistant: buyingAssistantValue.middleName
    //       //   ? `${buyingAssistantValue.firstName} ${buyingAssistantValue.middleName} ${buyingAssistantValue.lastName}`
    //       //   : `${buyingAssistantValue.firstName} ${buyingAssistantValue.lastName}`,
    //       buyerAssistantEmailId: buyingAssistant,
    //       // ownBrandManagerId: ownBrandManagerValue.userId,
    //       // ownBrandManagerEmailId: ownBrandManagerValue.emailId,
    //       // ownBrandManager: ownBrandManagerValue.middleName
    //       //   ? `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.middleName} ${ownBrandManagerValue.lastName}`
    //       //   : `${ownBrandManagerValue.firstName} ${ownBrandManagerValue.lastName}`,
    //       ownBrandManagerEmailId: ownBrandManager,
    //       // seniorBuyingManagerId: seniorBuyingManagerValue.userId,
    //       // seniorBuyingManagerEmailId: seniorBuyingManagerValue.emailId,
    //       // seniorBuyingManager: seniorBuyingManagerValue.middleName
    //       //   ? `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.middleName} ${seniorBuyingManagerValue.lastName}`
    //       //   : `${seniorBuyingManagerValue.firstName} ${seniorBuyingManagerValue.lastName}`,
    //       seniorBuyingManagerEmailId: seniorBuyingManager,
    //       // merchandiserId: merchandiserValue.userId,
    //       // merchandiserEmailId: merchandiserValue.emailId,
    //       // merchandiser: merchandiserValue.middleName
    //       //   ? `${merchandiserValue.firstName} ${merchandiserValue.middleName} ${merchandiserValue.lastName}`
    //       //   : `${merchandiserValue.firstName} ${merchandiserValue.lastName}`,
    //       merchandiserEmailId: merchandiser,
    //       // rangeResetManagerId: rangeResetManagerValue.userId,
    //       // rangeResetManagerEmailId: rangeResetManagerValue.emailId,
    //       // rangeResetManager: rangeResetManagerValue.middleName
    //       //   ? `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.middleName} ${rangeResetManagerValue.lastName}`
    //       //   : `${rangeResetManagerValue.firstName} ${rangeResetManagerValue.lastName}`,
    //       rangeResetManagerEmailId: rangeResetManager,
    //       // categoryDirectorId: categoryDirectorValue.userId,
    //       // categoryDirectorEmailId: categoryDirectorValue.emailId,
    //       // categoryDirector: categoryDirectorValue.middleName
    //       //   ? `${categoryDirectorValue.firstName} ${categoryDirectorValue.middleName} ${categoryDirectorValue.lastName}`
    //       //   : `${categoryDirectorValue.firstName} ${categoryDirectorValue.lastName}`,
    //       categoryDirectorEmailId: categoryDirector,
    //       // supplyChainAnalystId: supplyChainSpecialistValue.userId,
    //       // supplyChainAnalystEmailId: supplyChainSpecialistValue.emailId,
    //       // supplyChainAnalyst: supplyChainSpecialistValue.middleName
    //       //   ? `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.middleName} ${supplyChainSpecialistValue.lastName}`
    //       //   : `${supplyChainSpecialistValue.firstName} ${supplyChainSpecialistValue.lastName}`,
    //       supplyChainAnalystEmailId: supplyChainSpecialist,
    //       clearancePriceCheck: clearancePriceApplied,
    //       orderStopDateCheck: orderStopDateCheck,
    //       stopOrder: stopOrder,
    //       fileName: 'string',
    //       createdById: userDetail && userDetail.userdetails[0].user.userId,
    //       createdByName:
    //         userDetail && userDetail.userdetails[0].user.middleName
    //           ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
    //           : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
    //     },
    //   ],
    // }

    setIsProgressLoader(true)
    const formData = createFormData()
    console.log(formData)

    patchRangeResetEvents(formData)
      .then((res: any) => {
        setDisableSave(true)
        setDisableCreate(true)
        setDisablePublish(true)
        setIsSuccessCall(false)
        setIsProgressLoader(false)
        // let newVal = [formData.rangeResets[0], ...fileData]
        // setFile(newVal)
        console.log(res.data)
        // if (errorCheck && errorCheck > -1) {
        if (fileErrorData) {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed' ||
            res.data[0].status.toLowerCase() === 'published'
          ) {
            let newVal = [res.data[0], ...fileData]
            let _tasks = newVal.filter(
              (value: any) => fileErrorData.errorId !== value.errorId
            )
            setFile(_tasks)

            // const formdata1 = {
            //   requests: [
            //     {
            //       submitType: 'new',
            //       eventId: res.data[0].id,
            //       eventStatus: res.data[0].status,
            //       requester: {
            //         persona:
            //           userDetail && userDetail.userdetails[0].user.middleName
            //             ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
            //             : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            //         details: {
            //           emailId:
            //             userDetail && userDetail.userdetails[0].user.emailId,
            //           userId:
            //             userDetail && userDetail.userdetails[0].user.userId,
            //           name:
            //             userDetail && userDetail.userdetails[0].user.middleName
            //               ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
            //               : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            //         },
            //         roles:
            //           userDetail &&
            //           userDetail.userdetails[0].roles.map((role: any) => {
            //             return {
            //               roleId: role.roleId,
            //             }
            //           }),
            //         usergroups:
            //           userDetail &&
            //           userDetail.userdetails[0].usergroups.map((group: any) => {
            //             return {
            //               groupId: group.groupId,
            //               status: group.status,
            //             }
            //           }),
            //       },
            //       eventHeader: {
            //         resetType: res.data[0].resetType,
            //         rafAppDueDate: res.data[0].appDueDate,
            //         eventLaunchDate: res.data[0].targetDate,
            //         eventName: res.data[0].name,
            //         eventHierarchy: {
            //           tradingGroup: res.data[0].tradeGroup,
            //           category: res.data[0].category,
            //           department: res.data[0].department,
            //         },
            //         inventoryControl: {
            //           planogramClass: res.data[0].planogramClass.className,
            //           storeWastetiming: res.data[0].wastageRange,
            //           orderStopDateCheckRequired: res.data[0].orderStopDateCheck,
            //           stopOrderStockRundown: res.data[0].stopOrder,
            //           clearancePriceCheck: res.data[0].clearancePriceCheck,
            //         },
            //         eventTeam: {
            //           team: [
            //             {
            //               persona: 'Buyer',
            //               details: {
            //                 emailId: res.data[0].buyerEmailId,
            //                 userId: res.data[0].buyerId,
            //                 name: res.data[0].buyer,
            //               },
            //             },
            //             {
            //               persona: 'Category Director',
            //               details: {
            //                 emailId: res.data[0].categoryDirectorEmailId,
            //                 userId: res.data[0].categoryDirectorId,
            //                 name: res.data[0].categoryDirector,
            //               },
            //             },
            //             {
            //               persona: 'Senior Buying Manager',
            //               details: {
            //                 emailId: res.data[0].seniorBuyingManagerEmailId,
            //                 userId: res.data[0].seniorBuyingManagerId,
            //                 name: res.data[0].seniorBuyingManager,
            //               },
            //             },
            //             {
            //               persona: 'Buying Assistant',
            //               details: {
            //                 emailId: res.data[0].buyerAssistantEmailId,
            //                 userId: res.data[0].buyerAssistantId,
            //                 name: res.data[0].buyerAssistant,
            //               },
            //             },
            //             {
            //               persona: 'Merchandiser',
            //               details: {
            //                 emailId: res.data[0].merchandiserEmailId,
            //                 userId: res.data[0].merchandiserId,
            //                 name: res.data[0].merchandiser,
            //               },
            //             },
            //             {
            //               persona: 'Supply Chain Specialist',
            //               details: {
            //                 emailId: res.data[0].supplyChainAnalystEmailId,
            //                 userId: res.data[0].supplyChainAnalystId,
            //                 name: res.data[0].supplyChainAnalyst,
            //               },
            //             },
            //             {
            //               persona: 'Own Brand Manager',
            //               details: {
            //                 emailId: res.data[0].ownBrandManagerEmailId,
            //                 userId: res.data[0].ownBrandManagerId,
            //                 name: res.data[0].ownBrandManager,
            //               },
            //             },
            //             {
            //               persona: 'Range Reset Manager',
            //               details: {
            //                 emailId: res.data[0].rangeResetManagerEmailId,
            //                 userId: res.data[0].rangeResetManagerId,
            //                 name: res.data[0].rangeResetManager,
            //               },
            //             },
            //           ],
            //         },
            //       },
            //     },
            //   ],
            // }
            const formdata1 = createCamundaFormData(res.data[0])
            console.log(formdata1)

            createEventsCamunda(res.data[0].id, formdata1)
              .then((res1: any) => {
                console.log(res1.data)

                toast.current.show({
                  severity: 'success',
                  summary: 'Success',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
              .catch((err: any) => {
                console.log(err)
                toast.current.show({
                  severity: 'error',
                  summary: 'Error',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
          } else if (res.data[0].status.toLowerCase().includes('duplicate')) {
            toast.current.show({
              severity: 'error',
              // summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              summary: 'Error',
              detail: `${res.data[0].status}`,
              life: life,
              className: 'login-toast',
            })
            setDisableSave(false)
          } else {
            console.log()
            // setErrorData(res.data[0])
            setDisableSave(false)
            // checkForErrors(res.data[0])
            checkForErrors(checkErrorMessages2(res.data[0]))
            // setErrorFile(res.data[0])
            // checkForErrors(res.data[0])
            // checkErrorMessages(fileErrorData)
          }
        } else {
          if (
            res.data[0].status.toLowerCase() === 'draft' ||
            res.data[0].status.toLowerCase() === 'confirmed' ||
            res.data[0].status.toLowerCase() === 'published'
          ) {
            // const formdata1 = {
            //   requests: [
            //     {
            //       submitType: 'new',
            //       eventId: res.data[0].id,
            //       eventStatus: res.data[0].status,
            //       requester: {
            //         persona:
            //           userDetail && userDetail.userdetails[0].user.middleName
            //             ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
            //             : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            //         details: {
            //           emailId:
            //             userDetail && userDetail.userdetails[0].user.emailId,
            //           userId:
            //             userDetail && userDetail.userdetails[0].user.userId,
            //           name:
            //             userDetail && userDetail.userdetails[0].user.middleName
            //               ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
            //               : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            //         },
            //         roles:
            //           userDetail &&
            //           userDetail.userdetails[0].roles.map((role: any) => {
            //             return {
            //               roleId: role.roleId,
            //             }
            //           }),
            //         usergroups:
            //           userDetail &&
            //           userDetail.userdetails[0].usergroups.map((group: any) => {
            //             return {
            //               groupId: group.groupId,
            //               status: group.status,
            //             }
            //           }),
            //       },
            //       eventHeader: {
            //         resetType: res.data[0].resetType,
            //         rafAppDueDate: res.data[0].appDueDate,
            //         eventLaunchDate: res.data[0].targetDate,
            //         eventName: res.data[0].name,
            //         eventHierarchy: {
            //           tradingGroup: res.data[0].tradeGroup,
            //           category: res.data[0].category,
            //           department: res.data[0].department,
            //         },
            //         inventoryControl: {
            //           planogramClass: res.data[0].planogramClass.className,
            //           storeWastetiming: res.data[0].wastageRange,
            //           orderStopDateCheckRequired: res.data[0].orderStopDateCheck,
            //           stopOrderStockRundown: res.data[0].stopOrder,
            //           clearancePriceCheck: res.data[0].clearancePriceCheck,
            //         },
            //         eventTeam: {
            //           team: [
            //             {
            //               persona: 'Buyer',
            //               details: {
            //                 emailId: res.data[0].buyerEmailId,
            //                 userId: res.data[0].buyerId,
            //                 name: res.data[0].buyer,
            //               },
            //             },
            //             {
            //               persona: 'Category Director',
            //               details: {
            //                 emailId: res.data[0].categoryDirectorEmailId,
            //                 userId: res.data[0].categoryDirectorId,
            //                 name: res.data[0].categoryDirector,
            //               },
            //             },
            //             {
            //               persona: 'Senior Buying Manager',
            //               details: {
            //                 emailId: res.data[0].seniorBuyingManagerEmailId,
            //                 userId: res.data[0].seniorBuyingManagerId,
            //                 name: res.data[0].seniorBuyingManager,
            //               },
            //             },
            //             {
            //               persona: 'Buying Assistant',
            //               details: {
            //                 emailId: res.data[0].buyerAssistantEmailId,
            //                 userId: res.data[0].buyerAssistantId,
            //                 name: res.data[0].buyerAssistant,
            //               },
            //             },
            //             {
            //               persona: 'Merchandiser',
            //               details: {
            //                 emailId: res.data[0].merchandiserEmailId,
            //                 userId: res.data[0].merchandiserId,
            //                 name: res.data[0].merchandiser,
            //               },
            //             },
            //             {
            //               persona: 'Supply Chain Specialist',
            //               details: {
            //                 emailId: res.data[0].supplyChainAnalystEmailId,
            //                 userId: res.data[0].supplyChainAnalystId,
            //                 name: res.data[0].supplyChainAnalyst,
            //               },
            //             },
            //             {
            //               persona: 'Own Brand Manager',
            //               details: {
            //                 emailId: res.data[0].ownBrandManagerEmailId,
            //                 userId: res.data[0].ownBrandManagerId,
            //                 name: res.data[0].ownBrandManager,
            //               },
            //             },
            //             {
            //               persona: 'Range Reset Manager',
            //               details: {
            //                 emailId: res.data[0].rangeResetManagerEmailId,
            //                 userId: res.data[0].rangeResetManagerId,
            //                 name: res.data[0].rangeResetManager,
            //               },
            //             },
            //           ],
            //         },
            //       },
            //     },
            //   ],
            // }

            const formdata1 = createCamundaFormData(res.data[0])
            console.log(formdata1)

            createEventsCamunda(res.data[0].id, formdata1)
              .then((res: any) => {
                console.log(res.data)
                toast.current.show({
                  severity: 'success',
                  summary: 'Success',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
              .catch((err: any) => {
                console.log(err)
                toast.current.show({
                  severity: 'error',
                  summary: 'Error',
                  // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
                  life: life,
                  className: 'login-toast',
                })
              })
          } else if (res.data[0].status.toLowerCase().includes('duplicate')) {
            toast.current.show({
              severity: 'error',
              // summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              summary: 'Error',
              detail: `${res.data[0].status}`,
              life: life,
              className: 'login-toast',
            })
            setDisableSave(false)
          } else {
            console.log()
            // setErrorData(res.data[0])
            setDisableSave(false)
            // checkForErrors(res.data[0])
            checkForErrors(checkErrorMessages2(res.data[0]))
            // setErrorFile(res.data[0])
            // checkForErrors(res.data[0])
            // checkErrorMessages(fileErrorData)
          }
        }
      })
      .catch((err: any) => {
        setIsSuccessCall(false)
        setIsProgressLoader(false)
        setDisableSave(false)
        console.log(err)
        toast.current.show({
          severity: 'error',
          summary: 'Error!',
          // detail: err.response.data.errorMessage,
          life: life,
          className: 'login-toast',
        })
      })
  }

  const handlePublishAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('publish')
  }

  const handleCancelPublish = (e: any) => {
    e.preventDefault()
    setCancelOpenPublish((p) => !p)
  }

  const handleCreateAndPublish = () => {
    setIsProgressLoader(true)
    const formData = createFormData()
    console.log(formData)

    patchRangeResetEvents(formData)
      .then((res: any) => {
        setDisableSave(true)
        setDisableCreate(true)
        setDisablePublish(true)
        setIsSuccessCall(false)

        // let newVal = [formData.rangeResets[0], ...fileData]
        // setFile(newVal)
        console.log(res.data)
        const data =
          // res.data
          //   .filter((d: any) => d.status.toLowerCase() != 'cancelled')
          //   .map((d: any) => {
          //     return
          {
            name: res.data[0].name,
            id: res.data[0].id,
            resetType: res.data[0].resetType,
            appDueDate: res.data[0].appDueDate,
            tradeGroup: res.data[0].tradeGroup,
            category: res.data[0].category,
            categoryId: res.data[0].categoryId,
            department: res.data[0].department,
            departmentId: res.data[0].departmentId,
            targetDate: res.data[0].targetDate,
            planogramClass: res.data[0].planogramClass,
            wastageRange: res.data[0].wastageRange,
            wastageRangeText: res.data[0].wastageRangeText,
            buyer: res.data[0].buyer,
            buyerId: res.data[0].buyerId,
            buyerEmailId: res.data[0].buyerEmailId,
            categoryDirector: res.data[0].categoryDirector,
            categoryDirectorId: res.data[0].categoryDirectorId,
            categoryDirectorEmailId: res.data[0].categoryDirectorEmailId,
            seniorBuyingManager: res.data[0].seniorBuyingManager,
            seniorBuyingManagerId: res.data[0].seniorBuyingManagerId,
            seniorBuyingManagerEmailId: res.data[0].seniorBuyingManagerEmailId,
            buyerAssistant: res.data[0].buyerAssistant,
            buyerAssistantId: res.data[0].buyerAssistantId,
            buyerAssistantEmailId: res.data[0].buyerAssistantEmailId,
            merchandiser: res.data[0].merchandiser,
            merchandiserId: res.data[0].merchandiserId,
            merchandiserEmailId: res.data[0].merchandiserEmailId,
            supplyChainAnalyst: res.data[0].supplyChainAnalyst,
            supplyChainAnalystId: res.data[0].supplyChainAnalystId,
            supplyChainAnalystEmailId: res.data[0].supplyChainAnalystEmailId,
            ownBrandManager: res.data[0].ownBrandManager,
            ownBrandManagerId: res.data[0].ownBrandManagerId,
            ownBrandManagerEmailId: res.data[0].ownBrandManagerEmailId,
            rangeResetManager: res.data[0].rangeResetManager,
            rangeResetManagerId: res.data[0].rangeResetManagerId,
            rangeResetManagerEmailId: res.data[0].rangeResetManagerEmailId,

            // eventId: d['Event ID'],
            // name: 'string',
            // eventName: eventName(),
            eventStatus: res.data[0].eventStatus,
            status: res.data[0].status,
            clearancePriceCheck: res.data[0].clearancePriceCheck,
            orderStopDateCheck: res.data[0].orderStopDateCheck,
            stopOrder: res.data[0].stopOrder,
          }
        // })
        console.log(data)
        // if (errorCheck && errorCheck > -1) {
        if (fileErrorData) {
          if (res.data[0].status.toLowerCase() === 'draft') {
            let newVal = [res.data[0], ...fileData]
            let _tasks = newVal.filter(
              (value: any) => fileErrorData.errorId !== value.errorId
            )
            setIsProgressLoader(false)
            setFile(_tasks)
            setTaskFile(data)
            setToastRemovePublish('success')
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              detail: `Event created with Event ID ${res.data[0].id}`,
              life: life,
              className: 'login-toast',
            })

            // getEventDetailsById(res.data[0].id)
            //   .then((res1: any) => {
            //     let getResponse = res1.data
            //     const formData2 = {
            //       requestorDetails: {
            //         emailId:
            //           userDetail && userDetail.userdetails[0].user.emailId,
            //         requestBy:
            //           userDetail && userDetail.userdetails[0].user.userId,
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
            //         // userDetail &&
            //         // userDetail.userdetails[0].roles.map((role: any) => {
            //         //   return {
            //         //     roleId: role.roleId,
            //         //   }
            //         // }),
            //         [
            //           {
            //             roleId:
            //               getResponse.eventDetailsList[0].rangeEventRequest
            //                 .requester.persona,
            //           },
            //         ],
            //     }

            //     claimEventsCamunda(
            //       getResponse.eventDetailsList[0].rangeEventRequest.taskId,
            //       formData2
            //     )
            //       .then((res3: any) => {
            //         console.log(res3)
            //         let formData1 = {
            //           reviewDecision: 'Confirmed',
            //           requester:
            //             getResponse.eventDetailsList[0].rangeEventRequest
            //               .requester,
            //           eventId: res.data[0].id,
            //           // eventStatus:
            //           //   getResponse.eventDetailsList[0].rangeEventRequest
            //           //     .eventStatus,
            //           eventStatus: 'Published',
            //           eventHeader:
            //             getResponse.eventDetailsList[0].rangeEventRequest
            //               .eventHeader,
            //           milestones: getResponse.eventDetailsList[0].milestones,
            //           logging: {
            //             comments: 'string',
            //             updated: 'string',
            //           },
            //         }
            //         console.log(formData1)
            //         publishEventsCamunda(res.data[0].id, formData1)
            //           .then((res2: any) => {
            //             console.log(res2.data)
            //             setIsSuccessCall(false)
            //             setIsProgressLoader(false)
            //             toast.current.show({
            //               severity: 'success',
            //               summary: 'Success',
            //               // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
            //               detail: `${res.data[0].id} event is published`,
            //               life: life,
            //               className: 'login-toast',
            //             })
            //           })
            //           .catch((err2: any) => {
            //             console.log(err2)
            //             setIsSuccessCall(false)
            //             setIsProgressLoader(false)
            //             toast.current.show({
            //               severity: 'error',
            //               summary: 'Error',
            //               // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
            //               detail: allMessages.error.errorPublishEvent,
            //               life: life,
            //               className: 'login-toast',
            //             })
            //           })
            //       })
            //       .catch((err: any) => {
            //         console.log(err)
            //         setIsSuccessCall(false)
            //         setIsProgressLoader(false)
            //         toast.current.show({
            //           severity: 'error',
            //           summary: 'Error',
            //           // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
            //           detail: allMessages.error.errorClaim,
            //           life: life,
            //           className: 'login-toast',
            //         })
            //       })
            //   })
            //   .catch((err1: any) => {
            //     console.log(err1)
            //     setIsSuccessCall(false)
            //     setIsProgressLoader(false)
            //     toast.current.show({
            //       severity: 'error',
            //       summary: 'Error',
            //       detail: `Camunda Get event error`,
            //       life: life,
            //       className: 'login-toast',
            //     })
            //   })
          } else if (res.data[0].status.toLowerCase().includes('duplicate')) {
            setIsSuccessCall(false)
            setIsProgressLoader(false)
            setToastRemovePublish('error')
            toast.current.show({
              severity: 'error',
              // summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              summary: 'Error',
              detail: `${res.data[0].status}`,
              life: life,
              className: 'login-toast',
            })
            setDisableSave(false)
          } else {
            console.log()
            // setIsSuccessCall(false)
            setDisablePublish(false)
            setIsProgressLoader(false)
            // setErrorData(res.data[0])
            setDisableSave(false)
            // checkForErrors(res.data[0])
            checkForErrors(checkErrorMessages2(res.data[0]))
            // setErrorFile(res.data[0])
            // checkForErrors(res.data[0])
            // checkErrorMessages(fileErrorData)
          }
        } else {
          if (
            res.data[0].status.toLowerCase() === 'draft'
            // ||
            // res.data[0].status.toLowerCase() === 'confirmed'
          ) {
            // const formdata1 = createCamundaFormData(res.data[0])
            // console.log(formdata1)
            setIsProgressLoader(false)
            setTaskFile(data)
            setToastRemovePublish('success')
            toast.current.show({
              severity: 'success',
              summary: 'Success',
              detail: `Event created with Event ID ${res.data[0].id}`,
              life: life,
              className: 'login-toast',
            })
            // getEventDetailsById(res.data[0].id)
            //   .then((res1: any) => {
            //     let getResponse = res1.data
            //     const formData2 = {
            //       requestorDetails: {
            //         emailId:
            //           userDetail && userDetail.userdetails[0].user.emailId,
            //         requestBy:
            //           userDetail && userDetail.userdetails[0].user.userId,
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
            //         // userDetail &&
            //         // userDetail.userdetails[0].roles.map((role: any) => {
            //         //   return {
            //         //     roleId: role.roleId,
            //         //   }
            //         // }),
            //         [
            //           {
            //             roleId:
            //               getResponse.eventDetailsList[0].rangeEventRequest
            //                 .requester.persona,
            //           },
            //         ],
            //     }

            //     claimEventsCamunda(
            //       getResponse.eventDetailsList[0].rangeEventRequest.taskId,
            //       formData2
            //     )
            //       .then((res3: any) => {
            //         console.log(res3)
            //         let formData1 = {
            //           reviewDecision: 'Confirmed',
            //           requester:
            //             getResponse.eventDetailsList[0].rangeEventRequest
            //               .requester,
            //           eventId: res.data[0].id,
            //           eventStatus: 'Published',
            //           eventHeader:
            //             getResponse.eventDetailsList[0].rangeEventRequest
            //               .eventHeader,
            //           milestones: getResponse.eventDetailsList[0].milestones,
            //           logging: {
            //             comments: 'string',
            //             updated: 'string',
            //           },
            //         }
            //         console.log(formData1)
            //         publishEventsCamunda(res.data[0].id, formData1)
            //           .then((res2: any) => {
            //             console.log(res2.data)
            //             setIsSuccessCall(false)
            //             setIsProgressLoader(false)
            //             toast.current.show({
            //               severity: 'success',
            //               summary: 'Success',
            //               // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
            //               detail: `${res.data[0].id} event is published`,
            //               life: life,
            //               className: 'login-toast',
            //             })
            //           })
            //           .catch((err2: any) => {
            //             console.log(err2)
            //             setIsSuccessCall(false)
            //             setIsProgressLoader(false)
            //             toast.current.show({
            //               severity: 'error',
            //               summary: 'Error',
            //               // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
            //               detail: allMessages.error.errorPublishEvent,
            //               life: life,
            //               className: 'login-toast',
            //             })
            //           })
            //       })
            //       .catch((err: any) => {
            //         console.log(err)
            //         setIsSuccessCall(false)
            //         setIsProgressLoader(false)
            //         toast.current.show({
            //           severity: 'error',
            //           summary: 'Error',
            //           // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
            //           detail: allMessages.error.errorClaim,
            //           life: life,
            //           className: 'login-toast',
            //         })
            //       })
            //   })
            //   .catch((err1: any) => {
            //     setIsSuccessCall(false)
            //     setIsProgressLoader(false)
            //     console.log(err1)
            //     toast.current.show({
            //       severity: 'error',
            //       summary: 'Error',
            //       detail: `Camunda Get event error`,
            //       life: life,
            //       className: 'login-toast',
            //     })
            //   })
          } else if (res.data[0].status.toLowerCase().includes('duplicate')) {
            setIsSuccessCall(false)
            setIsProgressLoader(false)
            setToastRemovePublish('error')
            toast.current.show({
              severity: 'error',
              // summary: 'Duplicate Event',
              // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
              summary: 'Error',
              detail: `${res.data[0].status}`,
              life: life,
              className: 'login-toast',
            })
            setDisableSave(false)
          } else {
            console.log()
            // setErrorData(res.data[0])
            // setIsSuccessCall(false)
            setIsProgressLoader(false)
            setDisableSave(false)
            // checkForErrors(res.data[0])
            checkForErrors(checkErrorMessages2(res.data[0]))
            // setErrorFile(res.data[0])
            // checkForErrors(res.data[0])
            // checkErrorMessages(fileErrorData)
          }
        }
      })
      .catch((err: any) => {
        setIsSuccessCall(false)
        setIsProgressLoader(false)
        setDisableSave(false)
        setToastRemovePublish('error')
        console.log(err)
        toast.current.show({
          severity: 'error',
          summary: 'Error!',
          // detail: err.response.data.errorMessage,
          life: life,
          className: 'login-toast',
        })
      })
  }

  const viewConfirmCreate = (
    <ConfirmBox
      cancelOpen={cancelOpenApprove}
      handleCancel={handleCancelCreate}
      handleProceed={handleCreateEvent}
      label1="Are you sure to Create?"
      label2="Please click Ok to proceed"
    />
  )

  const viewConfirmPublish = (
    <ConfirmBox
      cancelOpen={cancelOpenPublish}
      handleCancel={handleCancelPublish}
      handleProceed={handleCreateAndPublish}
      label1="Are you sure to Create & Publish?"
      label2="Please click Ok to proceed"
    />
  )

  const createEventForm = (
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
        <Grid container style={{ justifyContent: 'center' }}>
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
            <Grid item xs={8} sm={10}>
              <Typography variant="h6" color="primary">
                Create Event
              </Typography>
            </Grid>

            <Grid item xs={4} sm={2} style={{ textAlign: 'right' }}>
              <button
                // className={classes.backButton}
                className="backButton"
                onClick={goBack}
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
            </Grid>
          </Grid>
          <form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid
                container
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
              >
                {/* <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                <Typography variant="subtitle2" color="primary">
                  Unique ID
                  {requiredStar}
                </Typography>
              </Grid>

              <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                <Typography variant="subtitle2" color="primary">
                  <input
                    type="text"
                    name="uniqueId"
                    id="uniqueId"
                    placeholder="eg. 123456"
                    value={uniqueId}
                    ref={focusUniqueId}
                    className={classes.inputFields}
                    onChange={handleUniqueId}
                    // defaultValue=""
                    // value={uniqueId}
                    required
                  />
                  <br />
                  <div className={classes.errorMessage}>
                    {uniqueIdError && uniqueIdError}
                  </div>
                </Typography>
              </Grid>
            </Grid> */}
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Reset Type
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                        name="requesttype"
                        id="requesttype"
                        className={classes.selectField}
                        ref={focusResetType}
                        defaultValue=""
                        value={resetType}
                        // onChange={e => {
                        //     setResetType(e.target.value);
                        // }}
                        onChange={handleResetType}
                        required
                      >
                        <option disabled value="">
                          --- Select Reset Type ---
                        </option>
                        {resetTypes.map((type) => {
                          return (
                            <option value={type.name} key={type.name}>
                              {type.text}
                            </option>
                          )
                        })}
                      </select> */}

                      {/* <Select
                        value={resetType}
                        onChange={handleResetType}
                        color="primary"
                        displayEmpty
                        renderValue={(value: any) =>
                          value === '' ? '---Select Reset Type---' : value
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            value={resetType}
                            className={classes.selectField}
                            color="primary"
                          />
                        }
                      >
                        {resetTypes.map((type) => {
                          return (
                            <MenuItem
                              value={type.text}
                              key={type.name}
                              className={classes.muiSelect}
                            >
                              {type.text}
                            </MenuItem>
                          )
                        })}
                      </Select> */}

                      <AutocompleteSelect
                        value={resetType}
                        options={resetOptions}
                        onChange={handleResetType}
                        placeholder="Select Reset Type"
                        ref={focusResetType}
                      />

                      {errReset && (
                        <span className={classes.errorMessageColor}>
                          {resetError1}
                        </span>
                      )}

                      {/* <br />
                      <div className={classes.errorMessage}>
                        {resetTypeError && resetTypeError}
                      </div> */}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      RAF/App Due Date
                      {/* <LightTooltip
                        title={
                          <React.Fragment>
                            <div className={classes.errorTooltip}>
                              <Typography color="error" variant="body2">
                                This field is manadatory for Reset Type Rapid
                                Response
                                <br />
                                RAF/ APP Due Date should be between System Date
                                and Launch Date
                              </Typography>
                            </div>
                          </React.Fragment>
                        }
                        arrow
                        placement="top"
                      >
                        <InfoIcon
                          color="secondary"
                          fontSize="small"
                          style={{ padding: '3px' }}
                        />
                      </LightTooltip> */}
                      <LightTooltip
                        title={
                          <>
                            <Typography variant="body2">
                              This field is mandatory for Reset Type Rapid
                              Response
                              <br />
                              RAF/ APP Due Date should be between System Date
                              and Launch Date
                            </Typography>
                          </>
                        }
                        position={'top'}
                        icon={
                          <InfoIcon
                            color="secondary"
                            fontSize="small"
                            style={{ padding: '3px' }}
                          />
                        }
                      />
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xl={7}
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    // style={{height:"38px"}}
                  >
                    <Typography variant="subtitle2" color="primary">
                      {/* <input type="text" value={rafDueDate && rafDueDate.getDate()}
                                        style={{
                                            display: "none",
                                        }}
                                        ref={focusRafDueDate}
                                        readOnly
                                    /> */}

                      <DatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={rafDueDate}
                        // ref={focusRafDueDate}
                        onChange={(e: any) => {
                          handleRafDueDate(e.toISOString().split('T')[0])
                        }}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change date',
                        // }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        emptyLabel="Enter RAF/APP Due Date"
                        maxDate={launchDate && launchDate}
                        maxDateMessage={allMessages.error.rafDateError}
                        TextFieldComponent={(props: any) => (
                          <OutlinedInput
                            margin="dense"
                            onClick={props.onClick}
                            value={props.value}
                            onChange={props.onChange}
                            className={classes.dateFields}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleRafDateClear}
                                  edge="end"
                                  style={{ margin: '5px' }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        )}
                      />

                      {/* <input
                    type="date"
                    value={rafDueDate}
                    // ref={focusRafDueDate}
                    onChange={handleRafDueDate}
                    max={launchDate && launchDate}
                    className={classes.dateFields}
                    required={
                      resetType && resetType === 'Rapid Response' ? true : false
                    }
                  /> */}

                      {/* <RafDueDateComponent ref={focusRafDueDate}/> */}
                      {/* <br />
                      <div
                        className={classes.errorMessage}
                        ref={focusRafDueDate}
                      >
                        {rafDueDateError}
                      </div> */}

                      <br />
                      {errRafDueDate && (
                        <span className={classes.errorMessageColor}>
                          {rafDueDateError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Trading Group
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                        name="group"
                        id="group"
                        className={classes.selectField}
                        defaultValue=""
                        ref={focusGroup}
                        value={group}
                        onChange={handleGroup}
                        required
                      >
                        <option disabled value="">
                          --- Select Group ---
                        </option>
                        <option value="Frozen">Frozen</option>
                      </select> */}

                      {/* <Select
                        value={group}
                        onChange={handleGroup}
                        displayEmpty
                        renderValue={(value: any) =>
                          value ? value : '--- Select Trading Group ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                        // classes={{
                        //   select: classes.text,
                        // }}
                      >
                        {groupOptions &&
                          groupOptions.map((type: any) => {
                            return (
                              <MenuItem
                                value={type.value}
                                key={type.value}
                                className={classes.muiSelect}
                                classes={{
                                  selected: classes.selectColor,
                                }}
                              >
                                {type.label}
                              </MenuItem>
                            )
                          })}
                      </Select> */}

                      <AutocompleteSelect
                        value={group}
                        options={groupOptions}
                        onChange={handleGroup}
                        placeholder="Select Trading Group"
                        ref={focusGroup}
                      />

                      {errGroup && (
                        <span className={classes.errorMessageColor}>
                          {tradingGError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>{groupError}</div> */}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Category
                      {/* {requiredStar} */}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                        name="category"
                        id="category"
                        className={classes.selectField}
                        defaultValue=""
                        value={category}
                        ref={focusCategory}
                        onChange={handleCategory}
                        required
                      >
                        <option disabled value="">
                          --- Select Category ---
                        </option>
                        <option value="Frozen Food">Frozen Food</option>
                      </select> */}

                      {/* <Select
                        value={category}
                        onChange={handleCategory}
                        displayEmpty
                        renderValue={(value: any) =>
                          value ? value : '--- Select Category ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                        disabled={categoryOptions.length > 0 ? false : true}
                      >
                        {categoryOptions.map((type: any) => {
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
                      </Select> */}

                      <AutocompleteSelect
                        value={category}
                        options={categoryOptions}
                        onChange={handleCategory}
                        placeholder="Select Category"
                        isDisabled={
                          categoryOptions.length > 0
                            ? false
                            : category.value
                            ? false
                            : true
                        }
                        ref={focusCategory}
                      />

                      {errCategory && (
                        <span className={classes.errorMessageColor}>
                          {categoryError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>
                        {categoryError}
                      </div> */}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Department
                      {/* {requiredStar} */}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                        name="department"
                        id="department"
                        className={classes.selectField}
                        defaultValue=""
                        value={department}
                        ref={focusDepartment}
                        onChange={handleDepartment}
                        required
                      >
                        <option disabled value="">
                          --- Select Department ---
                        </option>
                        <option value="Frozen Chips">Frozen Chips</option>
                        <option value="Frozen Vegetables">
                          Frozen Vegetables
                        </option>
                        <option value="Frozen Fish">Frozen Fish</option>
                      </select> */}

                      {/* <Select
                        value={department}
                        onChange={handleDepartment}
                        displayEmpty
                        renderValue={(value: any) =>
                          value ? value : '--- Select Department ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                        disabled={departmentOptions.length > 0 ? false : true}
                      >
                        {departmentOptions.map((type: any) => {
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
                      </Select> */}

                      <AutocompleteSelect
                        value={department}
                        options={departmentOptions}
                        onChange={handleDepartment}
                        placeholder="Select Department"
                        isDisabled={
                          departmentOptions.length > 0
                            ? false
                            : department.value
                            ? false
                            : true
                        }
                        ref={focusDepartment}
                      />

                      {errDepartment && (
                        <span className={classes.errorMessageColor}>
                          {departmentError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>
                        {departmentError}
                      </div> */}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Launch Date
                      {requiredStar}
                      {/* <LightTooltip
                        title={
                          <React.Fragment>
                            <div className={classes.errorTooltip}>
                              <Typography color="error" variant="body2">
                                Launch Date must be greater than or equal to
                                System Date
                              </Typography>
                            </div>
                          </React.Fragment>
                        }
                        arrow
                        placement="top"
                      >
                        <InfoIcon
                          color="secondary"
                          fontSize="small"
                          style={{ padding: '3px' }}
                        />
                      </LightTooltip> */}
                      {/* <LightTooltip
                        title={
                          'Launch Date must be greater than or equal to System Date'
                        }
                        position={'top'}
                        icon={
                          <InfoIcon
                            color="secondary"
                            fontSize="small"
                            style={{ padding: '3px' }}
                          />
                        }
                      /> */}
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      <DatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={launchDate}
                        // ref={focusLaunchDate}
                        onChange={(e: any) => {
                          handleLaunchDate(e.toISOString().split('T')[0])
                        }}
                        // KeyboardButtonProps={{
                        //   'aria-label': 'change date',
                        // }}
                        // minDate={new Date()}
                        emptyLabel="Enter Launch Date"
                        TextFieldComponent={(props: any) => (
                          <OutlinedInput
                            margin="dense"
                            onClick={props.onClick}
                            value={props.value}
                            onChange={props.onChange}
                            // ref={props.ref}
                            className={classes.dateFields}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleLaunchDateClear}
                                  edge="end"
                                  style={{ margin: '5px' }}
                                >
                                  <ClearIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        )}
                      />

                      {/* <input
                    type="date"
                    value={launchDate}
                    // ref={focusLaunchDate}
                    onChange={handleLaunchDate}
                    className={classes.dateFields}
                    required
                  /> */}

                      <br />
                      {errLaunchDate && (
                        <span className={classes.errorMessageColor}>
                          {launchError1}
                        </span>
                      )}

                      {/* <div className={classes.errorMessage}>
                        {launchDateError}
                      </div> */}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Event Name
                      <LightTooltip
                        title={
                          <>
                            <Typography variant="body2">
                              Event Name is mandatory when department is not
                              selected
                            </Typography>
                          </>
                        }
                        position={'top'}
                        icon={
                          <InfoIcon
                            color="secondary"
                            fontSize="small"
                            style={{ padding: '3px' }}
                          />
                        }
                      />
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        className={classes.inputFields}
                        onChange={(e) => {
                          setEventName(e.target.value)
                        }}
                        required
                      /> */}
                      <OutlinedInput
                        placeholder="Event Name"
                        margin="dense"
                        value={eventName}
                        className={classes.inputFields}
                        onChange={(e) => {
                          setEventName(e.target.value)
                          setErrEventName(false)
                          setEventNameErr1('')
                        }}
                        ref={focusEventName}
                      />
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {errEventName && (
                        <span className={classes.errorMessageColor}>
                          {eventNameErr1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Planogram Class
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <button
                        className={classes.backButton}
                        type="button"
                        onClick={() => setClassOpen(true)}
                      >
                        Class(
                        {confirmClassValues && confirmClassValues.length
                          ? confirmClassValues.length
                          : '0'}
                        )
                      </button> */}

                      <AutocompleteSelect
                        value={confirmClassValues}
                        isMulti={true}
                        options={classOptions}
                        onChange={handleClassChange}
                        placeholder="Select Planogram Class"
                      />

                      {errPlanogramClass && (
                        <span className={classes.errorMessageColor}>
                          {planogramClassError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Clearance Price Applied
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    <FormControl>
                      <RadioGroup
                        name="clearancePrice"
                        value={clearancePriceApplied}
                        onChange={handleClearancePrice}
                        style={{ display: 'inline' }}
                      >
                        {/* <FormControlLabel
                          value="y"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="n"
                          control={radio}
                          label="No"
                        /> */}

                        {yesOrNo.map((type) => {
                          return (
                            <FormControlLabel
                              value={type.name}
                              key={type.name}
                              control={radio}
                              label={type.text}
                            />
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                    {errClearancePrice && (
                      <span className={classes.errorMessageColor}>
                        {clearancePriceError1}
                      </span>
                    )}
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Order Stop Date Check Required
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    <FormControl>
                      <RadioGroup
                        name="GSCOPDateCheck"
                        value={orderStopDateCheck}
                        onChange={handleStopDateCheck}
                        style={{ display: 'inline' }}
                      >
                        {/* <FormControlLabel
                          value="Yes"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={radio}
                          label="No"
                        /> */}
                        {yesOrNo.map((type) => {
                          return (
                            <FormControlLabel
                              value={type.name}
                              key={type.name}
                              control={radio}
                              label={type.text}
                            />
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                    {errOrderStopDate && (
                      <span className={classes.errorMessageColor}>
                        {orderStopDateError1}
                      </span>
                    )}
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Stop Order (Stock rundown)
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    <FormControl>
                      <RadioGroup
                        name="stopOrder"
                        value={stopOrder}
                        onChange={handleStopOrder}
                        style={{ display: 'inline' }}
                      >
                        {/* <FormControlLabel
                          value="Yes"
                          control={radio}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="No"
                          control={radio}
                          label="No"
                        /> */}
                        {yesOrNo.map((type) => {
                          return (
                            <FormControlLabel
                              value={type.name}
                              key={type.name}
                              control={radio}
                              label={type.text}
                            />
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                    {errStopOrder && (
                      <span className={classes.errorMessageColor}>
                        {stopOrderError1}
                      </span>
                    )}
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Store Waste Process Timing
                    </Typography>
                  </Grid>

                  <Grid item xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                        name="Store Waste Process Timing"
                        id="storeWasteProcessTiming"
                        className={classes.selectField}
                        defaultValue=""
                        value={storeWasteProcess}
                        onChange={(e) => {
                          setStoreWasteProcess(e.target.value)
                        }}
                        required
                      >
                        <option disabled value="">
                          --- Select Store Waste Process Timing ---
                        </option>
                        <option value="Week +4\ +7">Week +4\ +7</option>
                        <option value="Week +5\ +8">Week +5\ +8</option>
                        <option value="Week +6\ +9">Week +6\ +9</option>
                        <option value="Week +7\ +10">Week +6\ +10</option>
                      </select> */}

                      {/* <Select
                        value={toreWasteProcess}
                        onChange={(e) => {
                          setStoreWasteProcess(e.target.value)
                        }}
                        displayEmpty
                        renderValue={(value: any) =>
                          value
                            ? value
                            : '--- Select Store Waste Process Timing ---'
                        }
                        input={
                          <OutlinedInput
                            margin="dense"
                            className={classes.selectField}
                          />
                        }
                      >
                        {wastageRanges.map((type) => {
                          return (
                            <MenuItem
                              value={type.text}
                              key={type.name}
                              className={classes.muiSelect}
                            >
                              {type.text}
                            </MenuItem>
                          )
                        })}
                      </Select> */}

                      <AutocompleteSelect
                        value={storeWasteProcess}
                        options={wastageRanges}
                        onChange={handleWastageRange}
                        placeholder="Select Store Waste Process Timing"
                      />
                      {/* <Typography variant="subtitle2" color="primary"> */}
                      {errWastageRange && (
                        <span className={classes.errorMessageColor}>
                          {wastageRangeError1}
                        </span>
                      )}
                    </Typography>
                    {/* </Typography> */}
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Buyer
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    item
                    xl={7}
                    lg={7}
                    md={7}
                    sm={7}
                    xs={12}
                    // spacing={2}
                  >
                    {/* <select
                                        value={buyer}
                                        onChange={(e: any) => handleBuyer(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                        required
                                    >
                                        <option value="" disabled>
                                            --- Select Buyer ---
                                        </option>
                                        {
                                            Buyers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}

                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}> */}
                    {/* <Typography variant="subtitle2" color="primary"> */}
                    {/* <SearchSelect
                          value={buyer}
                          // onChange={(e: any) => setBuyer(e.target.value)}
                          onChange={handleBuyer}
                          placeholder="Search Buyer"
                          onClick={handleBuyerClick}
                          ref={focusBuyer}
                        /> */}

                    <OutlinedInput
                      placeholder="Provide Buyer Email"
                      margin="dense"
                      value={buyer}
                      className={classes.inputFields}
                      onChange={handleBuyer}
                      ref={focusBuyer}
                    />
                    {/* </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign confirmValue={buyerConfirmed} />
                    </Grid> */}
                    <Typography variant="subtitle2" color="primary">
                      {errBuyer && (
                        <span className={classes.errorMessageColor}>
                          {buyerError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Category Director
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    {/* <select
                                        value={categoryDirector}
                                        onChange={(e: any) => setCategoryDirector(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Category Director ---
                                        </option>
                                        {
                                            CategoryDirectors.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}
                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={categoryDirector}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleCategoryDirector}
                          placeholder="Search Category Director"
                          onClick={handleCategoryDirectorClick}
                          ref={focusCategoryDirector}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={categoryDirectorConfirmed}
                      />
                    </Grid> */}

                    <OutlinedInput
                      placeholder="Provide Category Director Email"
                      margin="dense"
                      value={categoryDirector}
                      className={classes.inputFields}
                      onChange={handleCategoryDirector}
                      ref={focusCategoryDirector}
                    />

                    <Typography variant="subtitle2" color="primary">
                      {errCategoryDirector && (
                        <span className={classes.errorMessageColor}>
                          {categoryDirectorError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Senior Buying Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    {/* <select
                                        value={seniorBuyingManager}
                                        onChange={(e: any) => setSeniorBuyingManager(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            --- Select Senior Buying Manager ---
                                        </option>
                                        {
                                            SeniorBuyingManagers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}
                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={seniorBuyingManager}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleSeniorBuyingManager}
                          placeholder="Search Senior Buying Manager"
                          onClick={handleSeniorBuyingManagerClick}
                          ref={focusSeniorBuyingManager}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={seniorBuyingManagerConfirmed}
                      />
                    </Grid> */}

                    <OutlinedInput
                      placeholder="Provide Senior Buyer Manager Email"
                      margin="dense"
                      value={seniorBuyingManager}
                      className={classes.inputFields}
                      onChange={handleSeniorBuyingManager}
                      ref={focusSeniorBuyingManager}
                    />

                    <Typography variant="subtitle2" color="primary">
                      {errSeniorBuyingManager && (
                        <span className={classes.errorMessageColor}>
                          {seniorBuyingManagerError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Buying Assistant
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    {/* <select
                                        value={buyingAssistant}
                                        onChange={(e: any) => setBuyingAssistant(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            --- Select Buying Assistant ---
                                        </option>
                                        {
                                            BuyingAssistants.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}
                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={buyingAssistant}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleBuyingAssistant}
                          placeholder="Search Buying Assistant"
                          onClick={handleBuyingAssistantClick}
                          ref={focusBuyingAssistant}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={buyingAssistantConfirmed}
                      />
                    </Grid> */}

                    <OutlinedInput
                      placeholder="Provide Buying Assistant Email"
                      margin="dense"
                      value={buyingAssistant}
                      className={classes.inputFields}
                      onChange={handleBuyingAssistant}
                      ref={focusBuyingAssistant}
                    />

                    <Typography variant="subtitle2" color="primary">
                      {errBuyerAssisant && (
                        <span className={classes.errorMessageColor}>
                          {buyingAssistentError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Merchandiser
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    {/* <select
                                        value={merchandiser}
                                        onChange={(e: any) => setMerchandiser(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Merchandiser ---
                                        </option>
                                        {
                                            Merchandisers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}
                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={merchandiser}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleMerchandiser}
                          placeholder="Search Merchandiser"
                          onClick={handleMerchandiserClick}
                          ref={focusMerchandiser}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign confirmValue={merchandiserConfirmed} />
                    </Grid> */}

                    <OutlinedInput
                      placeholder="Provide Merchandiser Email"
                      margin="dense"
                      value={merchandiser}
                      className={classes.inputFields}
                      onChange={handleMerchandiser}
                      ref={focusMerchandiser}
                    />

                    <Typography variant="subtitle2" color="primary">
                      {errMerchandiser && (
                        <span className={classes.errorMessageColor}>
                          {merchandiserError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Supply Chain Specialist
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    {/* <select
                                        value={supplyChainSpecialist}
                                        onChange={(e: any) => setSupplyChainSpecialist(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Supply Chain Specialist ---
                                        </option>
                                        {
                                            SupplyChainSpecialists.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}
                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={supplyChainSpecialist}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleSupplyChainSpecialist}
                          placeholder="Search Supply Chain Specialist"
                          onClick={handleSupplyChainSpecialistClick}
                          ref={focusSupplyChainSpecialist}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={supplyChainSpecialistConfirmed}
                      />
                    </Grid> */}

                    <OutlinedInput
                      placeholder="Provide Supply Chain Specialist Email"
                      margin="dense"
                      value={supplyChainSpecialist}
                      className={classes.inputFields}
                      onChange={handleSupplyChainSpecialist}
                      ref={focusSupplyChainSpecialist}
                    />

                    <Typography variant="subtitle2" color="primary">
                      {errSupplyChainSpecialist && (
                        <span className={classes.errorMessageColor}>
                          {supChainSpecialistError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Own Brand Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    {/* <select
                                        value={ownBrandManager}
                                        onChange={(e: any) => setOwnBrandManager(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            --- Select Own Brand Manager ---
                                        </option>
                                        {
                                            OwnBrandManagers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}
                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={ownBrandManager}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleOwnBrandManager}
                          placeholder="Search Own Brand Manager"
                          onClick={handleOwnBrandManagerClick}
                          ref={focusOwnBrandManager}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={ownBrandManagerConfirmed}
                      />
                    </Grid> */}

                    <OutlinedInput
                      placeholder="Provide Own Brand Manager Email"
                      margin="dense"
                      value={ownBrandManager}
                      className={classes.inputFields}
                      onChange={handleOwnBrandManager}
                      ref={focusOwnBrandManager}
                    />

                    <Typography variant="subtitle2" color="primary">
                      {errOwnBrandManager && (
                        <span className={classes.errorMessageColor}>
                          {ownBrandManagerError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      Range Reset Manager
                      {requiredStar}
                    </Typography>
                  </Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    {/* <select
                                        value={rangeResetManager}
                                        onChange={(e: any) => setRangeResetManager(e.target.value)}
                                        className={classes.selectField}
                                        defaultValue=""
                                        ref={focusBuyer}
                                    >
                                        <option value="" disabled>
                                            --- Select Range Reset Manager ---
                                        </option>
                                        {
                                            RangeResetManagers.map((b: any) => {
                                                return (<option key={b.value} value={b.value}>{b.label}</option>)
                                            })
                                        }
                                    </select> */}
                    {/* <Grid item xl={11} lg={11} md={11} sm={10} xs={10}>
                      <Typography variant="subtitle2" color="primary">
                        <SearchSelect
                          value={rangeResetManager}
                          // onChange={(e: any) => console.log(e.target.value)}
                          onChange={handleRangeResetManager}
                          placeholder="Search Range Reset Manager"
                          onClick={handleRangeResetManagerClick}
                          ref={focusRangeRestManager}
                        />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={2}
                      xs={2}
                      style={{ textAlign: 'center' }}
                    >
                      <ConfirmCheckSign
                        confirmValue={rangeResetManagerConfirmed}
                      />
                    </Grid> */}

                    <OutlinedInput
                      placeholder="Provide Range Reset Manager Email"
                      margin="dense"
                      value={rangeResetManager}
                      className={classes.inputFields}
                      onChange={handleRangeResetManager}
                      ref={focusRangeRestManager}
                    />

                    <Typography variant="subtitle2" color="primary">
                      {errRangeResetManager && (
                        <span className={classes.errorMessageColor}>
                          {rangeResetManagerError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Grid item xl={5} lg={5} md={5} sm={5} xs={12}></Grid>

                  <Grid item container xl={7} lg={7} md={7} sm={7} xs={12}>
                    <Typography variant="subtitle2" color="primary">
                      {errCamunda && (
                        <span className={classes.errorMessageColor}>
                          {camundaError1}
                        </span>
                      )}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  spacing={2}
                  style={{
                    textAlign: 'center',
                    paddingTop: '20px',
                    // justifyContent:"right"
                  }}
                >
                  <Grid
                    container
                    item
                    xl={7}
                    lg={7}
                    md={5}
                    sm={1}
                    xs={12}
                  ></Grid>
                  <Grid
                    container
                    item
                    xl={5}
                    lg={5}
                    md={7}
                    sm={11}
                    xs={12}
                    spacing={2}
                  >
                    <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        onClick={handleSaveAfterDialog}
                        size="small"
                        disabled={disableSave}
                      >
                        Create Event
                      </Button>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={5} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        size="small"
                        onClick={handlePublishAfterDialog}
                        disabled={disableSave}
                      >
                        {buttonText}
                      </Button>
                    </Grid>
                    {/* <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttons}
                        onClick={handleCreateAfterDialog}
                        size="small"
                        disabled={disableCreate}
                      >
                        Create Event
                      </Button>
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </form>
        </Grid>
        <LoadingComponent showLoader={isProgressLoader} />
      </div>
    </Box>
  )

  return (
    <>
      <Prompt
        when={isPageModified && isSuccessCall}
        //when={isPageModified}
        message={allMessages.success.promptMessage}
      />
      <Toast
        ref={toast}
        position="bottom-left"
        // onRemove={() => {
        //   history.push(`${DEFAULT}${RANGEAMEND_MANAGE}`)
        // }}
        onRemove={handleToaster}
      />
      <Paper className={classes.root} elevation={0}>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="center"
          className={classes.text}
        >
          {/* <Grid item lg={9} xl={9} md={10} sm={12} xs={12}> */}
          {createEventForm}
          {classDialog}
          {viewConfirmSave}
          {viewConfirmBack}
          {viewConfirmCreate}
          {viewConfirmPublish}
          {/* </Grid> */}
        </Grid>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userDetail: state.loginReducer.userDetail,
    fileData: state.fileReducer.fileData,
    fileErrorData: state.fileReducer.fileErrorData,
  }
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    setFile: (fileData: any) => dispatch(setFile(fileData)),
    resetFile: () => dispatch(resetFile()),
    setErrorFile: (fileData: any) => dispatch(setErrorFile(fileData)),
    resetErrorFile: () => dispatch(resetErrorFile()),
    setTaskFile: (fileData: any) => dispatch(setTaskFile(fileData)),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(CreateEvent)
