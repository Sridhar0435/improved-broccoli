import { Typography } from "@material-ui/core";
import React from "react";

const PageNotFound = () => {
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
          Sorry Page Not Found
        </Typography>
      </div>
    </div>
  );
};

export default PageNotFound;
