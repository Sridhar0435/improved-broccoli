import { makeStyles } from '@material-ui/core'
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
  container: {
    height: '100%',
    color: theme.palette.primary.main,
  },
  links: {
    color: 'blue',
  },
  exploreButton: {
    color: theme.palette.primary.main,
    fontSize: '12px',
    fontFamily: theme.typography.fontFamily,
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: '10px',
    // },
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
}))
