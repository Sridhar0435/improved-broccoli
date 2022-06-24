import { makeStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      padding: '15px',
      width: '100%',
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
    searchTextField: {
      height: '25px',
      width: '100%',
    },
    searchBox: {
      padding: '10px',
    },
    submitButtons: {
      width: 'auto',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      height: 40,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
    greenButtons: {
      cursor: 'pointer',
      color: theme.palette.primary.main,
      border: 'none',
      backgroundColor: 'inherit',
    },
    // redButtons: {
    //     width: "auto",
    //     backgroundColor: theme.palette.error.main,
    //     color: "white",
    //     height: 40,
    //     "&:hover": {
    //         backgroundColor: theme.palette.error.main,
    //         color: "white",
    //     },
    // },
    whiteButton: {
      borderColor: theme.palette.primary.main,
      border: '1px solid',
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      '&:hover': {
        color: 'white',
        backgroundColor: teal[900],
      },
      // marginBottom: '10px',
      // marginRight: '10px',
    },
    previewDialog: {
      'max-width': '80%',
    },
    searchDialog: {
      [theme.breakpoints.up('md')]: {
        'max-width': '65%',
      },
      [theme.breakpoints.down('md')]: {
        'max-width': '75%',
      },
      padding: '8px',
    },
    globalSearch: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '80%',
      },
    },
    errorDialog: {
      color: theme.palette.primary.error,
    },
    errorTooltip: {
      // border: '1px solid red',
      padding: '5px',
      backgroundColor: 'white',
      color: theme.palette.primary.error,
    },
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
    selectField: {
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      padding: '8px',
      height: 38,
      fontSize: '12px',
    },
    muiSelect: {
      fontSize: '12px',
    },
  }
})

export const PreviewHeaderStyle = (width, color) => {
  return {
    color: 'white',
    backgroundColor: color,
    width: width,
    fontSize: '10px',
    // padding: '8px',
    // height: '55px',
  }
}

export const PreviewBodyStyle = (width) => {
  return {
    width: width,
    fontSize: '10px',
    // padding: '8px',
    // height: '49px',
    overflowX: 'auto',
  }
}

export const ConfirmedHeaderStyle = (width, color) => {
  return {
    color: 'white',
    backgroundColor: color,
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
    // padding: '8px',
    // height: '43px',
    overflowX: 'auto',
  }
}
