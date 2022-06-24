import {
  Box,
  Dialog,
  Grid,
  Typography,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
  Checkbox,
  Tooltip,
  Radio,
  Select,
  OutlinedInput,
  MenuItem,
  withStyles,
} from '@material-ui/core'
import { red, teal } from '@material-ui/core/colors'
import { styled } from '@material-ui/styles'
import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import { Link, useHistory } from 'react-router-dom'
import {
  confirmedTableCols,
  eventUploadTableCols,
  Buyers,
  CategoryDirectors,
  Merchandisers,
  SupplyChainSpecialists,
  resetTypes,
  statusOptions,
  tableCols,
} from './DataConstants'

import ErrorIcon from '@material-ui/icons/Error'
import {
  setFile,
  resetFile,
  setErrorFile,
  setTaskFile,
} from '../../../redux/Actions/FileUpload'
import { connect } from 'react-redux'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
  ConfirmedBodyStyle,
  ConfirmedHeaderStyle,
  PreviewBodyStyle,
  PreviewHeaderStyle,
  useStyles,
} from './styles'
import DialogHeader from '../../components/DialogHeader/DialogHeader'
import { routes, life } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import {
  getProductHierarchyListAPI,
  getUsersAPIByRole,
  // getUsersAPIByEmailAndRole,
  getRangeResetEvents,
  patchRangeResetEvents,
  deleteRangeResets,
  patchUpdateRangeResets,
  getEventDetailsById,
  publishEventsCamunda,
  claimEventsCamunda,
  deleteEventsCamunda,
} from '../../../api/Fetch'
import AutocompleteSelect from '../../components/AutoCompleteSelect/AutocompleteSelect'
import { bulkUploadFileType } from '../../../util/Constants'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import { Toast } from 'primereact/toast'
import LightTooltip from '../../components/LightToolTip/LightTooltip'
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'

const Input = styled('input')({
  display: 'none',
})

// const LightTooltip = withStyles((theme) => ({
//   tooltip: {
//     backgroundColor: theme.palette.common.white,
//     color: 'rgba(0, 0, 0, 0.87)',
//     boxShadow: theme.shadows[1],
//     fontSize: 11,
//   },
// }))(Tooltip)

