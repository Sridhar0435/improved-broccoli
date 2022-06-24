import { makeStyles } from '@material-ui/core'
export const fieldWidth = window.innerWidth - 80
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    color: theme.palette.background.paper,
  },
  value: {
    flex: 1,
  },
  links: {
    color: 'blue',
  },
  container: {
    height: '100%',
    color: theme.palette.primary.main,
  },
  exploreButton: {
    color: 'blue',
    fontSize: '12px',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: '10px',
    // },
  },
  backButton: {
    border: 0,
    color: 'blue',
    cursor: 'pointer',
    fontSize: '18px',
    '&:disabled': {
      color: 'grey',
      cursor: 'default',
    },
  },
  exploreButtonforid: {
    color: 'blue',
    cursor: 'pointer',
    fontSize: '12px',
    fontFamily: theme.typography.fontFamily,
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: '10px',
    // },
  },
  paper: { minWidth: '500px' },
}))
