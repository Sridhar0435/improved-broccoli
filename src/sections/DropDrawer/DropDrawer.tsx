import {
  Menu,
  MenuItem,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";
import { userInfo } from "../../util/UserInfo";

interface DropDrawerProps {
  handleClose: () => void;
  onLogout: () => void;
  open: boolean;
  refer: React.MutableRefObject<null>;
}

const useStyles = makeStyles((theme) => ({
  text: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));
function DropDrawer(props: DropDrawerProps) {
  const classes = useStyles();
  const UserName = userInfo.getLoggedInUserName();
  return (
    <Menu
      id="simple-menu"
      anchorEl={props.refer.current}
      keepMounted
      open={props.open}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={props.handleClose} className={classes.text}>
        <Typography variant="body1">{UserName}</Typography>
      </MenuItem>
      <MenuItem onClick={props.handleClose} className={classes.text}>
        <Typography variant="body1">
          EmpId: {userInfo.getLoggedInEmpId()}
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={props.onLogout} className={classes.text}>
        <Typography variant="body1">Sign Out</Typography>
      </MenuItem>
    </Menu>
  );
}

export default DropDrawer;
