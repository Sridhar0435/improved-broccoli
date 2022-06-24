import {
  AppBar,
  IconButton,
  Toolbar,
  makeStyles,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useRef } from "react";
import { LogoMin } from "../../Logos";
import { userInfo } from "../../util/UserInfo";
import DropDrawer from "../DropDrawer/DropDrawer";

const useStyles = (drawWidth: number) =>
  makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(5),
    },
    menuIcon: {
      color: "white",
    },
    gridContainer: {
      alignItems: "center",
    },
    logo: {
      flex: 1,
    },
    avatar: {
      backgroundColor: theme.palette.secondary.dark,
    },
    modwidth: {
      flexGrow: 1,
      //padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: drawWidth,
    },
    fullwidth: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    text: {
      //color: theme.palette.primary.main,
      textDecoration: "underline",
      "&:hover": {
        color: theme.palette.secondary.light,
      },
    },
    modal: { overflow: "auto", position: "absolute", top: "0px", left: "0px" },
  }));

interface HeaderProps {
  toggledraw: () => void;
  open: boolean;
  drawWidth: number;
  onLogout: () => void;
}

function Header(props: HeaderProps) {
  const classes = useStyles(props.drawWidth)();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const active = useMediaQuery(theme.breakpoints.down(769));
  //const [openMod, setOpenMod] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  //   const toggleModal = () => {
  //     //setOpenMod(!openMod);
  //     props.toggleDispatchNot(props.toggleNotify);
  //   };

  const inputEl = useRef(null);
  const Avtarname = userInfo.getLoggedInAvtarName();

  return (
    <>
      <AppBar>
        <Toolbar>
          {active ? (
            <Grid container className={classes.gridContainer}>
              <Grid className="flexNav">
                <IconButton
                  className={classes.menuButton}
                  onClick={props.toggledraw}
                >
                  <MenuIcon className={classes.menuIcon} />
                </IconButton>
              </Grid>
              <Grid className="navLogo" //item className={classes.logo} xs={6}
              >
                <div
                //className={props.open ? classes.modwidth : classes.fullwidth}
                >
                  <LogoMin />
                </div>
              </Grid>
              <Grid className="headeLeabel">
                  <Typography variant="h6">Commercial Web Application</Typography>
                </Grid>
              {/* <Grid item>
            <Typography variant="h6">Morrisons Commercial Dashboard</Typography>
          </Grid> */}
              <Grid className="singInfo"//item xs={2}
              >
                <IconButton color="inherit" onClick={handleClose} ref={inputEl}>
                  <Avatar className={classes.avatar} sizes="small">
                    {Avtarname}
                  </Avatar>
                  <DropDrawer
                    handleClose={handleClose}
                    onLogout={props.onLogout}
                    open={open}
                    refer={inputEl}
                  />
                </IconButton>
              </Grid>
              <Grid className="rwdLabel">
                <Typography variant="h6">Commercial Web Application</Typography>
                </Grid>
            </Grid>
          ) : (
            <Grid container className={classes.gridContainer}>
              <Grid  className="flexNav" //item xs={5}
              >
                <IconButton
                  className={classes.menuButton}
                  onClick={props.toggledraw}
                >
                  <MenuIcon className={classes.menuIcon} />
                </IconButton>
              </Grid>
              <Grid className="navLogo" //item className={classes.logo}
              >
                <div
                //className={props.open ? classes.modwidth : classes.fullwidth}
                >
                  <LogoMin />
                </div>
              </Grid>
              <Grid className="headeLeabel">
                  <Typography variant="h6">Commercial Web Application</Typography>
                </Grid>
              {/* <Grid item>
            <Typography variant="h6">Morrisons Commercial Dashboard</Typography>
          </Grid> */}
              <Grid className="singInfo">
                <IconButton color="inherit" onClick={props.onLogout}>
                  <Typography variant="body1" className={classes.text}>
                    Sign Out
                  </Typography>
                </IconButton>
                <IconButton color="inherit" onClick={handleClose} ref={inputEl}>
                  <Avatar className={classes.avatar} sizes="small">
                    {Avtarname}
                  </Avatar>
                  <DropDrawer
                    handleClose={handleClose}
                    onLogout={props.onLogout}
                    open={open}
                    refer={inputEl}
                  />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
