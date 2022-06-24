import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  height: theme.mixins.toolbar,
  menuIcon: {
    color: "white",
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark,
  },
  error: {
    color: "red",
  },
  modwidth: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  fullwidth: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  modal: { overflow: "auto", position: "absolute", top: "0px", left: "0px" },
}));