function ManageTaskEvent(props: any) {
  const {
    userDetail,
    setFile,
    resetFile,
    setErrorFile,
    setTaskFile,
    fileData,
  } = props

  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const aboveMd = useMediaQuery(theme.breakpoints.up('md'))
  const betweenSmAndMd = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const above670px = useMediaQuery(theme.breakpoints.up(670))
  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [openAdvancedSearchDialog, setOpenAdvancedSearchDialog] =
    useState(false)
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [fileName, setFileName] = useState<any>()
  const [importedData, setImportedData] = useState<any>([])
  const [importedFormData, setImportedFormData] = useState<any>([])
  const [confirmedRows, setConfirmedRows] = useState<any>([])
  const [fetchRangeResets, setFetchRangeResets] = useState<any>([])
  const [filteredImportedData, setFilteredImportedData] = useState<any>()
  const [selectedImportedData, setSelectedImportedData] = useState<any>([])
  const [selectedEvents, setSelectedEvents] = useState<any>([])
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false)
  const [importedCols, setImportedCols] = useState<any>()
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [confirmTable, setConfirmtable] = useState(false)
  const [fileError, setFileError] = useState('')

  // const [buyerValid, setBuyerValid] = useState<any>(null)
  // const [categoryDirectorValid, setCategoryDirectorValid] = useState<any>(null)
  // const [seniorBuyingManagerValid, setSeniorBuyingManagerValid] =
  //   useState<any>(null)
  // const [buyingAssistantValid, setBuyingAssistantValid] = useState<any>(null)
  // const [merchandiserValid, setMerchandiserValid] = useState<any>(null)
  // const [supplyChainValid, setSupplyChainValid] = useState<any>(null)
  // const [ownBrandManagerValid, setOwnBrandManagerValid] = useState<any>(null)
  // const [rangeResetManagerValid, setRangeResetManagerValid] =
  //   useState<any>(null)

  // const [buyerColumns, setBuyerColumns] = useState<any>([])
  // const [categoryDirectorColumns, setCategoryDirectorColumns] = useState<any>(
  //   []
  // )
  // const [seniorBuyingManagerColumns, setSeniorBuyingManagerColumns] =
  //   useState<any>([])
  // const [merchandiserColumns, setMerchandiserColumns] = useState<any>([])
  // const [buyingAssistantColumns, setBuyingAssistantColumns] = useState<any>([])
  // const [supplyChainColumns, setSupplyChainColumns] = useState<any>([])
  // const [ownBrandManagerColumns, setOwnBrandManagerColumns] = useState<any>([])
  // const [rangeResetManagerColumns, setRangeResetManagerColumns] = useState<any>(
  //   []
  // )

  const [resetType, setResetType] = useState<any>('')
  const [productHierValues, setProductHierValues] = useState<any>([])
  const [status, setStatus] = useState<any>('')
  const [eventStatus, setEventStatus] = useState<any>('')
  const [group, setGroup] = useState<any>('')
  const [category, setCategory] = useState<any>('')
  const [department, setDepartment] = useState<any>('')
  const [launchType, setLaunchType] = useState<any>('')
  const [launchDateFrom, setLaunchDateFrom] = useState<any>('')
  const [launchDateTo, setLaunchDateTo] = useState<any>('')
  const [launchWeekFrom, setLaunchWeekFrom] = useState<any>('')
  const [launchWeekTo, setLaunchWeekTo] = useState<any>('')
  const [categoryDirector, setCategoryDirector] = useState<any>('')
  const [buyer, setBuyer] = useState<any>('')
  const [merchandiser, setMerchandiser] = useState<any>('')
  const [supplyChainSpecialist, setSupplyChainSpecialist] = useState<any>('')
  const [clearancePriceApplied, setClearancePriceApplied] = useState(true)
  const [orderStopDateCheck, setOrderStopDateCheck] = useState(true)
  const [stopOrder, setStopOrder] = useState(true)
  const [searchParams, setSearchParams] = useState<any>({
    resetType: '',
    eventStatus: '',
    launchDateFrom: '',
    launchDateTo: '',
    tradeGroup: '',
    category: '',
    department: '',
    categoryDirector: '',
    buyer: '',
    merchandiser: '',
    supplyChainAnalyst: '',
    clearancePriceCheck: 'Y',
    orderStopDateCheck: 'Y',
    stopOrder: 'Y',
  })

  const {
    DEFAULT,
    RANGEAMEND_CREATE,
    RANGEAMEND_MANAGE_TASK,
    RANGEAMEND_EVENTDASH,
  } = routes

  const [groupOptions, setGroupOptions] = useState<any>([])
  const [categoryOptions, setCategoryOptions] = useState<any>([])
  const [departmentOptions, setDepartmentOptions] = useState<any>([])
  const [merchandiserOptions, setMerchandiserOptions] = useState<any>([])
  const [supplyChainOptions, setSupplyChainOptions] = useState<any>([])
  const [categoryDirectorOptions, setCategoryDirectorOptions] = useState<any>(
    []
  )
  const [buyerOptions, setBuyerOptions] = useState<any>([])

  const toast = useRef<any>(null)

  const [isSuccessCall, setIsSuccessCall] = React.useState(true)
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  const [toastRemove, setToastRemove] = React.useState('')

  const [checkCount, setCheckCount] = React.useState(1)
  const [failureCount, setFailureCount] = React.useState(0)
  const [cancelOpenDelete, setCancelOpenDelete] = useState(false)
  const [cancelOpenCross, setCancelOpenCross] = useState(false)

  const [checkCount1, setCheckCount1] = React.useState(1)
  const [failureCount1, setFailureCount1] = React.useState(0)
  const [disablePublish, setDisablePublish] = useState(false)
  const [disableDelete, setDisableDelete] = useState(false)
  const [invalidFile, setInvalidFile] = useState(false)
  const [invalidFormat, setInvalidFormat] = useState(false)

  useEffect(() => {
    console.log(selectedEvents)
  }, [selectedEvents])

  const getAllTheEvents = () => {
    setIsProgressLoader(true)
    // const createdBy = 'system'
    localStorage.setItem('_errorCounter', JSON.stringify({ count: 0 }))
    getRangeResetEvents(userDetail && userDetail.userdetails[0].user.userId)
      .then((res: any) => {
        console.log(res.data)
        if (res.data.length > 0) {
          const data = res.data
            // .filter((d: any) => d.status.toLowerCase() != 'cancelled')
            .map((d: any) => {
              return {
                name: d.name,
                id: d.id,
                resetType: d.resetType,
                appDueDate: d.appDueDate,
                tradeGroup: d.tradeGroup,
                category: d.category,
                categoryId: d.categoryId,
                department: d.department,
                departmentId: d.departmentId,
                targetDate: d.targetDate,
                planogramClass: d.planogramClass,
                planogramClassString:
                  d.planogramClass && d.planogramClass.className
                    ? d.planogramClass.className.toString()
                    : '',
                wastageRange: d.wastageRange,
                wastageRangeText: d.wastageRangeText,
                buyer: d.buyer,
                buyerId: d.buyerId,
                buyerEmailId: d.buyerEmailId,
                categoryDirector: d.categoryDirector,
                categoryDirectorId: d.categoryDirectorId,
                categoryDirectorEmailId: d.categoryDirectorEmailId,
                seniorBuyingManager: d.seniorBuyingManager,
                seniorBuyingManagerId: d.seniorBuyingManagerId,
                seniorBuyingManagerEmailId: d.seniorBuyingManagerEmailId,
                buyerAssistant: d.buyerAssistant,
                buyerAssistantId: d.buyerAssistantId,
                buyerAssistantEmailId: d.buyerAssistantEmailId,
                merchandiser: d.merchandiser,
                merchandiserId: d.merchandiserId,
                merchandiserEmailId: d.merchandiserEmailId,
                supplyChainAnalyst: d.supplyChainAnalyst,
                supplyChainAnalystId: d.supplyChainAnalystId,
                supplyChainAnalystEmailId: d.supplyChainAnalystEmailId,
                ownBrandManager: d.ownBrandManager,
                ownBrandManagerId: d.ownBrandManagerId,
                ownBrandManagerEmailId: d.ownBrandManagerEmailId,
                rangeResetManager: d.rangeResetManager,
                rangeResetManagerId: d.rangeResetManagerId,
                rangeResetManagerEmailId: d.rangeResetManagerEmailId,

                // eventId: d['Event ID'],
                // name: 'string',
                // eventName: eventName(),
                eventStatus: d.eventStatus,
                status: d.status,
                clearancePriceCheck: d.clearancePriceCheck,
                orderStopDateCheck: d.orderStopDateCheck,
                stopOrder: d.stopOrder,
              }
            })
          console.log(data)

          // for (var i = 0; i < data.length; i++) {
          //   console.log(data[i])
          //   let payload = {
          //     requests: [
          //       {
          //         submitType: 'new',
          //         eventId: data[i].id,
          //         eventStatus: data[i].status,
          //         requester: {
          //           persona: 'Range Reset Manager',
          //           details: {
          //             emailId:
          //               userDetail && userDetail.userdetails[0].user.emailId,
          //             userId:
          //               userDetail && userDetail.userdetails[0].user.userId,
          //             name:
          //               userDetail &&
          //               userDetail.userdetails[0].user.middleName &&
          //               userDetail.userdetails[0].user.middleName != ''
          //                 ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
          //                 : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
          //           },
          //           roles: [
          //             {
          //               // "roleId": userDetail && userDetail.userdetails[0].roles[0].roleId
          //               roleId: 'RRMNGR',
          //             },
          //           ],
          //           usergroups:
          //             userDetail &&
          //             userDetail.userdetails[0].usergroups.map((group: any) => {
          //               return {
          //                 groupId: group.groupId,
          //                 status: group.status,
          //               }
          //             }),
          //           // [
          //           //   {
          //           //     groupId:
          //           //       userDetail &&
          //           //       userDetail.userdetails[0].userGroups.groupId,
          //           //     status:
          //           //       userDetail &&
          //           //       userDetail.userdetails[0].userGroups.status,
          //           //   },
          //           // ],
          //         },
          //         eventHeader: {
          //           resetType: data[i].resetType,
          //           rafAppDueDate: data[i].appDueDate,
          //           eventLaunchDate: data[i].targetDate,
          //           eventName: data[i].name,
          //           eventHierarchy: {
          //             tradingGroup: data[i].tradeGroup,
          //             category: data[i].category,
          //             department: data[i].department,
          //           },
          //           inventoryControl: {
          //             planogramClass: data[i].planogramClass
          //               ? data[i].planogramClass.className
          //               : null,
          //             clearancePriceApplied: data[i].clearancePriceCheck
          //               ? data[i].clearancePriceCheck
          //               : 'Y',
          //             orderStopDateCheckRequired: data[i].orderStopDateCheck
          //               ? data[i].orderStopDateCheck
          //               : 'Y',
          //             stopOrderStockRundown: data[i].stopOrder
          //               ? data[i].stopOrder
          //               : 'Y',
          //             storeWastetiming: data[i].wastageRange,
          //           },
          //           eventTeam: {
          //             team: [
          //               {
          //                 persona: 'Buyer',
          //                 details: {
          //                   emailId: data[i].buyerEmailId,
          //                   userId: data[i].buyerId,
          //                   name: data[i].buyer,
          //                 },
          //               },
          //               {
          //                 persona: 'Category Director',
          //                 details: {
          //                   emailId: data[i].categoryDirectorEmailId,
          //                   userId: data[i].categoryDirectorId,
          //                   name: data[i].categoryDirector,
          //                 },
          //               },
          //               {
          //                 persona: 'Senior Buying Manager',
          //                 details: {
          //                   emailId: data[i].seniorBuyingManagerEmailId,
          //                   userId: data[i].seniorBuyingManagerId,
          //                   name: data[i].seniorBuyingManager,
          //                 },
          //               },
          //               {
          //                 persona: 'Buying Assistant',
          //                 details: {
          //                   emailId: data[i].buyerAssistantEmailId,
          //                   userId: data[i].buyerAssistantId,
          //                   name: data[i].buyerAssistant,
          //                 },
          //               },
          //               {
          //                 persona: 'Merchandiser',
          //                 details: {
          //                   emailId: data[i].merchandiserEmailId,
          //                   userId: data[i].merchandiserId,
          //                   name: data[i].merchandiser,
          //                 },
          //               },
          //               {
          //                 persona: 'Supply Chain Specialist',
          //                 details: {
          //                   emailId: data[i].supplyChainAnalystEmailId,
          //                   userId: data[i].supplyChainAnalystId,
          //                   name: data[i].supplyChainAnalyst,
          //                 },
          //               },
          //               {
          //                 persona: 'Own Brand Manager',
          //                 details: {
          //                   emailId: data[i].ownBrandManagerEmailId,
          //                   userId: data[i].ownBrandManagerId,
          //                   name: data[i].ownBrandManager,
          //                 },
          //               },
          //               {
          //                 persona: 'Range Reset Manager',
          //                 details: {
          //                   emailId: data[i].rangeResetManagerEmailId,
          //                   userId: data[i].rangeResetManagerId,
          //                   name: data[i].rangeResetManager,
          //                 },
          //               },
          //             ],
          //           },
          //         },
          //       },
          //     ],
          //   }
          //   console.log(payload)
          // }

          setFetchRangeResets(data)
          if (fileData.length < 1) {
            setFile(data)
          } else {
            let errorData: any = []

            fileData.map((item: any) => {
              if (
                !(
                  item.status.toLowerCase() === 'draft' ||
                  item.status.toLowerCase() === 'confirmed' ||
                  item.status.toLowerCase() === 'published' ||
                  item.status.toLowerCase() === 'cancelled'
                )
              ) {
                errorData.push(item)
              }
            })
            console.log(errorData)
            setFile([...errorData, ...data])
          }
          setConfirmtable(true)
          setIsProgressLoader(false)
        }
        // else {
        //   if (fileData > 0) {
        //     setConfirmtable(true)
        //   } else {
        //     setConfirmtable(false)
        //   }
        // }
      })
      .catch((err: any) => {
        console.log(err)
        if (fileData.length > 0) {
          setFetchRangeResets(fileData)
          setConfirmtable(true)
        }

        console.log(fileData)
        setIsProgressLoader(false)
      })
  }

  useEffect(() => {
    getAllTheEvents()
  }, [])

  useEffect(() => {
    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('department')
        .then((res: any) => {
          const hierarchyList = res.data.hierarchyNode.map((item: any) => {
            return {
              groupId: item.group,
              groupName: item.groupName,
              categoryId: item.category,
              categoryName: item.categoryName,
              departmentId: item.department,
              departmentName: item.departmentName,
            }
          })
          setProductHierValues(hierarchyList)
          console.log(hierarchyList)
        })
        .catch((err: any) => setProductHierValues([]))
  }, [])

  useEffect(() => {
    if (productHierValues) {
      let data: any = []
      productHierValues.map((item: any) => {
        if (!data) {
          data.push({
            value: item.groupName,
            label: item.groupName,
            groupId: item.groupId,
          })
        } else if (
          data.findIndex((d: any) => d.groupId === item.groupId) === -1
        ) {
          data.push({
            value: item.groupName,
            label: item.groupName,
            groupId: item.groupId,
          })
        }
      })
      console.log(data)
      setGroupOptions(data)
    }
  }, [productHierValues])

  useEffect(() => {
    if (group) {
      let data: any = []
      productHierValues.map((item: any) => {
        if (
          data.findIndex((d: any) => d.categoryId === item.categoryId) === -1
        ) {
          if (item.groupId === group.groupId) {
            data.push({
              value: item.categoryName,
              label: item.categoryName,
              categoryId: item.categoryId,
            })
          }
        }
      })
      console.log(data)
      setCategoryOptions(data)
    }
  }, [group])

  useEffect(() => {
    if (category) {
      let data: any = []
      productHierValues.map((item: any) => {
        if (
          data.findIndex((d: any) => d.departmentId === item.departmentId) ===
          -1
        ) {
          if (item.categoryId === category.categoryId) {
            data.push({
              value: item.departmentName,
              label: item.departmentName,
              departmentId: item.departmentId,
            })
          }
        }
      })
      console.log(data)
      setDepartmentOptions(data)
    }
  }, [category])

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

  //         group &&
  //           setCategoryOptions(
  //             categoryList.filter((cat: any) => cat.groupId === group.id)
  //           )
  //         group &&
  //           console.log(
  //             'category length: ',
  //             categoryList.filter((cat: any) => cat.groupId === group.id)
  //           )
  //       })
  //       .catch((err: any) => setCategoryOptions([]))
  // }, [group])

  // useEffect(() => {
  //   if (group && category) {
  //     getProductHierarchyListAPI &&
  //       getProductHierarchyListAPI('department')
  //         .then((res: any) => {
  //           const depList = res.data.hierarchyNode.map((item: any) => {
  //             return {
  //               value: item.departmentName,
  //               label: item.departmentName,
  //               id: item.department,
  //               hierGroup: 'department',
  //               groupName: item.groupName,
  //               categoryName: item.categoryName,
  //               groupId: item.group,
  //               categoryId: item.category,
  //             }
  //           })
  //           setDepartmentOptions(
  //             depList.filter(
  //               (dep: any) =>
  //                 dep.groupId === group.id && dep.categoryId === category.id
  //             )
  //           )
  //           console.log(
  //             'department length: ',
  //             depList.filter(
  //               (dep: any) =>
  //                 dep.groupId === group.id && dep.categoryId === category.id
  //             )
  //           )
  //           // setLoaded(true)
  //         })
  //         .catch((err: any) => {
  //           setDepartmentOptions([])
  //           // setLoaded(true)
  //         })
  //   }
  // }, [category])

  useEffect(() => {
    let roleId = 'BUYER'
    getUsersAPIByRole &&
      getUsersAPIByRole(roleId)
        .then((res) => {
          const buyerValues = res.data.userdetails.map((item: any) => {
            return {
              value: item.user.emailId,
              label:
                item.user.middleName && item.user.middleName != ''
                  ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName} - ${item.user.emailId}`
                  : `${item.user.firstName} ${item.user.lastName} - ${item.user.emailId}`,
              // item.user.middleName
              //   ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName}`
              //   : `${item.user.firstName} ${item.user.lastName}`,
            }
          })
          setBuyerOptions(buyerValues)
          console.log(buyerValues)
        })
        .catch((err) => {
          console.log('error')
        })
  }, [])

  useEffect(() => {
    let roleId = 'CTDIR'
    getUsersAPIByRole &&
      getUsersAPIByRole(roleId)
        .then((res) => {
          const categoryDirectorValues = res.data.userdetails.map(
            (item: any) => {
              return {
                value: item.user.emailId,
                label:
                  item.user.middleName && item.user.middleName != ''
                    ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName} - ${item.user.emailId}`
                    : `${item.user.firstName} ${item.user.lastName} - ${item.user.emailId}`,
                // item.user.middleName
                //   ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName}`
                //   : `${item.user.firstName} ${item.user.lastName}`,
              }
            }
          )
          setCategoryDirectorOptions(categoryDirectorValues)
          console.log(categoryDirectorValues)
        })
        .catch((err) => {
          console.log('error')
        })
  }, [])

  useEffect(() => {
    let roleId = 'MERCH'
    getUsersAPIByRole &&
      getUsersAPIByRole(roleId)
        .then((res) => {
          const merchandiserValues = res.data.userdetails.map((item: any) => {
            return {
              value: item.user.emailId,
              label:
                item.user.middleName && item.user.middleName != ''
                  ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName} - ${item.user.emailId}`
                  : `${item.user.firstName} ${item.user.lastName} - ${item.user.emailId}`,
              // item.user.middleName
              //   ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName}`
              //   : `${item.user.firstName} ${item.user.lastName}`,
            }
          })
          setMerchandiserOptions(merchandiserValues)
          console.log(merchandiserValues)
        })
        .catch((err) => {
          console.log('error')
        })
  }, [])

  useEffect(() => {
    let roleId = 'SCSPL'
    getUsersAPIByRole &&
      getUsersAPIByRole(roleId)
        .then((res) => {
          const supplyChainValues = res.data.userdetails.map((item: any) => {
            return {
              value: item.user.emailId,
              label:
                item.user.middleName && item.user.middleName != ''
                  ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName} - ${item.user.emailId}`
                  : `${item.user.firstName} ${item.user.lastName} - ${item.user.emailId}`,
              // item.user.middleName
              //   ? `${item.user.firstName} ${item.user.middleName} ${item.user.lastName}`
              //   : `${item.user.firstName} ${item.user.lastName}`,
            }
          })
          setSupplyChainOptions(supplyChainValues)
          console.log(supplyChainValues)
        })
        .catch((err) => {
          console.log('error')
        })
  }, [])

  const goBack = () => {
    setSelectedEvents([])
    history.goBack()
  }

  const handleCreateEvent = () => {
    setSelectedEvents([])
    history.push(`${DEFAULT}${RANGEAMEND_CREATE}`)
    setSelectedEvents([])
  }

  const excelDatetoDate = (eDate: any) => {
    if (!isNaN(eDate)) {
      let date1 = Math.round((eDate - (25568 + 1)) * 86400 * 1000)
      console.log(date1)
      if (!isNaN(date1)) {
        console.log(date1)
        let date = new Date(Math.round((eDate - (25568 + 1)) * 86400 * 1000))
          .toISOString()
          .split('T')[0]
        return date
      } else {
        console.log(null)
        return ''
      }
    } else {
      return ''
    }
  }

  const handleUploadDialogOpen = () => {
    setOpenUploadDialog(true)
    setImportedData([])
    fetchRangeResets.length > 0 && setConfirmtable(true)
  }
  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false)
    if (uploadedFile) {
      setFileName(uploadedFile.name)
      setUploadedFile(null)
    }
    // setConfirmtable(false)
  }

  const handleFileUpload = (event: any) => {
    setUploadedFile(event.target.files[0])
    // setConfirmtable(false)
  }

  const handlePreviewDialogOpen = () => {
    setOpenPreviewDialog(true)
  }
  const handlePreviewialogClose = () => {
    setImportedData([])
    setConfirmtable(false)
    setOpenPreviewDialog(false)
  }

  const handlePreviewDialogSave1 = () => {
    setConfirmtable(true)
    setOpenPreviewDialog(false)
    // setConfirmedRows(importedData && importedData)
    if (importedFormData && importedFormData.length > 0) {
      setIsProgressLoader(true)
      const formData = {
        rangeResets:
          importedFormData &&
          importedFormData.map((item: any) => {
            console.log(item)
            return {
              ...item,
              appDueDate: item.appDueDate
                ? `${item.appDueDate} 01:00:00.00`
                : null,
              targetDate: item.targetDate
                ? `${item.targetDate} 01:00:00.00`
                : null,
              fileName: fileName && fileName,
              createdById: userDetail && userDetail.userdetails[0].user.userId,
              createdByName:
                userDetail && userDetail.userdetails[0].user.emailId,
              // middleName &&
              // userDetail.userdetails[0].user.middleName != ''
              //   ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
              //   : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
            }
          }),
      }
      console.log(formData)
      patchRangeResetEvents(formData)
        .then((res: any) => {
          let data = res.data
          let successData: any = []
          let errorData: any = []
          console.log(data)

          for (var i = 0; i < data.length; i++) {
            if (
              data[i].status.toLowerCase() === 'draft' ||
              data[i].status.toLowerCase() === 'confirmed' ||
              data[i].status.toLowerCase() === 'published'
            ) {
              // successData.push({
              //   name: data[i].name,
              //   eventId: data[i].id,
              //   resetType: data[i].resetType,
              //   appDueDate: data[i].appDueDate,
              //   tradeGroup: data[i].tradeGroup,
              //   category: data[i].category,
              //   categoryId: data[i].categoryId,
              //   department: data[i].department,
              //   departmentId: data[i].departmentId,
              //   targetDate: data[i].targetDate,
              //   planogramClass: data[i].planogramClass,
              //   wastageRange: data[i].wastageRange,
              //   buyer: data[i].buyer,
              //   buyerId: data[i].buyerId,
              //   buyerEmailId: data[i].buyerEmailId,
              //   categoryDirector: data[i].categoryDirector,
              //   categoryDirectorId: data[i].categoryDirectorId,
              //   categoryDirectorEmailId: data[i].categoryDirectorEmailId,
              //   seniorBuyingManager: data[i].seniorBuyingManager,
              //   seniorBuyingManagerId: data[i].seniorBuyingManagerId,
              //   seniorBuyingManagerEmailId: data[i].seniorBuyingManagerEmailId,
              //   buyerAssistant: data[i].buyerAssistant,
              //   buyerAssistantId: data[i].buyerAssistantId,
              //   buyerAssistantEmailId: data[i].buyerAssistantEmailId,
              //   merchandiser: data[i].merchandiser,
              //   merchandiserId: data[i].merchandiserId,
              //   merchandiserEmailId: data[i].merchandiserEmailId,
              //   supplyChainAnalyst: data[i].supplyChainAnalyst,
              //   supplyChainAnalystId: data[i].supplyChainAnalystId,
              //   supplyChainAnalystEmailId: data[i].supplyChainAnalystEmailId,
              //   ownBrandManager: data[i].ownBrandManager,
              //   ownBrandManagerId: data[i].ownBrandManagerId,
              //   ownBrandManagerEmailId: data[i].ownBrandManagerEmailId,
              //   rangeResetManager: data[i].rangeResetManager,
              //   rangeResetManagerId: data[i].rangeResetManagerId,
              //   rangeResetManagerEmailId: data[i].rangeResetManagerEmailId,

              //   // eventId: d['Event ID'],
              //   // name: 'string',

              //   status: data[i].status,
              //   clearancePriceCheck: data[i].clearancePriceCheck,
              //   orderStopDateCheck: data[i].orderStopDateheck,
              //   stopOrder: data[i].stopOrder,
              // })
              successData.push(data[i])
            } else {
              // const errorArray: String = data[i].errorMessage.split(' , ')
              let errorCount = JSON.parse(
                localStorage.getItem('_errorCounter') || '{}'
              )
              let count = errorCount.count
              // console.log(errorArray)
              // errorData.push({
              //   name: data[i].name,
              //   eventId: data[i].id,
              //   resetType: data[i].resetType,
              //   appDueDate: data[i].appDueDate,
              //   tradeGroup: data[i].tradeGroup,
              //   category: data[i].category,
              //   categoryId: data[i].categoryId,
              //   department: data[i].department,
              //   departmentId: data[i].departmentId,
              //   targetDate: data[i].targetDate,
              //   planogramClass: data[i].planogramClass,
              //   wastageRange: data[i].wastageRange,
              //   buyer: data[i].buyer,
              //   buyerId: data[i].buyerId,
              //   buyerEmailId: data[i].buyerEmailId,
              //   categoryDirector: data[i].categoryDirector,
              //   categoryDirectorId: data[i].categoryDirectorId,
              //   categoryDirectorEmailId: data[i].categoryDirectorEmailId,
              //   seniorBuyingManager: data[i].seniorBuyingManager,
              //   seniorBuyingManagerId: data[i].seniorBuyingManagerId,
              //   seniorBuyingManagerEmailId: data[i].seniorBuyingManagerEmailId,
              //   buyerAssistant: data[i].buyerAssistant,
              //   buyerAssistantId: data[i].buyerAssistantId,
              //   buyerAssistantEmailId: data[i].buyerAssistantEmailId,
              //   merchandiser: data[i].merchandiser,
              //   merchandiserId: data[i].merchandiserId,
              //   merchandiserEmailId: data[i].merchandiserEmailId,
              //   supplyChainAnalyst: data[i].supplyChainAnalyst,
              //   supplyChainAnalystId: data[i].supplyChainAnalystId,
              //   supplyChainAnalystEmailId: data[i].supplyChainAnalystEmailId,
              //   ownBrandManager: data[i].ownBrandManager,
              //   ownBrandManagerId: data[i].ownBrandManagerId,
              //   ownBrandManagerEmailId: data[i].ownBrandManagerEmailId,
              //   rangeResetManager: data[i].rangeResetManager,
              //   rangeResetManagerId: data[i].rangeResetManagerId,
              //   rangeResetManagerEmailId: data[i].rangeResetManagerEmailId,

              //   // eventId: d['Event ID'],
              //   // name: 'string',

              //   status: errorType,
              //   errorArray: errorArray,
              //   errorId: count,
              //   // clearancePriceCheck: data[i].clearancePriceCheck,
              //   // orderStopDateCheck: data[i].orderStopDateheck,
              //   // stopOrder: data[i].stopOrder,
              // })
              errorData.push({ ...data[i], errorId: count })
              count = count + 1
              localStorage.setItem(
                '_errorCounter',
                JSON.stringify({ count: count })
              )
            }
          }

          console.log(errorData, successData)

          setFile([...errorData, ...successData, ...fetchRangeResets])
          setFetchRangeResets((prevState: any) => {
            return [...errorData, ...successData, ...prevState]
          })
          // setErrorFile(errorData)
          // setConfirmedRows(errorData)
          // setConfirmedRows(() => {
          //   return [...data, ...fetchRangeResets]
          // })
          setConfirmtable(true)
          setIsSuccessCall(false)
          setIsProgressLoader(false)
          console.log(res.data)
          toast.current.show({
            severity: 'success',
            summary: 'Success',
            // detail: `Event ${res.data[0].audit[0].action} at ${res.data[0].audit[0].at}`,
            detail: `${allMessages.success.bulkUploadSuccess}`,
            life: life,
            className: 'login-toast',
          })
        })
        .catch((err: any) => {
          setIsSuccessCall(false)
          setIsProgressLoader(false)
          // setDisabled(false)
          console.log(err)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            // detail: err.response.data.errorMessage,
            detail: `${allMessages.error.bulkUploadfailure}`,
            life: life,
            className: 'login-toast',
          })
        })
    }
  }

  const handleSearchDialogOpen = () => {
    setOpenAdvancedSearchDialog(true)
    // setFilteredImportedData(fileData && fileData)
  }
  const handleSearchDialogClose = () => {
    setOpenAdvancedSearchDialog(false)
  }

  const handleSingleEvent = (data: any) => {
    // console.log(data)

    // history.push({
    //   pathname: `${DEFAULT}${RANGEAMEND_MANAGE_TASK}`,
    //   search: `?event=${data['eventName']}`, // query string
    //   state: {
    //     // location state
    //     data: data,
    //   },
    // })

    if (
      data.status.toLowerCase() === 'draft' ||
      data.status.toLowerCase() === 'confirmed' ||
      data.status.toLowerCase() === 'published' ||
      data.status.toLowerCase() === 'cancelled'
    ) {
      console.log([data])
      // let singleRow = [data]
      // setFile(singleRow)
      setTaskFile(data)
      history.push(`${DEFAULT}${RANGEAMEND_MANAGE_TASK}`)
      setSelectedEvents([])
    } else if (data.status && data.status.toLowerCase() === 'duplicate') {
      alert('Duplicate Event')
    } else {
      // setErrorFile(data)
      setErrorFile(data)
      history.push(`${DEFAULT}${RANGEAMEND_CREATE}`)
      setSelectedEvents([])
    }
  }

  useEffect(() => {
    // console.log('Check count: ', checkCount)
    // console.log('Failure count: ', failureCount)
    let detail
    let severity
    if (checkCount1 === 0) {
      if (failureCount1 === 0) {
        //detail = allMessages.success.successDelete
        detail = allMessages.success.successPublish
        severity = 'success'
      } else if (failureCount1 > 0) {
        //detail = allMessages.error.errorDelete
        detail = `${failureCount1} ${allMessages.error.errorPublish}`
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
  }, [checkCount1, failureCount1])

  useEffect(() => {
    if (selectedEvents && selectedEvents.length > 0) {
      let deleteCount = 0
      let publishCount = 0
      for (let i = 0; i < selectedEvents.length; i++) {
        // if (
        //   selectedEvents &&
        //   (selectedEvents[i].status.toLowerCase() === 'draft' ||
        //     selectedEvents[i].status.toLowerCase() === 'published' ||
        //     selectedEvents[i].status.toLowerCase() === 'confirmed' ||
        //     selectedEvents[i].status.toLowerCase() === 'error')
        // ) {
        //   setDisableDelete(false)
        // }
        if (
          selectedEvents &&
          (selectedEvents[i].eventStatus || selectedEvents[i].status)
        ) {
          if (
            selectedEvents &&
            selectedEvents[i].eventStatus &&
            selectedEvents[i].eventStatus.toLowerCase() === 'cancelled'
          ) {
            // setDisableDelete(true)
            // setDisablePublish(true)
            // break
            deleteCount = deleteCount + 1
            publishCount = publishCount + 1
          }
          if (
            (selectedEvents[i].eventStatus &&
              selectedEvents[i].eventStatus.toLowerCase() === 'error') ||
            selectedEvents[i].status.toLowerCase().includes('duplicate')
          ) {
            // setDisablePublish(true)
            // break
            publishCount = publishCount + 1
          }

          if (
            selectedEvents[i].eventStatus &&
            selectedEvents[i].eventStatus.toLowerCase() === 'published'
          ) {
            // setDisablePublish(true)
            // break
            publishCount = publishCount + 1
            deleteCount = deleteCount + 1
          }

          if (
            selectedEvents[i].eventStatus &&
            selectedEvents[i].eventStatus.toLowerCase() === 'confirmed'
          ) {
            // setDisablePublish(true)
            // break
            publishCount = publishCount + 1
            deleteCount = deleteCount + 1
          }
        } else {
          deleteCount = deleteCount + 1
          publishCount = publishCount + 1
        }
      }
      console.log('Publishcount', publishCount)
      console.log('deletecount', deleteCount)
      if (publishCount > 0) {
        setDisablePublish(true)
      } else {
        setDisablePublish(false)
      }
      if (deleteCount > 0) {
        setDisableDelete(true)
      } else {
        setDisableDelete(false)
      }
    } else {
      setDisableDelete(false)
      setDisablePublish(false)
    }
  }, [selectedEvents])

  const handlePublish = () => {
    // history.push(`${DEFAULT}${RANGEAMEND_EVENTDASH}`)
    if (selectedEvents && selectedEvents.length > 0) {
      setToastRemove('publish')
      setIsProgressLoader(true)
      setFailureCount1(selectedEvents.length)
      setCheckCount1(selectedEvents.length)
      selectedEvents.map((event: any) => {
        if (event.status.toLowerCase() === 'draft') {
          getEventDetailsById(event.id)
            .then((res1: any) => {
              let getResponse = res1.data
              const formData2 = {
                requestorDetails: {
                  emailId: userDetail && userDetail.userdetails[0].user.emailId,
                  requestBy:
                    userDetail && userDetail.userdetails[0].user.userId,
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
                  // userDetail &&
                  // userDetail.userdetails[0].roles.map((role: any) => {
                  //   return {
                  //     roleId: role.roleId,
                  //   }
                  // }),
                  [
                    {
                      roleId:
                        getResponse.eventDetailsList[0].rangeEventRequest
                          .requester.persona,
                    },
                  ],
              }

              claimEventsCamunda(
                getResponse.eventDetailsList[0].rangeEventRequest.taskId,
                formData2
              )
                .then((res3: any) => {
                  console.log(res3)
                  let formData1 = {
                    reviewDecision: 'Confirmed',
                    requester:
                      getResponse.eventDetailsList[0].rangeEventRequest
                        .requester,
                    eventId: event.id,
                    // eventStatus: event.status,
                    eventStatus: 'Published',
                    eventHeader:
                      getResponse.eventDetailsList[0].rangeEventRequest
                        .eventHeader,
                    milestones: getResponse.eventDetailsList[0].milestones,
                    logging: {
                      comments: 'string',
                      updated: 'string',
                    },
                  }
                  console.log(formData1)
                  publishEventsCamunda(event.id, formData1)
                    .then((res2: any) => {
                      console.log(res2.data)
                      setFailureCount1((prevState) => prevState - 1)
                      setCheckCount1((prevState) => prevState - 1)
                      getAllTheEvents()
                    })
                    .catch((err2: any) => {
                      console.log(err2)
                      setCheckCount1((prevState) => prevState - 1)
                    })
                })
                .catch((err3: any) => {
                  console.log(err3)
                  setCheckCount1((prevState) => prevState - 1)
                })
            })
            .catch((err1: any) => {
              console.log(err1)
              setCheckCount1((prevState) => prevState - 1)
            })
        } else {
          setCheckCount1((prevState) => prevState - 1)
        }
      })
    }
    setSelectedEvents([])
  }

  const eventNameTemplate = (rowData: any) => {
    return (
      <button
        // className={classes.exploreButton}
        value={rowData.name}
        // onClick={handleNameClick}
        // style={{
        //   cursor: 'pointer',
        //   color: 'blue',
        //   border: 'none',
        //   backgroundColor: 'inherit',
        // }}
        disabled={rowData.status.toLowerCase().includes('duplicate')}
        className={classes.greenButtons}
        onClick={() => handleSingleEvent(rowData)}
      >
        {rowData.name}
      </button>
    )
  }

  const statusTemplate = (rowData: any) => {
    if (
      rowData.status &&
      (rowData.status.toLowerCase() === 'draft' ||
        rowData.status.toLowerCase() === 'confirmed' ||
        rowData.status.toLowerCase() === 'published')
    ) {
      return rowData.eventStatus
    } else if (
      rowData.status &&
      rowData.status.toLowerCase().includes('duplicate')
    ) {
      return (
        <div className={classes.errorDialog}>
          Error
          {/* <LightTooltip
            title={
              <React.Fragment>
                <div className={classes.errorTooltip}>
                  <Typography color="error" variant="body2">

                    {tooltripWord}
                  </Typography>
                </div>
              </React.Fragment>
            }
            arrow
            placement="right"
          >
            <ErrorIcon color="error" fontSize="small" />
          </LightTooltip> */}
          <LightTooltip
            title={rowData.status}
            position={'right'}
            icon={<ErrorIcon color="error" fontSize="small" />}
          />
        </div>
      )
    } else if (rowData.status && rowData.status.toLowerCase() == 'error') {
      // let errorArray = []
      // rowData.resetTypeError && errorArray.push(rowData.resetTypeError)
      // rowData.appDueDateError && errorArray.push(rowData.appDueDateError)
      // // rowData.buyerError&&errorArray.push(rowData.)
      // // rowData.buyerError&&errorArray.push(rowData.)
      // rowData.categoryError && errorArray.push(rowData.categoryError)
      // rowData.departmentError && errorArray.push(rowData.departmentError)
      // rowData.buyerError && errorArray.push(rowData.buyerError)
      // rowData.buyerAssistantError &&
      //   errorArray.push(rowData.buyerAssistantError)
      // rowData.categoryDirectorError &&
      //   errorArray.push(rowData.categoryDirectorError)
      // rowData.merchandiserError && errorArray.push(rowData.merchandiserError)
      // rowData.ownBrandManagerError &&
      //   errorArray.push(rowData.ownBrandManagerError)
      // rowData.rangeResetManagerError &&
      //   errorArray.push(rowData.rangeResetManagerError)
      // rowData.seniorBuyingManagerError &&
      //   errorArray.push(rowData.seniorBuyingManagerError)
      // rowData.supplyChainAnalystError &&
      //   errorArray.push(rowData.supplyChainAnalystError)
      // console.log('error values')
      const errorArray = rowData.errorMessage.split(',')
      console.log(errorArray)

      if (errorArray.length > 0) {
        return (
          <div className={classes.errorDialog}>
            Error
            {/* <LightTooltip
              title={
                <React.Fragment>
                  <div className={classes.errorTooltip}>
                    <Typography color="error" variant="body2">

                      {errorArray.map((item: any, index: any) => {
                        return (
                          <i key={index}>
                            {item}
                            <br />
                          </i>
                        )
                      })}
                    </Typography>
                  </div>
                </React.Fragment>
              }
              arrow
              placement="right"
            >
              <ErrorIcon color="error" fontSize="small" />
            </LightTooltip> */}
            <LightTooltip
              title={errorArray.map((item: any, index: any) => {
                return (
                  <i key={index}>
                    {item}
                    <br />
                  </i>
                )
              })}
              position={'right'}
              icon={<ErrorIcon color="error" fontSize="small" />}
            />
          </div>
        )
      } else {
        return (
          <div className={classes.errorDialog}>
            Error
            {/* <LightTooltip
              title={
                <React.Fragment>
                  <div className={classes.errorTooltip}>
                    <Typography color="error" variant="body2">
                      {rowData.status}
                    </Typography>
                  </div>
                </React.Fragment>
              }
              arrow
              placement="right"
            >
              <ErrorIcon color="error" fontSize="small" />
            </LightTooltip> */}
            <LightTooltip
              title={rowData.status}
              position={'right'}
              icon={<ErrorIcon color="error" fontSize="small" />}
            />
          </div>
        )
      }
    } else {
      return <>{rowData.eventStatus}</>
    }
  }

  // const statusTemplate = (rowData: any) => {
  //   if (
  //     rowData.status &&
  //     (rowData.status.toLowerCase() === 'draft' ||
  //       rowData.status.toLowerCase() === 'confirmed')
  //   ) {
  //     return rowData.status
  //   } else if (rowData.status && rowData.status.toLowerCase() === 'error') {
  //     // let errorArray = []
  //     // rowData.resetTypeError && errorArray.push(rowData.resetTypeError)
  //     // rowData.appDueDateError && errorArray.push(rowData.appDueDateError)
  //     // // rowData.buyerError&&errorArray.push(rowData.)
  //     // // rowData.buyerError&&errorArray.push(rowData.)
  //     // rowData.categoryError && errorArray.push(rowData.categoryError)
  //     // rowData.departmentError && errorArray.push(rowData.departmentError)
  //     // rowData.buyerError && errorArray.push(rowData.buyerError)
  //     // rowData.buyerAssistantError &&
  //     //   errorArray.push(rowData.buyerAssistantError)
  //     // rowData.categoryDirectorError &&
  //     //   errorArray.push(rowData.categoryDirectorError)
  //     // rowData.merchandiserError && errorArray.push(rowData.merchandiserError)
  //     // rowData.ownBrandManagerError &&
  //     //   errorArray.push(rowData.ownBrandManagerError)
  //     // rowData.rangeResetManagerError &&
  //     //   errorArray.push(rowData.rangeResetManagerError)
  //     // rowData.seniorBuyingManagerError &&
  //     //   errorArray.push(rowData.seniorBuyingManagerError)
  //     // rowData.supplyChainAnalystError &&
  //     //   errorArray.push(rowData.supplyChainAnalystError)
  //     // console.log('error values')
  //     const errorArray = rowData.errorMessage.split(',')
  //     console.log(errorArray)

  //     if (errorArray.length > 0) {
  //       return (
  //         <div className={classes.errorDialog}>
  //           Error
  //           <LightTooltip
  //             title={
  //               <React.Fragment>
  //                 <div className={classes.errorTooltip}>
  //                   <Typography color="error" variant="body2">
  //                     {/* {allMessages.error.rafDateError} */}

  //                     {errorArray.map((item: any, index: any) => {
  //                       return (
  //                         <i key={index}>
  //                           {item}
  //                           <br />
  //                         </i>
  //                       )
  //                     })}
  //                     {/* <i>{rowData.errorMessage}</i> */}
  //                   </Typography>
  //                 </div>
  //               </React.Fragment>
  //             }
  //             arrow
  //             placement="right"
  //           >
  //             <ErrorIcon color="error" fontSize="small" />
  //           </LightTooltip>
  //         </div>
  //       )
  //     } else {
  //       return (
  //         <div className={classes.errorDialog}>
  //           Error
  //           <LightTooltip
  //             title={
  //               <React.Fragment>
  //                 <div className={classes.errorTooltip}>
  //                   <Typography color="error" variant="body2">
  //                     {rowData.status}
  //                   </Typography>
  //                 </div>
  //               </React.Fragment>
  //             }
  //             arrow
  //             placement="right"
  //           >
  //             <ErrorIcon color="error" fontSize="small" />
  //           </LightTooltip>
  //         </div>
  //       )
  //     }
  //   } else {
  //     let tooltripWord = 'Duplicate'
  //     // console.log('duplicating...')
  //     return (
  //       <div className={classes.errorDialog}>
  //         Error
  //         <LightTooltip
  //           title={
  //             <React.Fragment>
  //               <div className={classes.errorTooltip}>
  //                 <Typography color="error" variant="body2">
  //                   {/* {allMessages.error.rafDateError} */}

  //                   {rowData.status}
  //                   {/* <i>{rowData.errorMessage}</i> */}
  //                 </Typography>
  //               </div>
  //             </React.Fragment>
  //           }
  //           arrow
  //           placement="right"
  //         >
  //           <ErrorIcon color="error" fontSize="small" />
  //         </LightTooltip>
  //       </div>
  //     )
  //   }
  // }

  const convertedAppDueDateTemplate = (rowData: any) => {
    if (rowData.appDueDate) {
      const date = new Date(rowData.appDueDate)
      const formattedDate = date
        .toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, '-')
      // if (rowData.status === 'Error') {
      //   return <div style={{ color: 'red' }}>{formattedDate}</div>
      // } else {
      return formattedDate
      // }
    } else {
      return 'NA'
    }
  }
  const convertedTargetDateTemplate = (rowData: any) => {
    if (rowData.targetDate) {
      const date = new Date(rowData.targetDate)
      const formattedDate = date
        .toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .replace(/ /g, '-')
      return formattedDate
    } else {
      return 'NA'
    }
  }

  const classTemplate = (rowData: any) => {
    if (
      rowData.planogramClass &&
      rowData['planogramClass']['className'].length > 0
    ) {
      var planogramClass = rowData['planogramClass']['className'].toString()
      return planogramClass
    } else {
      return 'NA'
    }
  }

  const classArray = (data: any) => {
    if (data) {
      console.log(data)
      let classes = data.split(',')
      let classValues = classes.map((val: any) => val.trim())
      // for (var i in classes) {
      //   classValues.push(classes[i].trim())
      // }
      return classValues
    } else {
      return null
    }
  }

  const checkYesOrNo = (value: any) => {
    if (value) {
      switch (value) {
        case 'Y':
        case 'y': {
          return 'Y'
        }
        case 'N':
        case 'n': {
          return 'N'
        }
        default:
          return 'Y'
      }
    }
  }

  const handleUpload = (event: any) => {
    event.preventDefault()
    setConfirmtable(false)
    // const fileSize = (uploadedFile.size / 1024 / 1024).toFixed(2)
    // console.log(fileSize)
    // const i = bulkUploadFileType.findIndex((type: any) => {
    //   return type === uploadedFile.type
    // })
    // console.log(i)
    // setFetchRangeResets([])
    if (
      uploadedFile &&
      // (uploadedFile.type === 'text/csv' ||
      //   uploadedFile.type === 'application/vnd.ms-excel' ||
      //   uploadedFile.type ===
      //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      bulkUploadFileType.findIndex((type: any) => {
        return type === uploadedFile.type
      }) != -1
      // &&
      // Number(fileSize) > 0.0
    ) {
      console.log(uploadedFile)
      import('xlsx').then((xlsx) => {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const wb = xlsx.read(event.target.result, { type: 'array' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = xlsx.utils.sheet_to_json(ws)
          console.log(data)

          const data1 = xlsx.utils.sheet_to_json(ws, { header: 1 })

          // Prepare DataTable
          const cols: any = data1[0]
          console.log(cols)
          console.log(tableCols)
          console.log(data1)

          // let _importedCols = cols.map((col: any) => ({ field: col, header: toCapitalize(col) }));
          // let _importedData = data.map((d: any) => {
          //     return cols.reduce((obj: any, c: any, i: any) => {
          //         obj[c] = d[i];
          //         return obj;
          //     }, {});
          // });

          let error = false
          if (cols.length > 0) {
            for (let i = 0; i < cols.length; i++) {
              if (cols[i].trim() !== tableCols[i]) {
                error = true
                console.log(cols[i], tableCols[i])
                break
              }
            }
            if (error === true) {
              // alert('Invalid Excel Headers')
              setInvalidFormat(true)
              setOpenPreviewDialog(false)
              setConfirmtable(true)
            } else {
              const newData = data.map((d: any) => {
                console.log(d)
                console.log(checkYesOrNo(d[cols[8]]))
                var converted_date1 = d[cols[6]]
                  ? excelDatetoDate(d[cols[6]]) !== ''
                    ? excelDatetoDate(d[cols[6]])?.toString()
                    : null
                  : null

                var converted_date3 = d[cols[1]]
                  ? excelDatetoDate(d[cols[1]]) !== ''
                    ? excelDatetoDate(d[cols[1]]).toString()
                    : null
                  : null

                var eventName = () => {
                  if (d[cols[4]] && converted_date1) {
                    var lDate = new Date(converted_date1)
                    console.log(lDate)
                    var name =
                      d[cols[4]].replace(/ /g, '_') +
                      '_' +
                      lDate.getDate() +
                      lDate.toLocaleString('default', { month: 'short' }) +
                      lDate.getFullYear()
                    console.log(name)
                    return name
                  } else {
                    return ''
                  }
                }

                // var buyerName = () => {
                //   var index = Buyers.findIndex((item) => item.email === d['Buyer'])
                //   return Buyers[index].value
                // }

                // var classArray = () => {
                //   console.log(d[7])
                //   let classes = d[7].split(',')
                //   let classValues = []
                //   for (var i in classes) {
                //     classValues.push(classes[i].trim())
                //   }
                //   return d[7]
                // }

                return {
                  resetType: d[cols[0]] ? d[cols[0]] : null,
                  appDueDate: converted_date3,
                  tradeGroup: d[cols[2]] ? d[cols[2]] : null,
                  category: d[cols[3]] ? d[cols[3]] : null,
                  // categoryId: 1,
                  department: d[cols[4]] ? d[cols[4]] : null,
                  // departmentId: 1,
                  name: d[cols[5]] ? d[cols[5]] : eventName(),
                  targetDate: converted_date1,
                  planogramClass: classArray(d[cols[7]])
                    ? {
                        className: classArray(d[cols[7]]),
                      }
                    : classArray(d[cols[7]]),
                  planogramClassString: d[cols[7]] ? d[cols[7]] : '',

                  clearancePriceCheck: d[cols[8]] ? d[cols[8]] : 'Y',
                  orderStopDateCheck: d[cols[9]] ? d[cols[9]] : 'Y',
                  stopOrder: d[cols[10]] ? d[cols[10]] : 'Y',

                  wastageRange: d[cols[11]] ? d[cols[11]] : 'Week +4 \\ +7',
                  buyerEmailId: d[cols[12]] ? d[cols[12]] : '',
                  categoryDirectorEmailId: d[cols[13]] ? d[cols[13]] : '',
                  seniorBuyingManagerEmailId: d[cols[14]] ? d[cols[14]] : '',
                  buyerAssistantEmailId: d[cols[15]] ? d[cols[15]] : '',
                  merchandiserEmailId: d[cols[16]] ? d[cols[16]] : '',
                  supplyChainAnalystEmailId: d[cols[17]] ? d[cols[17]] : '',
                  ownBrandManagerEmailId: d[cols[18]] ? d[cols[18]] : '',
                  rangeResetManagerEmailId: d[cols[19]] ? d[cols[19]] : '',

                  // eventId: d['Event ID'],
                  // name: 'string',
                  // eventName: eventName(),

                  // "status": d["Status"] ? d["Status"] : "Draft",
                }
              })
              console.log(newData)
              // let newData1 = {
              //   rangeResets: [...newData],
              // }
              // console.log(newData1)

              setImportedCols(eventUploadTableCols)
              setImportedData(newData)
              setImportedFormData(newData)
              handlePreviewDialogOpen()
            }
          } else {
            setConfirmtable(true)
            // alert('Invalid Excel Headers')
            setInvalidFormat(true)
          }
        }

        reader.readAsArrayBuffer(uploadedFile)
      })
      handleUploadDialogClose()
    } else {
      // alert('Upload correct file')
      setInvalidFile(true)
      setUploadedFile(null)
      setConfirmtable(true)
    }
  }

  const invalidFileDialog = (
    <ConfirmBox
      cancelOpen={invalidFile}
      handleProceed={() => setInvalidFile(false)}
      label1="Invalid File Format"
      label2="The file you uploaded is not an Excel file, Try again"
    />
  )

  const invalidFormatDialog = (
    <ConfirmBox
      cancelOpen={invalidFormat}
      handleProceed={() => setInvalidFormat(false)}
      label1="Invalid Excel Headers"
      label2="The table headers of uploaded file are invalid, Try again"
    />
  )

  useEffect(() => {
    console.log(importedData)
  }, [importedData])
  useEffect(() => {
    console.log(confirmedRows)
  }, [confirmedRows])

  useEffect(() => {
    console.log(importedFormData)
  }, [importedFormData])

  const removeTasks = () => {
    let _tasks = importedData.filter(
      (value: any) => !selectedImportedData.includes(value)
    )
    console.log(_tasks)
    setImportedData(_tasks)
    setImportedFormData(_tasks)
    setConfirmedRows(_tasks)
    setSelectedImportedData(null)
  }

  const viewConfirmDelete = (
    <ConfirmBox
      cancelOpen={cancelOpenDelete}
      handleCancel={() => setCancelOpenDelete(false)}
      handleProceed={removeTasks}
      label1="Confirm 'Delete'"
      label2="Are you sure you want to delete the selected record(s)?"
    />
  )

  useEffect(() => {
    // console.log('Check count: ', checkCount)
    console.log('going')
    let detail
    let severity
    setIsProgressLoader(true)
    if (checkCount === 0) {
      if (failureCount === 0) {
        detail = allMessages.success.successDelete
        severity = 'success'
      } else if (failureCount > 0) {
        detail = `${failureCount} ${allMessages.error.errorDelete}`
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
  }, [checkCount, failureCount])

  useEffect(() => {
    if (fetchRangeResets && fileData && fileData.length == 0) {
      setConfirmtable(false)
    }
  }, [fetchRangeResets])
  useEffect(() => {
    console.log(selectedEvents)
  }, [selectedEvents])
  useEffect(() => {
    console.log(`${checkCount} and ${failureCount}`)
  }, [checkCount, failureCount])

  const removeEvents = () => {
    console.log('starting')
    if (selectedEvents && selectedEvents.length > 0) {
      console.log(selectedEvents.length)
      setFailureCount(selectedEvents.length)
      setCheckCount(selectedEvents.length)

      // let deletingEvents: any = []
      selectedEvents.map((event: any) => {
        // if (
        //   event.eventStatus.toLowerCase() === 'published' &&
        //   (event.eventStatus.toLowerCase() !== 'error' ||
        //     event.eventStatus.toLowerCase() !== 'duplicate')
        // ) {
        //   // services delete endpoint

        //   // let formData = {
        //   //   status: 'Cancelled',
        //   //   items: [],
        //   // }
        //   // patchUpdateRangeResets(event.id, formData)
        //   //   .then((res: any) => {
        //   //     console.log(res)
        //   //     let _tasks = fetchRangeResets.filter(
        //   //       (value: any) => !selectedEvents.includes(value)
        //   //     )
        //   //     console.log(_tasks)
        //   //     setFailureCount((prevState) => prevState - 1)
        //   //     setCheckCount((prevState) => prevState - 1)
        //   //     setFetchRangeResets(_tasks)
        //   //     setFile(_tasks)
        //   //   })
        //   //   .catch((err: any) => {
        //   //     setCheckCount((prevState) => prevState - 1)
        //   //   })

        //   // camunda delete endpoint

        //   // deletingEvents.push({
        //   //   eventId: event.id,
        //   //   status: event.status,
        //   // })

        //   // let _tasks = fetchRangeResets.filter(
        //   //   (value: any) => !selectedEvents.includes(value)
        //   // )
        //   // console.log(_tasks)

        //   // setFailureCount((prevState) => prevState - 1)
        //   // setCheckCount((prevState) => prevState - 1)
        //   // setFetchRangeResets(_tasks)
        //   // setFile(_tasks)

        //   let formData = {
        //     requester: {
        //       persona:
        //         userDetail && userDetail.userdetails[0].roles[0].roleName,
        //       details: {
        //         emailId: userDetail && userDetail.userdetails[0].user.emailId,
        //         userId: userDetail && userDetail.userdetails[0].user.userId,
        //         name:
        //           userDetail &&
        //           userDetail.userdetails[0].user.middleName &&
        //           userDetail.userdetails[0].user.middleName != ''
        //             ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
        //             : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
        //       },
        //       roles:
        //         userDetail &&
        //         userDetail.userdetails[0].roles.map((role: any) => {
        //           return {
        //             roleId: role.roleId,
        //           }
        //         }),
        //       usergroups:
        //         userDetail &&
        //         userDetail.userdetails[0].usergroups.map((group: any) => {
        //           return {
        //             groupId: group.groupId,
        //             status: group.status,
        //           }
        //         }),
        //     },
        //     deleteEventRequests: [
        //       {
        //         eventId: event.id,
        //         status: event.eventStatus,
        //       },
        //     ],
        //     logging: {
        //       comments: 'string',
        //       updated: 'string',
        //     },
        //   }

        //   deleteEventsCamunda(formData)
        //     .then((res: any) => {
        //       console.log(res.data)
        //       if (res.data && res.data.eventAlert.eventId === null) {
        //         // setFetchRangeResets((prevState:any)=>{
        //         //   if(prevState.id===event.id){

        //         //   }
        //         // })

        //         let _tasks = fetchRangeResets.filter(
        //           (value: any) => !selectedEvents.includes(value)
        //         )
        //         console.log(_tasks)

        //         setFailureCount((prevState) => prevState - 1)
        //         setCheckCount((prevState) => prevState - 1)
        //         setFetchRangeResets(_tasks)
        //         setFile(_tasks)
        //       } else {
        //         setCheckCount((prevState) => prevState - 1)
        //       }

        //       // setIsProgressLoader(false)
        //     })
        //     .catch((err: any) => {
        //       console.log(err)
        //       setCheckCount((prevState) => prevState - 1)
        //       // setIsProgressLoader(false)
        //     })
        // } else
        if (event.eventStatus.toLowerCase() === 'draft') {
          getEventDetailsById(event.id)
            .then((res1: any) => {
              let getResponse = res1.data
              const formData2 = {
                requestorDetails: {
                  emailId: userDetail && userDetail.userdetails[0].user.emailId,
                  requestBy:
                    userDetail && userDetail.userdetails[0].user.userId,
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
                  // userDetail &&
                  // userDetail.userdetails[0].roles.map((role: any) => {
                  //   return {
                  //     roleId: role.roleId,
                  //   }
                  // }),
                  [
                    {
                      roleId:
                        getResponse.eventDetailsList[0].rangeEventRequest
                          .requester.persona,
                    },
                  ],
              }

              claimEventsCamunda(
                getResponse.eventDetailsList[0].rangeEventRequest.taskId,
                formData2
              )
                .then((res3: any) => {
                  console.log(res3)
                  let formData1 = {
                    reviewDecision: 'Cancel',
                    requester:
                      getResponse.eventDetailsList[0].rangeEventRequest
                        .requester,
                    eventId: event.id,
                    // eventStatus: event.status,
                    eventStatus: 'Draft',
                    eventHeader:
                      getResponse.eventDetailsList[0].rangeEventRequest
                        .eventHeader,
                    milestones: getResponse.eventDetailsList[0].milestones,
                    logging: {
                      comments: 'string',
                      updated: 'string',
                    },
                  }
                  console.log(formData1)
                  publishEventsCamunda(event.id, formData1)
                    .then((res2: any) => {
                      console.log(res2.data)
                      setFailureCount((prevState) => prevState - 1)
                      setCheckCount((prevState) => prevState - 1)
                      let _tasks = fetchRangeResets.filter(
                        (value: any) => !selectedEvents.includes(value)
                      )
                      console.log(_tasks)
                      setFetchRangeResets(_tasks)

                      setFile(_tasks)
                    })
                    .catch((err2: any) => {
                      console.log(err2)
                      setCheckCount((prevState) => prevState - 1)
                    })
                })
                .catch((err3: any) => {
                  console.log(err3)
                  setCheckCount((prevState) => prevState - 1)
                })
            })
            .catch((err1: any) => {
              console.log(err1)
              setCheckCount((prevState) => prevState - 1)
            })
        } else if (
          event.eventStatus.toLowerCase() === 'error' ||
          event.eventStatus.toLowerCase() === 'duplicate'
        ) {
          setFailureCount((prevState) => prevState - 1)
          setCheckCount((prevState) => prevState - 1)
          let _tasks = fetchRangeResets.filter(
            (value: any) => !selectedEvents.includes(value)
          )
          console.log(_tasks)
          setFetchRangeResets(_tasks)
          setFile(_tasks)
          setIsProgressLoader(false)
        }
      })

      // let formData = {
      //   requester: {
      //     persona: userDetail && userDetail.userdetails[0].roles[0].roleName,
      //     details: {
      //       emailId: userDetail && userDetail.userdetails[0].user.emailId,
      //       userId: userDetail && userDetail.userdetails[0].user.userId,
      //       name:
      //         userDetail &&
      //         userDetail.userdetails[0].user.middleName &&
      //         userDetail.userdetails[0].user.middleName != ''
      //           ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
      //           : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
      //     },
      //     roles:
      //       userDetail &&
      //       userDetail.userdetails[0].roles.map((role: any) => {
      //         return {
      //           roleId: role.roleId,
      //         }
      //       }),
      //     usergroups:
      //       userDetail &&
      //       userDetail.userdetails[0].usergroups.map((group: any) => {
      //         return {
      //           groupId: group.groupId,
      //           status: group.status,
      //         }
      //       }),
      //   },
      //   deleteEventRequests: deletingEvents,
      //   logging: {
      //     comments: 'string',
      //     updated: 'string',
      //   },
      // }

      // deleteEventsCamunda(formData)
      //   .then((res: any) => {
      //     console.log(res.data)
      //     setIsProgressLoader(false)
      //   })
      //   .catch((err: any) => {
      //     console.log(err)
      //     setIsProgressLoader(false)
      //   })
    }
    setSelectedEvents([])
    // if (fileData && fileData.length == 0) {
    //   setConfirmtable(false)
    // }
  }

  const uploadDialog = (
    <Dialog
      onClose={handleUploadDialogClose}
      open={openUploadDialog}
      // onClose={(_, reason: any) => {
      //   if (reason !== 'backdropClick') {
      //     handleUploadDialogClose()
      //   }
      // }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: above670px ? '400px' : '230px',
          // height: "250px",
          // border: "3px solid green",
          borderRadius: 5,
          padding: '8px',
        }}
      >
        {/* <Box sx={{
                    display: "flex",
                    height: 30,
                    flexDirection: "row",
                    borderRadius: 10,
                }}
                    className={classes.dialogTitle}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                    }}>
                        <Typography variant="subtitle1">Upload Bulk Event</Typography>
                    </Box>
                    <Box sx={{
                        paddingRight: 2,
                    }}>

                        <button style={{
                            border: 0,
                            padding: 0,
                            height: 22,
                            width: 22
                        }}
                            className={classes.dialogCloseButton}
                            onClick={handleUploadDialogClose}
                        >
                            <b>
                                X
                            </b>
                        </button>
                    </Box>
                </Box> */}
        <DialogHeader
          title="Upload Bulk Event"
          onClose={handleUploadDialogClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2" color="primary">
            Upload Bulk Event
          </Typography>
        </Box>
        <form>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              <input
                type="text"
                value={uploadedFile ? uploadedFile.name : ''}
                onClick={() => document.getElementById('selectedFile')!.click()}
                className={classes.uploadTextfield}
                placeholder="No file selected"
                readOnly
              />
              <Input
                type="file"
                id="selectedFile"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
              p: 2,
              justifyContent: 'right',
            }}
          >
            <Box>
              <Typography
                variant="body2"
                style={{ display: 'inline' }}
                color="primary"
              >
                Supported file type is MS Excel
                <i
                  className="pi pi-file-excel"
                  style={{ fontSize: '18px' }}
                ></i>
              </Typography>
            </Box>
            {/* <Box>
                            Check out the sample file
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button"
                                table="sample"
                                filename="tablexls"
                                sheet="tablexls"
                                buttonText="Download as XLS" />
                        </Box> */}
          </Box>
          {fileError && (
            <Box
              sx={{
                display: 'flex',
                p: 2,
                justifyContent: 'right',
              }}
            >
              <Typography color="error">{fileError}</Typography>
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              p: 3,
              justifyContent: 'right',
            }}
          >
            <Button className={classes.submitButtons} onClick={handleUpload}>
              Upload
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  )

  const uploadedTable = () => {
    if (confirmTable) {
      if (fetchRangeResets.length > 0) {
        return (
          <DataTable
            // rowHover
            value={
              fileData
                ? fileData && filteredImportedData
                  ? filteredImportedData
                  : fileData
                : fetchRangeResets && filteredImportedData
                ? filteredImportedData
                : fetchRangeResets
            }
            selectionMode="checkbox"
            selection={selectedEvents}
            onSelectionChange={(e: any) => setSelectedEvents(e.value)}
            globalFilter={globalFilter}
            emptyMessage="No Events found."
            className="p-datatable-sm"
            rows={10}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} of {totalRecords}"
            alwaysShowPaginator={false}
            stateStorage="session"
            stateKey="dt-state-demo-session-eventmanage"
            showGridlines
            scrollable
            // scrollHeight={above670px ? '450px' : '300px'}
            // frozenWidth={above670px ? '250px' : '200px'}
          >
            <Column
              selectionMode="multiple"
              // selectionMode="single"
              headerStyle={{
                width: '50px',
                color: 'white',
                backgroundColor: theme.palette.primary.main,
              }}
              // frozen
            ></Column>
            {confirmedTableCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  body={
                    (col.field === 'name' &&
                      confirmTable &&
                      eventNameTemplate) ||
                    (col.field === 'eventStatus' &&
                      confirmTable &&
                      statusTemplate) ||
                    (col.field === 'appDueDate' &&
                      confirmTable &&
                      convertedAppDueDateTemplate) ||
                    (col.field === 'planogramClass' &&
                      confirmTable &&
                      classTemplate) ||
                    (col.field === 'targetDate' &&
                      confirmTable &&
                      convertedTargetDateTemplate)
                  }
                  style={ConfirmedBodyStyle(col.width)}
                  // filter filterPlaceholder="Search by name"
                  // bodyStyle={{ overflowX: 'auto' }}
                  headerStyle={ConfirmedHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                  sortable
                  // frozen={col.field === 'eventName' ? true : false}
                />
              )
            })}
          </DataTable>
        )
      } else {
        return (
          <DataTable
            // rowHover
            value={
              fileData && filteredImportedData ? filteredImportedData : fileData
            }
            selectionMode="checkbox"
            selection={selectedEvents}
            onSelectionChange={(e) => setSelectedEvents(e.value)}
            globalFilter={globalFilter}
            emptyMessage="No Events found."
            className="p-datatable-sm"
            rows={10}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} of {totalRecords}"
            stateStorage="session"
            stateKey="dt-state-demo-session-eventmanage"
            alwaysShowPaginator={false}
            showGridlines
            scrollable
            // scrollHeight={above670px ? '450px' : '300px'}
            // frozenWidth={above670px ? '250px' : '200px'}
          >
            <Column
              selectionMode="multiple"
              // selectionMode="single"
              headerStyle={{
                width: '50px',
                color: 'white',
                backgroundColor: theme.palette.primary.main,
              }}
              // frozen
            ></Column>
            {confirmedTableCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  body={
                    (col.field === 'name' &&
                      confirmTable &&
                      eventNameTemplate) ||
                    (col.field === 'eventStatus' &&
                      confirmTable &&
                      statusTemplate) ||
                    (col.field === 'appDueDate' &&
                      confirmTable &&
                      convertedAppDueDateTemplate) ||
                    (col.field === 'planogramClass' &&
                      confirmTable &&
                      classTemplate) ||
                    (col.field === 'targetDate' &&
                      confirmTable &&
                      convertedTargetDateTemplate)
                  }
                  style={ConfirmedBodyStyle(col.width)}
                  // filter filterPlaceholder="Search by name"
                  // bodyStyle={{ overflowX: 'auto' }}
                  headerStyle={ConfirmedHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                  sortable
                  // frozen={col.field === 'eventName' ? true : false}
                />
              )
            })}
          </DataTable>
        )
      }
    } else {
      return (
        <DataTable
          value={importedData}
          rows={10}
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="{first} - {last} of {totalRecords}"
          stateStorage="session"
          stateKey="dt-state-demo-session-eventmanage"
          alwaysShowPaginator={false}
          selectionMode="multiple"
          selection={selectedImportedData}
          onSelectionChange={(e) => setSelectedImportedData(e.value)}
          globalFilter={globalFilter}
          emptyMessage="No Events found."
          className="p-datatable-sm"
          showGridlines
          scrollable
          // scrollHeight="flex"
          // scrollHeight={above670px ? '300px' : '250px'}
          // frozenWidth="300px"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{
              width: '50px',
              color: 'white',
              backgroundColor: theme.palette.primary.main,
            }}
            // frozen
          ></Column>
          {eventUploadTableCols.map((col: any, index: any) => {
            return (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                body={
                  (col.field === 'appDueDate' && convertedAppDueDateTemplate) ||
                  (col.field === 'planogramClass' && classTemplate) ||
                  (col.field === 'targetDate' && convertedTargetDateTemplate)
                }
                bodyStyle={{ overflowX: 'auto' }}
                style={PreviewBodyStyle(col.width)}
                headerStyle={PreviewHeaderStyle(
                  col.width,
                  theme.palette.primary.main
                )}
                sortable
                // frozen={col.field === "eventName" ? true : false}
              />
            )
          })}
        </DataTable>
      )
    }
  }

  const previewDialog = (
    <Dialog
      open={openPreviewDialog}
      onClose={() => {
        // fetchRangeResets.length > 0 && setConfirmtable(true)
        // handlePreviewialogClose()
        setCancelOpenCross(true)
      }}
      // onClose={(_, reason: any) => {
      //   if (reason !== 'backdropClick') {
      //     // fetchRangeResets.length > 0 && setConfirmtable(true)
      //     // handlePreviewialogClose()
      //     setCancelOpenCross(true)
      //   }
      // }}
      fullWidth
      classes={{ paperFullWidth: classes.previewDialog }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        {/* <Box sx={{
                    display: "flex",
                    height: 30,
                    flexDirection: "row",
                    borderRadius: 10,
                }}
                    className={classes.dialogTitle}>
                    <Box sx={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                    }}>
                        <Typography variant="subtitle1">Confirm Bulk Event</Typography>
                    </Box>
                    <Box sx={{
                        paddingRight: 2,
                    }}>

                        <button style={{
                            border: 0,
                            padding: 0,
                            height: 22,
                            width: 22
                        }}
                            className={classes.dialogCloseButton}
                            onClick={() => setOpenPreviewDialog(false)}
                        >
                            <b>
                                X
                            </b>
                        </button>
                    </Box>
                </Box> */}

        <DialogHeader
          title="Confirm Bulk Event"
          // onClose={() => {
          //   fetchRangeResets.length > 0 && setConfirmtable(true)
          //   setOpenPreviewDialog(false)
          //   setOpenUploadDialog(true)
          // }}

          onClose={() => {
            setCancelOpenCross(true)
          }}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" color="primary">
            {/* Confirm Bulk Event */}
          </Typography>
        </Box>
        <Box sx={{ p: 1 }}>{uploadedTable()}</Box>
        <Typography color="secondary">
          ! Checkbox is only for delete option, On clicking save the current
          data will be saved
        </Typography>
        <Grid
          container
          spacing={3}
          style={{
            justifyContent: above670px ? 'right' : 'center',
            paddingTop: '20px',
          }}
        >
          <Grid
            item
            // xs={6}
            // sm={6}
            // lg={2}
            // xl={1}
            style={{ textAlign: !above670px ? 'center' : 'right' }}
          >
            <Button
              onClick={() => setCancelOpenDelete(true)}
              // className={classes.whiteButton}
              variant="outlined"
              color="primary"
              disabled={
                selectedImportedData
                  ? selectedImportedData.length === 0
                    ? true
                    : false
                  : true
              }
            >
              Delete Event(s)
            </Button>
          </Grid>
          <Grid
            item
            // xs={6}
            // sm={6}
            // lg={1}
            // xl={1}
            style={{ textAlign: !above670px ? 'center' : 'right' }}
          >
            <Button
              // onClick={handlePreviewDialogSave}
              variant="contained"
              color="primary"
              onClick={handlePreviewDialogSave1}
              // className={classes.submitButtons}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )

  // const cancelCross = () => {
  //   fetchRangeResets.length > 0 && setConfirmtable(true)
  //   setOpenPreviewDialog(false)
  //   setOpenUploadDialog(true)
  //   setCancelOpenCross(false)
  // }
  const cancelCross = () => {
    fetchRangeResets.length > 0 && setConfirmtable(true)
    setOpenPreviewDialog(false)
  }

  const viewConfirmCross = (
    <ConfirmBox
      cancelOpen={cancelOpenCross}
      handleCancel={() => setCancelOpenCross(false)}
      handleProceed={cancelCross}
      label1="Cancel 'Bulk Event Upload'"
      label2="Are you sure want to cancel 'Bulk Event Upload'?"
    />
  )

  const handleSearchParams = (e: any, key: any) => {
    // console.log(e.target.value, key)
    switch (key) {
      case 'resetType': {
        if (e) {
          setResetType(e)
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              resetType: e.label,
            }
          })
        } else {
          setResetType('')
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              resetType: '',
            }
          })
        }
        break
      }
      case 'launchDateFrom': {
        setLaunchDateFrom(e.target.value)
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateFrom: e.target.value,
            }
          })
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateFrom: '',
            }
          })
        }
        break
      }
      case 'launchDateTo': {
        setLaunchDateTo(e.target.value)
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateTo: e.target.value,
            }
          })
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchDateTo: '',
            }
          })
        }
        break
      }
      case 'launchWeekFrom': {
        setLaunchWeekFrom(e.target.value)
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekFrom: e.target.value,
            }
          })
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekFrom: '',
            }
          })
        }
        break
      }
      case 'launchWeekTo': {
        setLaunchWeekTo(e.target.value)
        if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekTo: e.target.value,
            }
          })
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              launchWeekTo: '',
            }
          })
        }
        break
      }
      case 'eventStatus': {
        if (e) {
          setEventStatus(e)
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              eventStatus: e.value,
            }
          })
        } else {
          setEventStatus('')

          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              eventStatus: '',
            }
          })
        }
        break
      }
      case 'group': {
        if (e) {
          setGroup(e)
          setCategory('')
          setDepartment('')
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              tradeGroup: e.value,
              category: '',
              department: '',
            }
          })
        } else {
          setGroup('')
          setCategory('')
          setDepartment('')
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              tradeGroup: '',
              category: '',
              department: '',
            }
          })
        }
        break
      }
      case 'category': {
        if (e) {
          setCategory(e)
          setDepartment('')
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              category: e.value,
              department: '',
            }
          })
        } else {
          setCategory('')
          setDepartment('')
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              category: '',
              department: '',
            }
          })
        }
        break
      }
      case 'department': {
        if (e) {
          setDepartment(e)
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              department: e.value,
            }
          })
        } else {
          setDepartment('')
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              department: '',
            }
          })
        }
        break
      }
      case 'categoryDirector': {
        if (e) {
          console.log(e)
          setCategoryDirector(e)
          // if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              categoryDirector: e.value,
            }
          })
        } else {
          setCategoryDirector([])
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              categoryDirector: '',
            }
          })
        }
        // }
        break
      }
      case 'buyer': {
        if (e) {
          setBuyer(e)
          // if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              buyer: e.value,
            }
          })
        } else {
          setBuyer([])
          // if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              buyer: '',
            }
          })
        }
        // }
        break
      }
      case 'merchandiser': {
        if (e) {
          setMerchandiser(e)
          // if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              merchandiser: e.value,
            }
          })
        } else {
          setMerchandiser([])
          // if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              merchandiser: '',
            }
          })
        }
        // }
        break
      }
      case 'supplyChainAnalyst': {
        if (e) {
          setSupplyChainSpecialist(e)
          // if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              supplyChainAnalyst: e.value,
            }
          })
        } else {
          setSupplyChainSpecialist([])
          // if (e.target.value) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              supplyChainAnalyst: '',
            }
          })
        }
        // }
        break
      }
      case 'clearancePriceCheck': {
        setClearancePriceApplied(e.target.checked)
        console.log(e.target.checked)
        if (e.target.checked) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              clearancePriceCheck: 'Y',
            }
          })
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              clearancePriceCheck: 'N',
            }
          })
        }
        break
      }
      case 'orderStopDateCheck': {
        setOrderStopDateCheck(e.target.checked)
        if (e.target.checked) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              orderStopDateCheck: 'Y',
            }
          })
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              orderStopDateCheck: 'N',
            }
          })
        }
        break
      }
      case 'stopOrder': {
        setStopOrder(e.target.checked)
        if (e.target.checked) {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              stopOrder: 'Y',
            }
          })
        } else {
          setSearchParams((prevState: any) => {
            return {
              ...prevState,
              stopOrder: 'N',
            }
          })
        }
        break
      }
      // case "launchDateFrom":{

      // }
    }
  }
  useEffect(() => {
    console.log(searchParams)
  }, [searchParams])

  const handleLaunchType = (e: any) => {
    setLaunchType(e.target.value)
    if (e.target.value === 'date') {
      delete searchParams['launchWeekFrom']
      delete searchParams['launchWeekTo']
    } else if (e.target.value === 'week') {
      delete searchParams['launchDateFrom']
      delete searchParams['launchDateTo']
    }
  }
  const handleSearchReset = () => {
    // setFilteredImportedData([])
    setResetType('')
    setLaunchType('')
    setLaunchDateFrom('')
    setLaunchDateTo('')
    setLaunchWeekFrom('')
    setLaunchWeekTo('')
    setGroup('')
    setCategory('')
    setDepartment('')
    // setStatus('')
    setEventStatus('')
    setCategoryDirector('')
    setBuyer('')
    setMerchandiser('')
    setSupplyChainSpecialist('')
    setSearchParams({
      resetType: '',
      // status: '',
      eventStatus: '',
      launchDateFrom: '',
      launchDateTo: '',
      tradeGroup: '',
      category: '',
      department: '',
      categoryDirector: '',
      buyer: '',
      merchandiser: '',
      supplyChainAnalyst: '',
      clearancePriceCheck: '',
      orderStopDateCheck: '',
      stopOrder: '',
    })
    // handleAdvancedSearch()
  }

  const handleAdvancedSearch = () => {
    if (searchParams) {
      let allRows = fileData
      // fetchRangeResets ? fetchRangeResets : confirmedRows
      // console.log(Object.keys(searchParams).length)
      let newData = allRows.filter((file: any) => {
        let resetTypeFilter =
          searchParams.resetType !== ''
            ? file.resetType === searchParams.resetType
            : true
        let launchDateFromFilter =
          searchParams.launchDateFrom !== ''
            ? file.targetDate >= searchParams.launchDateFrom
            : true
        let launchDateToFilter =
          searchParams.launchDateTo !== ''
            ? file.targetDate <= searchParams.launchDateTo
            : true
        let statusFilter =
          // searchParams.status !== ''
          //   ? file.status === searchParams.status
          //   : true
          searchParams.eventStatus !== ''
            ? file.eventStatus === searchParams.eventStatus
            : true
        let groupFilter =
          searchParams.tradeGroup !== ''
            ? file.tradeGroup === searchParams.tradeGroup
            : true
        let categoryFilter =
          searchParams.category !== ''
            ? file.category === searchParams.category
            : true
        let departmentFilter =
          searchParams.department !== ''
            ? file.department === searchParams.department
            : true
        let categoryDirectorFilter =
          searchParams.categoryDirector !== ''
            ? file.categoryDirectorEmailId === searchParams.categoryDirector
            : true
        let buyerFilter =
          searchParams.buyer !== ''
            ? file.buyerEmailId === searchParams.buyer
            : true
        let merchandiserFilter =
          searchParams.merchandiser !== ''
            ? file.merchandiserEmailId === searchParams.merchandiser
            : true
        let supplyChainFilter =
          searchParams.supplyChainAnalyst !== ''
            ? file.supplyChainAnalystEmailId === searchParams.supplyChainAnalyst
            : true
        let clearancePriceFilter =
          searchParams.clearancePriceCheck !== ''
            ? file.clearancePriceCheck === searchParams.clearancePriceCheck
            : true
        let orderStopDateFilter =
          searchParams.orderStopDateCheck !== ''
            ? file.orderStopDateCheck === searchParams.orderStopDateCheck
            : true
        let stopOrderFilter =
          searchParams.stopOrder !== ''
            ? file.stopOrder === searchParams.stopOrder
            : true
        return (
          resetTypeFilter &&
          launchDateFromFilter &&
          launchDateToFilter &&
          statusFilter &&
          groupFilter &&
          categoryFilter &&
          departmentFilter &&
          categoryDirectorFilter &&
          buyerFilter &&
          merchandiserFilter &&
          supplyChainFilter &&
          clearancePriceFilter &&
          orderStopDateFilter &&
          stopOrderFilter
        )
      })
      setFilteredImportedData(newData)
      console.log(newData)
      handleSearchDialogClose()
    }
  }

  const advancedSearch = (
    <Dialog
      open={openAdvancedSearchDialog}
      onClose={handleSearchDialogClose}
      // onClose={(_, reason: any) => {
      //   if (reason !== 'backdropClick') {
      //     handleSearchDialogClose()
      //   }
      // }}
      fullWidth
      classes={{ paperFullWidth: classes.searchDialog }}
    >
      <DialogHeader
        title="Advanced Search"
        onClose={() => setOpenAdvancedSearchDialog(false)}
      />

      <Box
        sx={{
          display: 'flex',
          padding: '20px',
          // flexDirection: "row"
        }}
      >
        <Grid container>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          <Grid item container xs={12} md={6} spacing={1}>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <Typography color="primary" variant="body2">
                  <label>Reset Type</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <Typography color="primary" variant="body2">
                    <select
                      name="requesttype"
                      id="requesttype"
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={resetType}
                      // onChange={e => {
                      //     setResetType(e.target.value);
                      // }}
                      onChange={(e: any) => handleSearchParams(e, 'resetType')}
                    >
                      <option value="">--- Select Reset Type ---</option>
                      <option value="Rapid Response">Rapid Response</option>
                      <option value="Seasonal Range Reset">
                        Seasonal Range Reset
                      </option>
                      <option value="Planned Range Reset">
                        Planned Range Reset
                      </option>
                      <option value="Seasonal Range Change">
                        Seasonal Range Change
                      </option>
                      <option value="Range Reset">Range Reset</option>
                    </select>
                    
                  </Typography> */}

                <AutocompleteSelect
                  value={resetType}
                  options={resetTypes}
                  onChange={(e: any) => handleSearchParams(e, 'resetType')}
                  placeholder="Select Reset Type"
                />
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography color="primary" variant="body2">
                    <label>Launch Date</label>
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  style={{
                    justifyContent: 'space-between',
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item container xs={7}>
                      <Grid item>
                        <Typography color="primary" variant="body2">
                          <sup>From</sup>
                        </Typography>
                      </Grid>
                      <Grid item container xs={12}>
                        <Grid item xs={2}>
                          <input
                            type="radio"
                            checked={launchType === 'date'}
                            onChange={handleLaunchType}
                            value="date"
                            name="radio-button-launch"
                            // inputProps={{ 'aria-label': 'Date' }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography color="primary" variant="body2">
                            <input
                              type="date"
                              value={launchDateFrom}
                              // onChange={(e: any) => setLaunchDateFrom(e.target.value)}
                              onChange={(e: any) =>
                                handleSearchParams(e, 'launchDateFrom')
                              }
                              max={launchDateTo && launchDateTo}
                              className={classes.searchTextField}
                              disabled={launchType !== 'date'}
                            />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container xs={5}>
                      <Grid item>
                        <Typography color="primary" variant="body2">
                          <sup>To</sup>
                        </Typography>
                      </Grid>
                      <Grid item container>
                        <Typography color="primary" variant="body2">
                          <input
                            type="date"
                            value={launchDateTo}
                            // onChange={(e: any) => setLaunchDateTo(e.target.value)}
                            onChange={(e: any) =>
                              handleSearchParams(e, 'launchDateTo')
                            }
                            min={launchDateFrom && launchDateFrom}
                            className={classes.searchTextField}
                            disabled={launchType !== 'date'}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs={7}>
                      <Grid item>
                        <Typography color="primary" variant="body2">
                          <sup>From</sup>
                        </Typography>
                      </Grid>
                      <Grid item container xs={12}>
                        <Grid item xs={2}>
                          <input
                            type="radio"
                            checked={launchType === 'week'}
                            onChange={handleLaunchType}
                            value="week"
                            name="radio-button-launch"
                            // inputProps={{ 'aria-label': 'Week' }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography color="primary" variant="body2">
                            <select
                              value={launchWeekFrom}
                              // defaultValue="Week 1"
                              // onChange={(e: any) => setLaunchWeekFrom(e.target.value)}
                              onChange={(e: any) =>
                                handleSearchParams(e, 'launchWeekFrom')
                              }
                              disabled={launchType !== 'week'}
                              className={classes.searchTextField}
                            >
                              <option value="Week 1">Week 1</option>
                              <option value="Week 2">Week 2</option>
                              <option value="Week 3">Week 3</option>
                            </select>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item container xs={5}>
                      <Grid item>
                        <Typography color="primary" variant="body2">
                          <sup>To</sup>
                        </Typography>
                      </Grid>
                      <Grid item container>
                        <Typography color="primary" variant="body2">
                          <select
                            value={launchWeekTo}
                            // defaultValue="Week 2"
                            // onChange={(e: any) => setLaunchWeekTo(e.target.value)}
                            onChange={(e: any) =>
                              handleSearchParams(e, 'launchWeekTo')
                            }
                            disabled={launchType !== 'week'}
                            className={classes.searchTextField}
                          >
                            <option value="Week 1">Week 1</option>
                            <option value="Week 2">Week 2</option>
                            <option value="Week 3">Week 3</option>
                          </select>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography color="primary" variant="body2">
                    <label>Status</label>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteSelect
                    // value={status}
                    value={eventStatus}
                    options={statusOptions}
                    // onChange={(e: any) => handleSearchParams(e, 'status')}
                    onChange={(e: any) => handleSearchParams(e, 'eventStatus')}
                    placeholder="Select Status"
                  />
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography color="primary" variant="body2">
                    <label>Group</label>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Typography color="primary" variant="body2"> */}
                  {/* <select
                        name="group"
                        id="group"
                        className={classes.searchTextField}
                        // defaultValue=""
                        value={group}
                        // onChange={(e: any) => setGroup(e.target.value)}
                        onChange={(e: any) => handleSearchParams(e, 'group')}
                      >
                        <option value="">--- Select Group ---</option>
                        <option value="Frozen">Frozen</option>
                      </select> */}

                  {/* <Select
                      value={group}
                      onChange={(e: any) => handleSearchParams(e, 'group')}
                      displayEmpty
                      renderValue={(value: any) =>
                        value ? value : '--- Select Group ---'
                      }
                      input={
                        <OutlinedInput
                          margin="dense"
                          className={classes.selectField}
                          disabled={groupOptions.length > 0 ? false : true}
                        />
                      }
                      disabled={groupOptions.length > 0 ? false : true}
                    >
                      {groupOptions.map((type: any) => {
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
                    value={group}
                    options={groupOptions}
                    onChange={(e: any) => handleSearchParams(e, 'group')}
                    placeholder="Select Trading Group"
                  />

                  {/* </Typography> */}
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography color="primary" variant="body2">
                    <label>Category</label>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Typography color="primary" variant="body2"> */}
                  {/* <select
                        className={classes.searchTextField}
                        // defaultValue=""
                        value={category}
                        // onChange={(e: any) => setCategory(e.target.value)}
                        onChange={(e: any) => handleSearchParams(e, 'category')}
                      >
                        <option value="">--- Select Category ---</option>

                        <option value="Frozen Food">Frozen Food</option>
                      </select> */}

                  {/* <Select
                      value={category}
                      onChange={(e: any) => handleSearchParams(e, 'category')}
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
                    onChange={(e: any) => handleSearchParams(e, 'category')}
                    placeholder="Select Category"
                    isDisabled={group.length <= 0}
                  />

                  {/* </Typography> */}
                </Grid>
              </Grid>
              <Grid item container>
                <Grid item xs={12}>
                  <Typography color="primary" variant="body2">
                    <label>Department</label>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <Typography color="primary" variant="body2"> */}
                  {/* <select
                        className={classes.searchTextField}
                        // defaultValue=""
                        value={department}
                        // onChange={(e: any) => setDepartment(e.target.value)}
                        onChange={(e: any) =>
                          handleSearchParams(e, 'department')
                        }
                      >
                        <option value="">--- Select Department ---</option>

                        <option value="Frozen Chips">Frozen Chips</option>
                        <option value="Frozen Vegetables">
                          Frozen Vegetables
                        </option>
                        <option value="Frozen Fish">Frozen Fish</option>
                      </select> */}

                  {/* <Select
                      value={department}
                      onChange={(e: any) => handleSearchParams(e, 'department')}
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
                    onChange={(e: any) => handleSearchParams(e, 'department')}
                    placeholder="Select Department"
                    isDisabled={
                      group.length <= 0
                        ? true
                        : category.length <= 0
                        ? true
                        : false
                    }
                  />

                  {/* </Typography> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {aboveMd && (
            <>
              <Grid item md={1} style={{ height: '100%' }}>
                <Divider orientation="vertical" variant="middle" />
              </Grid>
            </>
          )}

          <Grid item container xs={12} md={5} spacing={2}>
            <Grid item container>
              <Grid>
                <Typography color="primary" variant="body2">
                  <label>Category Director</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <Typography color="primary" variant="body2">
                      <select
                        className={classes.searchTextField}
                        // defaultValue=""
                        value={categoryDirector}
                        // onChange={(e: any) => setCategoryDirector(e.target.value)}
                        onChange={(e: any) =>
                          handleSearchParams(e, 'categoryDirector')
                        }
                      >
                        <option value="">
                          --- Select Category Director ---
                        </option>

                        {CategoryDirectors.map((b: any) => {
                          return (
                            <option key={b.value} value={b.value}>
                              {b.label}
                            </option>
                          )
                        })}
                      </select> */}

                <AutocompleteSelect
                  value={categoryDirector}
                  options={categoryDirectorOptions}
                  onChange={(e: any) =>
                    handleSearchParams(e, 'categoryDirector')
                  }
                  placeholder="Select Category Director"
                />

                {/* </Typography> */}
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={12}>
                <Typography color="primary" variant="body2">
                  <label>Buyer</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <Typography color="primary" variant="body2"> */}
                {/* <select
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={buyer}
                      // onChange={(e: any) => setBuyer(e.target.value)}
                      onChange={(e: any) => handleSearchParams(e, 'buyer')}
                    >
                      <option value="">--- Select Buyer ---</option>

                      {Buyers.map((b: any) => {
                        return (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        )
                      })}
                    </select> */}

                <AutocompleteSelect
                  value={buyer}
                  options={buyerOptions}
                  onChange={(e: any) => handleSearchParams(e, 'buyer')}
                  placeholder="Select Buyer"
                />
                {/* </Typography> */}
              </Grid>
            </Grid>

            <Grid item container>
              <Grid item xs={12}>
                <Typography color="primary" variant="body2">
                  <label>Merchandiser</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <Typography color="primary" variant="body2"> */}
                {/* <select
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={merchandiser}
                      // onChange={(e: any) => setMerchandiser(e.target.value)}
                      onChange={(e: any) =>
                        handleSearchParams(e, 'merchandiser')
                      }
                    >
                      <option value="">--- Select Merchandiser ---</option>

                      {Merchandisers.map((b: any) => {
                        return (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        )
                      })}
                    </select> */}

                <AutocompleteSelect
                  value={merchandiser}
                  options={merchandiserOptions}
                  onChange={(e: any) => handleSearchParams(e, 'merchandiser')}
                  placeholder="Select Merchandiser"
                />
                {/* </Typography> */}
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={12}>
                <Typography color="primary" variant="body2">
                  <label>Supply Chain Specialist</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <Typography color="primary" variant="body2"> */}
                {/* <select
                      className={classes.searchTextField}
                      // defaultValue=""
                      value={supplyChainSpecialist}
                      // onChange={(e: any) => setSupplyChainSpecialist(e.target.value)}
                      onChange={(e: any) =>
                        handleSearchParams(e, 'supplyChainAnalyst')
                      }
                    >
                      <option value="">
                        --- Select Supply Chain Specialist ---
                      </option>

                      {SupplyChainSpecialists.map((b: any) => {
                        return (
                          <option key={b.value} value={b.value}>
                            {b.label}
                          </option>
                        )
                      })}
                    </select> */}

                <AutocompleteSelect
                  value={supplyChainSpecialist}
                  options={supplyChainOptions}
                  onChange={(e: any) =>
                    handleSearchParams(e, 'supplyChainAnalyst')
                  }
                  placeholder="Select Supply Chain Specialist"
                />
                {/* </Typography> */}
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={12}>
                <Typography color="primary" variant="body2">
                  <label>Clearance Price Applied</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  checked={clearancePriceApplied}
                  color="primary"
                  onChange={(e: any) =>
                    handleSearchParams(e, 'clearancePriceCheck')
                  }
                />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={12}>
                <Typography color="primary" variant="body2">
                  <label>Order Stop Date Check Required</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  checked={orderStopDateCheck}
                  color="primary"
                  onChange={(e: any) =>
                    handleSearchParams(e, 'orderStopDateCheck')
                  }
                />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={12}>
                <Typography color="primary" variant="body2">
                  <label>Stop Order</label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  checked={stopOrder}
                  color="primary"
                  onChange={(e: any) => handleSearchParams(e, 'stopOrder')}
                />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <Button
                  className={classes.whiteButton}
                  onClick={handleSearchReset}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.submitButtons}
                  onClick={handleAdvancedSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* </MuiPickersUtilsProvider> */}
        </Grid>
      </Box>
    </Dialog>
  )

  const disablePublishButton = () => {
    if (selectedEvents && selectedEvents.length !== 0) {
      let errorRows = 0
      selectedEvents.map((e: any) => {
        if (
          e.status.toLowerCase() === 'error' ||
          e.status.toLowerCase() === 'duplicate'
        ) {
          errorRows = errorRows + 1
        }
      })
      if (errorRows !== 0) {
        return true
      } else {
        return false
      }
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
        // onRemove={() => {
        //   history.push('/')
        // }}
      />
      <div className="manageUser">
        <div className={classes.value}>
          <Grid container spacing={2} className={classes.mainContainer}>
            <LoadingComponent showLoader={isProgressLoader} />
            {!confirmTable ? (
              above670px ? (
                <>
                  <Grid item sm={4} xs={12} md={5} lg={7} xl={7}>
                    <Typography variant="h5" color="primary">
                      Manage Events
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={3}
                    xs={6}
                    md={2}
                    lg={2}
                    xl={2}
                    style={{ textAlign: 'right' }}
                  >
                    <Typography variant="subtitle1" color="primary">
                      <button
                        // style={{ cursor: 'pointer', color: 'blue' }}
                        // className={classes.greenButtons}
                        className="backButton"
                        onClick={handleUploadDialogOpen}
                      >
                        Upload Bulk Event
                      </button>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={3}
                    xs={6}
                    md={2}
                    lg={2}
                    xl={2}
                    style={{ textAlign: 'right' }}
                  >
                    <Typography variant="subtitle1" color="primary">
                      <button
                        // style={{ cursor: 'pointer', color: 'blue' }}
                        // className={classes.greenButtons}
                        className="backButton"
                        onClick={handleCreateEvent}
                      >
                        Create Event
                      </button>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    xs={12}
                    md={2}
                    lg={1}
                    xl={1}
                    style={{ textAlign: 'right' }}
                  >
                    <Typography variant="subtitle1" color="primary">
                      <button
                        // style={{ cursor: 'pointer', color: 'blue' }}
                        // className={classes.greenButtons}
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
                    </Typography>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={8}>
                    <Typography variant="h6" color="primary">
                      Manage Events
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" color="primary">
                      <button
                        // style={{ cursor: 'pointer', color: 'blue' }}
                        // className={classes.greenButtons}
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
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={7}
                    md={2}
                    lg={2}
                    xl={2}
                    style={{ padding: '0px' }}
                  >
                    <Typography variant="subtitle1" color="primary">
                      <button
                        // style={{ cursor: 'pointer', color: 'blue' }}
                        // className={classes.greenButtons}
                        className="backButton"
                        onClick={handleUploadDialogOpen}
                      >
                        Upload Bulk Event
                      </button>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    xs={5}
                    md={2}
                    lg={2}
                    xl={2}
                    style={{ textAlign: 'right', padding: '0px' }}
                  >
                    <Typography variant="subtitle1" color="primary">
                      <button
                        // style={{ cursor: 'pointer', color: 'blue' }}
                        // className={classes.greenButtons}
                        className="backButton"
                        onClick={handleCreateEvent}
                      >
                        Create Event
                      </button>
                    </Typography>
                  </Grid>
                </>
              )
            ) : (
              <>
                <Grid item sm={6} xs={12} md={2} lg={2} xl={2}>
                  <Typography variant="h6" color="primary">
                    Manage Events
                  </Typography>
                </Grid>
                <Grid item sm={6} xs={12} md={2} lg={2} xl={2}>
                  {/* <Typography variant="h5"> */}
                  <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder={' Search Event details '}
                    className={classes.globalSearch}
                  />
                  {/* </Typography> */}
                </Grid>
                <Grid item sm={6} xs={6} md={2} lg={3} xl={3}>
                  <Typography variant="subtitle1" color="primary">
                    <button
                      // style={{ cursor: 'pointer', color: 'blue' }}
                      // className={classes.greenButtons}
                      className="backButton"
                      onClick={handleSearchDialogOpen}
                    >
                      Advanced Search
                    </button>
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={6}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{ padding: 0 }}
                >
                  <Typography variant="subtitle1" color="primary">
                    <button
                      // style={{ cursor: 'pointer', color: 'blue' }}
                      // className={classes.greenButtons}
                      className="backButton"
                      onClick={handleUploadDialogOpen}
                    >
                      Upload Bulk Event
                    </button>
                  </Typography>
                </Grid>
                <Grid item sm={6} xs={6} md={2} lg={2} xl={2}>
                  <Typography variant="subtitle1" color="primary">
                    <button
                      // style={{ cursor: 'pointer', color: 'blue' }}
                      // className={classes.greenButtons}
                      className="backButton"
                      onClick={handleCreateEvent}
                    >
                      Create Event
                    </button>
                  </Typography>
                </Grid>
                <Grid item sm={6} xs={6} md={2} lg={1} xl={1}>
                  <Typography variant="subtitle1" color="primary">
                    <button
                      // style={{ cursor: 'pointer', color: 'blue' }}
                      // className={classes.greenButtons}
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
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
          <Box
            sx={{
              height: aboveMd ? '500px' : betweenSmAndMd ? '600px' : '400px',
              marginLeft: '10px',
              marginRight: '10px',
              display: 'flex',
              alignItems: importedData ? 'end' : 'center',
              justifyContent: !importedData && 'center',
              paddingTop: '20px',
              flexDirection: 'column',
            }}
            style={
              confirmTable
                ? {
                    border: 'none',
                  }
                : {
                    border: '3px dashed gray',
                    justifyContent: 'center',
                  }
            }
          >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              {!confirmTable ? (
                <Typography
                  variant="h4"
                  style={{ opacity: '0.5' }}
                  color="primary"
                >
                  No "Event" to display
                </Typography>
              ) : (
                <Box
                  sx={{
                    paddingBottom: '20px',
                  }}
                >
                  {uploadedTable()}
                </Box>
              )}
            </Box>
            {confirmTable && (
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ padding: '10px' }}>
                  <Button
                    onClick={removeEvents}
                    // className={classes.whiteButton}
                    variant="outlined"
                    color="primary"
                    // disabled={
                    //   selectedEvents
                    //     ? selectedEvents.length === 0
                    //       ? true
                    //       : false
                    //     : true
                    // }
                    disabled={disableDelete}
                  >
                    Delete Event
                  </Button>
                </Box>
                <Box sx={{ padding: '10px' }}>
                  <Button
                    // className={classes.submitButtons}
                    variant="contained"
                    onClick={handlePublish}
                    disabled={disablePublish}
                    color="primary"
                  >
                    Publish
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
          {uploadDialog}
          {importedData && importedCols && previewDialog}
          {/* {sampleExcel} */}
          {advancedSearch}
          {viewConfirmDelete}
          {viewConfirmCross}
          {invalidFileDialog}
          {invalidFormatDialog}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userDetail: state.loginReducer.userDetail,
    fileData: state.fileReducer.fileData,
  }
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    setFile: (fileData: any) => dispatch(setFile(fileData)),
    resetFile: () => dispatch(resetFile),
    setErrorFile: (fileData: any) => dispatch(setErrorFile(fileData)),
    setTaskFile: (fileData: any) => dispatch(setTaskFile(fileData)),
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(ManageTaskEvent)
