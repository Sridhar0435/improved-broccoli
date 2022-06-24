import { useTheme } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import React from 'react'
import Select from 'react-select'
import { components } from 'react-select'

const AutocompleteSelect = React.forwardRef((props: any, ref: any) => {
  const { value, options, isMulti, onChange } = props
  const theme = useTheme()

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

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: theme.palette.primary.main,
      backgroundColor: state.isSelected ? theme.palette.primary.main : 'white',
      color: state.isSelected ? 'white' : theme.palette.primary.main,
      fontSize: '14px',
    }),
    // container: () => ({
    //   fontSize: '12px',
    // }),
  }

  if (isMulti) {
    return (
      <Select
        // options={groupTypes}
        //   options={optionValues}
        //   isMulti
        //   onChange={onChangeFn}
        {...props}
        components={{
          Option,
        }}
        //   value={defVal}
        isClearable={true}
        isSearchable={true}
        closeMenuOnSelect={false}
        // hideSelectedOptions={true}
        styles={customStyles}
        ref={ref}
        //   className={classes.multiSelect}
        //   styles={customStyles}
        //   isDisabled={
        //     UtilityFunctions.isHidden(
        //       '8',
        //       appFuncList ? appFuncList : [],
        //       groupAccess
        //     )
        //       ? true
        //       : false
        //   }
      />
    )
  } else {
    return (
      <Select
        isClearable={true}
        isSearchable={true}
        styles={customStyles}
        // options={optionValues}
        ref={ref}
        // // className={classes.inputFields}
        // onChange={(e: any) => {
        //     e && e.value && onChangeFn(e.value)
        // }}
        {...props}
      />
    )
  }
  // else {
  //     return (
  //         <Select
  //             isClearable={true}
  //             isSearchable={true}
  //             {...props}
  //         // options={optionValues}
  //         // defaultValue={defVal}
  //         // className={classes.inputFields}
  //         // onChange={(e: any) => {
  //         //     e && e.value && onChangeFn(e.value)
  //         // }}
  //         />
  //     )
  // }
})

export default AutocompleteSelect
