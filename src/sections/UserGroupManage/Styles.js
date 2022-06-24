import { makeStyles } from '@material-ui/core'

export const fieldWidth = window.innerWidth - 80
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  container: {
    height: '100%',
    // padding:"16px"
  },
  exploreButton: {
    color: 'blue',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily,
  },
  fontbutton: {
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily,
  },
  value: {
    flex: 1,
  },
  links: {
    color: 'blue',
    cursor: 'pointer',
  },
  viewlogTable: {
    [theme.breakpoints.up('sm')]: {
      width: fieldWidth - 350,
    },
    [theme.breakpoints.down('sm')]: {
      width: fieldWidth - 20,
    },
  },
  closeViewLog: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: '18px',
    '&:hover': {
      color: theme.palette.secondary.main,
      backgroundColor: 'green',
      cursor: 'pointer',
    },
  },
  viewLogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    alignItems: 'baseline',
  },
  backButton: {
    border: 0,
    color: 'blue',
    // backgroundColor: "white",
    cursor: 'pointer',
    fontSize: '15px',
  },
  text: {
    color: theme.palette.primary.main,
  },
  paper: { minWidth: '500px' },
}))
