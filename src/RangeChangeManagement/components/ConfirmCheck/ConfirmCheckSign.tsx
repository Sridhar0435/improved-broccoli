import React, { useEffect } from 'react'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { grey } from '@material-ui/core/colors'
import { useTheme } from '@material-ui/core'

function ConfirmCheckSign(props: any) {
  const { confirmValue, size } = props
  const theme = useTheme()
  return (
    <CheckCircleIcon
      style={{
        color: confirmValue ? theme.palette.primary.main : grey[500],
      }}
      fontSize={size}
    />
  )
}

export default ConfirmCheckSign
