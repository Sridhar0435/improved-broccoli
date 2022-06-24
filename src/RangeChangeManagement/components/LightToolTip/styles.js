import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => {
  return {
    errorTooltip: {
      // border: '1px solid red',
      padding: '5px',
      backgroundColor: 'white',
      color: theme.palette.primary.error,
    },
  }
})
