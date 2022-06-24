import {
  Button,
  Grid,
  Typography,
  Box,
  useTheme,
  Dialog,
  Paper,
  useMediaQuery,
} from '@material-ui/core'
import React, { useRef, useState } from 'react'
import Select, { StylesConfig } from 'react-select'
import { Link, Prompt } from 'react-router-dom'
import { components } from 'react-select'
import CloseIcon from '@material-ui/icons/Close'
import { TextareaAutosize } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import { Toast } from 'primereact/toast'
import { useEffect } from 'react'
import { useStyles } from './Styles'
import { connect } from 'react-redux'
import {
  constants,
  locationTypes,
  LocationhierarchyTypes,
} from './DataConstants'
import config from '../../config/Config'
import {
  getProductHierarchyAPI,
  putUserGroupAPI,
  getProductHierarchyListAPI,
} from '../../api/Fetch'
import { useHistory } from 'react-router-dom'
import { routes, life } from '../../util/Constants'
import ConfirmBox from '../../components/ConfirmBox/ConfirmBox'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { allMessages } from '../../util/Messages'

function UserGroupCreate(props: any) {
  const theme = useTheme()
  const { userDetail } = props
  const { BASE_URL_SIT, PRODUCT_HIERARCHY_GET, API_KEY } = config
  const active = useMediaQuery(theme.breakpoints.down(750))
  const forbutton = useMediaQuery(theme.breakpoints.down(400))
  const classes = useStyles()
  const history = useHistory()
  const { DEFAULT, USERCONFIG_USERGROUP } = routes
  const [groupId, setGroupId] = useState('')
  const [groupname, setGroupname] = useState('')
  const [description, setDescription] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [status, setStatus] = useState('A')
  // const [viewProductEl, setViewProductEl] = useState(null)
  const [viewProductEl, setViewProductEl] = useState(false)
  const [locationNames, setLocationNames] = useState([])
  const [viewLocationEl, setViewLocationEl] = useState(null)
  const toast = useRef<any>(null)
  const [back, setBack] = React.useState(false)
  //
  const [isProgressLoader, setIsProgressLoader] = React.useState(false)
  const [loaded, setLoaded] = useState(false)
  //
  //product changes start.............................................
  // const BASE = "https://pre-api.morrisons.com";
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [disabled1, setDisabled1] = useState(false)
  const [selected, setSelected] = useState<any>([])
  const [data, setData] = useState<any>([])
  const [uniquediv, setUniqueDiv] = useState<any>([])
  const [uniquedivobj, setUniqueDivObj] = useState<any>([])
  const [uniquegrp, setUniqueGrp] = useState<any>([])
  const [uniquegrpobj, setUniqueGrpObj] = useState<any>([])
  const [uniquecat, setUniqueCat] = useState<any>([])
  const [uniquecatobj, setUniqueCatObj] = useState<any>([])
  const [uniquedep, setUniqueDep] = useState<any>([])
  const [uniquedepobj, setUniqueDepObj] = useState<any>([])
  const [uniquecls, setUniqueCls] = useState<any>([])
  const [uniqueclsobj, setUniqueClsObj] = useState<any>([])
  const [uniquescls, setUniqueScls] = useState<any>([])
  const [uniquesclsobj, setUniqueSclsObj] = useState<any>([])
  //
  const [divpay, setDivpay] = useState<any>([])
  const [grppay, setGrppay] = useState<any>([])
  const [catpay, setCatpay] = useState<any>([])
  const [deppay, setDeppay] = useState<any>([])
  const [clspay, setClspay] = useState<any>([])
  const [sclspay, setSclspay] = useState<any>([])
  //
  const [payload, setPayload] = useState<any>([])
  const [hierarchy, setHierarchy] = useState<any>([])
  const [hierLevel, setHierLevel] = useState<any>('')
  const [hierLevelInput, setHierLevelInput] = useState<any>('')
  const [cancelOpenReset, setCancelOpenReset] = React.useState(false)
  const [cancelOpenSubmit, setCancelOpenSubmit] = React.useState(false)
  const [errorGroupName, setErrorGroupName] = useState('')
  const [errorStatus, setErrorStatus] = useState('')
  const focusGroupName = useRef<any>(null)
  const [isPageModified, setIsPageModified] = React.useState(false)
  const [isSuccessCall, setIsSuccessCall] = React.useState(true)
  //product changes end ................................................

  //product changes start...........................................

  useEffect(() => {
    // if (hierLevel && hierLevel.length > 0) {
    //   switch (hierLevel[0].value) {
    if (payload && payload.length > 0) {
      switch (payload[0].hierarchyLevel) {
        case 'division':
          setDivpay([...payload])
          break
        case 'group':
          setGrppay([...payload])
          break
        case 'category':
          setCatpay([...payload])
          break
        case 'department':
          setDeppay([...payload])
          break
        // case 'class':
        //   setClspay([...payload])
        //   break
        // case 'subclass':
        //   setSclspay([...payload])
        //   break
        default:
          break
      }
    }
  }, [payload])

  // useEffect(() => {
  //   for (let d = 0; d < data.length; d++) {
  //     data[d]['tag'] = data[d].name
  //     let tag = `${data[d].name}#${data[d].tag}#${data[d].id}`
  //     if (!uniquediv.includes(tag)) {
  //       setUniqueDiv((prevState: any) => [...prevState, tag])
  //       const splitted = tag.split('#')
  //       setUniqueDivObj((prevState: any) => [
  //         ...prevState,
  //         {
  //           value: splitted[0],
  //           label: splitted[1],
  //           id: splitted[2],
  //           hierGroup: 'division',
  //         },
  //       ])
  //     }
  //     for (let g = 0; g < data[d].nodes.length; g++) {
  //       data[d].nodes[g]['tag'] = `${data[d].tag} > ${data[d].nodes[g].name}`
  //       let tag = `${data[d].nodes[g].name}#${data[d].nodes[g].tag}#${data[d].nodes[g].id}`
  //       if (!uniquegrp.includes(tag)) {
  //         setUniqueGrp((prevState: any) => [...prevState, tag])
  //         const splitted = tag.split('#')
  //         setUniqueGrpObj((prevState: any) => [
  //           ...prevState,
  //           {
  //             value: splitted[0],
  //             label: splitted[1],
  //             id: splitted[2],
  //             hierGroup: 'group',
  //           },
  //         ])
  //       }
  //       for (let c = 0; c < data[d].nodes[g].nodes.length; c++) {
  //         data[d].nodes[g].nodes[c][
  //           'tag'
  //         ] = `${data[d].nodes[g].tag} > ${data[d].nodes[g].nodes[c].name}`
  //         let tag = `${data[d].nodes[g].nodes[c].name}#${data[d].nodes[g].nodes[c].tag}#${data[d].nodes[g].nodes[c].id}`
  //         if (!uniquecat.includes(tag)) {
  //           setUniqueCat((prevState: any) => [...prevState, tag])
  //           const splitted = tag.split('#')
  //           setUniqueCatObj((prevState: any) => [
  //             ...prevState,
  //             {
  //               value: splitted[0],
  //               label: splitted[1],
  //               id: splitted[2],
  //               hierGroup: 'category',
  //             },
  //           ])
  //         }
  //         for (let dp = 0; dp < data[d].nodes[g].nodes[c].nodes.length; dp++) {
  //           data[d].nodes[g].nodes[c].nodes[dp][
  //             'tag'
  //           ] = `${data[d].nodes[g].nodes[c].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].name}`
  //           let tag = `${data[d].nodes[g].nodes[c].nodes[dp].name}#${data[d].nodes[g].nodes[c].nodes[dp].tag}#${data[d].nodes[g].nodes[c].nodes[dp].id}`
  //           if (!uniquedep.includes(tag)) {
  //             setUniqueDep((prevState: any) => [...prevState, tag])
  //             const splitted = tag.split('#')
  //             setUniqueDepObj((prevState: any) => [
  //               ...prevState,
  //               {
  //                 value: splitted[0],
  //                 label: splitted[1],
  //                 id: splitted[2],
  //                 hierGroup: 'department',
  //               },
  //             ])
  //           }
  //           for (
  //             let cl = 0;
  //             cl < data[d].nodes[g].nodes[c].nodes[dp].nodes.length;
  //             cl++
  //           ) {
  //             data[d].nodes[g].nodes[c].nodes[dp].nodes[cl][
  //               'tag'
  //             ] = `${data[d].nodes[g].nodes[c].nodes[dp].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].name}`
  //             let tag = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].name}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].tag}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].id}`
  //             if (!uniquecls.includes(tag)) {
  //               setUniqueCls((prevState: any) => [...prevState, tag])
  //               const splitted = tag.split('#')
  //               setUniqueClsObj((prevState: any) => [
  //                 ...prevState,
  //                 {
  //                   value: splitted[0],
  //                   label: splitted[1],
  //                   id: splitted[2],
  //                   hierGroup: 'class',
  //                 },
  //               ])
  //             }
  //             for (
  //               let scl = 0;
  //               scl <
  //               data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes.length;
  //               scl++
  //             ) {
  //               data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl][
  //                 'tag'
  //               ] = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].name}`
  //               let tag = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].name}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].tag}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].id}`
  //               if (!uniquescls.includes(tag)) {
  //                 setUniqueScls((prevState: any) => [...prevState, tag])
  //                 const splitted = tag.split('#')
  //                 setUniqueSclsObj((prevState: any) => [
  //                   ...prevState,
  //                   {
  //                     value: splitted[0],
  //                     label: splitted[1],
  //                     id: splitted[2],
  //                     hierGroup: 'subclass',
  //                   },
  //                 ])
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }, [data])

  // useEffect(() => {
  //   async function handleClick() {
  //     setData([])
  //     setUniqueDivObj([])
  //     setUniqueGrpObj([])
  //     setUniqueCatObj([])
  //     setUniqueDepObj([])
  //     setUniqueClsObj([])
  //     setUniqueSclsObj([])
  //     setUniqueDiv([])
  //     setUniqueGrp([])
  //     setUniqueCat([])
  //     setUniqueDep([])
  //     setUniqueCls([])
  //     setUniqueScls([])
  //     // setIsProgressLoader(true)
  //     setDisabled(true)
  //     let nexturl = `${BASE_URL_SIT}${PRODUCT_HIERARCHY_GET}?apikey=${API_KEY}`
  //     // let nexturl = `${BASE}/product/v1/hierarchies/reporting?apikey=ArAaZlvKV09DlZst4aGqxicONzvtGbpI&offset=0`;
  //     //   const start = new Date();
  //     while (nexturl !== '') {
  //       if (error !== '') {
  //         // setIsProgressLoader(false)
  //         setLoaded(true)
  //         toast.current.show({
  //           severity: 'error',
  //           summary: 'Error!',
  //           detail: 'Product hierarchy service has issue',
  //           life: life,
  //           className: 'login-toast',
  //         })
  //         break
  //       }
  //       // console.log("to visit url: ", nexturl);
  //       // await axios
  //       //   .get(nexturl, {
  //       //     headers: {
  //       //       Authorization:
  //       //         "Basic QXJBYVpsdktWMDlEbFpzdDRhR3F4aWNPTnp2dEdicEk6d2txU0VjQWRHWllaRnc5Yg==",
  //       //     },
  //       //   })
  //       await getProductHierarchyAPI(nexturl)
  //         .then((res) => {
  //           setData((prevState: any) => [
  //             ...prevState,
  //             ...res.data.hierarchy.nodes,
  //           ])
  //           nexturl = res.data.metaData.links.next
  //             ? `${BASE_URL_SIT}${res.data.metaData.links.next}`
  //             : ''
  //           // console.log(`up next: ${res.data.metaData.links.next}`);
  //           // console.log(res.data.hierarchy.nodes);
  //         })
  //         .catch((e) => {
  //           nexturl = ''
  //           setError(e.message)
  //         })
  //     }
  //     if (nexturl === '') {
  //       setIsProgressLoader(false)
  //       setLoaded(true)
  //     }
  //     // const end = new Date();
  //     // const timediff = end - start;
  //     // console.log("Time taken for api calls: ", timediff);
  //   }
  //   // setIsProgressLoader(true)
  //   setLoaded(false)
  //   handleClick()
  // }, [BASE_URL_SIT, PRODUCT_HIERARCHY_GET, API_KEY, error])

  useEffect(() => {
    setLoaded(false)
    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('division')
        .then((res: any) => {
          const divList = res.data.hierarchyNode.map((item: any) => {
            return {
              value: item.divisionName,
              label: item.divisionName,
              id: item.division,
              hierGroup: 'division',
            }
          })
          setUniqueDivObj(divList)
          console.log('division length: ', divList.length)
        })
        .catch((err: any) => setUniqueDivObj([]))

    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('group')
        .then((res: any) => {
          const grpList = res.data.hierarchyNode.map((item: any) => {
            return {
              value: item.groupName,
              label: `${item.divisionName} > ${item.groupName}`,
              id: item.group,
              hierGroup: 'group',
            }
          })
          setUniqueGrpObj(grpList)
          console.log('group length: ', grpList.length)
        })
        .catch((err: any) => setUniqueGrpObj([]))

    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('category')
        .then((res: any) => {
          const catList = res.data.hierarchyNode.map((item: any) => {
            return {
              value: item.categoryName,
              label: `${item.divisionName} > ${item.groupName} > ${item.categoryName}`,
              id: item.category,
              hierGroup: 'category',
            }
          })
          setUniqueCatObj(catList)
          console.log('category length: ', catList.length)
        })
        .catch((err: any) => setUniqueCatObj([]))

    getProductHierarchyListAPI &&
      getProductHierarchyListAPI('department')
        .then((res: any) => {
          const depList = res.data.hierarchyNode.map((item: any) => {
            return {
              value: item.departmentName,
              label: `${item.divisionName} > ${item.groupName} > ${item.categoryName} > ${item.departmentName}`,
              id: item.department,
              hierGroup: 'department',
            }
          })
          setUniqueDepObj(depList)
          console.log('department length: ', depList.length)
          setLoaded(true)
        })
        .catch((err: any) => {
          setUniqueDepObj([])
          setLoaded(true)
        })
  }, [])

  const handleChange = (e: any) => {
    // setPayload('')
    setHierLevel(constants.mainvalues.filter((val) => val.value === e.value))
    //setPayload('')
    switch (e.value) {
      case 'division':
        setDisabled(false)
        divpay.length > 0 ? setPayload(divpay) : setPayload('')
        // setPayload('')
        setSelected([...uniquedivobj])
        break
      case 'group':
        setDisabled(false)
        grppay.length > 0 ? setPayload(grppay) : setPayload('')
        // setPayload('')
        setSelected([...uniquegrpobj])
        break
      case 'category':
        setDisabled(false)
        catpay.length > 0 ? setPayload(catpay) : setPayload('')
        // setPayload('')
        setSelected([...uniquecatobj])
        break
      case 'department':
        setDisabled(false)
        deppay.length > 0 ? setPayload(deppay) : setPayload('')
        // setPayload('')
        setSelected([...uniquedepobj])
        break
      // case 'class':
      //   setDisabled(false)
      //   clspay.length > 0 ? setPayload(clspay) : setPayload('')
      //   // setPayload('')
      //   setSelected([...uniqueclsobj])
      //   break
      // case 'subclass':
      //   setDisabled(false)
      //   sclspay.length > 0 ? setPayload(sclspay) : setPayload('')
      //   // setPayload('')
      //   setSelected([...uniquesclsobj])
      //   break
      default:
        setDisabled(true)
        setPayload('')
        setSelected([])
        break
    }
  }

  const updateHierarchy = () => {
    setHierarchy(payload)
    setHierLevelInput(hierLevel)
    setViewProductEl(false)
  }

  const handleHierarchyChange = (e: any) => {
    setIsPageModified(true)
    let values = []

    for (let i = 0; i < e.length; i++) {
      values.push({
        value: e[i].value,
        label: e[i].label,
        hierarchyLevel: e[i].hierGroup ? e[i].hierGroup : e[i].hierarchyLevel,
        hierarchyId: e[i].id ? e[i].id : e[i].hierarchyId,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2099-12-31',
      })
    }
    setPayload([...values])
    console.log(values)
  }

  //product changes end...................

  const productCustomStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }
  const locationCustomStyles: StylesConfig<LocationhierarchyTypes, true> = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : 'white',
      color: state.isSelected ? 'white' : teal[900],
    }),
  }

  // const viewProductOpen = Boolean(viewProductEl)
  // const viewLocationOpen = Boolean(viewLocationEl)
  const handleLocationChange = (selected: any) => {
    setIsPageModified(true)
    setLocationNames(selected)
    // console.log(selected);
  }
  const handleReset = () => {
    // setGroupId('')
    setDisabled1(true)
    setGroupname('')
    setDescription('')
    setHierarchy([])
    setPayload([])
    setLocationNames([])
    setDivpay([])
    setGrppay([])
    setCatpay([])
    setDeppay([])
    // setClspay([])
    // setSclspay([])
    setHierLevel(constants.mainvalues.filter((val) => val.value === 'none'))
    setHierLevelInput(
      constants.mainvalues.filter((val) => val.value === 'none')
    )
    setStatus('')
    setErrorGroupName('')
    setErrorStatus('')
    setDisabled1(false)
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
  const productSelect = (
    <>
      {/* <Select
        // options={producthierarchyTypes}
        options={productHierarchyValues && productHierarchyValues}
        isMulti
        onChange={handleProductChange}
        components={{
          Option,
        }}
        value={productNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className={classes.multiSelect}
        styles={productCustomStyles}
      /> */}
      <Select
        closeMenuOnSelect={true}
        //components={animatedComponents}
        //defaultValue={[colourOptions[4], colourOptions[5]]}
        // components={{
        //   Option,
        // }}
        // defaultValue={payload}
        isDisabled={disabled}
        isMulti
        hideSelectedOptions={true}
        options={selected}
        value={payload}
        onChange={handleHierarchyChange}
        className={classes.multiSelect}
        styles={productCustomStyles}
        // value={payload !== '' ? payload.hierarchyId : ''}
      />
    </>
  )
  const locationSelect = (
    <>
      <Select
        options={locationTypes}
        isMulti
        onChange={handleLocationChange}
        components={{
          Option,
        }}
        value={locationNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={true}
        className={classes.multiSelect}
        styles={locationCustomStyles}
      />
    </>
  )

  const goBack = () => {
    history.push(`${DEFAULT}${USERCONFIG_USERGROUP}`)
  }

  // const ongroupIDChange = (e: any) => {
  //   setGroupId(e.target.value)
  // }
  const ongroupnameChange = (e: any) => {
    setIsPageModified(true)
    setErrorGroupName('')
    setGroupname(e.target.value)
  }
  const ondescriptionChange = (e: any) => {
    setIsPageModified(true)
    setDescription(e.target.value)
  }
  const onstatusChange = (e: any) => {
    setIsPageModified(true)
    setErrorStatus('')
    // setStatus(e.target.value)
    setStatus(e.value)
  }
  // const handleOpenViewProduct = (e: any) => {
  //   setViewProductEl(e.currentTarget)
  // }
  const handleOpenViewProduct = () => {
    setViewProductEl(true)
    setIsProgressLoader(true)
    if (loaded) {
      setIsProgressLoader(false)
      if (hierLevelInput.length > 0) {
        switch (hierLevelInput[0].value) {
          case 'division':
            // setDisabled(false)
            // setPayload('')
            setSelected([...uniquedivobj])
            break
          case 'group':
            // setDisabled(false)
            // setPayload('')
            setSelected([...uniquegrpobj])
            break
          case 'category':
            // setDisabled(false)
            // setPayload('')
            setSelected([...uniquecatobj])
            break
          case 'department':
            // setDisabled(false)
            // setPayload('')
            setSelected([...uniquedepobj])
            break
          // case 'class':
          //   // setDisabled(false)
          //   // setPayload('')
          //   setSelected([...uniqueclsobj])
          //   break
          // case 'subclass':
          //   // setDisabled(false)
          //   // setPayload('')
          //   setSelected([...uniquesclsobj])
          //   break
          default:
            // setDisabled(true)
            // setPayload('')
            setSelected([])
            break
        }
      }
    }
  }
  const handleCloseViewProduct = () => {
    // setViewProductEl(null)
    setPayload(hierarchy)
    switch (hierLevelInput) {
      case 'division':
        // setDisabled(false)
        // setPayload('')
        setSelected([...uniquedivobj])
        break
      case 'group':
        // setDisabled(false)
        // setPayload('')
        setSelected([...uniquegrpobj])
        break
      case 'category':
        // setDisabled(false)
        // setPayload('')
        setSelected([...uniquecatobj])
        break
      case 'department':
        // setDisabled(false)
        // setPayload('')
        setSelected([...uniquedepobj])
        break
      // case 'class':
      //   // setDisabled(false)
      //   // setPayload('')
      //   setSelected([...uniqueclsobj])
      //   break
      // case 'subclass':
      //   // setDisabled(false)
      //   // setPayload('')
      //   setSelected([...uniquesclsobj])
      //   break
      default:
        // setDisabled(true)
        // setPayload('')
        setSelected([])
        break
    }
    setHierLevel(hierLevelInput)
    setViewProductEl(false)
  }
  const handleOpenViewLocation = (e: any) => {
    setViewLocationEl(e.currentTarget)
  }
  const handleCloseViewLocation = () => {
    setViewLocationEl(null)
  }

  const viewProduct = (
    <Dialog
      id="basic-menu"
      // open={viewProductOpen}
      open={viewProductEl}
      onClose={handleCloseViewProduct}
    >
      <Box
        sx={{
          height: 600,
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
              <Typography variant="subtitle1">
                Add Product Hierarchies
              </Typography>
            </Box>
            <Box
              sx={{
                paddingRight: '2px',
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
                onClick={handleCloseViewProduct}
              >
                X
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '16px',
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
              {/* {productSelect} */}
              <Box>
                <Typography variant="subtitle1" color="primary">
                  Hierarchy Level
                </Typography>
              </Box>
              <Box>
                {/* <select
                style={{ width: 150 }}
                defaultValue="0"
                onChange={handleHierLevelSelect}
              >
                <option disabled value="0">
                  --- Select Hierarchy Level ---
                </option>
                {hierLevels &&
                  hierLevels.map((lvl: any, index: any) => {
                    return (
                      <option key={index} value={lvl}>
                        {lvl.toUpperCase()}
                      </option>
                    );
                  })}
              </select> */}
                <Select
                  defaultValue={hierLevel}
                  isDisabled={data !== [] ? false : true}
                  isLoading={false}
                  // components={{
                  //   Option,
                  // }}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={constants.mainvalues}
                  onChange={handleChange}
                  className={classes.multiSelect}
                  styles={locationCustomStyles}
                  //value={hierLevel}
                />
                {/* <TreeSelect value={hierLevelSelect} options={hierLevelValues} onChange={(e)=>setHierLevelSelect(e.value)}/> */}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'flex-start',
              marginTop: '16px',
            }}
          >
            <Box>
              <Typography variant="subtitle1" color="primary">
                Search Hierarchies
              </Typography>
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
                // paddingRight: '10px',
              }}
            >
              {productSelect}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
          // className={classes.inputFieldBox}
          className={classes.inputFieldBoxPop}
        >
          <Button
            // type="submit"
            variant="contained"
            color="primary"
            onClick={updateHierarchy}
            disabled={disabled}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  )

  const handleBack = (e: any) => {
    e.preventDefault()
    setBack((p) => !p)
  }
  // const viewLocation = (
  //   <Dialog
  //     id="basic-menu"
  //     open={viewLocationOpen}
  //     onClose={handleCloseViewLocation}
  //   >
  //     <Box
  //       sx={{
  //         width: 'auto',
  //         height: !active ? 500 : 400,
  //         //   border: "3px solid green",
  //         //   borderRadius: 4,
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
  //           <Typography variant="subtitle1">
  //             Add Location Hierarchies
  //           </Typography>
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
  //             onClick={handleCloseViewLocation}
  //           >
  //             <CloseIcon />
  //           </button>
  //         </Box>
  //       </Box>
  //       <Box
  //         sx={{
  //           justifyContent: 'center',
  //           display: 'flex',
  //           p: 2,
  //         }}
  //       >
  //         <Box className={classes.inputFieldBox}>{locationSelect}</Box>
  //       </Box>
  //     </Box>
  //   </Dialog>
  // )
  // useEffect(() => {
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
  //   setCurrentDate(startdate)
  // }, [locationNames])

  const handleBackAfterDialog = (e: any) => {
    e.preventDefault()
    setBack(true)
  }

  const handleCreateGroup = () => {
    // e.preventDefault()
    setDisabled1(true)
    setIsProgressLoader(true)
    const formData = {
      groupName: groupname,
      groupDesc: description,
      status: status,
      requestedBy: userDetail && userDetail.userdetails[0].user.userId,
      locationHierarchy: locationNames.map((location: any) => {
        return {
          hierarchyLevel: location.hierarchyLevel,
          hierarchyId: location.hierarchyId,
          hierarchyName: null,
          startDate: new Date().toISOString().split('T')[0],
          endDate: location.endDate,
        }
      }),
      // productHierarchy: payload.map((product: any) => {
      productHierarchy: hierarchy.map((product: any) => {
        return {
          hierarchyLevel: product.hierarchyLevel,
          hierarchyId: product.hierarchyId,
          // hierarchyName: product.value,
          hierarchyName: product.label,
          startDate: new Date().toISOString().split('T')[0],
          endDate: product.endDate,
        }
      }),
    }
    //console.log(status);
    console.log(formData)
    // let accessToken;
    // if (localStorage && localStorage.getItem("_GresponseV2")) {
    //   accessToken = JSON.parse(
    //     (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
    //   );
    // }

    // axios
    //   .put(
    //     `https://dev-api.morrisons.com/commercial-user/v1/usergroups/${groupId}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
    //     formData,
    //     {
    //       headers: {
    //         "Cache-Control": "no-cache",
    //         Authorization: `Bearer ${accessToken.access_token}`,
    //       },
    //     }
    //   )
    putUserGroupAPI &&
      // putUserGroupAPI(formData, groupId)
      putUserGroupAPI(formData, '')
        .then((res) => {
          //console.log(res);
          //console.log(res.data.message);
          setIsProgressLoader(false)
          setIsSuccessCall(false)
          setGroupId(res.data.message.split('groupId:')[1].trim())
          if (navigator.clipboard) {
            navigator.clipboard.writeText(
              res.data.message.split('groupId:')[1].trim()
            )
          }
          // else {
          //   ;(window as any).clipboardData.setData(
          //     'text/plain',
          //     res.data.message.split('groupId:')[1].trim()
          //   )
          // }
          toast.current.show({
            severity: 'success',
            summary: '',
            detail: `${res.data.message}.\n ${allMessages.success.successGroupCopy}`,
            life: life,
            className: 'login-toast',
          })
          // setTimeout(() => goBack(), life)
        })
        .catch((err) => {
          setDisabled1(false)
          // //console.log(err);
          // let statusCode = err.response.data.error
          // console.log(statusCode)
          setIsSuccessCall(false)
          setIsProgressLoader(false)
          toast.current.show({
            severity: 'error',
            summary: 'Error!',
            detail: err.response.data.errorMessage,
            life: life,
            className: 'login-toast',
          })
        })
  }

  const handleCancelSubmit = (e: any) => {
    // let text = 'are you really want to go back? All your Data will be lost.'
    // if (window.confirm(text) === true) {
    //   history.goBack()
    // }
    e.preventDefault()
    setCancelOpenSubmit((p) => !p)
  }

  const handleCancelReset = (e: any) => {
    // let text = 'are you really want to go back? All your Data will be lost.'
    // if (window.confirm(text) === true) {
    //   history.goBack()
    // }
    e.preventDefault()
    setCancelOpenReset((p) => !p)
  }

  const checkForm = (btnName: string) => {
    let flag = 1
    if (groupname === '') {
      focusGroupName.current.focus()
      setErrorGroupName(allMessages.error.noGroupName)
      flag = 0
    }
    // if (status === '') {
    //   setErrorStatus('Please select a status')
    // }
    if (flag === 1 && btnName === 'submit') {
      setCancelOpenSubmit(true)
    } else if (flag === 1 && btnName === 'reset') {
      setCancelOpenReset(true)
    }
    if (flag === 0) {
      window.scrollTo(0, 0)
    }
  }

  const handleCreateGroupAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('submit')
  }

  const handleResetAfterDialog = (e: any) => {
    e.preventDefault()
    checkForm('reset')
  }

  const viewConfirmSubmit = (
    <ConfirmBox
      cancelOpen={cancelOpenSubmit}
      handleCancel={handleCancelSubmit}
      handleProceed={handleCreateGroup}
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

  const viewConfirmReset = (
    <ConfirmBox
      cancelOpen={cancelOpenReset}
      handleCancel={handleCancelReset}
      handleProceed={handleReset}
      label1="Are you sure to Reset?"
      label2="Please click Ok to proceed"
    />
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
          history.push(`${DEFAULT}${USERCONFIG_USERGROUP}`)
        }}
      />
      <Paper className={classes.root} elevation={0}>
        <Box
          sx={{ flexGrow: 1, p: 1, display: 'flex' }}
          className={classes.text}
        >
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                className="createRequest"
                sx={{
                  flexDirection: 'column',
                  display: 'flex',
                  p: 2,
                  paddingLeft: '40px',
                  paddingRight: '30px',
                  textAlign: 'left',
                }}
              >
                <div className="createRequestContainer">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      paddingBottom: '20px',
                      paddingTop: '10px',
                    }}
                  >
                    <Box
                      sx={{
                        flexGrow: 1,
                      }}
                    >
                      <Typography variant="h6">Create Group</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: !active ? 'row' : 'column',
                      }}
                    >
                      <Box
                        sx={{
                          paddingLeft: 5,
                        }}
                      >
                        <button
                          type="button"
                          onClick={goBack}
                          //onClick={handleBackAfterDialog}
                          //className={classes.backButton}
                          className="backButton"
                        >
                          <svg
                            className="MuiSvgIcon-root"
                            focusable="false"
                            viewBox="0 0 34 34"
                            aria-hidden="true"
                          >
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                          </svg>{' '}
                          Back
                        </button>
                      </Box>
                    </Box>
                  </Box>
                  <form onSubmit={handleCreateGroup}>
                    {/* <Box
                    sx={{
                      display: 'flex',
                      flexDirection: !active ? 'row' : 'column',
                      alignItems: 'baseline',
                    }}
                  >
                    <Box
                      className={classes.inputLabel}
                      sx={{
                        display: !active ? null : 'flex',
                      }}
                    >
                      <Typography variant="subtitle2">
                        Group ID &nbsp;
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
                          name="groupId"
                          id="groupId"
                          placeholder="To be autocreated"
                          className={classes.inputFields}
                          onChange={ongroupIDChange}
                          value={groupId}
                          required
                          disabled
                        />
                      </Typography>
                    </Box>
                  </Box> */}
                    <Box className={classes.eachRow}>
                      <Box
                        className={classes.inputLabel}
                        sx={{
                          display: !active ? null : 'flex',
                        }}
                      >
                        <Typography variant="subtitle2">
                          Group Name &nbsp;
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
                            name="groupname"
                            ref={focusGroupName}
                            id="groupname"
                            placeholder="eg. group name 1"
                            className={classes.inputFields}
                            onChange={ongroupnameChange}
                            value={groupname}
                            required
                          />
                        </Typography>
                      </Box>
                    </Box>
                    {errorGroupName !== '' && (
                      <Box className={classes.eachRow}>
                        <Box className={classes.inputLabel}></Box>
                        <Box
                          className={classes.inputFieldBox}
                          justifyContent="center"
                        >
                          <Typography variant="subtitle2" color="error">
                            {errorGroupName}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: !active ? 'row' : 'column',
                        paddingTop: '20px',
                      }}
                    >
                      <Box
                        className={classes.inputLabel}
                        sx={{
                          display: !active ? null : 'flex',
                        }}
                      >
                        <Typography variant="subtitle2">Description</Typography>
                      </Box>
                      <Box className={classes.inputFieldBox}>
                        <Typography variant="subtitle2">
                          <TextareaAutosize
                            name="description"
                            id="description"
                            className={classes.textArea}
                            onChange={ondescriptionChange}
                            value={description}
                            minRows="5"
                          />
                        </Typography>
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
                            className={classes.selectField}
                            defaultValue=""
                            onChange={onstatusChange}
                            required
                            disabled
                          >
                            {constants.groupstatuses.map((type) => {
                              return (
                                <option
                                  value={type.statusID}
                                  key={type.statusID}
                                >
                                  {type.text}
                                </option>
                              )
                            })}
                          </select> */}
                          <Select
                            value={constants.groupstatuses.filter(
                              (i) => i.value === 'A'
                            )}
                            isDisabled={true}
                            isLoading={false}
                            // components={{
                            //   Option,
                            // }}
                            // ref={focusStatus}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            options={constants.groupstatuses}
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
                        <Box
                          className={classes.inputFieldBox}
                          justifyContent="center"
                        >
                          <Typography variant="subtitle2" color="error">
                            {errorStatus}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    <Box className={classes.eachRow}>
                      <Box className={classes.inputLabel}>
                        <Typography variant="subtitle2">
                          Product Hierarchies
                        </Typography>
                      </Box>

                      <Box className={classes.inputFieldBox}>
                        <Typography variant="subtitle1">
                          {/* {payload ? (
                          payload.length > 0 ? ( */}
                          {hierarchy ? (
                            hierarchy.length > 0 ? (
                              <button
                                type="button"
                                className={classes.underlineRemove}
                                onClick={handleOpenViewProduct}
                              >
                                {/* Product Hierarchies({payload.length}) */}
                                <span className="addUserGroup">
                                  Product Hierarchies({hierarchy.length})
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className={classes.underlineRemove}
                                onClick={handleOpenViewProduct}
                              >
                                <span className="addUserGroup">Add</span>
                              </button>
                            )
                          ) : (
                            <button
                              type="button"
                              className={classes.underlineRemove}
                              onClick={handleOpenViewProduct}
                            >
                              <span className="addUserGroup">Add</span>
                            </button>
                          )}
                        </Typography>
                        {viewProduct}
                      </Box>
                    </Box>
                    <Box className={classes.eachRow}>
                      <Box className={classes.inputLabel}>
                        <Typography variant="subtitle2">
                          Location Hierarchies
                        </Typography>
                      </Box>
                      <Box className={classes.inputFieldBox}>
                        {locationSelect}
                      </Box>
                      {/* <Box className={classes.inputFieldBox}>
                      <Typography variant="subtitle1">
                        {locationNames ? (
                          locationNames.length > 0 ? (
                            <Link
                              to="#"
                              className={classes.underlineRemove}
                              onClick={handleOpenViewLocation}
                            >
                              Location Hierarchies({locationNames.length})
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className={classes.underlineRemove}
                              onClick={handleOpenViewLocation}
                            >
                              Add
                            </Link>
                          )
                        ) : (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewLocation}
                          >
                            Add
                          </Link>
                        )}
                      </Typography>
                      {viewLocation}
                    </Box> */}
                    </Box>
                    {/* <Box className={classes.eachRow}> */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: !active ? 'row' : 'column',
                        justifyContent: !active ? 'space-between' : 'center',
                        paddingTop: '30px',
                        alignItems: !active ? 'center' : 'center',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: !forbutton ? 'row' : 'column',
                          alignItems: !forbutton ? 'center' : 'center',
                          justifyContent: !forbutton
                            ? 'space-between'
                            : 'center',
                        }}
                      ></Box>
                      {/* <Box
                      sx={{
                        display: 'flex',
                      }}
                    > */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: !forbutton ? 'row' : 'row',
                          alignItems: !forbutton ? 'center' : 'center',
                          justifyContent: !forbutton
                            ? 'space-between'
                            : 'center',
                        }}
                      >
                        <Button
                          // type="reset"
                          variant="contained"
                          //className={classes.whiteButton}
                          className="reSet"
                          // onClick={handleReset}
                          onClick={handleResetAfterDialog}
                          disabled={disabled1}
                          size="small"
                        >
                          Reset
                        </Button>
                        {/* </Box> */}
                        {/* <Box
                      sx={{
                        display: 'flex',
                      }}
                    > */}
                        <Button
                          variant="contained"
                          color="primary"
                          // type="submit"
                          className={classes.buttons}
                          // onClick={handleCreateGroup}
                          onClick={handleCreateGroupAfterDialog}
                          disabled={disabled1}
                          size="small"
                        >
                          Submit
                        </Button>
                      </Box>
                      {/* </Box> */}
                    </Box>
                    {/* </Box> */}
                  </form>
                  <LoadingComponent showLoader={isProgressLoader} />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {viewConfirmReset}
      {viewConfirmSubmit}
      {viewConfirmBack}
    </>
  )
}
const mapStatetoProps = (state: any) => {
  return {
    userDetail: state.loginReducer.userDetail,
  }
}

export default connect(mapStatetoProps, null)(UserGroupCreate)
