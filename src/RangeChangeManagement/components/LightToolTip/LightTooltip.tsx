import { Tooltip, withStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'

function LightTooltip(props: any) {
  const { title, position, icon } = props
  const classes = useStyles()
  const LightTooltip = withStyles((theme: any) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip)
  return (
    <>
      <LightTooltip
        title={
          <React.Fragment>
            <div className={classes.errorTooltip}>
              <Typography color="error" variant="body2">
                {title}
              </Typography>
            </div>
          </React.Fragment>
        }
        arrow
        placement={position}
      >
        {icon}
      </LightTooltip>
    </>
  )
}

export default LightTooltip
