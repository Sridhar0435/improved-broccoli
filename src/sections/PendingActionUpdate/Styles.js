import { makeStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export const fieldWidth = window.innerWidth - 80
export const useStyles = makeStyles((theme) => {
  return {
    eachRow: {
      display: 'flex',
      [theme.breakpoints.up(750)]: {
        flexDirection: 'row',
      },
      [theme.breakpoints.down(750)]: {
        flexDirection: 'column',
      },
      paddingTop: '20px',
      alignItems: 'baseline',
    },
    inputFields: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: 400,
      [theme.breakpoints.down(750)]: {
        width: 400,
      },
      [theme.breakpoints.down(450)]: {
        width: 350,
      },
      [theme.breakpoints.down(400)]: {
        width: 200,
      },

      height: 32,
    },
    filelist: {
      width: '100%',
    },
    selectField: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: '100%',
      height: 38,
      color: teal[900],
    },
    selectOptions: {
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    inputLabel: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 250,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: 250,
      [theme.breakpoints.down(750)]: {
        width: 250,
      },
      [theme.breakpoints.down(500)]: {
        width: 200,
      },
    },
    inputFieldBox: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: 400,
      [theme.breakpoints.down(750)]: {
        width: 400,
      },
      [theme.breakpoints.down(450)]: {
        width: 350,
      },
      [theme.breakpoints.down(400)]: {
        width: 200,
      },
    },
    inputFieldBoxPop: {
      width: 400,
      [theme.breakpoints.down(750)]: {
        width: 400,
      },
      [theme.breakpoints.down(500)]: {
        width: 300,
      },
      [theme.breakpoints.down(400)]: {
        width: 250,
      },
      [theme.breakpoints.down(350)]: {
        width: 230,
      },
      [theme.breakpoints.down(300)]: {
        width: 200,
      },
    },
    inputLabelHead: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: 600,
      [theme.breakpoints.down(750)]: {
        width: 400,
      },
      [theme.breakpoints.down(500)]: {
        width: 300,
      },
      [theme.breakpoints.down(400)]: {
        width: 200,
      },
    },
    textArea: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: '100%',
      resize: 'none',
      border: '1px solid black',
    },
    designationField: {
      [theme.breakpoints.up(750)]: {
        width: 250,
      },
      [theme.breakpoints.down(750)]: {
        width: 200,
      },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      height: '32px',
    },
    submitButton: {
      width: 'auto',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      // height: 40,
      display: 'inline',
      '&:hover': {
        // fontSize: 'large',
        color: theme.palette.secondary.main,
      },
      marginBottom: '10px',
      marginRight: '10px',
    },
    buttons: {
      width: 'auto',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      // height: 40,
      '&:hover': {
        // fontSize: 'large',
        color: theme.palette.secondary.main,
      },
      marginBottom: '10px',
      marginRight: '10px',
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
    rolesPopup: {
      alignItems: 'center',
      width: 400,
      height: 400,
      borderColor: theme.palette.primary.main,
      border: '1px solid',
    },
    uploadTextfield: {
      width: 'auto',
      [theme.breakpoints.up(400)]: {
        width: 200,
      },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth - 80,
      // },

      height: '32px',
      cursor: 'pointer',
    },
    backButton: {
      border: 0,
      color: 'blue',
      // backgroundColor: "white",
      cursor: 'pointer',
      fontSize: '18px',
      [theme.breakpoints.down(300)]: {
        fontSize: '14px',
      },
      [theme.breakpoints.down(400)]: {
        fontSize: '16px',
      },
      '&:disabled': {
        color: 'grey',
        cursor: 'default',
      },
    },
    attachIcon: {
      border: 0,
      color: 'blue',
      // backgroundColor: "white",
      cursor: 'pointer',
      fontSize: '10px',
      textDecoration: 'underline',
    },
    viewLogTitle: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      alignItems: 'baseline',
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
    whiteButton: {
      borderColor: theme.palette.primary.main,
      border: '1px solid',
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      '&:hover': {
        color: 'white',
        backgroundColor: teal[900],
      },
      marginBottom: '10px',
      marginRight: '10px',
    },
    uploadButton: {
      width: 'auto',
      height: '32px',
      cursor: 'pointer',
      backgroundColor: teal[900],
      color: 'white',
      padding: '2px',
    },
    root: {
      padding: theme.spacing(2),
      height: '100%',
    },
    text: {
      color: theme.palette.primary.main,
    },
    hideit: {
      display: 'none',
    },
    customMaxWidth: {
      maxWidth: '75%',
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
  }
})
