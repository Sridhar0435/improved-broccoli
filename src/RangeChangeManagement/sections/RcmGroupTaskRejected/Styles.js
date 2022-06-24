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
  uploadTextfield: {
    [theme.breakpoints.up(670)]: {
      width: 250,
    },
    [theme.breakpoints.down(670)]: {
      width: 100,
    },

    height: '32px',
    cursor: 'pointer',
  },
  uploadButton: {
    width: 100,
    height: '32px',
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
  placeholderDialog: {
    [theme.breakpoints.up('xs')]: {
      'max-width': '45%',
    },
    [theme.breakpoints.down('xs')]: {
      'max-width': '75%',
    },
    'max-width': '85%',
  },
  comments: {
    width: '100%',
  },
  dialogButton: {
    height: 40,
    [theme.breakpoints.up('sm')]: {
      '&:hover': {
        fontSize: '0.97rem',
      },
      width: '80px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem',
      // height: 50,
      padding: '1px',
    },
    width: '100%',
  },
}))
