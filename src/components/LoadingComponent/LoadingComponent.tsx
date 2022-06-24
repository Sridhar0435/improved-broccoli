import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { body } from "../../styles/imports/colors";

//const overlayColor = body.lighter;

const useStyles = makeStyles(theme => ({
  progressSection: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 10001,
  },
  progress: {
    position: "absolute",
    top: "calc(50% - 45px)",
    left: "calc(50% - 20px)",
  },
  progressOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 10002,
    backgroundColor: "grey",
    opacity: "0.25",
  },
  progressText: {
    top: "calc(50% - 0px)",
    // left: 'calc(50% - 30px)',
    margin: "auto 35%",
    position: "absolute",
    fontSize: 20,
  },
}));

const LoadingComponent = (props: any) => {
  const classes = useStyles();

  const loadingText =
    props && props.showLoadingText ? (
      <p className={classes.progressText}>
        Loading in progress, this may take a few minutes{" "}
      </p>
    ) : (
      ""
    );

  const progressBar =
    props && props.showLoader ? (
      <div className={classes.progressSection}>
        <div className={classes.progressOverlay}></div>
        <CircularProgress className={classes.progress} />
        {loadingText}
      </div>
    ) : (
      <div></div>
    );

  return progressBar;
};

export default LoadingComponent;
