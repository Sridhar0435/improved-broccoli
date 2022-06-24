import React from "react";
import { Typography } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ServiceResponse } from "../Login/Messages";

const SiteMaintenance = (props: any) => {
  // const history = useHistory();
  // const goToHomePage = () => {
  //   history.push("/");
  // };
  const isLoading = props.isLoading;
  const message = isLoading
    ? ServiceResponse.getMessage("app", "loading")
    : ServiceResponse.getMessage("app", "serviceUnavailable");
  const messageDetail = isLoading
    ? ""
    : `${ServiceResponse.getMessage("app", "serviceError")} ${
        props.errorMessage
      }`;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 10,
        }}
      >
        <Typography variant="h6" color="primary" align="center">
          {message}
        </Typography>
        <Typography variant="body1" color="primary" align="center">
          {messageDetail}
        </Typography>
        {/* <Button
          variant="contained"
          onClick={goToHomePage}
          size="small"
          color="primary"
        >
          Go to The Home page
        </Button> */}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

const mapStateToProps = (state: any) => {
  return {
    errorMessage: state.loginReducer.errorMessage,
    isLoading: state.loginReducer.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteMaintenance);
