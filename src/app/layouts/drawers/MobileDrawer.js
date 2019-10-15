// Mobile (&lt;600)
// inspired by https://material-ui.com/demos/drawers/#temporary-drawer

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Routes from 'app/config/Routes';
// import ClassNames from 'classnames';

import { withStyles, Drawer, } from '@material-ui/core';

// import MyFab from 'app/layouts/MyFab';
import MyBottomNav from 'app/layouts/appBars/MyBottomNav';
import MobileAppBar from '../appBars/MobileAppBar';
import BrandAppBar from '../appBars/BrandAppBar';
import DrawerContent from './DrawerContent';
// import DrawerContent1 from './DrawerContent1'; // specs/dimensions reference for sizing, spacing, etc

import { uiSpecs } from 'app/config/AppConfig';

const styles = theme => ({

  root: {
    display: 'flex',
  },

  list: {
    width: uiSpecs.drawerWidth, // 250,
  },
  fullList: {
    width: 'auto',
  },

  drawer: {
    width: uiSpecs.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: uiSpecs.drawerWidth,
    backgroundColor: '#303030', // 262933 per styles/index.css
  },
  toolbar: theme.mixins.toolbar,
  content: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,

    // border: '1px solid red',
    overflow: 'auto',
    paddingBottom: '100vh',
    marginBottom: '100vh',
    boxSizing: 'content-box',
  },
});

const INITIAL_STATE = {
  top: false,
  left: false,
  bottom: false,
  right: false,
}

// class TemporaryDrawer extends Component {
class MobileDrawer extends Component {

  state = { ...INITIAL_STATE };

  toggleDrawer = ( side, open, ) => () => {
    // console.log('side\n', side,);
    // console.log('open\n', open,);
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, } = this.props;
    
    // const sideList = (
    //   <React.Fragment>
    //     <BrandAppBar />
    //     <DrawerContent />
    //   </React.Fragment>
    // );

    // const sideList1 = (
    //   <div className={classes.list}>
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );

    // const fullList = (
    //   <div className={classes.fullList}>
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );

    const getMobileDrawer = () =>
      <React.Fragment>
      {
      // <div className="bg-grey-lightest">
      // <MyFab />
      }
        <MyBottomNav />
        <MobileAppBar className="w-full" onClickMenuButton={this.toggleDrawer('left', true,)} />

        <Drawer
          className={classes.drawer}
          // variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          // anchor="left"
          open={this.state.left}
          onClose={this.toggleDrawer( 'left', false, )}
          onClick={this.toggleDrawer( 'left', false, )}
        >
          <BrandAppBar />
          <DrawerContent
            userHeader
            onClick={this.toggleDrawer( 'left', false, )}
          />
        </Drawer>

        {
        // <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('left', false)}
        //     onKeyDown={this.toggleDrawer('left', false)}
        //   >
        //     {sideList}
        //   </div>
        // </Drawer>
        // <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('top', false)}
        //     onKeyDown={this.toggleDrawer('top', false)}
        //   >
        //     {fullList}
        //   </div>
        // </Drawer>
        // <Drawer
        //   anchor="bottom"
        //   open={this.state.bottom}
        //   onClose={this.toggleDrawer('bottom', false)}
        // >
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('bottom', false)}
        //     onKeyDown={this.toggleDrawer('bottom', false)}
        //   >
        //     {fullList}
        //   </div>
        // </Drawer>
        // <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
        //   <div
        //     tabIndex={0}
        //     role="button"
        //     onClick={this.toggleDrawer('right', false)}
        //     onKeyDown={this.toggleDrawer('right', false)}
        //   >
        //     {sideList}
        //   </div>
        // </Drawer>
        }

        <main className={classes.content}>
          <Routes />
          {
          // <div className={classes.toolbar} />
          
          // <Typography paragraph>
          //   Mobile (&lt;600)
          // </Typography>
          // <Typography paragraph>
          //   https://material-ui.com/demos/drawers/#temporary-drawer
          // </Typography>
        
          // <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
          // <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
          // <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
          // <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
          }
        </main>

      {
      // </div>
      }
      </React.Fragment>

    return getMobileDrawer();
 
  }
}

// TemporaryDrawer.propTypes = {
MobileDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(TemporaryDrawer);
export default withStyles(styles)(MobileDrawer);