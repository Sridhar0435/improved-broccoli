import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
  InputAdornment,
  Button,
  Dialog,
  Box,
  useTheme,
  useMediaQuery,
  styled,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Checkbox,
  MenuProps as MenuPropsType,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { teal } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SearchOutlined } from '@material-ui/icons'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
// import { RiFileExcel2Fill } from 'react-icons/ri'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
import DateFnsUtils from '@date-io/date-fns'
import React, { useState, useEffect, useRef } from 'react'
import { tableBodyStyle, tableHeaderStyle, useStyles } from './Styles'
import {
  actionTypes,
  delistAddedToRangeCols,
  delistExistingProductsCols,
  massActions,
  productListCols,
  salesChannels,
  delistToRangeData,
  placeholderCols,
  lineStatusOptions,
  yesOrNo,
  supplierCodeOptions,
  replacementAssociationCols,
  supplierSearchSiteCode_Site,
  supplierCode_Supplier,
  ingredientList,
  ingredientTableCols,
  rangedStoresTableCols,
  rangedStoresTableData,
  clearancePricingOptions,
  depotStockTableData,
  depotStockUnitTableCols,
  depotStockButtons,
  recipeTableCols,
  // supplierCodes
} from './DataConstants'
// import TextFieldWithSearch from './sections/TextFieldWithSearch/TextFieldWithSearch'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import AutocompleteSelect from '../../../RangeChangeManagement/components/AutoCompleteSelect/AutocompleteSelect'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { AutoComplete as AutoCompletePrime } from 'primereact/autocomplete'
import DialogHeader from '../../../RangeChangeManagement/components/DialogHeader/DialogHeader'
import ConfirmCheckSign from '../../../RangeChangeManagement/components/ConfirmCheck/ConfirmCheckSign'
import {
  getConfigType,
  getRangeByRangeResetId,
  putCamundaMileStoneUpdate,
  getProductServiceByItemnumber,
  getProductSupplierServiceByItemnumber,
  getSupplierServiceBySupplierId,
  getProductCompositionServiceByItemnumber,
  getRangeByIdAndMinNumber,
  getSupplierSearchByIdNameSupplierAndSite,
  getLocationsStoreCodeAPI, //location/v2
} from '../../../api/Fetch'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { life, routes } from '../../../util/Constants'
import { allMessages } from '../../../util/Messages'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent'
import { Toast } from 'primereact/toast'
import SearchSelect from '../../../RangeChangeManagement/components/SearchSelect/SearchSelect'
import './styles.css'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps: Partial<MenuPropsType> = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  variant: 'menu',
}

