import { makeStyles } from "@material-ui/core";

export const drawerWidth = 200;
export const drawerWidthShift = 200;

export const useStyles = makeStyles((theme) => ({
  height: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.paper,
  },
  setup: {
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  small: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  text: {
    color: theme.palette.primary.main,
  },
  logo: {
    width: 40,
    height: 40,
  },
  modwidth: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidthShift,
    height: "100vh",
  },
  fullwidth: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    height: "100vh",
  },
  listItemText: {
    fontSize: "0.8em",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  hover: {
    color: theme.palette.primary.main,
  },
  active: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  link: {
    marginLeft: theme.spacing(2),
  },
}));
