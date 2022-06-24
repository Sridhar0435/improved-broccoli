import { Divider, Typography, makeStyles, Grid } from "@material-ui/core";
import React from "react";
import BulkUpload from "../../RangeChangeManagement/pages/BulkUpload/BulkUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  value: {
    flex: 1,
  },
  container: {
    height: "100%",
  },
  tabHead: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
}));
function RangeAmend() {
  const classes = useStyles();
  return (
    // <div className={classes.root}>
    //   <div>
    //     <Typography variant="h6" color="primary" align="center">
    //       Commercial Web Application - Range Amendment
    //     </Typography>
    //     <Divider />
    //   </div>
      <div 
      className={classes.value}
      >
        <BulkUpload/>
         </div>
    // </div>
  );
}

export default RangeAmend;
