import { makeStyles } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      padding: "15px",
      width: "100%",
    },
    uploadTextfield: {
      width: "100%",
      height: "32px",
      cursor: "pointer",
    },
    uploadButton: {
      width: "100%",
      height: "32px",
      cursor: "pointer",
      backgroundColor: teal[900],
      color: "white",
    },
    formControl: {
      // margin: theme.spacing(1),
      // width: 300,
    },
    indeterminateColor: {
      color: "#f50057",
    },
    selectAllText: {
      fontWeight: 500,
    },
    selectedAll: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
      },
    },
    greenButtons: {
      height: 35,
      [theme.breakpoints.up("sm")]: {
        "&:hover": {
          fontSize: "0.97rem",
        },
        // width: "200px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.6rem",
        // height: 50,
        padding: "1px",
      },
      width: "100%",
    },
    tableTextField: {
      height: "40px",
    },
    multiselectDemo: {
      pMultiselect: {
        minWidth: "15rem",
      },
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
      border: "1px solid",
      backgroundColor: "white",
      color: theme.palette.primary.main,
      "&:hover": {
        color: "white",
        backgroundColor: teal[900],
      },
      // marginBottom: '10px',
      // marginRight: '10px',
    },
    tableLinks: {
      border: 0,
      color: "blue",
      backgroundColor: "inherit",
      cursor: "pointer",
      // fontSize: '18px',
    },
    placeholderDialog: {
      [theme.breakpoints.up("xs")]: {
        "max-width": "45%",
      },
      [theme.breakpoints.down("xs")]: {
        "max-width": "75%",
      },
      "max-width": "85%",
    },
    placeholderDialogFull: {
      "max-width": "85%",
    },
    searchDialog: {
      [theme.breakpoints.up("md")]: {
        "max-width": "65%",
      },
      [theme.breakpoints.down("md")]: {
        "max-width": "75%",
      },
      padding: "8px",
    },
    globalSearch: {
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
    errorDialog: {
      color: theme.palette.primary.error,
    },
    alertMsg: {
      marginTop: "10px",
    },

    root: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      height: "100%",
      color: theme.palette.background.paper,
    },
    value: {
      flex: 1,
    },
    selectField: {
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      padding: "8px",
      height: 38,
      fontSize: "12px",
    },
    muiSelect: {
      fontSize: "12px",
    },
    inputFields: {
      // [theme.breakpoints.up('sm')]: {
      //   width: '80%',
      // },
      // [theme.breakpoints.down('sm')]: {
      //   width: '80%',
      // },
      width: "200px",
      padding: "8px",
      height: 38,
    },
    bulkActionSelect: {
      backgroundColor: theme.palette.primary.main,
      height: "40px",
      color: "white",
      fontSize: "14px",
    },
  };
});

export const tableHeaderStyle = (width, color) => {
  return {
    color: "white",
    backgroundColor: color,
    width: width,
    // fontSize: '0.9rem',
    fontSize: "12px",
    // padding: '8px',
    height: "auto",
  };
};

export const tableBodyStyle = (width) => {
  return {
    width: width,
    // fontSize: '0.8rem',
    fontSize: "12px",
    // padding: '8px',
    // height: '43px',
    overflowX: "auto",
  };
};
