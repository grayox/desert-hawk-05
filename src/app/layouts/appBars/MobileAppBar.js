// cloned from // import MainToolbar from './main/MainToolbar';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';

// import { connect } from 'react-redux';
// import * as authActions from 'auth/store/actions';
// import { bindActionCreators } from 'redux';
// import * as Actions from 'store/actions';

import classNames from 'classnames';

// import {FuseShortcuts, FuseAnimate, FuseSearch} from '@fuse';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  AppBar, CssBaseline,
  Toolbar, Typography,
  Icon, IconButton,
  // Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  // Avatar, ListItemIcon, ListItemText, Popover, MenuItem, Hidden
} from '@material-ui/core';

// import '@vaadin/vaadin-icons/vaadin-icons.js'; // fail
// import { GoSignOut, } from 'react-icons/go'; // https://react-icons.netlify.com/#/

// import Headroom from 'app/components/AutoHideOnScroll';

// import MediaWidth from 'app/layouts/MediaWidth';
import { uiSpecs } from 'app/config/AppConfig';

// import { useMediaPredicate } from 'react-media-hook'; // <20 downloads
// import MediaQuery from 'react-responsive'; // 122k downloads
// react-media // 67k downloads

import OverflowMenu from './OverflowMenu';
import RoutePageTitle from 'app/components/RoutePageTitle';

const styles = theme => ({
  
  // const out = {
    root: {
      display      : 'flex'   ,
      alignItems   : 'center' ,
      width        : '100%'   , // WARNING: applies extra margin to content!? (when using laptop drawer)
      marginBottom : 56       ,
    },
    // separator: {
    //     width          : 1,
    //     height         : 64,
    //     backgroundColor: theme.palette.divider
    // }

    // root: {
    //   flexGrow: 1,
    // },
    grow: {
      flexGrow: 1,
      // marginLeft: 12,
    },
    leftButton: {
      marginLeft: -2,
      marginRight: 12,
    },
    // rightButton: {
    //   marginRight: -12,
    //   marginLeft: 20,
    // },

    appBar: {
      marginLeft: uiSpecs.drawerWidth,
      // width: `calc(100% - ${uiSpecs.drawerWidth}px)`,
    },

  // }

  // if( this && this.state && this.state.device === 'laptop') out.appBar.width = `calc(100% - ${uiSpecs.drawerWidth}px)`;

  // return out;
});

// const isMobile = useMediaPredicate("(max-width: 600px)");
// const isLaptop = useMediaPredicate("(min-width: 1280px)");
// const isTablet = !(isMobile || isLaptop);


class MobileAppBar extends Component {

  // state = {
  //   device: 'mobile',
  // };

  handleClickMenuButton = () => this.props.onClickMenuButton()

  render() {
    const { classes, } = this.props; // onClickMenuButton,
    const { handleClickMenuButton, } = this;
    // const { userMenu } = this.state;

    return (

      // <React.Fragment>

        // <AppBar
        //   className="m-0"
        //   position="static"
        //   elevation={0}
        // >
        //   <Toolbar className="px-16">
        //     <Typography variant="subtitle1" color="inherit" className="flex-1">
        //       Inbox
        //     </Typography>
        //   </Toolbar>
        // </AppBar>

      // <Headroom />
      <div className={classNames(classes.root, "")}>
        <CssBaseline />

        {
        // <MediaQuery minDeviceWidth={1280}>
        //   { matches => {
        //     if (matches) this.setState({device: 'laptop'});
        //     return null;
        //   }}
        // </MediaQuery>
        }

        <AppBar
          className={classes.appBar}
          color="secondary"
          // ref: https://github.com/mui-org/material-ui/issues/10076#issuecomment-361232810
          // position="static" // somtimes height shortens depending on page/view
          // position="sticky" // also seems to shrink with content similar to static
          // position="standard" // somewhat solves overlap problem but still shrinks sometimes
          // position="relative" // shrinks
          // position="absolute" // overlaps, no shrink
          position="fixed" // depending on screen width, can overlap content; e.g., laptop 1024px
        >
          <Toolbar>
            <IconButton
              className={classNames(classes.leftButton, 'lg:hidden',)}
              onClick={handleClickMenuButton}
              color="inherit"
              aria-label="Menu"
            >
              {
              // <MenuIcon />
              }
              <Icon>menu</Icon>
            </IconButton>
            
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {
              // News
              }
              <RoutePageTitle />
            </Typography>
            
            {
            // <Button color="inherit">Login</Button>
            // <FuseSearch />

            // <IconButton
            //   className={classes.rightButton}
            //   color="inherit"
            //   aria-label="Overflow"
            // >
            //   <Icon>more_vert</Icon>
            // </IconButton>
            }

            <OverflowMenu />

          </Toolbar>
        </AppBar>
      </div>
      // </Headroom>

      // </React.Fragment>

    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     logout: authActions.logoutUser,

//     navbarOpenMobile: Actions.navbarOpenMobile,
//     // setSettings: Actions.setSettings,
//     // setDefaultSettings: Actions.setDefaultSettings,
//     // resetSettings: Actions.resetSettings,
//     // navbarOpenFolded: Actions.navbarOpenFolded,
//     // navbarCloseFolded: Actions.navbarCloseFolded,
//     // navbarCloseMobile: Actions.navbarCloseMobile,
//   }, dispatch);
// }

// function mapStateToProps({ auth }) {
//   return {
//     user: auth.user
//   }
// }

// export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(MobileAppBar));
export default withStyles(styles, { withTheme: true })(MobileAppBar);