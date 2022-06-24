import { IconButton, InputAdornment, OutlinedInput } from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import React from 'react'

function TextFieldWithSearch(props:any) {
    const {value,onChangeFn, onSearch}=props
    return (
        <OutlinedInput
        value={value}
        onChange={(e:any)=>onChangeFn(e.target.value)}
            style={{
                height: "40px",
                fontSize: "0.8rem"
            }}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton edge="end" onClick={()=>onSearch(value)}>
                        <SearchOutlined />
                    </IconButton>
                </InputAdornment>
            }
            onKeyPress={(e: any) => {
                if (e.key === "Enter") {
                  onSearch(value)
                }
              }}
              required
        />
    )
}

export default TextFieldWithSearch


