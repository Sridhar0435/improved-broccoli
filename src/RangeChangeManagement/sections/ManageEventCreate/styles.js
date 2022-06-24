import { makeStyles, useTheme } from '@material-ui/core'

export const useStyles = makeStyles((theme) => {
  return {
    backButton: {
      border: 0,
      color: 'blue',
      backgroundColor: 'inherit',
      cursor: 'pointer',
      fontSize: '18px',
    },
    smallFontGreen: {
      fontSize: '12px',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
    smallFont: {
      fontSize: '12px',
      //   backgroundColor: '#dddddd',
    },
    buttons: {
      width: '100%',
      height: 40,
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.78rem',
        '&:hover': {
          fontSize: '0.8rem',
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.6rem',
        // height: 50,
        padding: '1px',
      },
    },
    inputFieldBox: {
      width: 400,
      [theme.breakpoints.down(750)]: {
        width: 400,
      },
      [theme.breakpoints.down(450)]: {
        width: 350,
      },
      [theme.breakpoints.down(400)]: {
        width: 250,
      },
      [theme.breakpoints.down(300)]: {
        width: 200,
      },
    },
    classDialog: {
      [theme.breakpoints.up('xs')]: {
        width: '400px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '250px',
      },
    },
    dialogText: {
      [theme.breakpoints.up('xs')]: {
        fontSize: '0.9rem',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
      },
    },
    muiSelect: {
      fontSize: '12px',
    },
    root: {
      padding: theme.spacing(2),
      height: '100%',
    },
    text: {
      color: theme.palette.primary.main,
    },
    value: {
      flex: 1,
    },
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
    buttonRemoveTask: {
      height: 40,
      marginRight: '20px',
    },
    duedate: {
      background: '#dddddd',
    },
  }
})

export const ConfirmedHeaderStyle = (width) => {
  const theme = useTheme()
  return {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    width: width,
    // fontSize: '0.9rem',
    fontSize: '12px',
    // padding: '8px',
    height: 'auto',
  }
}

export const ConfirmedBodyStyle = (width) => {
  return {
    width: width,
    // fontSize: '0.8rem',
    fontSize: '12px',
    padding: '8px',
    // height: '43px',
    overflowX: 'auto',
  }
}
