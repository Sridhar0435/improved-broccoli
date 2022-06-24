import { Divider, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import ManageTaskEvent from "../../sections/ManageTask/ManageTaskEvent";

const useStyles = makeStyles(theme => ({
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
function BulkUpload() {
  const classes = useStyles();
  return (
    <>
      <ManageTaskEvent />
    </>
  );
}

export default BulkUpload;
