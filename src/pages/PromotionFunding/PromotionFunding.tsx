import { Divider, Typography, makeStyles, Grid } from "@material-ui/core";
import React from "react";

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
}));
function PromotionFunding() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justifyContent={"center"}>
        <Grid item lg={12} sm={12} xl={12} md={12} xs={12}>
          <Typography variant="h6" color="primary" align="center">
            Commercial Web Application - Promotion and Funding
          </Typography>
        </Grid>
        <Grid item lg={12} sm={12} xl={12} md={12} xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <div className={classes.value}>Page under development</div>
    </div>
  );
}

export default PromotionFunding;