function DelistsAddedToRange(props: any) {
  const { rafpendingActionDetailsCT06, userDetail } = props
  const { DEFAULT, DASHBOARD_RANGE_PENDINGACTION } = routes
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const small = useMediaQuery(theme.breakpoints.up('md'))
  const radio = <Radio color="primary" />

  const [productType, setProductType] = useState<any>('existingProducts')
  // const [eventDetails, setEventDetails] = useState<any>(delistToRangeData)
  const [eventDetails, setEventDetails] = useState<any>()
  const [actionType, setActionType] = useState<any>()
  const [actionTypeSelected, setActionTypeSelected] = useState<any>()
  const [actionTypeOptions, setActionTypeOptions] = useState<any>()
  const [min, setMin] = useState<any>('')
  const [existingSearchFields, setExistingSearchFields] = useState<any>()
  const [productId, setProductId] = useState<any>('')
  const [noOfStores, setNoOfStores] = useState<any>('')
  const [storeCode, setStoreCode] = useState<any>([])
  const [selectedStore, setSelectedStore] = useState<any>([])
  const [supplier, setSupplier] = useState<any>('')
  const [supplierSiteNumber, setSupplierSiteNumber] = useState<any>('')
  const [local, setLocal] = useState<any>('yes')
  const [pin, setPin] = useState<any>('')
  const [buyingMinIngredients, setBuyingMinIngredients] = useState<any>('')
  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [importedData, setImportedData] = useState<any>()
  const [supplierCode, setSupplierCode] = useState<any>()
  const [selectedSalesChannels, setSelectedSalesChannels] = useState<any>()
  const [placeholderCount, setPlaceholderCount] = useState<any>('')
  const [placeholderProducts, setPlaceholderProducts] = useState<any>([])
  const [replacementAssociationProduct, setReplacementAssociationProduct] =
    useState<any>([])
  const [newProductId, setNewProductId] = useState<any>('')
  const [selectedProductListItems, setSelectedProductListItems] =
    useState<any>()
  const [bulkActions, setBulkActions] = useState<any>()
  const [openActionTypeDialog, setOpenActionTypeDialog] = useState(false)

  const [replaceMinOrPin, setReplaceMinOrPin] = useState<any>('')
  const [fromDate, setFromDate] = useState<any>()
  const [toDate, setToDate] = useState<any>()
  const [addStoreCode, setAddStoreCode] = useState<any>('')
  const [comments, setComments] = useState<any>('')
  const [openPlaceholderDialog, setOpenPlaceholderDialog] = useState(false)
  const [openPlaceholderUpload, setOpenPlaceholderUpload] = useState(false)
  const [placeholderFile, setPlaceholderFile] = useState<any>()

  const [selectedPlaceholderData, setSelectedPlaceholderData] = useState<any>(
    []
  )
  const [selectedReplaceAssData, setSelectedReplaceAssData] = useState<any>([])
  const toast = useRef<any>(null)
  const [toastRemove, setToastRemove] = React.useState('')
  const [barCodeDoesnotExists, setBarCodeDoesnotExists] = useState<any>([])
  const [isProgressLoader, setIsProgressLoader] = useState(false)
  const [barCodeExists, setBarCodeExists] = useState<any>([])
  const [replaceError, setReplaceError] = useState<any>(false)
  const [replaceErrorMsg, setReplaceErrorMsg] = useState<any>(false)
  const [ingredientDialog, setIngredientDialog] = useState<any>(false)
  const [ingredientData, setIngredientData] = useState<any>([])
  const [selectedIngredientData, setSelectedIngredientData] = useState<any>([])
  const [rangedStoresDialogOpen, setRangedStoresDialogOpen] =
    useState<any>(false)
  const [rangedStoresData, setRangedStoresData] = useState<any>([])

  const [depotStockDialogOpen, setDepotStockDialogOpen] = useState<any>(false)
  const [depotStockData, setDepotStockData] = useState<any>([])
  const [recipeDialogOpen, setRecipeDialogOpen] = useState<any>(false)
  const [recipeData, setRecipeData] = useState<any>([])

  // const stylesInp = {
  //   container: {
  //     width: '1000px',
  //   },
  //   '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
  //     padding: '0px',
  //   },
  // }3534
  //setEventDetails

  // useEffect(() => {
  //   getRangeByRangeResetId('1304')
  //     .then((res: any) => {
  //       console.log('3400', res.data.items)
  //       // console.log(JSON.stringify(res.data))
  //       const data = res.data
  //       const eventDataApi = {
  //         eventName: data.name,
  //         dueDate: data.appDueDate,
  //         status: data.status,
  //         resetType: data.resetType,
  //         targetDate: data.targetDate,
  //         group: data.tradeGroup,
  //         category: data.category,
  //         department: data.department,
  //         eventId: data.id,
  //         clearancePriceCheck: data.clearancePriceCheck,
  //         orderStopDateCheck: data.orderStopDateCheck,
  //         stopOrder: data.stopOrder,
  //         buyer: data.buyerEmailId,
  //         buyingAssistant: data.buyerAssistantEmailId,
  //         ownBrandManager: data.ownBrandManagerEmailId,
  //         seniorBuyingManager: data.seniorBuyingManagerEmailId,
  //         merchandiser: data.merchandiserEmailId,
  //         rangeResetManager: data.rangeResetManagerEmailId,
  //         categoryDirector: data.categoryDirectorEmailId,
  //         supplyChainSplst: data.supplyChainAnalystEmailId,
  //       }
  //       setEventDetails([eventDataApi])
  //       console.log('setEventDetails', eventDataApi)
  //       // if (res.data.items.length > 0) {
  //       //   const data = res.data.items.map((item: any) => {
  //       //     var minVal = 1000000000000
  //       //     var max = 9999999999999
  //       //     var rand = Math.floor(minVal + Math.random() * (max - minVal))
  //       //     return {
  //       //       _idCheck: rand,
  //       //       actionType: item.type,
  //       //       itemNumber: item.itemNumber,
  //       //       description: item.description,
  //       //       lineStatus: 'Draft',
  //       //       comments: comments,
  //       //       min: item.itemNumber,
  //       //       Local: item.local,
  //       //       onlineCFC: item.onlineCfc,
  //       //       onlineStorePick: item.onlineStorePick,
  //       //       ownBrand: item.ownBrand,
  //       //       wholesale: item.wholesale,
  //       //       supplierCommitment: item.supplierCommitment,
  //       //       existingSupplier: item.existingSupplier,
  //       //       existingSupplierSite: item.existingSupplierSite,
  //       //       forward_forecast_to_launch: item.frwdForecastToLaunch,
  //       //       clearDepotBy: item.depoClearWeek,
  //       //       effectiveDateFrom: item.effectiveFromDate,
  //       //       effectiveDateTo: item.effectiveToDate,
  //       //       includeInClearancePricing: eventDataApi.clearancePriceCheck,
  //       //     }
  //       //   })
  //       //   setImportedData(data)
  //       // }
  //     })
  //     .catch((err: any) => {
  //       console.log(err)
  //     })
  // }, [])

  useEffect(() => {
    if (!rafpendingActionDetailsCT06)
      history.push(`${DEFAULT}${DASHBOARD_RANGE_PENDINGACTION}`)
  }, [
    rafpendingActionDetailsCT06,
    history,
    DEFAULT,
    DASHBOARD_RANGE_PENDINGACTION,
  ])
  useEffect(() => {
    console.log(rafpendingActionDetailsCT06)
    if (rafpendingActionDetailsCT06 && rafpendingActionDetailsCT06.eventId) {
      getRangeByRangeResetId(rafpendingActionDetailsCT06.eventId)
        .then((res: any) => {
          console.log(res.data)
          const data = res.data
          setEventDetails([data])
        })
        .catch((err: any) => {
          console.log(err.response)
        })
    }
  }, [rafpendingActionDetailsCT06])
  useEffect(() => {
    // getRangeByIdAndMinNumber('3400', '@all')
    // getRangeByIdAndMinNumber('1304', '@all')
    getRangeByIdAndMinNumber('1304', '@all')
      .then((res: any) => {
        console.log('1304', res.data)
        console.log('1304', JSON.stringify(res.data))
        const data = res.data
        if (data.length > 0) {
          const data = res.data.map((item: any) => {
            var minVal = 1000000000000
            var max = 9999999999999
            var rand = Math.floor(minVal + Math.random() * (max - minVal))
            return {
              _idCheck: rand,
              actionType: item.type,
              lineStatus: 'Draft',
              // itemNumber: item.itemNumber, //userinput
              min: item.itemNumber, //userinput
              pin: item.pin,
              ingredientMin: item.ingredientMin,
              legacyItemNumbers: item.hasOwnProperty('legacyItemNumbers')
                ? item.legacyItemNumbers
                : null,
              man: item.man,
              description: item.description,
              replaceMin: item.replaceMin,
              replaceMinDescription: item.replaceMinDescription,
              unitretailInc: 'Nokey', //drop2
              unitcost: item.unitCost, //drop2
              unitretail: 'Nokey', //drop2
              casecost: item.caseCost, //drop2
              packquantity: item.caseSize, //drop2
              supplierId: item.newSupplier,
              supplierSiteNameCode: item.newSupplierSite,
              local: item.local,
              perStorepPerWeek: item.hasOwnProperty('perStorepPerWeek')
                ? item.perStorepPerWeek
                : null,
              onlineCFC: item.rangestatus.online[0],
              onlineStorePick: item.rangestatus.retail.join(','),
              wholesale: item.rangestatus.wholesale,
              currentnoofrangedstores: item.rangedStoresCurrent,
              newnoofrangestores: item.rangedStoresNew,
              currentVersusNewStores: item.currentVsNewStores,
              storesRangedCurrentVsProposed: null,
              currentShelfFill: item.shelfFillCurrent,
              newShelfFill: item.shelfFillNew,
              currentshelffill_vs_newfill_percant: item.currentVsNewShelfFill,
              ownBrand: item.ownBrand,
              includeInClearancePricing: item.clearancePricing,
              includeInStoreWastage: item.wastage,
              clearDepotBy: item.depotClearWeek,
              supplierCommitment: item.suppCommFixedBuysSeasonal,
              finalStopOrderDate: null ? '' : null,
              systemSuggestedStopOrderDate: null ? '' : null,
              lastPoDate: item.lastPODate,
              depotShelfLifeMinimum: item.depotShelfLife,
              productShelfLifeInstore: item.productShelfLife,
              shelfLifeatManufacture: item.mfgShelfLife,
              numberOfRangeStores: null,
              totalstock: item.totalStoreStock,
              store_stock_unit: null,
              depotStockUnit: item.totalDepotStock,
              openPos: item.totalOpenPurchaseOrders,
              forward_forecast_to_launch: item.frwdForecastToLaunch,
              averageWeeklyVolume: null,
              weeksCoveronTotalStockonHandtoResetDate: item.weeksCover,
              forcastedWeeksCovertoResetDate: item.forecastWeekCover,
              excessstock: item.excessStock,
              safewaybrandedequivalent: item.safewayBrandedEq,
              effectiveDateFrom: item.effectiveFromDate,
              effectiveDateTo: item.effectiveToDate,
              existingSupplier: item.existingSupplier,
              existingSupplierSite: item.existingSupplierSite,
              noofrecipeMin: null,
              depotClearbyReservedQtyRetail: null,
              depotClearbyReservedQtyWholesale: null,
              depotClearbyReservedQtyOnline: null,
              depotClearbyReservedQtyTotal: null,
              comments: comments,
              // min: '500000033',
            }
          })

          setImportedData(data)
          console.log('setImportedData1304@all', data)
          console.log('ImportedData1304@all', data)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  const onPageLoadStoreCode = () => {
    getLocationsStoreCodeAPI()
      .then((res: any) => {
        console.log('getLocationsStoreCodeAPI', res)
        const stores = res.data.stores
        // const storeCodes = stores.map((val: any) => {
        //   return {
        //     label: val.name,
        //     text: val.name,
        //   }
        // })
        const storeCodes = stores.map((val: any) => {
          return val.name
        })
        setStoreCode(storeCodes)
      })
      .catch((err: any) => {
        console.log('getLocationsStoreCodeAPIError', err)
      })
  }

  useEffect(() => {
    onPageLoadStoreCode()
  }, [])

  useEffect(() => {
    setExistingSearchFields([
      {
        productId: productId,
        storeCode: storeCode,
        supplier: supplier,
        supplierSiteNumber: supplierSiteNumber,
        local: local,
        pin: pin,
        buyingMinIngredients: buyingMinIngredients,
      },
    ])
  }, [
    productId,
    storeCode,
    supplier,
    supplierSiteNumber,
    local,
    pin,
    buyingMinIngredients,
  ])

  const Input = styled('input')({
    display: 'none',
  })

  const handleProductTypeChange = (e: any) => {
    setProductType(e.target.value)
  }

  // const productIdTemplate = (rowData: any) => {
  //     return <TextFieldWithSearch value={productId} onChangeFn={setProductId} onSearch={console.log} />
  // }

  // const storeCodeTemplate = () => {
  //     return <TextFieldWithSearch value={storeCode} onChangeFn={setStoreCode} onSearch={console.log} />
  // }

  // const supplierTemplate = () => {
  //     return <TextFieldWithSearch value={supplier} onChangeFn={setSupplier} onSearch={console.log} />
  // }

  // const supplierSiteNumberTemplate = () => {
  //     return <TextFieldWithSearch value={supplierSiteNumber} onChangeFn={setSupplierSiteNumber} onSearch={console.log} />
  // }
  const onChangeProductTableFields = (
    prevState: any,
    field: any,
    rowDataSelected: any,
    eventValue: any
  ) => {
    return prevState.map((obj: any) =>
      obj._idCheck === rowDataSelected._idCheck
        ? Object.assign(obj, { [field]: eventValue })
        : obj
    )
  }

  const localTemplate = (rowData: any) => {
    if (rowData && rowData.hasOwnProperty('local') && rowData.local !== '') {
      let data
      if (rowData.local === 'true' || rowData.local === 'Y') {
        data = 'Y'
      } else if (rowData.local === 'false' || rowData.local === 'N') {
        data = 'N'
      }
      return (
        // <Select
        //   value={rowData && (rowData.local ? rowData.local : null)}
        //   // onChange={(e) => eventHandleDetailsSOT(e)}
        //   onChange={(e: any) => {
        //     if (e.target.value !== null) {
        //       setImportedData((prevState: any) => {
        //         return onChangeProductTableFields(
        //           prevState,
        //           'local',
        //           rowData,
        //           e.target.value
        //         )
        //       })
        //     }
        //   }}
        //   input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
        // >
        //   {yesOrNo.map((type: any) => {
        //     return (
        //       <MenuItem
        //         value={type.name}
        //         key={type.name}
        //         className={classes.muiSelect}
        //       >
        //         {type.text}
        //       </MenuItem>
        //     )
        //   })}
        // </Select>
        <>{data}</>
      )
    } else {
      return <>NA</>
    }
  }
  const onlineCFCTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('onlineCFC') &&
      rowData.onlineCFC !== ''
    ) {
      let data
      if (rowData.onlineCFC === 'true' || rowData.onlineCFC === 'Y') {
        data = 'Y'
      } else if (rowData.onlineCFC === 'false' || rowData.onlineCFC === 'N') {
        data = 'N'
      }
      return (
        // <Select
        //   value={rowData && (rowData.onlineCFC ? rowData.onlineCFC : null)}
        //   // onChange={(e) => eventHandleDetailsSOT(e)}
        //   onChange={(e: any) => {
        //     if (e.target.value !== null) {
        //       setImportedData((prevState: any) => {
        //         return onChangeProductTableFields(
        //           prevState,
        //           'onlineCFC',
        //           rowData,
        //           e.target.value
        //         )
        //       })
        //     }
        //   }}
        //   input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
        // >
        //   {yesOrNo.map((type: any) => {
        //     return (
        //       <MenuItem
        //         value={type.name}
        //         key={type.name}
        //         className={classes.muiSelect}
        //       >
        //         {type.text}
        //       </MenuItem>
        //     )
        //   })}
        // </Select>
        <>{data}</>
      )
    } else {
      return <>NA</>
    }
  }
  const onlineStorePickTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('onlineStorePick') &&
      rowData.onlineStorePick !== ''
    ) {
      let data
      if (
        rowData.onlineStorePick === 'true' ||
        rowData.onlineStorePick === 'Y'
      ) {
        data = 'Y'
      } else if (
        rowData.onlineStorePick === 'false' ||
        rowData.onlineStorePick === 'N'
      ) {
        data = 'N'
      }
      return (
        // <Select
        //   value={
        //     rowData &&
        //     (rowData.onlineStorePick ? rowData.onlineStorePick : null)
        //   }
        //   // onChange={(e) => eventHandleDetailsSOT(e)}
        //   onChange={(e: any) => {
        //     if (e.target.value !== null) {
        //       setImportedData((prevState: any) => {
        //         return onChangeProductTableFields(
        //           prevState,
        //           'onlineStorePick',
        //           rowData,
        //           e.target.value
        //         )
        //       })
        //     }
        //   }}
        //   input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
        // >
        //   {yesOrNo.map((type: any) => {
        //     return (
        //       <MenuItem
        //         value={type.name}
        //         key={type.name}
        //         className={classes.muiSelect}
        //       >
        //         {type.text}
        //       </MenuItem>
        //     )
        //   })}
        // </Select>
        <>{data}</>
      )
    } else {
      return <>NA</>
    }
  }
  const wholesaleTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('wholesale') &&
      rowData.wholesale !== ''
    ) {
      let data
      if (rowData.wholesale === 'true' || rowData.wholesale === 'Y') {
        data = 'Y'
      } else if (rowData.wholesale === 'false' || rowData.wholesale === 'N') {
        data = 'N'
      }
      return (
        // <span>{rowData && (rowData.wholesale ? rowData.wholesale : null)}</span>
        //   <Select
        //     value={rowData && (rowData.wholesale ? rowData.wholesale : null)}
        //     // onChange={(e) => eventHandleDetailsSOT(e)}
        //     onChange={(e: any) => {
        //       if (e.target.value !== null) {
        //         setImportedData((prevState: any) => {
        //           return onChangeProductTableFields(
        //             prevState,
        //             'wholesale',
        //             rowData,
        //             e.target.value
        //           )
        //         })
        //       }
        //     }}
        //     input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
        //   >
        //     {yesOrNo.map((type: any) => {
        //       return (
        //         <MenuItem
        //           value={type.name}
        //           key={type.name}
        //           className={classes.muiSelect}
        //         >
        //           {type.text}
        //         </MenuItem>
        //       )
        //     })}
        //   </Select>
        <>{data}</>
      )
    } else {
      return <>NA</>
    }
  }
  // const pinTemplate = () => {
  //     return <TextFieldWithSearch value={pin} onChangeFn={setPin} onSearch={console.log} />
  // }

  // const buyingMinIngredientsTemplate = () => {
  //     return <TextFieldWithSearch value={buyingMinIngredients} onChangeFn={setBuyingMinIngredients} onSearch={console.log} />
  // }

  const lineStatusTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData && (rowData.lineStatus ? rowData.lineStatus : null)}
        onChange={(e: any) =>
          setImportedData((prevState: any) =>
            onChangeProductTableFields(
              prevState,
              'lineStatus',
              rowData,
              e.target.value
            )
          )
        }
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        {lineStatusOptions.map((type) => {
          return (
            <MenuItem value={type.value} key={type.value}>
              {type.label}
            </MenuItem>
          )
        })}
      </Select>
    )
  }

  const includeInClearancePricingTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('includeInClearancePricing') &&
      rowData.includeInClearancePricing
    ) {
      if (rowData.actionType === 'Delist MIN') {
        return (
          <Select
            value={rowData.includeInClearancePricing}
            onChange={(e: any) =>
              setImportedData((prevState: any) =>
                onChangeProductTableFields(
                  prevState,
                  'includeInClearancePricing',
                  rowData,
                  e.target.value
                )
              )
            }
            input={
              <OutlinedInput margin="dense" className={classes.muiSelect} />
            }
          >
            {clearancePricingOptions.map((type) => {
              return (
                <MenuItem value={type.value} key={type.value}>
                  {type.label}
                </MenuItem>
              )
            })}
          </Select>
        )
      } else {
        return <>{rowData.includeInClearancePricing}</>
      }
    } else {
      return <>NA</>
    }
  }
  const clearDepotByTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData && rowData.clearDepotBy}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setImportedData((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'clearDepotBy',
                rowData,
                e.target.value
              )
            })
          }
        }}
        input={<OutlinedInput margin="dense" className={classes.muiSelect} />}
      >
        <MenuItem
          value={'week-4'}
          // key={type.name}
          className={classes.muiSelect}
        >
          Week - 4
        </MenuItem>

        <MenuItem
          value={'week-5'}
          // key={type.name}
          className={classes.muiSelect}
        >
          Week - 5
        </MenuItem>
      </Select>
    )
  }

  const effectiveDateFromProductTableTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('effectiveDateFrom') &&
      rowData.effectiveDateFrom !== ''
    ) {
      return (
        <DatePicker
          format="dd/MM/yy"
          value={
            rowData &&
            (rowData['effectiveDateFrom'] ? rowData['effectiveDateFrom'] : null)
          }
          onChange={(date: any) => {
            let newDate = date.toISOString().split('T')[0]
            setImportedData((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'effectiveDateFrom',
                rowData,
                newDate
              )
            })
          }}
          TextFieldComponent={(props: any) => (
            <OutlinedInput
              margin="dense"
              onClick={props.onClick}
              value={props.value}
              onChange={props.onChange}
              // className={classes.dateFields}
            />
          )}
        />
      )
    } else {
      return <>NA</>
    }
  }
  const effectiveDateToProductTableTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('effectiveDateTo') &&
      rowData.effectiveDateTo !== ''
    ) {
      return (
        <DatePicker
          format="dd/MM/yy"
          value={
            rowData &&
            (rowData['effectiveDateTo'] ? rowData['effectiveDateTo'] : null)
          }
          onChange={(date: any) => {
            let newDate = date.toISOString().split('T')[0]
            setImportedData((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'effectiveDateTo',
                rowData,
                newDate
              )
            })
          }}
          TextFieldComponent={(props: any) => (
            <OutlinedInput
              margin="dense"
              onClick={props.onClick}
              value={props.value}
              onChange={props.onChange}
              // className={classes.dateFields}
            />
          )}
        />
      )
    } else {
      return <>NA</>
    }
  }
  const finalStopOrderDateTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('finalStopOrderDate') &&
      rowData.finalStopOrderDate !== ''
    ) {
      return (
        <DatePicker
          format="dd/MM/yy"
          value={
            rowData &&
            (rowData['finalStopOrderDate']
              ? rowData['finalStopOrderDate']
              : null)
          }
          onChange={(date: any) => {
            let newDate = date.toISOString().split('T')[0]
            setImportedData((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'finalStopOrderDate',
                rowData,
                newDate
              )
            })
          }}
          TextFieldComponent={(props: any) => (
            <OutlinedInput
              margin="dense"
              onClick={props.onClick}
              value={props.value}
              onChange={props.onChange}
              // className={classes.dateFields}
            />
          )}
        />
      )
    } else {
      return <>NA</>
    }
  }
  const systemGeneratedStopOrderDateTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.actionType === 'Delist MIN' &&
      rowData.hasOwnProperty('systemSuggestedStopOrderDate') &&
      rowData.systemSuggestedStopOrderDate !== ''
    ) {
      return (
        <DatePicker
          format="dd/MM/yy"
          value={
            rowData &&
            (rowData['systemSuggestedStopOrderDate']
              ? rowData['systemSuggestedStopOrderDate']
              : null)
          }
          onChange={(date: any) => {
            let newDate = date.toISOString().split('T')[0]
            setImportedData((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'systemSuggestedStopOrderDate',
                rowData,
                newDate
              )
            })
          }}
          TextFieldComponent={(props: any) => (
            <OutlinedInput
              margin="dense"
              onClick={props.onClick}
              value={props.value}
              onChange={props.onChange}
              // className={classes.dateFields}
            />
          )}
        />
      )
    } else {
      return <>NA</>
    }
  }
  const lastPoDateTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('lastPoDate') &&
      rowData.lastPoDate !== ''
    ) {
      if (rowData.actionType === 'Delist MIN') {
        return (
          <DatePicker
            format="dd/MM/yy"
            value={
              rowData && (rowData['lastPoDate'] ? rowData['lastPoDate'] : null)
            }
            onChange={(date: any) => {
              let newDate = date.toISOString().split('T')[0]
              setImportedData((prevState: any) => {
                return onChangeProductTableFields(
                  prevState,
                  'lastPoDate',
                  rowData,
                  newDate
                )
              })
            }}
            TextFieldComponent={(props: any) => (
              <OutlinedInput
                margin="dense"
                onClick={props.onClick}
                value={props.value}
                onChange={props.onChange}
                // className={classes.dateFields}
              />
            )}
          />
        )
      } else {
        return <>{rowData.lastPoDate}</>
      }
    } else {
      return <>NA</>
    }
  }
  const includeInStoreWastageTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('includeInStoreWastage') &&
      rowData.includeInStoreWastage
    ) {
      if (rowData.actionType === 'Delist MIN') {
        return (
          <Checkbox
            checked={rowData.includeInStoreWastage}
            color="primary"
            onChange={(e: any) => {
              setImportedData((prevState: any) =>
                onChangeProductTableFields(
                  prevState,
                  'includeInStoreWastage',
                  rowData,
                  e.target.checked
                )
              )
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        )
      } else {
        return <>{rowData.includeInStoreWastage}</>
      }
    } else {
      return <>NA</>
    }
  }
  const supplierCommitmentTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('supplierCommitment') &&
      rowData.supplierCommitment
    ) {
      if (rowData.actionType === 'Delist MIN') {
        return (
          <OutlinedInput
            value={rowData && rowData.supplierCommitment}
            onChange={(e: any) => {
              setImportedData((prevState: any) => {
                return onChangeProductTableFields(
                  prevState,
                  'supplierCommitment',
                  rowData,
                  e.target.value
                )
              })
            }}
            className={classes.tableTextField}
          />
        )
      } else {
        return <>{rowData.supplierCommitment}</>
      }
    } else {
      return <>NA</>
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
  const goBack = () => {
    history.goBack()
  }
  const handleRangeStoresDialogOpen = (rowData: any) => {
    setRangedStoresDialogOpen(true)
    setRangedStoresData(rowData)
  }

  const handleRangeStoresDialogClose = () => {
    setRangedStoresDialogOpen(false)
    setRangedStoresData([])
  }

  const rangeStoresDialog = (
    <Dialog
      open={rangedStoresDialogOpen}
      onClose={handleRangeStoresDialogClose}
      fullWidth
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? '400px' : '260px',
          // height: "250px",
          // border: '3px solid green',
          borderRadius: 5,
          p: 1,
        }}
      >
        <DialogHeader
          title={`Store View`}
          onClose={handleRangeStoresDialogClose}
        />
        <Box
          sx={{
            p: 2,
          }}
        >
          <DataTable
            // value={rangedStoresTableData}
            value={rangedStoresData}
            showGridlines
            className="p-datatable-sm"
          >
            {rangedStoresTableCols.map((col: any) => {
              return (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                />
              )
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  )

  const currentNoOfRangeStoresTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('currentNoOfRangedStores') &&
      rowData.currentNoOfRangedStores !== ''
    ) {
      return (
        //  <Typography color="primary">
        <div
          className={classes.tableLinks}
          onClick={() => handleRangeStoresDialogOpen(rowData)}
        >
          {rowData.currentNoOfRangedStores}
        </div>
        // </Typography>
      )
    } else {
      return <>NA</>
    }
  }
  const commentsTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        value={rowData && rowData.comments}
        onChange={(e: any) => {
          setImportedData((prevState: any) => {
            return onChangeProductTableFields(
              prevState,
              'comments',
              rowData,
              e.target.value
            )
          })
        }}
        className={classes.tableTextField}
      />
    )
  }
  const existingSupplierProductListTemplate = (rowData: any) => {
    return <span>{rowData && rowData.existingSupplier}</span>
  }
  const handleIngredientDialogOpen = (rowData: any) => {
    setIngredientDialog(true)
    setIngredientData(rowData)
    setIngredientData(rowData.ingredientDetails)
    console.log('details', rowData.ingredientDetails)
  }

  const handleIngredientDialogClose = () => {
    setIngredientDialog(false)
    setIngredientData([])
    setSelectedIngredientData([])
  }
  const handleDelistIngredientMin = () => {
    if (selectedIngredientData && selectedIngredientData.length > 0) {
      selectedIngredientData.map((ingredient: any) => {
        getAndCheckItemNumber(
          ingredient.ingredientMin,
          // '100001499',
          'Delist Ingredient MIN',
          '',
          '',
          'NA',
          'NA'
        )
      })
    }
    handleIngredientDialogClose()
  }
  const ingredientsDialog = (
    <Dialog
      open={ingredientDialog}
      onClose={handleIngredientDialogClose}
      fullWidth
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? '400px' : '260px',
          // height: "250px",
          // border: '3px solid green',
          borderRadius: 5,
        }}
      >
        <DialogHeader
          title={`Unique Ingredient MIN View`}
          onClose={handleIngredientDialogClose}
        />
        <Box
          sx={{
            p: 3,
          }}
        >
          <DataTable
            // value={ingredientList}
            value={ingredientData}
            showGridlines
            className="p-datatable-sm"
            selectionMode="checkbox"
            selection={selectedIngredientData}
            onSelectionChange={(e: any) => {
              setSelectedIngredientData(e.value)
            }}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{
                width: '50px',
                color: 'white',
                backgroundColor: teal[900],
              }}
            ></Column>
            {ingredientTableCols.map((col: any) => {
              return (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                />
              )
            })}
          </DataTable>
        </Box>
        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleDelistIngredientMin}
          >
            Add To Delist Ingredient MIN
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
  const ingredientMinTemplate = (rowData: any) => {
    // console.log('ingredientMinTemplate', rowData)
    if (
      rowData &&
      (rowData.actionType === 'Delist MIN' || rowData.actionType === 'Derange')
    ) {
      return (
        <>
          {rowData.ingredientMin ? (
            <div
              onClick={() => handleIngredientDialogOpen(rowData)}
              className={classes.tableLinks}
            >
              {rowData.ingredientMin}
            </div>
          ) : (
            'NA'
          )}
        </>
      )
    } else {
      return (
        <>{rowData && rowData.ingredientMin ? rowData.ingredientMin : 'NA'}</>
      )
    }
  }
  const handleRecipeDialogOpen = (rowData: any) => {
    setRecipeDialogOpen(true)
    setRecipeData(rowData.recipeDetails)
    console.log('details', rowData.recipeDetails)
  }

  const handleRecipeDialogClose = (rowData: any) => {
    setRecipeDialogOpen(false)
    setRecipeData([])
  }
  const recipeDialog = (
    <Dialog open={recipeDialogOpen} onClose={handleRecipeDialogClose} fullWidth>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? '400px' : '260px',
          // height: "250px",
          // border: '3px solid green',
          borderRadius: 5,
        }}
      >
        <DialogHeader
          title={`No. of Recipe MIN View`}
          onClose={handleRecipeDialogClose}
        />
        <Box
          sx={{
            p: 3,
          }}
        >
          <DataTable
            // value={ingredientList}
            value={recipeData}
            showGridlines
            className="p-datatable-sm"
          >
            {recipeTableCols.map((col: any) => {
              return (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                />
              )
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  )
  const recipeMinTemplate = (rowData: any) => {
    // console.log('ingredientMinTemplate', rowData)
    if (
      rowData &&
      (rowData.actionType === 'Delist MIN' || rowData.actionType === 'Derange')
    ) {
      return (
        <>
          {rowData.noOfRecipeMin ? (
            <div
              onClick={() => handleRecipeDialogOpen(rowData)}
              className={classes.tableLinks}
            >
              {rowData.noOfRecipeMin}
            </div>
          ) : (
            'NA'
          )}
        </>
      )
    } else {
      return (
        <>{rowData && rowData.noOfRecipeMin ? rowData.noOfRecipeMin : 'NA'}</>
      )
    }
  }
  const handleDepotStockDialogOpen = (rowData: any) => {
    setDepotStockDialogOpen(true)
    setDepotStockData(rowData)
  }

  const handleDepotStockDialogClose = (rowData: any) => {
    setDepotStockDialogOpen(false)
    setDepotStockData([])
  }

  const depotStockDialog = (
    <Dialog
      open={depotStockDialogOpen}
      onClose={handleDepotStockDialogClose}
      fullWidth
      classes={{
        paperFullWidth:
          // depotStockData && depotStockData.length > 0
          depotStockTableData
            ? classes.placeholderDialogFull
            : classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? '400px' : '260px',
          // height: "250px",
          // border: '3px solid green',
          borderRadius: 5,
          p: 1,
        }}
      >
        <DialogHeader
          title={`Depot Stock Unit View`}
          onClose={handleDepotStockDialogClose}
        />
        <Box
          sx={{
            p: 2,
            overflow: 'scroll',
          }}
        >
          <DataTable
            value={depotStockTableData}
            // value={depotStockData}
            showGridlines
            className="p-datatable-sm"
          >
            {depotStockUnitTableCols.map((col: any) => {
              return (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                />
              )
            })}
          </DataTable>
        </Box>
        <Grid
          container
          spacing={2}
          style={{
            justifyContent: 'left',
            padding: '20px',
          }}
        >
          {depotStockButtons.map((button: any) => {
            return (
              <Grid
                item
                sm={2}
                style={{
                  // cursor: 'pointer',
                  backgroundColor: 'orange',
                  margin: '10px',
                  textAlign: 'center',
                }}
              >
                <button className={classes.tableLinks}>{button}</button>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Dialog>
  )
  const depotStockTemplate = (rowData: any) => {
    if (
      rowData &&
      rowData.hasOwnProperty('depotStockUnit') &&
      rowData.depotStockUnit
    ) {
      if (rowData.actionType === 'Delist MIN') {
        return (
          <div
            onClick={() => handleDepotStockDialogOpen(rowData)}
            className={classes.tableLinks}
          >
            {rowData.depotStockUnit}
            {/* click */}
          </div>
        )
      } else {
        return <> {rowData.depotStockUnit}</>
      }
    } else {
      return <>NA</>
    }
  }
  useEffect(() => {
    getConfigType('Action Type').then((res: any) => {
      const actionOptions = res.data.map((actionType: any) => {
        return {
          label: actionType.configValue,
          value: actionType.configValue,
        }
      })
      console.log(actionOptions)
      setActionTypeOptions(actionOptions)
    })
  }, [])

  const handleActionType = (e: any) => {
    if (e) {
      setActionType(e)
      setActionTypeSelected(e.value)
      console.log('ACTION TYPE', e)
    } else {
      setActionType('')
    }
  }

  const handleBulkActions = (e: any) => {
    if (e) {
      setBulkActions(e)
    } else {
      setBulkActions('')
    }
  }

  const handleUploadDialogOpen = () => {
    actionType && setOpenUploadDialog(true)
  }

  const handleUploadDialogClose = () => {
    setOpenUploadDialog(false)
    setUploadedFile(null)
  }

  const handleFileUpload = (event: any) => {
    setUploadedFile(event.target.files[0])
  }

  const handleUpload = (e: any) => {
    // e.preventDefault();
    handleUploadDialogClose()
    if (
      uploadedFile &&
      (uploadedFile.type === 'text/csv' ||
        uploadedFile.type === 'application/vnd.ms-excel' ||
        uploadedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
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
          const cols: any = data1[0]

          const json = JSON.parse(
            // JSON.stringify(data).replace(/ /g, '_')
            JSON.stringify(data).replace(/"\s+|\s+"/g, '"')
          )

          const convert = (obj: any) => {
            const result: any = {}
            Object.keys(obj).forEach(function (key: any) {
              result[key.replace(/ /g, '_')] = obj[key]
            })
            return result
          }

          var result = json.map(function (o: any) {
            return convert(o)
          })
          console.log('trimSpace', result)

          let newData = result.map((d: any, index: any) => {
            if (d.Action_Type && d.Action_Type === 'Delist MIN') {
              getAndCheckItemNumber(
                d.MIN,
                'Delist MIN',
                index + 1,
                d.Comments,
                'NA',
                'NA'
              )
              // return {
              //   actionType: d.Action_Type ? d.Action_Type : '',
              //   min: d.MIN ? d.MIN : '',
              //   comments: d.Comments ? d.Comments : '',
              //   lineStatus: 'Request For Stock Count',
              //   man: 'NA',
              //   ingredientMin: 'NA',
              //   pin: '111111',
              //   description: 'Blahh Blahh',
              //   replaceMin: 'NA',
              //   replaceMinDescription: 'NA',
              //   existingSupplier: 'Futura-1001098',
              //   existingSupplierSite: 'Tetbury-9866',
              //   numberOfRangeStores: 'NA',
              //   storeCode: 'NA',
              // }
            } else if (d.Action_Type && d.Action_Type === 'New MIN') {
              getAndCheckItemNumber(
                d.MIN,
                'New MIN',
                index + 1,
                d.Comments,
                d.New_Number_of_Range_Stores,
                d.Store_Code
              )
              // return {
              //   actionType: d[cols[0]] ? d[cols[0]] : '',
              //   min: d[cols[1]] ? d[cols[1]] : '',
              //   numberOfRangeStores: d[cols[2]] ? d[cols[2]] : '',
              //   storeCode: d[cols[3]] ? d[cols[3]] : '',
              //   comments: d[cols[4]] ? d[cols[4]] : '',
              //   lineStatus: 'Draft',
              //   man: 'NA',
              //   ingredientMin: 'NA',
              //   pin: '111111',
              //   description: 'Blahh Blahh',
              //   replaceMin: 'NA',
              //   replaceMinDescription: 'NA',
              //   existingSupplier: 'Futura-1001098',
              //   existingSupplierSite: 'Tetbury-9866',
              // }
            }
            // else if (
            //   d.Action_Type &&
            //   d.Action_Type === 'Delist Ingredient MIN'
            // ) {
            //   getAndCheckItemNumber(
            //     d.MIN,
            //     'Delist Ingredient MIN',
            //     index + 1,
            //     d.Comments,
            //     'NA',
            //     'NA'
            //   )
            // } else if (
            //   d.Action_Type &&
            //   d.Action_Type === 'New Ingredient MIN'
            // ) {
            //   getAndCheckItemNumber(
            //     d.MIN,
            //     'New Ingredient MIN',
            //     index + 1,
            //     d.Comments,
            //     'NA',
            //     'NA'
            //   )
            // }
          })

          // console.log(newData)
          // if (importedData && importedData.length > 0) {
          //   setImportedData((prevState: any) => {
          //     return [...prevState, ...newData]
          //   })
          // } else {
          //   setImportedData([...newData])
          // }
        }

        reader.readAsArrayBuffer(uploadedFile)
      })
    } else {
      alert('Upload correct file')
      setUploadedFile(null)
    }
  }

  const uploadDialog = (
    <Dialog open={openUploadDialog} onClose={handleUploadDialogClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: small ? '400px' : '260px',
          // height: "250px",
          // border: '3px solid green',
          borderRadius: 5,
        }}
      >
        <DialogHeader
          title={`Upload ${actionType && actionType.value}`}
          onClose={handleUploadDialogClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2" color="primary">
            Upload {actionType && actionType.value}
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
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
              style={{ width: '60%' }}
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
            <Typography color="primary">
              Supported file type in MS Excel
              <i className="pi pi-file-excel" style={{ fontSize: '18px' }}></i>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button
            //   className={classes.submitButtons}
            variant="contained"
            color="primary"
            onClick={handleUpload}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleActionTypeDialogOpen = () => {
    actionType && setOpenActionTypeDialog(true)
    // if (actionType === 'New MIN') {
    //   onPageLoadStoreCode()
    // }
    onPageLoadStoreCode()
  }

  const handleActionTypeDialogClose = () => {
    setOpenActionTypeDialog(false)
    setMin('')
    setComments('')
    setNoOfStores('')
    setStoreCode([])
  }

  const handleFromDate = (date: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    const newDate =
      parseInt(date.getMonth() + 1) +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear()
    console.log(newDate)
    setFromDate(newDate)
  }

  const handleToDate = (date: any) => {
    // const newDate = date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear()
    const newDate =
      parseInt(date.getMonth() + 1) +
      '-' +
      date.getDate() +
      '-' +
      date.getFullYear()
    console.log(newDate)
    setToDate(newDate)
  }

  const handleAddProduct = (e: any) => {
    e.preventDefault()
    if (
      min ||
      replaceMinOrPin ||
      fromDate ||
      toDate ||
      addStoreCode ||
      comments
    ) {
      if (actionType && actionType.value !== 'Derange MIN') {
        let addData = {
          'action/type': actionType && actionType,
          'min/pin': min && min,
          description: 'NA',
          'replaceMin/pin': replaceMinOrPin ? replaceMinOrPin : 'NA',
          fromDate: fromDate ? fromDate : 'NA',
          toDate: toDate ? toDate : 'NA',
          lineStatus: 'Request For',
          clearancePricing: 'Include in',
          clearDepotBy: 'Week-4',
        }
        console.log(addData)
        if (importedData) {
          setImportedData((prevState: any) => {
            let newData = [...prevState]
            newData.push(addData)
            return newData
          })
        } else {
          setImportedData([addData])
        }
        // let newData = importedData ? [...importedData]: []
        // newData.push(addData)
        // console.log(newData);
        handleActionTypeDialogClose()
      }
    }
  }
  // console.log('minValue', minValue)
  // getProductServiceByItemnumber &&
  //   getProductServiceByItemnumber(minValue)
  //     .then((res: any) => {
  //       console.log('Item res 100001498', res)
  //     })
  //     .catch((err: any) => {
  //       console.log('Item err 100001498', err)
  //     })

  const renderApiCall = (
    values: any,
    supplierV1: any,
    minValue: any,
    type: any,
    comment: any,
    newnoofrangestoreNewMin: any,
    storecodeNewMin: any
  ) => {
    var minVal = 1000000000000
    var max = 9999999999999
    var rand = Math.floor(minVal + Math.random() * (max - minVal))
    console.log('render id check', rand)
    const formData: any = {
      _idCheck: rand,
      min: min ? min : minValue,
      pin: '',
      packquantity: '',
      description: '',
      actionType: type,
      legacyItemNumbers: '',
      supplierId: '',
      comments: comments,
      storeCode: 'NA',
      numberOfRangeStores: 'NA',
      lineStatus:
        actionTypeSelected === 'Delist Product (MIN)'
          ? 'Request For Stock Count'
          : 'Draft',
      ingredientMin: 'NA',
      man: '',
      onlineCFC: 'Y',
      local: 'Y',
      ownBrand: 'Y',
      onlineStorePick: 'Y',
      wholesale: 'Y',
      clearDepotBy: '',
      lastPoDate: '',
      openPos: '',
      includeInClearancePricing: 'NA',
      includeInStoreWastage: 'NA',
    }
    console.log('values-promise.allSettled', values)
    values.map((val: any) => {
      if (val.status === 'rejected') {
        setIsProgressLoader(false)
        return
      } else {
        console.log('FULLFILLED', val.statu)
      }
    })
    // console.log('JSON_VALUE1', JSON.stringify(values[1].value.data))
    const productServieResponse1 = values[0]
    const rangeIdMinV1 = values[1].value.data //

    if (productServieResponse1.status !== 'rejected') {
      formData.pin = productServieResponse1.value.data.packs[0].packNumber //pin
      formData.man = productServieResponse1.value.data.parentItemNumber // parentItemNumber
      formData.packquantity = parseInt(
        productServieResponse1.value.data.packs[0].packQuantity
      ) // Packquantity
      formData.description = productServieResponse1.value.data.itemDescription // itemDescription
      formData.legacyItemNumbers =
        productServieResponse1.value.data.legacyItemNumbers //legacyItemNumbers
    }
    formData.supplierId = supplierV1
    formData.lastPoDate = rangeIdMinV1.lastPODate //rangeresetIdMinService
    formData.openPos = rangeIdMinV1.totalOpenPurchaseOrders //rangeresetIdMinService
    formData.clearDepotBy = rangeIdMinV1.depotClearWeek //rangeresetIdMinService

    if (type === 'Delist MIN') {
      formData.comments = comments === '' ? comment : comments
      if (productServieResponse1.status !== 'rejected') {
        // formData.ingredientMin = parseInt(
        //   productServieResponse1.value.data.ingredients.length
        // )
      }
      if (values[3].value) {
        if (
          values[3].value.data.ItemDetails[0].hasOwnProperty(
            'ingredientDetails'
          )
        ) {
          formData.ingredientDetails =
            values[3].value.data.ItemDetails[0].ingredientDetails
          formData.ingredientMin =
            values[3] &&
            values[3].value.data.ItemDetails[0].ingredientDetails.length
        }
        if (values[3].value.data.ItemDetails) {
          formData.noOfRecipeMin = values[3].value.data.ItemDetails.length
          formData.recipeDetails = values[3].value.data.ItemDetails
        }
      }

      formData.includeInClearancePricing = rangeIdMinV1.clearancePriceCheck //rangeresetId
      formData.includeInStoreWastage = rangeIdMinV1.clearancePriceCheck //rangeresetId
    }
    if (type === 'New MIN') {
      formData.storeCode = storecodeNewMin.join(',')
      formData.numberOfRangeStores = newnoofrangestoreNewMin
      formData.comments = comments === '' ? comment : comments
    }
    if (type === 'Delist Ingredient MIN') {
      formData.comments = comments === '' ? comment : comments
    }
    if (type === 'New Ingredient MIN') {
      formData.comments = comments === '' ? comment : comments
    }

    if (importedData && importedData.length > 0) {
      setImportedData((prevState: any) => {
        return [...prevState, formData]
      })
    } else {
      setImportedData([formData])
    }
    console.log('formData', formData)
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: `${minValue} ${allMessages.success.itemIdSuccess}`,
      life: life,
      className: 'login-toast',
    })
    setIsProgressLoader(false)
    setActionType('')
  }

  const getAndCheckItemNumber = (
    minValue: any,
    type: any,
    index: any,
    comment: any,
    newnoofrangestoreNewMin: any,
    storecodeNewMin: any
  ) => {
    setIsProgressLoader(true)
    const formData: any = {
      min: min ? min : minValue,
      pin: '',
      packquantity: '',
      description: '',
      actionType: type,
      legacyItemNumbers: '',
      supplierId: '',
      comments: comments,
      storeCode: 'NA',
      numberOfRangeStores: 'NA',
      lineStatus:
        actionTypeSelected === 'Delist Product (MIN)'
          ? 'Request For Stock Count'
          : 'Draft',
      ingredientMin: 'NA',
      man: '',
      onlineCFC: 'Y',
      local: 'Y',
      ownBrand: 'Y',
      onlineStorePick: 'Y',
      wholesale: 'Y',
      depoClearWeek: '',
      includeInClearancePricing: '',
    } //dummy object

    Promise.allSettled([
      //Dont change sequence order below api calls
      getProductServiceByItemnumber(minValue),
      // getRangeByRangeResetId('3400'),
      // getRangeByIdAndMinNumber('3400', '500000033'),
      getRangeByIdAndMinNumber('3400', '500000033'),
      getProductSupplierServiceByItemnumber(minValue),
      // getProductCompositionServiceByItemnumber()
      getProductCompositionServiceByItemnumber('112056236'),
    ])
      .then((values: any) => {
        console.log('promise1, promise2', 'promise3', values)
        if (values[0].status === 'rejected') {
          console.log('getProductServiceByItemnumber', 'Item not found')
          setIsProgressLoader(false)
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: `${minValue} ${values[0].reason.response.data.errorMessage}`,
            life: life,
            className: 'login-toast',
          })
          return
        }
        const [rREventId, productV1, ProductSupp] = values
        let values3Supplier = values[2].value.data
        getSupplierServiceBySupplierId(
          values3Supplier.itemSuppliers[0].supplierId
        )
          .then((res: any) => {
            console.log('Nested APi Success ', res)
            let supplierV1 = res.data.supplierName
            renderApiCall(
              values,
              supplierV1,
              minValue,
              type,
              comment,
              newnoofrangestoreNewMin,
              storecodeNewMin
            )
          })
          .catch((err: any) => {
            setIsProgressLoader(false)
            renderApiCall(
              values,
              'No data found',
              minValue,
              type,
              comment,
              newnoofrangestoreNewMin,
              storecodeNewMin
            )
            console.log('Nested APi Error', err)
          })
      })
      .catch((err: any) => {
        setIsProgressLoader(false)
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: `${minValue} ${allMessages.error.itemIdError}`,
          life: life,
          className: 'login-toast',
        })

        console.log('promise1, ERRor', err)
      })
  }

  const handleManualRAF = () => {
    // onPageLoadStoreCode()
    if (min === '') {
      handleActionTypeDialogOpen()
      return
    }
    console.log('clicked')

    handleActionTypeDialogClose()
    // return
    if (actionType.value === 'Delist Product (MIN)') {
      if (min !== '') {
        console.log('hello')
        getAndCheckItemNumber(min, 'Delist MIN', '', '', 'NA', 'NA')
        // const formData = {
        //   actionType: actionType.value,
        //   itemNumber: min,
        //   comments: comments,
        //   lineStatus: 'Request For Stock Count',
        //   man: 'NA',
        //   ingredientMin: 'NA',
        //   pin: '111111',
        //   description: 'Blahh Blahh',
        //   replaceMin: 'NA',
        //   replaceMinDescription: 'NA',
        //   existingSupplier: 'Futura-1001098',
        //   existingSupplierSite: 'Tetbury-9866',
        //   numberOfRangeStores: 'NA',
        //   storeCode: 'NA',
        // }
        // if (importedData && importedData.length > 0) {
        //   setImportedData((prevState: any) => {
        //     return [...prevState, formData]
        //   })
        // } else {
        //   setImportedData([formData])
        // }
      }
    } else if (actionType.value === 'New Product (MIN)') {
      if (min !== '') {
        console.log('hello')
        getAndCheckItemNumber(min, 'New MIN', '', '', '', selectedStore)
        // const formData = {
        //   actionType: actionType.value,
        //   min: min,
        //   comments: comments,
        //   lineStatus: 'Draft',
        //   man: 'NA',
        //   ingredientMin: 'NA',
        //   pin: '111111',
        //   description: 'Blahh Blahh',
        //   replaceMin: 'NA',
        //   replaceMinDescription: 'NA',
        //   existingSupplier: 'Futura-1001098',
        //   existingSupplierSite: 'Tetbury-9866',
        //   numberOfRangeStores: noOfStores ? noOfStores : 'NA',
        //   storeCode: storeCode ? storeCode : 'NA',
        // }
        // if (importedData && importedData.length > 0) {
        //   setImportedData((prevState: any) => {
        //     return [...prevState, formData]
        //   })
        // } else {
        //   setImportedData([formData])
        // }
      }
    } else if (actionType.value === 'Delist Ingredient (MIN)') {
      getAndCheckItemNumber(min, 'Delist Ingredient MIN', '', '', 'NA', 'NA')
    } else if (actionType.value === 'New Ingredient (MIN)') {
      getAndCheckItemNumber(min, 'New Ingredient MIN', '', '', 'NA', 'NA')
    }
  }

  const handleProductListSave = () => {
    console.log('handleProductListSave', importedData)
  }

  const [storeValue, setStoreValue] = useState<any>(null)

  const handleChangeStore = (event: any) => {
    const {
      target: { value },
    } = event
    setStoreValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const isAllSelected =
    storeCode.length > 0 && selectedStore.length === storeCode.length

  const handleChange = (event: any) => {
    const value = event.target.value
    if (value[value.length - 1] === 'all') {
      setSelectedStore(
        selectedStore.length === storeCode.length ? [] : storeCode
      )
      return
    }
    setSelectedStore(value)
  }

  const storeCodePopup = () => {
    return (
      <FormControl className={classes.formControl}>
        <Select
          labelId="mutiple-select-label"
          multiple
          value={selectedStore}
          onChange={handleChange}
          renderValue={(selectedStore: any) => selectedStore.join(', ')}
          MenuProps={MenuProps}
          input={
            <OutlinedInput margin="dense" className={classes.inputFields} />
          }
        >
          {/* <MenuItem 202px 415px
            value="all"
            classes={{
              root: isAllSelected ? classes.selectedAll : '',
            }}
          >
            <ListItemIcon>
              <Checkbox
                classes={{ indeterminate: classes.indeterminateColor }}
                checked={isAllSelected}
                indeterminate={
                  selectedStore.length > 0 && selectedStore.length < storeCode.length
                }
              />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.selectAllText }}
              primary="Select All"
            />
          </MenuItem> */}

          {storeCode.map((option: string) => (
            <MenuItem key={option} value={option}>
              <ListItemIcon>
                <Checkbox
                  className="selectdrop"
                  checked={selectedStore.indexOf(option) > -1}
                />
              </ListItemIcon>
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      // <Select
      //   value={storeValue}
      //   onChange={handleChangeStore}
      //   input={<OutlinedInput margin="dense" className={classes.inputFields} />}
      // >
      //   {storeCode.map((type: any) => {
      //     return (
      //       <MenuItem
      //         className={classes.muiSelect}
      //         value={type.value}
      //         key={type.value}
      //       >
      //         {type.label}
      //       </MenuItem>
      //     )
      //   })}
      // </Select>
    )
  }

  const actionTypeDialog = (
    <Dialog
      open={openActionTypeDialog}
      onClose={handleActionTypeDialogClose}
      fullWidth
      classes={{ paperFullWidth: classes.placeholderDialog }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //   width: small ? '500px' : '260px',
          // height: "250px",
          //border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        {/* <Box
          sx={{
            display: 'flex',
            height: 30,
            flexDirection: 'row',
            borderRadius: 10,
          }}
          //   className={classes.dialogTitle}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="subtitle1">Add {actionType}</Typography>
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
              //   className={classes.dialogCloseButton}
              onClick={handleActionTypeDialogClose}
            >
              <b>X</b>
            </button>
          </Box>
        </Box> */}
        <DialogHeader
          title={`Add ${actionType && actionType.value}`}
          onClose={handleActionTypeDialogClose}
        />

        {/* <Box sx={{ p: 1 }}>
          <Typography variant="body2">Add {actionType}</Typography>
        </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <table cellPadding={'10px'}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <thead
                  style={{
                    fontSize: '12px',
                    textAlign: 'left',
                  }}
                >
                  <tr>
                    <th>{actionType}</th>
                    <th>
                      <TextField
                        variant="outlined"
                        // className={classes.addActionFields}
                        size="small"
                        value={min}
                        onChange={(e: any) => setMinOrPin(e.target.value)}
                        required
                      />
                    </th>
                  </tr>
                  <tr>
                    <th>Replace MIN/PIN</th>
                    <th>
                      <TextField
                        variant="outlined"
                        // className={classes.addActionFields}
                        size="small"
                        value={replaceMinOrPin}
                        onChange={(e: any) =>
                          setReplaceMinOrPin(e.target.value)
                        }
                      />
                    </th>
                  </tr>

                  <tr>
                    <th>Effective Date(from)</th>
                    <th>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={fromDate}
                        onChange={handleFromDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{
                          height: '35px',
                        }}
                        size="small"
                      />
                      
                    </th>
                  </tr>

                  <tr>
                    <th>Effective Date(to)</th>
                    <th>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        inputVariant="outlined"
                        value={toDate}
                        onChange={handleToDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{
                          height: '35px',
                        }}
                        size="small"
                      />
                      
                    </th>
                  </tr>

                  {actionType === 'Derange MIN' && (
                    <tr>
                      <th>Store Code</th>
                      <th>
                        <TextField
                          variant="outlined"
                          //   className={classes.addActionFields}
                          size="small"
                          value={addStoreCode}
                          onChange={(e: any) => setAddStoreCode(e.target.value)}
                          required
                        />
                      </th>
                    </tr>
                  )}

                  <tr>
                    <th>Comments</th>
                    <th>
                      <TextField
                        variant="outlined"
                        // className={classes.addActionFields}
                        size="small"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      />
                    </th>
                  </tr>
                </thead>
              </MuiPickersUtilsProvider>

            </table>
          </Box>

          <Box
            sx={{
              display: 'flex',
              p: 3,
              justifyContent: 'right',
            }}
          >
            <Button
              // className={classes.submitButtons}
              type="submit"
            >
              Add
            </Button>
          </Box> */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" color="primary">
              {`Add ${actionType && actionType.value}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              p: 1,
              width: '100%',
            }}
          >
            {actionType && actionType.value === 'Delist Product (MIN)' && (
              <>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Delist Product (MIN)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}

            {actionType && actionType.value === 'New Product (MIN)' && (
              <>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      New Product (MIN)
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      New no. of Range Stores
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={noOfStores}
                        onChange={(e: any) => setNoOfStores(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={noOfStores}
                        onChange={(e: any) => setNoOfStores(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Store Code
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <select
                        placeholder="--Select--"
                        value={storeCode}
                        onChange={(e: any) => setStoreCode(e.target.value)}
                        style={{ width: '160px' }}
                      >
                        <option value="001">Store-001</option>
                      </select> */}
                      {storeCodePopup()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
            {actionType && actionType.value === 'Delist Ingredient (MIN)' && (
              <>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Delist Ingredient (MIN)
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        // className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
            {actionType && actionType.value === 'New Ingredient (MIN)' && (
              <>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      New Ingredient (MIN)
                      <span style={{ color: 'red' }}>*</span>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={min}
                        onChange={(e: any) => setMin(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    // flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Comments
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      {/* <input
                        type="text"
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                      /> */}
                      <OutlinedInput
                        value={comments}
                        onChange={(e: any) => setComments(e.target.value)}
                        className={classes.inputFields}
                      />
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Box sx={{ p: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleManualRAF} //De-list save
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )

  const existingProducts = (
    <form style={{ width: '100%' }}>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ alignItems: 'center' }}
      >
        <Grid item container xl={8} lg={8} md={8} sm={12} xs={12}>
          <DataTable
            value={existingSearchFields}
            scrollable
            showGridlines
            style={{
              height: '100%',
              width: '100%',
            }}
            className="p-datatable-sm"
          >
            {delistExistingProductsCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  // style={{
                  //   width: col.width,
                  //   fontSize: '0.9rem',
                  //   padding: '0.5rem',
                  // }}
                  // headerStyle={{
                  //   backgroundColor: teal[900],
                  //   color: 'white',
                  //   width: col.width,
                  //   fontSize: '0.9rem',
                  //   padding: '0.5rem',
                  // }}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                  body={
                    // (col.field === "productId" && productIdTemplate)
                    // ||
                    // (col.field === "storeCode" && storeCodeTemplate)
                    // ||
                    // (col.field === "supplier" && supplierTemplate)
                    // ||
                    // (col.field === "supplierSiteNumber" && supplierSiteNumberTemplate)
                    // ||
                    col.field === 'local' && localTemplate
                    // ||
                    // (col.field === "pin" && pinTemplate)
                    // ||
                    // (col.field === "buyingMinIngredients" && buyingMinIngredientsTemplate)
                  }
                />
              )
            })}
          </DataTable>
        </Grid>
        <Grid
          item
          container
          xl={4}
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{ textAlign: 'center' }}
          spacing={2}
        >
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Button variant="contained" color="primary" type="submit">
              ADD
            </Button>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
            OR
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadDialogOpen}
            >
              Upload File
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )

  const submitNewProduct = (e: any) => {
    e.preventDefault()
    if (newProductId) {
      var minVal = 1000000000000
      var max = 9999999999999
      var rand = Math.floor(minVal + Math.random() * (max - minVal))
      let newProductData: any = {
        _idCheck: rand,
        productId: newProductId,
        description: '',
        'department/Category': 'Household & Pet Food/Pet Foods',
        lineStatus: 'Draft',
        type: 'New',
        clearancePricing: 'NA',
        clearDepotBy: 'NA',
      }
      if (importedData) {
        setImportedData((prevState: any) => {
          let newData = [...prevState]
          newData.push(newProductData)
          console.log(newData)
          return newData
        })
      } else {
        setImportedData([newProductData])
      }
    }
  }

  const newProducts = (
    <form style={{ width: '100%' }} onSubmit={submitNewProduct}>
      <Grid
        item
        container
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        style={{ alignItems: 'end' }}
        spacing={2}
      >
        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
          New Products
          <br />
          <input
            type="text"
            required
            // className={classes.placeholderCountStyle}
            style={{
              width: small ? '88%' : '100%',
            }}
            value={newProductId}
            onChange={(e: any) => setNewProductId(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={6}
          xs={12}
          style={{ textAlign: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: '80px' }}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
    </form>
  )

  const submitPlaceholderProducts = (e: any) => {
    e.preventDefault()
    if (placeholderCount && supplierCode && salesChannels.length > 0) {
      let placeholderData: any = []
      for (var i = 0; i < placeholderCount; i++) {
        placeholderData.push({
          productId: `rand${Math.floor(100 + Math.random() * 900)}`,
          description: '',
          'department/Category': 'Household & Pet Food/Pet Foods',
          lineStatus: 'Draft',
          type: 'Placeholder',
          clearancePricing: 'NA',
          clearDepotBy: 'NA',
        })
      }
      console.log(placeholderData)
      if (importedData) {
        setImportedData((prevState: any) => {
          let newData = [...prevState]
          placeholderData.map((d: any) => {
            newData.push(d)
          })
          return newData
        })
      } else {
        setImportedData(placeholderData)
      }
    }
  }

  useEffect(() => {
    console.log('importedData', importedData)
    console.log('productListCols Length', productListCols)
  }, [importedData])

  //   const placeholderProducts = (
  //     <Grid
  //       item
  //       container
  //       xl={12}
  //       lg={12}
  //       md={12}
  //       sm={12}
  //       xs={12}
  //       style={{
  //         alignItems: 'center',
  //         padding: '10px',
  //       }}
  //       spacing={2}
  //     >
  //       <Grid item container md={7} sm={12} xs={12}>
  //         <Grid item xs={8}>
  //           <Typography variant="subtitle2" color="primary">
  //             How many new lines do you wish to enter?
  //             <br />
  //             <input
  //               type="text"
  //               required
  //               // className={classes.placeholderCountStyle}
  //               style={{
  //                 width: small ? '88%' : '100%',
  //               }}
  //               value={placeholderCount}
  //               onChange={(e: any) => setPlaceholderCount(e.target.value)}
  //             />
  //           </Typography>
  //         </Grid>
  //         <Grid
  //           item
  //           //   xl={2}
  //           //   lg={2}
  //           //   md={2}
  //           //   sm={6}
  //           xs={4}
  //           style={{ textAlign: 'center' }}
  //         >
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             type="submit"
  //             style={{ width: '80px' }}
  //           >
  //             ADD
  //           </Button>
  //         </Grid>
  //       </Grid>

  //       <Grid item sm={1} xs={12}>
  //         <Typography variant="subtitle2" color="primary">
  //           OR
  //         </Typography>
  //       </Grid>
  //       <Grid item md={3} sm={12} xs={12}>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           // type="submit"
  //           // style={{ width: '80px' }}
  //         >
  //           Upload File
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   )

  // const handleTableStatusChange = (rowData: any, e: any) => {
  //   let newData: any = []
  //   importedData.map((d: any) => {
  //     if (d._idCheck === rowData._idCheck) {
  //       let selectValue = d
  //       selectValue.lineStatus = e.target.value
  //       newData.push(selectValue)
  //     } else {
  //       newData.push(d)
  //     }
  //   })
  //   console.log(newData)
  //   setImportedData(newData)
  // }

  useEffect(() => {
    console.log('selected product list', selectedProductListItems)
  }, [selectedProductListItems])

  useEffect(() => {
    console.log('replacement list', replacementAssociationProduct)
  }, [replacementAssociationProduct])
  const productListTable = (
    <Grid
      item
      container
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      style={{ alignItems: 'center', paddingTop: '20px' }}
      spacing={2}
    >
      <Grid item xl={7} lg={7} md={7} sm={5} xs={12}>
        <Typography variant="subtitle1" color="primary">
          Product List
        </Typography>
      </Grid>
      <Grid item container xl={5} lg={5} md={5} sm={5} xs={12} spacing={2}>
        <Grid item xl={8} lg={8} md={8} sm={8} xs={7}>
          {/* <FormControl
            variant="outlined"
            style={{
              width: '90%',
            }}
          > */}
          {/* {!bulkActions && (
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{
                  color: 'white',
                  fontSize: '14px',
                }}
              >
                BULK ACTIONS
              </InputLabel>
            )} */}
          {/* <InputLabel>Bulk Actions</InputLabel>

            <Select
              value={bulkActions}
              // displayEmpty
              // inputProps={{ 'aria-label': 'Without label' }}
              onChange={(e: any) => setBulkActions(e.target.value)}
              className={classes.bulkActionSelect}
              // input={
              //   <OutlinedInput
              //     margin="dense"
              //     className={classes.bulkActionSelect}
              //     placeholder="BULK ACTIONS"
              //   />
              // }
            >
              
              {massActions.map((action: any) => {
                return (
                  <MenuItem value={action.value} key={action.value}>
                    {action.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl> */}
          <Typography color="primary">
            <AutocompleteSelect
              value={bulkActions}
              options={massActions}
              onChange={handleBulkActions}
              placeholder="Bulk Actions"
            />
          </Typography>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={5}>
          <Button variant="contained" color="primary">
            Refresh
          </Button>
        </Grid>
      </Grid>

      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DataTable
            value={importedData && importedData}
            className="p-datatable-sm"
            // paginator
            // rows={10}
            // alwaysShowPaginator={false}
            // editMode="cell"
            selectionMode="checkbox"
            selection={selectedProductListItems}
            onSelectionChange={(e: any) => {
              setSelectedProductListItems(e.value)
              setReplacementAssociationProduct(e.value)
            }}
            showGridlines
            scrollable
            rowHover
          >
            <Column
              selectionMode="multiple"
              headerStyle={{
                width: '50px',
                color: 'white',
                backgroundColor: teal[900],
              }}
            ></Column>
            {/* <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column> */}
            {productListCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  body={
                    (col.field === 'lineStatus' && lineStatusTemplate) ||
                    (col.field === 'includeInClearancePricing' &&
                      includeInClearancePricingTemplate) ||
                    (col.field === 'ingredientMin' && ingredientMinTemplate) ||
                    (col.field === 'noOfRecipeMin' && recipeMinTemplate) ||
                    (col.field === 'clearDepotBy' && clearDepotByTemplate) ||
                    (col.field === 'existingSupplier' &&
                      existingSupplierProductListTemplate) ||
                    (col.field === 'local' && localTemplate) ||
                    (col.field === 'onlineCFC' && onlineCFCTemplate) ||
                    (col.field === 'onlineStorePick' &&
                      onlineStorePickTemplate) ||
                    (col.field === 'wholesale' && wholesaleTemplate) ||
                    (col.field === 'effectiveDateFrom' &&
                      effectiveDateFromProductTableTemplate) ||
                    (col.field === 'effectiveDateTo' &&
                      effectiveDateToProductTableTemplate) ||
                    (col.field === 'finalStopOrderDate' &&
                      finalStopOrderDateTemplate) ||
                    (col.field === 'systemSuggestedStopOrderDate' &&
                      systemGeneratedStopOrderDateTemplate) ||
                    (col.field === 'lastPoDate' && lastPoDateTemplate) ||
                    (col.field === 'includeInStoreWastage' &&
                      includeInStoreWastageTemplate) ||
                    (col.field === 'supplierCommitment' &&
                      supplierCommitmentTemplate) ||
                    (col.field === 'currentNoOfRangedStores' &&
                      currentNoOfRangeStoresTemplate) ||
                    (col.field === 'depotStockUnit' && depotStockTemplate)
                    //  ||
                    // (col.field === 'comments' && commentsTemplate)
                  }
                  // style={{
                  //   width: col.width,
                  //   fontSize: '0.8rem',
                  //   padding: '8px',
                  // }}
                  // headerStyle={{
                  //   color: 'white',
                  //   backgroundColor: teal[900],
                  //   width: col.width,
                  //   fontSize: '0.9rem',
                  //   padding: '8px',
                  // }}
                  bodyStyle={tableBodyStyle(col.width)}
                  headerStyle={tableHeaderStyle(
                    col.width,
                    theme.palette.primary.main
                  )}
                />
              )
            })}
          </DataTable>
        </MuiPickersUtilsProvider>
      </Grid>
      {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <button
        //  className={classes.backButton}
        >
          <Typography variant="subtitle1">View More Columns</Typography>
        </button>
      </Grid> */}
    </Grid>
  )

  const handlePlaceholderDialogOpen = () => {
    setOpenPlaceholderDialog(true)
  }
  const handlePlaceholderDialogClose = () => {
    setOpenPlaceholderDialog(false)
  }

  const [openReplacementAssDialog, setOpenReplacementAssDialog] =
    useState(false)

  const handleReplacemantAssociationDialogOpen = () => {
    setOpenReplacementAssDialog(true)
  }
  const handleReplacemantAssociationDialogClose = () => {
    setOpenReplacementAssDialog(false)
  }

  console.log('placeholderProducts CHeck', placeholderProducts)

  const handlePlaceholderAdd = (count: any) => {
    if (count != 0) {
      console.log('adding ', count)
      const newData: any = []
      for (var i = 0; i < count; i++) {
        var minVal = 1000000000000
        var max = 9999999999999
        var rand = Math.floor(minVal + Math.random() * (max - minVal))

        newData.push({
          _idCheck: rand,
          actionType: 'Placeholder MIN',
          min: 'NA',
          comments: '',
          lineStatus: 'Draft',
          man: 'NA',
          ingredientMin: 'NA',
          pin: 'NA    ',
          description: '',
          replaceMin: 'NA',
          replaceMinDescription: 'NA',
          existingSupplier: '',
          existingSupplierSite: '',
          numberOfRangeStores: '',
          storeCode: '',
          ownBrand: 'Y',
          barcode: i === 0 ? '5010228012933' : '501022801293' + i,
          packquantity: '',
          local: 'Y',
          onlineCFC: 'Y',
          onlineStorePick: 'Y',
          wholesale: 'Y',
        })
      }

      console.log(newData)
      if (placeholderProducts && placeholderProducts.length > 0) {
        setPlaceholderProducts((prevState: any) => {
          return [...prevState, ...newData]
        })
      } else {
        setPlaceholderProducts(newData)
      }
    }
  }
  const handleReplacementAssAdd = (count: any) => {
    if (count != 0) {
      console.log('adding ', count)
      const newData: any = []
      for (var i = 0; i < count; i++) {
        var minVal = 1000000000000
        var max = 9999999999999
        var rand = Math.floor(minVal + Math.random() * (max - minVal))

        newData.push({
          _idCheck: rand,
          delist_min_pin: '111913101',
          replace_min_pin: '148759650',
          effectiveDateFrom: null,
          effectiveDateTo: null,
          comments: 'Hello',
        })
      }

      console.log(newData)
      if (
        replacementAssociationProduct &&
        replacementAssociationProduct.length > 0
      ) {
        setReplacementAssociationProduct((prevState: any) => {
          return [...prevState, ...newData]
        })
      } else {
        setReplacementAssociationProduct(newData)
      }
    }
  }

  // const removeReplaceAssociate = () => {
  //   let _tasks = replacementAssociationProduct.filter(
  //     (value: any) => !selectedReplaceAssData.includes(value)
  //   )
  //   console.log(_tasks)
  //   setReplacementAssociationProduct(_tasks)
  //   setSelectedReplaceAssData(null)
  // }

  useEffect(() => {
    console.log('selectedReplaceAssData', selectedReplaceAssData)
  }, [selectedReplaceAssData])

  const removePlaceholder = () => {
    if (
      selectedPlaceholderData.length < 1 ||
      selectedPlaceholderData === null
    ) {
      return
    }

    setIsProgressLoader(true)
    let _tasks = placeholderProducts.filter(
      (value: any) => !selectedPlaceholderData.includes(value)
    )

    // let _bar = barCodeExists.map((val: any) => {
    //   return selectedPlaceholderData.filter((fil: any) => {
    //     return val.barcode !== fil.barcode
    //   })
    // })
    // if (_bar && _bar.length > 0 && _bar[0].length === 0) {
    //   setBarCodeExists([])
    // }

    let barExistsUniq = barCodeExists.filter((array: any) => {
      return selectedPlaceholderData.some((filter: any) => {
        return array.barcode != filter.barcode
      })
    })

    console.log(_tasks)
    console.log(barExistsUniq)
    setBarCodeExists(barExistsUniq)
    // setBarCodeDoesnotExists(_bar)
    setPlaceholderProducts(_tasks)
    setSelectedPlaceholderData(null)
    setTimeout(() => {
      setIsProgressLoader(false)
    }, 1000)
  }

  useEffect(() => {
    console.log('barCodeExists', barCodeExists)
    console.log('barCodeDoesnotExists', barCodeDoesnotExists)
  }, [barCodeExists, barCodeDoesnotExists])

  const handlePlaceholderSave = () => {
    setIsProgressLoader(true)
    let arrEmpty: any = []
    setBarCodeExists(arrEmpty)
    setBarCodeDoesnotExists(arrEmpty)

    placeholderProducts.map((val: any) => {
      getProductServiceByItemnumber(val.barcode)
        .then((res: any) => {
          console.log('Success', res)
          setBarCodeExists((prevState: any) => {
            return [
              ...prevState,
              {
                barcode: res.data.gtins[0].id,
                minNum: res.data.itemNumber,
              },
            ]
          })
        })
        .catch((err: any) => {
          console.log('ERror')
          setBarCodeDoesnotExists((prevState: any) => {
            return [
              ...prevState,
              {
                barcode: val.barcode,
              },
            ]
          })
        })
    })
    setTimeout(() => {
      setIsProgressLoader(false)
    }, 1000)
    if (barCodeDoesnotExists.length === placeholderProducts.length) {
      handlePlaceholderDialogClose()

      setPlaceholderCount('')
      setPlaceholderProducts([])
      setBarCodeExists(arrEmpty)
      setBarCodeDoesnotExists(arrEmpty)
      if (importedData && importedData.length > 0) {
        let newData = [...importedData, ...placeholderProducts]
        console.log(newData)
        setImportedData(newData)
      } else {
        setImportedData(placeholderProducts)
      }
    }
  }

  const handlePlaceholderUploadOpen = () => {
    setOpenPlaceholderUpload(true)
  }
  const handlePlaceholderUploadClose = () => {
    setOpenPlaceholderUpload(false)
    setPlaceholderFile('')
  }

  const handlePlaceholderUpload = (event: any) => {
    setPlaceholderFile(event.target.files[0])
  }
  const handlePlaceholderFileUpload = () => {
    console.log('handlePlaceholderFileUpload', 'Clicked')
    if (
      placeholderFile &&
      (placeholderFile.type === 'text/csv' ||
        placeholderFile.type === 'application/vnd.ms-excel' ||
        placeholderFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
      console.log(placeholderFile)
      import('xlsx').then((xlsx) => {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          const wb = xlsx.read(event.target.result, { type: 'array' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = xlsx.utils.sheet_to_json(ws)
          console.log(data)
          const data1 = xlsx.utils.sheet_to_json(ws, { header: 1 })
          const cols: any = data1[0]

          let newData = data.map((d: any, index: any) => {
            var minVal = 1000000000000
            var max = 9999999999999
            var rand = Math.floor(minVal + Math.random() * (max - minVal))
            return {
              _idCheck: rand,
              actionType: 'Placeholder MIN',
              min: `0${index}00${index}`,
              comments: d[cols[12]] ? d[cols[12]] : '',
              lineStatus: 'Draft',
              man: 'NA',
              ingredientMin: 'NA',
              pin: 'NA    ',
              description: d[cols[0]] ? d[cols[0]] : '',
              replaceMin: 'NA',
              replaceMinDescription: 'NA',
              existingSupplier: d[cols[3]] ? d[cols[3]] : '',
              existingSupplierSite: d[cols[4]] ? d[cols[4]] : '',
              numberOfRangeStores: d[cols[6]] ? d[cols[6]] : '',
              storeCode: d[cols[7]] ? d[cols[7]] : '',
              ownBrand: d[cols[1]] ? d[cols[1]] : '',
              barcode: d[cols[2]] ? d[cols[2]] : '',
              packquantity: d[cols[5]] ? d[cols[5]] : '',
              local: d[cols[8]] ? d[cols[8]] : '',
              onlineCFC: d[cols[9]] ? d[cols[9]] : '',
              onlineStorePick: d[cols[10]] ? d[cols[10]] : '',
              wholesale: d[cols[11]] ? d[cols[11]] : '',
            }
          })

          console.log(newData)
          if (placeholderProducts && placeholderProducts.length > 0) {
            setPlaceholderProducts((prevState: any) => {
              return [...prevState, ...newData]
            })
          } else {
            setPlaceholderProducts([...newData])
          }
        }

        reader.readAsArrayBuffer(placeholderFile)
      })
      handlePlaceholderUploadClose()
    } else {
      alert('Upload correct file')
      setPlaceholderFile(null)
    }
  }

  const uploadPlaceholderDialog = (
    <Dialog
      open={openPlaceholderUpload}
      onClose={handlePlaceholderUploadClose}
      fullWidth
      classes={{
        paperFullWidth: classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? '400px' : '260px',
          // height: "250px",
          // border: '3px solid green',
          borderRadius: 5,
        }}
      >
        <DialogHeader
          title={`Upload Placeholder Products`}
          onClose={handlePlaceholderUploadClose}
        />

        <Box sx={{ p: 1 }}>
          <Typography variant="body2" color="primary">
            Upload Placeholder Products
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              value={placeholderFile ? placeholderFile.name : ''}
              onClick={() =>
                document.getElementById('placeholderFile')!.click()
              }
              className={classes.uploadTextfield}
              placeholder="No file selected"
              readOnly
            />
            <Input
              type="file"
              id="placeholderFile"
              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handlePlaceholderUpload}
              required
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById('placeholderFile')!.click()
              }
              className={classes.uploadButton}
              style={{ width: '60%' }}
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
            <Typography color="primary">
              Supported file type in MS Excel
              <i className="pi pi-file-excel" style={{ fontSize: '18px' }}></i>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            p: 3,
            justifyContent: 'right',
          }}
        >
          <Button
            //   className={classes.submitButtons}
            variant="contained"
            color="primary"
            onClick={handlePlaceholderFileUpload}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const onEditorValueChange = (props: any, value: any) => {
    let updatedProducts = [...props.value]
    updatedProducts[props.rowIndex][props.field] = value
    setPlaceholderProducts(updatedProducts)
  }

  const inputTextEditor = (props: any, field: any) => {
    return (
      <input
        type="text"
        value={props.rowData[field]}
        onChange={(e: any) => onEditorValueChange(props, e.target.value)}
      />
    )
  }

  useEffect(() => {
    console.log('placeholderProducts', placeholderProducts)
  }, [placeholderProducts])

  const onChangePlaceHolderFields = (
    prevState: any,
    field: any,
    rowDataSelected: any,
    eventValue: any
  ) => {
    return prevState.map((obj: any) =>
      obj._idCheck === rowDataSelected._idCheck
        ? Object.assign(obj, { [field]: eventValue })
        : obj
    )
  }

  const ownBrandPlaceholderTemplate = (rowData: any) => {
    console.log('ownBrandPlaceholderTemplate', rowData)
    return (
      <Select
        value={rowData && rowData.ownBrand}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          setPlaceholderProducts((prevState: any) => {
            return onChangeProductTableFields(
              prevState,
              'ownBrand',
              rowData,
              e.target.value
            )
          })
          // setPlaceholderProducts((prevState: any) => {
          //   return prevState.map((obj: any) =>
          //     obj.min === rowData.min
          //       ? Object.assign(obj, { ownBrand: e.target.value })
          //       : obj
          //   )
          // })
        }}
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
  const barCodePlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData && rowData.barcode}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'barcode',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const descriptionPlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData && rowData.description}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'description',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const [supplierOption, setSupplierOption] = useState<any>([])
  const [siteOption, setSiteOption] = useState<any>([])

  // const [filteredCountries, setFilteredCountries] = useState<any>(null)
  // const [filteredCountries2, setFilteredCountries2] = useState<any>(null)

  const searchCountry = (e: any, type: any) => {
    let event = e
    setTimeout(() => {
      if (type === 'Site') {
        getSupplierSearchByIdNameSupplierAndSite(event.query, type)
          .then((res: any) => {
            if (res.data.SiteInfo.length !== 0) {
              let supplierData = res.data.SiteInfo.map((val: any) => {
                return val.siteName
              })
              setSiteOption(supplierData)
            } else {
              let siteNoData = () => {
                return [
                  {
                    siteName: 'No result found',
                  },
                ]
              }
              setSiteOption(siteNoData)
            }
          })
          .catch((err: any) => {
            console.log('Err')
            setSiteOption([])
          })
      } else {
        getSupplierSearchByIdNameSupplierAndSite(event.query, type)
          .then((res: any) => {
            if (res.data.SupplierInfo.length !== 0) {
              let supplierData = res.data.SupplierInfo.map((val: any) => {
                return val.supplierName
              })
              setSupplierOption(supplierData)
            } else {
              let supplierNoData = () => {
                return [
                  {
                    supplierName: 'No result found',
                  },
                ]
              }
              setSupplierOption(supplierNoData)
            }
          })
          .catch((err: any) => {
            console.log('Err')
            setSupplierOption([])
          })
      }
    }, 250)
  }
  const supplierCodePlaceholderTemplate = (rowData: any) => {
    return (
      <div className="card">
        <AutoCompletePrime
          value={rowData.existingSupplier}
          suggestions={supplierOption}
          className="p-inputtext-sm p-d-block p-mb-2 autoCompletePrimeInput"
          completeMethod={(e: any) => searchCountry(e, 'Supplier')}
          field=""
          placeholder="Search"
          onChange={(e: any) =>
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'existingSupplier',
                rowData,
                // value ? value.label : ''
                e.target.value
              )
            })
          }
        />
      </div>
    )
  }

  //supplierSiteCodePlaceholderTemplate
  const supplierSiteCodePlaceholderTemplate = (rowData: any) => {
    return (
      <div className="card">
        <AutoCompletePrime
          value={rowData.existingSupplierSite}
          suggestions={siteOption}
          completeMethod={(e: any) => searchCountry(e, 'Site')}
          className="p-inputtext-sm p-d-block p-mb-2 autoCompletePrimeInput"
          field=""
          placeholder="Search"
          onChange={(e: any) =>
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'existingSupplierSite',
                rowData,
                // value ? value.label : ''
                e.target.value
              )
            })
          }
        />
      </div>
    )
  }

  const casePackPlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData && rowData.packquantity}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'packquantity',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }
  const newNoOfRangeStorePlaceholderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData && rowData.numberOfRangeStores}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'numberOfRangeStores',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const localPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData && rowData.local}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'local',
                rowData,
                e.target.value
              )
            })
          }
        }}
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
  const onlineCFCPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData && rowData.onlineCFC}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'onlineCFC',
                rowData,
                e.target.value
              )
            })
          }
        }}
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
  const onlineStorePickPlaceholderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData && rowData.onlineStorePick}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'onlineStorePick',
                rowData,
                e.target.value
              )
            })
          }
        }}
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
  const wholeSalePlaceHolderTemplate = (rowData: any) => {
    return (
      <Select
        value={rowData && rowData.wholesale}
        // onChange={(e) => eventHandleDetailsSOT(e)}
        onChange={(e: any) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'wholesale',
                rowData,
                e.target.value
              )
            })
          }
        }}
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

  const commentsPlaceHolderTemplate = (rowData: any) => {
    return (
      <OutlinedInput
        margin="dense"
        className={classes.muiSelect}
        value={rowData && rowData.comments}
        onChange={(e) => {
          if (e.target.value !== null) {
            setPlaceholderProducts((prevState: any) => {
              return onChangeProductTableFields(
                prevState,
                'comments',
                rowData,
                e.target.value
              )
            })
          }
        }}
      />
    )
  }

  const placeholderDialog = (
    <Dialog
      open={openPlaceholderDialog}
      onClose={handlePlaceholderDialogClose}
      fullWidth
      classes={{
        paperFullWidth:
          placeholderProducts && placeholderProducts.length > 0
            ? classes.placeholderDialogFull
            : classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // width: small ? "600px" : "260px",
          // height: "250px",
          //border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        <DialogHeader
          title="Add placeholder Products"
          onClose={handlePlaceholderDialogClose}
        />

        {barCodeExists &&
          barCodeExists.map((val: any) => (
            <Alert
              className={classes.alertMsg}
              style={{ color: '#000' }}
              severity="error"
            >
              <b>• {'\u00A0'}</b> BAR Code <b> '{val.barcode}' </b> is belongs
              to MIN <b> '{val.minNum}' </b>
            </Alert>
          ))}

        {/* {renderAlert()} */}

        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{
            textAlign: 'center',
            padding: '10px',
          }}
          spacing={2}
        >
          <Grid item md={7} sm={12} xs={12}>
            <Typography variant="subtitle2" color="primary">
              How many new lines do you wish to enter?
            </Typography>
          </Grid>
          <Grid item container md={7} sm={12} xs={12}>
            {/* <Grid item container xs={12}> */}

            <Grid item xs={12} sm={8}>
              <Typography variant="subtitle2" color="primary">
                <input
                  type="text"
                  required
                  // className={classes.placeholderCountStyle}
                  style={{
                    width: small ? '88%' : '100%',
                  }}
                  value={placeholderCount}
                  onChange={(e: any) => setPlaceholderCount(e.target.value)}
                />
              </Typography>
            </Grid>
            <Grid item sm={4} xs={12} style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '80px' }}
                onClick={() =>
                  handlePlaceholderAdd(placeholderCount ? placeholderCount : 0)
                }
              >
                ADD
              </Button>
            </Grid>
            {/* </Grid> */}
          </Grid>

          <Grid item md={1} sm={12} xs={12}>
            <Typography variant="subtitle2" color="primary">
              OR
            </Typography>
          </Grid>
          <Grid item md={3} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              // type="submit"
              // style={{ width: '80px' }}
              onClick={handlePlaceholderUploadOpen}
            >
              Upload File
            </Button>
          </Grid>
          {placeholderProducts && placeholderProducts.length > 0 && (
            <Grid
              item
              container
              xs={12}
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '20px',
              }}
            >
              <Grid
                item
                xs={10}
                style={{ textAlign: 'left', paddingBottom: '5px' }}
              >
                <Typography variant="body2" color="primary">
                  Product List {/* placeholder  */}
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ paddingBottom: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePlaceholderAdd(1)}
                >
                  Add Row
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DataTable
                  value={placeholderProducts && placeholderProducts}
                  selectionMode={
                    placeholderProducts > 0 ? 'single' : 'checkbox'
                  }
                  selection={selectedPlaceholderData}
                  onSelectionChange={(e) => setSelectedPlaceholderData(e.value)}
                  // globalFilter={globalFilter}
                  className="p-datatable-sm"
                  //   stateStorage="session"
                  //   stateKey="dt-state-demo-session-eventmanage"
                  showGridlines
                  scrollable
                  scrollHeight="300px"
                  // editMode="cell"
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
                  {placeholderCols.map((col: any, index: any) => {
                    return (
                      <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        body={
                          (col.field === 'ownBrand' &&
                            ownBrandPlaceholderTemplate) ||
                          (col.field === 'barcode' &&
                            barCodePlaceholderTemplate) ||
                          (col.field === 'description' &&
                            descriptionPlaceholderTemplate) ||
                          (col.field === 'existingSupplier' &&
                            supplierCodePlaceholderTemplate) ||
                          (col.field === 'packquantity' &&
                            casePackPlaceholderTemplate) ||
                          (col.field === 'numberOfRangeStores' &&
                            newNoOfRangeStorePlaceholderTemplate) ||
                          (col.field === 'local' && localPlaceholderTemplate) ||
                          (col.field === 'onlineCFC' &&
                            onlineCFCPlaceholderTemplate) ||
                          (col.field === 'onlineStorePick' &&
                            onlineStorePickPlaceholderTemplate) ||
                          (col.field === 'wholesale' &&
                            wholeSalePlaceHolderTemplate) ||
                          (col.field === 'comments' &&
                            commentsPlaceHolderTemplate) ||
                          (col.field === 'existingSupplierSite' &&
                            supplierSiteCodePlaceholderTemplate)
                        }
                        bodyStyle={tableBodyStyle(col.width)}
                        headerStyle={tableHeaderStyle(
                          col.width,
                          theme.palette.primary.main
                        )}

                        // editor={(props: any) =>
                        //   inputTextEditor(props, 'description')
                        // }
                      />
                    )
                  })}
                </DataTable>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={2} style={{ paddingTop: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={removePlaceholder}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item xs={2} style={{ paddingTop: '5px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePlaceholderSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Dialog>
  )

  const delistminpinTemplate = (rowData: any) => {
    return <span>{rowData ? rowData.min : ''}</span>
  }
  const replaceminpinTemplate = (rowData: any) => {
    return <span>{rowData ? rowData.min : ''}</span>
  }

  // Uncomment for Replacement Association

  const [replacePopupData, setReplacePopupData] = useState<any>({
    replaceMin: '',
    effectiveDateFrom: '',
    effectiveDateTo: '',
  })

  useEffect(() => {
    console.log('replacePopupData', replacePopupData)
  }, [replacePopupData])

  //const [replaceError, setReplaceError] = useState<any>(false)

  // const checkReplaceMinClick = () => {
  //   console.log('checkReplaceMinClick', checkReplaceMinClick)
  //   getProductServiceByItemnumber(replacePopupData.replaceMin)
  //     .then((res: any) => {
  //       console.log('Success')
  //       setReplaceError(true)
  //     })
  //     .catch((err: any) => {
  //       setReplaceError(false)
  //       console.log('Error')
  //     })
  // }
  const checkReplaceMinClick = (rowData: any) => {
    console.log('checkReplaceMinClick', checkReplaceMinClick)
    getProductServiceByItemnumber(rowData.replaceMin)
      .then((res: any) => {
        console.log('Success')
        setReplacementAssociationProduct((prevState: any) => {
          // return prevState.map((state: any) => {
          //   if (state._idCheck === rowData._idCheck) {
          //     return {
          //       ...state,
          //       replaceError: true,
          //     }
          //   } else {
          //     return state
          //   }
          // })
          return onChangeProductTableFields(
            prevState,
            'replaceError',
            rowData,
            true
          )
        })
      })
      .catch((err: any) => {
        console.log('Error')
        setReplaceError(true)
        setReplaceErrorMsg(`Invalid Replacement MIN - ${rowData.replaceMin}`)
        setReplacementAssociationProduct((prevState: any) => {
          // return prevState.map((state: any) => {
          //   if (state._idCheck === rowData._idCheck) {
          //     return {
          //       ...state,
          //       replaceError: false,
          //     }
          //   } else {
          //     return state
          //   }
          // })
          return onChangeProductTableFields(
            prevState,
            'replaceError',
            rowData,
            true
          )
        })
      })
  }

  const replaceMin_Pin_Association_Template = (rowData: any) => {
    return (
      <div style={{ display: 'flex' }}>
        <SearchSelect
          value={rowData && rowData.replaceMin}
          // onChange={handleBuyer}
          className={classes.muiSelect}
          onChange={(e: any) => {
            setReplaceError(false)
            setReplacementAssociationProduct((prevState: any) => {
              return prevState.map((state: any) => {
                if (state._idCheck === rowData._idCheck) {
                  return {
                    ...state,
                    replaceMin: e.target.value,
                    replaceError: false,
                  }
                } else {
                  return state
                }
              })
            })
          }}
          // onClick={() => checkReplaceMinClick()}
          onClick={() => checkReplaceMinClick(rowData)}
          styles={{
            fontSize: '12px',
          }}
        />
        <span style={{ marginLeft: '5px', marginTop: '5px' }}>
          <ConfirmCheckSign confirmValue={rowData.replaceError} />
        </span>
      </div>
    )
  }

  const replaceEffectiveDateToTemplate = (rowData: any) => {
    return (
      <DatePicker
        format="dd/MM/yy"
        value={
          rowData &&
          (rowData['effectiveDateTo'] ? rowData['effectiveDateTo'] : null)
        }
        onChange={(date: any) => {
          let newDate = date.toISOString().split('T')[0]
          console.log('new Date', newDate)
          console.log('min', rowData.min)
          console.log(rowData)
          setReplacementAssociationProduct((prevState: any) => {
            // return prevState.map((state: any) => {
            //   if (state._idCheck === rowData._idCheck) {
            //     return {
            //       ...state,
            //       effectiveDateTo: newDate,
            //     }
            //   } else {
            //     return state
            //   }
            // })
            return onChangeProductTableFields(
              prevState,
              'effectiveDateTo',
              rowData,
              newDate
            )
          })
        }}
        TextFieldComponent={(props: any) => (
          <OutlinedInput
            margin="dense"
            onClick={props.onClick}
            value={props.value}
            onChange={props.onChange}
            // className={classes.dateFields}
          />
        )}
        // maxDate={rowData['targetDate']}
        // maxDateMessage={allMessages.error.rafDateError}
        // minDate={new Date()}
      />
    )
  }
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2022-05-18T21:11:54')
  )

  const replaceEffectiveDateFromTemplate = (rowData: any) => {
    return (
      <DatePicker
        format="dd/MM/yy"
        value={
          rowData &&
          (rowData['effectiveDateFrom'] ? rowData['effectiveDateFrom'] : null)
        }
        onChange={(date: any) => {
          let newDate = date.toISOString().split('T')[0]
          console.log('new Date', newDate)
          console.log('min', rowData.min)
          console.log(rowData)
          setReplacementAssociationProduct((prevState: any) => {
            // return prevState.map((state: any) => {
            //   if (state._idCheck === rowData._idCheck) {
            //     return {
            //       ...state,
            //       effectiveDateFrom: newDate,
            //     }
            //   } else {
            //     return state
            //   }
            // })
            return onChangeProductTableFields(
              prevState,
              'effectiveDateFrom',
              rowData,
              newDate
            )
          })
        }}
        TextFieldComponent={(props: any) => (
          <OutlinedInput
            margin="dense"
            onClick={props.onClick}
            value={props.value}
            onChange={props.onChange}
            // className={classes.dateFields}
          />
        )}
        // maxDate={rowData['targetDate']}
        // maxDateMessage={allMessages.error.rafDateError}
        // minDate={new Date()}
      />
    )
  }
  const replacementCommentsTemplate = (rowData: any) => {
    return (
      <TextField
        value={rowData && rowData.comments}
        onChange={(e: any) => {
          setReplacementAssociationProduct((prevState: any) => {
            // return prevState.map((state: any) => {
            //   if (state._idCheck === rowData._idCheck) {
            //     return {
            //       ...state,
            //       comments: e.target.value,
            //     }
            //   } else {
            //     return state
            //   }
            // })
            return onChangeProductTableFields(
              prevState,
              'comments',
              rowData,
              e.target.value
            )
          })
        }}
      />
    )
  }

  const removeReplacements = () => {
    let replacements = replacementAssociationProduct.filter(
      (value: any) => !selectedReplaceAssData.includes(value)
    )
    console.log(replacements)
    setReplacementAssociationProduct(replacements)
    setSelectedReplaceAssData([])
  }

  // const handleReplacementSave = () => {
  //   console.log('handleReplacementSave', importedData)
  //   if (replaceError) {
  //     const data = importedData.map((singleTask: any) => {

  //       let a = replacementAssociationProduct.filter(
  //         (t: any) => t.min !== singleTask.min
  //       )
  //       let b = singleTask
  //       b.replaceMin = replacePopupData.replaceMin
  //       a.push(b)
  //       a.sort((x: any, y: any) => (x.min > y.min ? 1 : y.min > x.min ? -1 : 0))
  //       setImportedData(a)
  //     })
  //   }
  //   setReplaceError(false)
  //   setOpenReplacementAssDialog(false)
  // }

  const handleReplacementSave = () => {
    console.log('handleReplacementSave', importedData)
    let proceedSave = true
    for (var i = 0; i < replacementAssociationProduct.length; i++) {
      if (!replacementAssociationProduct[i].replaceError) {
        proceedSave = false
        break
      }
    }
    if (proceedSave) {
      setImportedData((prevState: any) => {
        return prevState.map((state: any) => {
          let singleData = replacementAssociationProduct.filter(
            (prod: any) => prod._idCheck === state._idCheck
          )
          if (singleData && singleData.length === 1) {
            console.log('singleData', singleData, state._idCheck)
            if (state._idCheck === singleData[0]._idCheck) {
              return {
                ...state,
                ...singleData[0],
              }
            } else {
              return state
            }
          } else {
            return state
          }
        })
      })
      setReplacementAssociationProduct(null)
      setSelectedProductListItems(null)
      setOpenReplacementAssDialog(false)
    } else {
      setReplaceError(true)
      setReplaceErrorMsg('Enter a Replacement MIN and Press the Search icon')
    }
  }

  useEffect(() => {
    console.log('handleReplacementSave', importedData)
  }, [importedData])

  const replacementAssociationDialog = (
    <Dialog
      open={openReplacementAssDialog}
      onClose={handleReplacemantAssociationDialogClose}
      fullWidth
      classes={{
        paperFullWidth:
          replacementAssociationProduct &&
          replacementAssociationProduct.length > 0
            ? classes.placeholderDialogFull
            : classes.placeholderDialog,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // border: '3px solid green',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        <DialogHeader
          title="Add Replacement Association"
          onClose={handleReplacemantAssociationDialogClose}
        />
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{
            textAlign: 'center',
            padding: '10px',
          }}
          spacing={2}
        >
          <Grid
            item
            container
            xs={12}
            style={{
              paddingLeft: '10px',
              paddingRight: '10px',
              paddingTop: '20px',
            }}
          >
            <Grid
              item
              xs={10}
              style={{ textAlign: 'left', paddingBottom: '5px' }}
            >
              <Typography variant="body1" color="primary">
                Add Replacement Association
              </Typography>
            </Grid>
            <Grid item xs={2} style={{ paddingBottom: '5px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleReplacementAssAdd(1)}
              >
                Add Row
              </Button>
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DataTable
                  value={
                    replacementAssociationProduct &&
                    replacementAssociationProduct
                  }
                  selectionMode={
                    replacementAssociationProduct > 0 ? 'single' : 'checkbox'
                  }
                  selection={selectedReplaceAssData}
                  onSelectionChange={(e) => setSelectedReplaceAssData(e.value)}
                  // globalFilter={globalFilter}
                  className="p-datatable-sm"
                  //   stateStorage="session"
                  //   stateKey="dt-state-demo-session-eventmanage"
                  showGridlines
                  scrollable
                  scrollHeight="300px"
                  // editMode="cell"
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{
                      width: '50px',
                      color: 'white',

                      backgroundColor: theme.palette.primary.main,
                    }}
                  ></Column>
                  {replacementAssociationCols.map((col: any, index: any) => {
                    return (
                      <Column
                        key={index}
                        field={col.field}
                        header={col.header}
                        body={
                          (col.field === 'delist_min_pin' &&
                            delistminpinTemplate) ||
                          (col.field === 'replaceMin' &&
                            replaceMin_Pin_Association_Template) ||
                          (col.field === 'effectiveDateTo' &&
                            replaceEffectiveDateToTemplate) ||
                          (col.field === 'effectiveDateFrom' &&
                            replaceEffectiveDateFromTemplate) ||
                          (col.field === 'comments' &&
                            replacementCommentsTemplate)
                        }
                        bodyStyle={tableBodyStyle(col.width)}
                        headerStyle={tableHeaderStyle(
                          col.width,
                          theme.palette.primary.main
                        )}
                      />
                    )
                  })}
                </DataTable>
              </MuiPickersUtilsProvider>
            </Grid>
            {replaceError && (
              <Grid item xs={12}>
                <Typography color="error">{replaceErrorMsg}</Typography>
              </Grid>
            )}
            <Grid item xs={8}></Grid>
            <Grid item xs={2} style={{ paddingTop: '5px' }}>
              <Button
                variant="contained"
                color="primary"
                // onClick={removeReplaceAssociate}
                onClick={removeReplacements}
              >
                Delete
              </Button>
            </Grid>
            <Grid item xs={2} style={{ paddingTop: '5px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReplacementSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  )

  const handleCompleteTask = () => {
    if (rafpendingActionDetailsCT06) {
      const completePayload = {
        reviewDecision: 'Complete',
        requester: {
          persona: rafpendingActionDetailsCT06.assigneeRole,
          details: {
            emailId: userDetail && userDetail.userdetails[0].user.emailId,
            userId: userDetail && userDetail.userdetails[0].user.userId,
            name:
              userDetail &&
              userDetail.userdetails[0].user.middleName &&
              userDetail.userdetails[0].user.middleName !== ''
                ? `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.middleName} ${userDetail.userdetails[0].user.lastName}`
                : `${userDetail.userdetails[0].user.firstName} ${userDetail.userdetails[0].user.lastName}`,
          },
          roles:
            userDetail &&
            userDetail.userdetails[0].roles.map((role: any) => {
              return {
                // roleId: role.roleId,
                roleId: role.roleName,
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
        eventStatus: 'Published',
        eventId: rafpendingActionDetailsCT06.eventId,
        milestones: [
          {
            action: '',
            status: rafpendingActionDetailsCT06.status,
            visibility: rafpendingActionDetailsCT06.visibility,
            activeTaskId: rafpendingActionDetailsCT06.activeTaskId,
            milestoneTaskId: rafpendingActionDetailsCT06.milestoneTaskId,
            taskName: rafpendingActionDetailsCT06.taskName,
            taskDescription: rafpendingActionDetailsCT06.taskDescription,
            tradingGroup: rafpendingActionDetailsCT06.tradingGroup,
            weeksPrior: rafpendingActionDetailsCT06.weeksPrior,
            dueDate: rafpendingActionDetailsCT06.dueDate,
            notifyDate: rafpendingActionDetailsCT06.notifyDate,
            slaDate: rafpendingActionDetailsCT06.slaDate,
            healthcheckDate: rafpendingActionDetailsCT06.healthcheckDate,
            assigneeDetails: {
              emailId: rafpendingActionDetailsCT06.assigneeEmailId,
              userId: rafpendingActionDetailsCT06.assigneeUserId,
              name: rafpendingActionDetailsCT06.assigneeName,
            },
            // assigneeRole: userAssigned.roles,
            assigneeRole: rafpendingActionDetailsCT06.assigneeRole,
          },
        ],
        logging: {
          comments: '',
          //updated: res.data.attachmentUrl,
          updated: '',
        },
      }
      putCamundaMileStoneUpdate(
        rafpendingActionDetailsCT06.eventId,
        completePayload
      )
        .then((res: any) => {
          console.log(res.data)
        })
        .catch((err: any) => {
          console.log(err.response)
        })
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
        // onRemove={handleToaster}
      />
      <LoadingComponent showLoader={isProgressLoader} />
      <Grid container spacing={2} style={{ padding: '20px' }}>
        <Grid
          container
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={2}
          style={{ paddingBottom: '20px' }}
        >
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            <Typography variant="h6" color="primary">
              Pending Action -{' '}
              <b>Delists added to the Range Change Management App</b>
            </Typography>
          </Grid>

          <Grid item xl={2} lg={2} md={2} sm={3} xs={5}>
            <button
              // className={classes.backButton}
              className="backButton"
            >
              {/* <Typography variant="subtitle1" color="primary"> */}
              View Log
              {/* </Typography> */}
            </button>
          </Grid>

          <Grid item xl={1} lg={1} md={1} sm={3} xs={3}>
            <button
              // className={classes.backButton}
              className="backButton"
            >
              {/* <Typography variant="subtitle1" color="primary"> */}
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 34 34"
                aria-hidden="true"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
              Back
              {/* </Typography> */}
            </button>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <DataTable
            value={eventDetails}
            scrollable
            showGridlines
            style={{
              height: '100%',
            }}
            className="p-datatable-sm"
          >
            {delistAddedToRangeCols.map((col: any, index: any) => {
              return (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  style={{
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                  headerStyle={{
                    backgroundColor: teal[900],
                    color: 'white',
                    width: col.width,
                    fontSize: '0.9rem',
                    padding: '0.5rem',
                  }}
                  body={
                    (col.field === 'targetDate' &&
                      convertedTargetDateTemplate) ||
                    (col.field === 'appDueDate' && convertedAppDueDateTemplate)
                  }
                />
              )
            })}
          </DataTable>
        </Grid>
        <Grid
          item
          container
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          spacing={2}
          style={{
            alignItems: 'center',
          }}
        >
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            spacing={2}
            style={{ textAlign: 'center' }}
          >
            <Grid item xs={10} sm={5} style={{ textAlign: 'left' }}>
              <Typography color="primary">
                <AutocompleteSelect
                  value={actionType}
                  options={actionTypeOptions}
                  onChange={handleActionType}
                  placeholder="--- Action Type ---"
                />
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <Tooltip
                title={
                  actionType ? (
                    ''
                  ) : (
                    <Typography variant="caption">
                      {"Please select the 'Action Type'."}
                    </Typography>
                  )
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleActionTypeDialogOpen}
                >
                  Add
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={12}>
              OR
            </Grid>
            <Grid item sm={4} xs={12}>
              <Tooltip
                title={
                  actionType ? (
                    ''
                  ) : (
                    <Typography variant="caption">
                      {"Please select the 'Action Type'."}
                    </Typography>
                  )
                }
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUploadDialogOpen}
                >
                  Upload File
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            spacing={2}
            style={{ textAlign: 'center' }}
          >
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                onClick={handlePlaceholderDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Add Placeholder MIN/PIN
                </Typography>
              </button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                onClick={handleReplacemantAssociationDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Replacement Association
                </Typography>
              </button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <button
                className="backButton"
                // onClick={handlePlaceholderDialogOpen}
              >
                <Typography variant="body2" color="primary">
                  Issue Delist Letter
                </Typography>
              </button>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >

                    <FormControl>
                        <RadioGroup
                            name="delistAddedToRange"
                            value={productType}
                            onChange={handleProductTypeChange}
                            style={{ display: "inline" }}>

                            <FormControlLabel value="existingProducts" control={radio} label="Existing Products" />
                            <FormControlLabel value="newProducts" control={radio} label="New Products" />
                            <FormControlLabel value="placeholderProducts" control={radio} label="Placeholder Products" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    {
                        productType &&
                            productType === "existingProducts" ?
                            existingProducts
                            :
                            productType === "newProducts" ?
                                newProducts
                                :
                                productType === "placeholderProducts" &&
                                placeholderProducts
                    }
                </Grid> */}

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {importedData && productListTable}
        </Grid>

        {importedData && (
          <Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}></Grid>
            <Grid
              item
              container
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              style={{ textAlign: 'center' }}
              spacing={2}
            >
              <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProductListSave}
                  disabled
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleProductListSave}
                >
                  Reject
                </Button>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCompleteTask}
                >
                  Complete Task
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      {uploadDialog}
      {actionTypeDialog}
      {placeholderDialog}
      {replacementAssociationDialog}
      {/* Uncomment for Replacement Association  */}
      {uploadPlaceholderDialog}
      {ingredientsDialog}
      {rangeStoresDialog}
      {depotStockDialog}
      {recipeDialog}
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    rafpendingActionDetailsCT06:
      state.pendingActionReducer.rafpendingActionDetailsCT06,
    userDetail: state.loginReducer.userDetail,
  }
}

export default connect(mapStateToProps, null)(DelistsAddedToRange)
