import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import React from 'react'
import { useStyles } from '../../pages/Home/Styles'
import { connect } from 'react-redux'
import { routes } from '../../util/Constants'

interface NavigationProps {
  menuItems: Array<any>
  open: boolean
  handleDrawerToggle: () => void
  handleClick: (url: string) => void
  openCol: Array<boolean>
  setOpenCol: (arr: Array<boolean>) => void
  location: any
}

const NavigationDrawer = (props: NavigationProps) => {
  const classes = useStyles()
  const {
    DEFAULT,
    USERCONFIG_USERMANAGE,
    USERCONFIG_USERGROUP,
    USERCONFIG_USERUPDATE,
    USERCONFIG_GROUPCREATE,
    USERCONFIG_GROUPUPDATE,
    DASHBOARD,
    DASHBOARD_PENDINGACTION,
    DASHBOARD_PENDINGACTIONS_UPDATE,
    DASHBOARD_UNASSIGNWORKFLOW,
    DASHBOARD_INPROGRESSTASK,
    DASHBOARD_MYGROUPPENDINGTASKS,
    DASHBOARD_RANGE_PENDINGACTION,
    DASHBOARD_RANGE_MYGROUPPENDINGTASKS,
    RANGEAMEND_MANAGE,
    RANGEAMEND_DELIST,
    RANGEAMEND_CREATE,
    RANGEAMEND_MANAGE_TASK,
    DASHBOARD_RANGE_MYTASKREJECTED,
    DASHBOARD_RANGE_MYGROUPTASKREJECTED,
  } = routes
  const {
    menuItems,
    open,
    handleDrawerToggle,
    handleClick,
    openCol,
    setOpenCol,
    location,
  } = props
  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
        onClose={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <div className="menuItemNav">
          <div className={`${classes.height} ${classes.setup}`}>
            <Typography variant="subtitle2" align="center">
              Menu Items
            </Typography>
            <IconButton onClick={handleDrawerToggle} edge="end">
              <ChevronLeft color="secondary" />
            </IconButton>
          </div>
        </div>
        <Divider />
        <List>
          {menuItems &&
            menuItems.map((menu, index) => {
              if (menu.more.length === 0) {
                return (
                  <ListItem
                    key={menu.appCode}
                    button
                    onClick={() => handleClick(`${DEFAULT}${menu.url}`)}
                    className={
                      location.pathname === `${DEFAULT}${menu.url}` ||
                      ((location.pathname ===
                        `${DEFAULT}${DASHBOARD_PENDINGACTION}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_PENDINGACTIONS_UPDATE}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_UNASSIGNWORKFLOW}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_INPROGRESSTASK}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_MYGROUPPENDINGTASKS}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_RANGE_PENDINGACTION}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_RANGE_MYGROUPPENDINGTASKS}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_RANGE_MYTASKREJECTED}` ||
                        location.pathname ===
                          `${DEFAULT}${DASHBOARD_RANGE_MYGROUPTASKREJECTED}`) &&
                        `${DEFAULT}${menu.url}` === `${DEFAULT}${DASHBOARD}`)
                        ? `${classes.hover} ${classes.active}`
                        : classes.hover
                    }
                  >
                    <ListItemText
                      primary={menu.appName}
                      classes={{ primary: classes.listItemText }}
                    />
                  </ListItem>
                )
              }
              if (menu.more.length > 0) {
                return (
                  <List key={menu.appCode}>
                    <ListItem
                      onClick={() => {
                        const arr = [...openCol]
                        arr[index] = !arr[index]
                        setOpenCol(arr)
                      }}
                      button /*className={classes.link}*/
                    >
                      <ListItemText
                        classes={{ primary: classes.listItemText }}
                        primary={menu.appName}
                      />
                      <ListItemIcon>
                        {openCol[index] ? (
                          <IconExpandLess />
                        ) : (
                          <IconExpandMore />
                        )}
                      </ListItemIcon>
                    </ListItem>
                    <Collapse in={openCol[index]} timeout="auto" unmountOnExit>
                      <Divider />
                      {/* <SidepanelSmall handleDrawerToggle={handleDrawerToggle} /> */}
                      <List>
                        {menu.more.map((task: any) => (
                          <ListItem
                            className={
                              location.pathname === `${DEFAULT}${task.url}` ||
                              (location.pathname ===
                                `${DEFAULT}${USERCONFIG_USERUPDATE}` &&
                                `${DEFAULT}${task.url}` ===
                                  `${DEFAULT}${USERCONFIG_USERMANAGE}`) ||
                              ((location.pathname ===
                                `${DEFAULT}${USERCONFIG_GROUPCREATE}` ||
                                location.pathname ===
                                  `${DEFAULT}${USERCONFIG_GROUPUPDATE}`) &&
                                `${DEFAULT}${task.url}` ===
                                  `${DEFAULT}${USERCONFIG_USERGROUP}`) ||
                              ((location.pathname ===
                                `${DEFAULT}${RANGEAMEND_CREATE}` ||
                                location.pathname ===
                                  `${DEFAULT}${RANGEAMEND_MANAGE_TASK}`) &&
                                `${DEFAULT}${task.url}` ===
                                  `${DEFAULT}${RANGEAMEND_MANAGE}`)
                                ? `${classes.link} ${classes.active}`
                                : classes.link
                            }
                            button
                            onClick={() => {
                              handleClick(`${DEFAULT}${task.url}`)
                            }}
                            key={task.appmenuId}
                          >
                            <ListItemText
                              primary={task.menu1Desc}
                              classes={{ primary: classes.listItemText }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Divider />
                    </Collapse>
                  </List>
                )
              }
              return null
            })}
        </List>
      </Drawer>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    menuItems: state.loginReducer.menuList,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
