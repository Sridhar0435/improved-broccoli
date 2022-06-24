import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => {
  return {
    inputFields: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      padding: '8px',
      height: 38,
    },
    dateFields: {
      [theme.breakpoints.up('sm')]: {
        width: '50%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      color: theme.palette.primary.main,
      padding: '8px',
      height: 38,
    },
    selectField: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      padding: '8px',
      height: 38,
    },

    inputDate: {
      height: 25,
    },
    inputLabel: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },

    textArea: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      border: '1px solid black',
    },
    designationField: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      height: '32px',
    },

    submitButton: {
      width: 120,
      height: 40,

      display: 'inline',

      [theme.breakpoints.up('sm')]: {
        fontSize: 'bi',
        '&:hover': {
          fontSize: '1.2rem',
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
      },
    },
    buttons: {
      //   width: '100%',
      //   height: 40,
      //   [theme.breakpoints.up('sm')]: {
      //     fontSize: '0.78rem',
      //     '&:hover': {
      //       fontSize: '0.8rem',
      //     },
      //   },
      [theme.breakpoints.down('xs')]: {
        width: '50%',
      },
    },
    underlineRemove: {
      textDecoration: 'none',
      color: '#0000ff',
    },
    multiSelect: {
      '&:hover': {
        borderColor: 'green',
      },
    },

    uploadTextfield: {
      width: '100%',
      height: '32px',
      cursor: 'pointer',
    },

    backButton: {
      border: 0,
      color: 'blue',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontSize: '18px',
    },
    classDialog: {
      [theme.breakpoints.up('xs')]: {
        width: '400px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '250px',
      },
    },
    whiteButton: {
      borderColor: theme.palette.primary.main,
      border: '2px solid',
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: 'bi',
        '&:hover': {
          color: 'white',
          backgroundColor: theme.palette.primary.main,
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
      },
    },
    uploadButton: {
      width: 80,
      height: '32px',
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    errorMessage: {
      color: 'red',
    },
    errorMessageColor: {
      color: '#d32f22',
      // marginLeft: '14px',
      marginRight: '14px',
      marginTop: '4px',
      paddingTop: '10px',
      lineHeight: 3,
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
    root: {
      padding: theme.spacing(2),
      height: '100%',
    },
    text: {
      color: theme.palette.primary.main,
    },
    muiSelect: {
      fontSize: '12px',
    },
    selectColor: {
      background: theme.palette.primary.main,
      color: 'white',
      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
      },
    },
    errorTooltip: {
      // border: '1px solid red',
      padding: '5px',
      backgroundColor: 'white',
      color: theme.palette.primary.error,
    },
  }
})
