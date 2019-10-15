// Tablet (600-1280px)
// inspired by https://material-ui.com/demos/drawers/#mini-variant-drawer

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Routes from 'app/config/Routes';

import {
  Drawer, AppBar, Toolbar,
  CssBaseline, Typography, IconButton, Icon,
  // List, Divider, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';

// import MyFab from 'app/layouts/MyFab';
import MyBottomNav from 'app/layouts/appBars/MyBottomNav.js';
import BrandAppBar from '../appBars/BrandAppBar';
import OverflowMenu from '../appBars/OverflowMenu';
import RoutePageTitle from 'app/components/RoutePageTitle';
import DrawerContent from './DrawerContent';
// import DrawerContent1 from './DrawerContent1'; // specs/dimensions reference for sizing, spacing, etc

import { uiSpecs } from 'app/config/AppConfig';
// const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: uiSpecs.drawerWidth,
    width: `calc(100% - ${uiSpecs.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    // display: 'none',
    marginLeft: -16,
  },
  hideTypog: {
    // display: 'none',
    marginLeft: -24,
  },
  drawer: {
    width: uiSpecs.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: 'calc(100% - 88px)',
  },
  drawerOpen: {
    backgroundColor: '#303030', // 262933 per styles/index.css
    width: uiSpecs.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#303030', // 262933 per styles/index.css
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 16px 0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,

    // temp-border
    // border: 'solid purple',
    marginTop: 68,
  },

  drawerPaper: {
  },

  grow: {
    flexGrow: 1,
  },

});

class MiniDrawer extends Component {
  state = {
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  // handleDrawerOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleDrawerClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    const { classes, } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        {
        // <MyFab />
        }
        <MyBottomNav />
        <AppBar
          position="fixed"
          color="secondary"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              // onClick={this.handleDrawerOpen}
              onClick={this.handleDrawerToggle}
              className={classNames(
                classes.menuButton,
                { [classes.hide]: open, },
              )}
            >
              { open ? (<Icon>arrow_back_ios</Icon>) : (<Icon>menu</Icon>) }
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classNames(
                {[classes.hideTypog]: open,},
                classes.grow,
              )}
            >
              {
              // Mini variant drawer
              }
              <RoutePageTitle />
            </Typography>
            <OverflowMenu />
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={classNames(
            classes.drawerPaper,
            classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <BrandAppBar />
          <DrawerContent />
          {
          // <React.Fragment>
          //   <div className={classes.toolbar}>
          //     <IconButton onClick={this.handleDrawerClose}>
          //       {theme.direction === 'rtl' ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon>}
          //     </IconButton>
          //   </div>
          //   <Divider />
          //   <List>
          //     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          //       <ListItem button key={text}>
          //         <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
          //         <ListItemText primary={text} />
          //       </ListItem>
          //     ))}
          //   </List>
          //   <Divider />
          //   <List>
          //     {['All mail', 'Trash', 'Spam'].map((text, index) => (
          //       <ListItem button key={text}>
          //         <ListItemIcon>{index % 2 === 0 ? <Icon>inbox</Icon> : <Icon>mail</Icon>}</ListItemIcon>
          //         <ListItemText primary={text} />
          //       </ListItem>
          //     ))}
          //   </List>
          // </React.Fragment>
          }
        </Drawer>
        <main className={classes.content}>
          <Routes />
        {
        //   {
        //   <div className={classes.toolbar} />
        //   }
        //   <Typography paragraph>
        //     Tablet (600-1280)
        //     |
        //     https://material-ui.com/demos/drawers/#mini-variant-drawer
        //   </Typography>
          
        //   <Typography paragraph>
        //     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        //     incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
        //     elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
        //     hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
        //     velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
        //     Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
        //     viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
        //     Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
        //     at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
        //     ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
        //   </Typography>
        //   <Typography paragraph>
        //     Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
        //     facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
        //     tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
        //     consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus
        //     sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in.
        //     In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
        //     et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique
        //     sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo
        //     viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
        //     ultrices sagittis orci a.
        //   </Typography>
        }
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);