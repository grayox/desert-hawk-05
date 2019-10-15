import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItem from '@material-ui/core/ListItem';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import Slide from '@material-ui/core/Slide';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  Button, Dialog, Slide, Fab, Icon,
  // IconButton, Zoom, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

// import Carousel from 'nuka-carousel';
// import Carousel from './Carousel';
// import Album from 'app/components/album/Album';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  carousel: {
    minHeight: '90vh',
    background: "orange",
  },
  fabButton: {
    // margin   : '0 auto'
    margin   : theme.spacing.unit,
    position : 'absolute',
    zIndex   :  1,
    top      : 70,
    left     : 20,
    right    :  0,
  },
});

const transition = props => (<Slide direction="right" {...props} />) // left, right, up, down

class SlideShow extends React.Component {
  
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, } = this.props;
    const { handleClose, handleClickOpen,  } = this;
    const { open, } = this.state;
    return (
      <div>
        <Button
          variant="text"
          // variant="outlined"
          // color="secondary"
          // color="primary"
          // color="default"
          color="inherit"
          size="large" 
          // className={classes.button}
          // className=`${classes.button} text-14`
          // className='`${classes.button} text-base`'
          className='{classes.button} text-12 opacity-50'
          onClick={handleClickOpen}
        >
          Learn more
        </Button>
        
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={transition}
        >
          {/* <Zoom> */}
            <Fab
              color="secondary"
              aria-label="Add"
              className={classes.fabButton}
              onClick={handleClose}
            >
              <Icon>arrow_back</Icon>
            </Fab>
          {/* </Zoom> */}

          {/* <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                {/* <CloseIcon /> * /}
                <ArrowBackIcon />
              </IconButton>
              {/* <Typography variant="h4" color="inherit" className={classes.flex}>
                Learn more
              </Typography> */}
              {/* <Button color="inherit" onClick={this.handleClose}>
                save
              </Button> * /}
            </Toolbar>
          </AppBar> */}

          {
          // <Carousel className={classes.carousel} initialWidth="100vw">
          }
            <img alt="" src="http://placehold.it/900x500/ffffff/c0392b/&text=Eu aliquip nostrud" />
            <img alt="" src="http://placehold.it/900x500/ff0000/ffffff/&text=exercitation tempor duis" />
            <img alt="" src="http://placehold.it/900x500/00ff00/ffffff/&text=eu eiusmod dolor deserunt" />
            <img alt="" src="http://placehold.it/900x500/0000ff/ffffff/&text=Laborum cupidatat ut" />
            <img alt="" src="http://placehold.it/900x500/ffff00/ffffff/&text=consectetur ullamco" />
            <img alt="" src="http://placehold.it/900x500/00ffff/ffffff/&text=Tempor culpa sunt aute" />
            <img alt="" src="http://placehold.it/900x500/00ffff/ffffff/&text=irure excepteur occaecat ad" />
            <img alt="" src="public/images/art/sidebar-02.jpg" />
            <img alt="" src="public/images/screenshots/ss01.png" />
            <img alt="" src="public/images/screenshots/ss02.png" />
            <img alt="" src="public/images/screenshots/ss03.png" />
            <img alt="" src="public/images/screenshots/ss04.png" />
            <img alt="" src="public/images/screenshots/ss05.png" />
            <img alt="" src="public/images/screenshots/ss06.png" />
            <img alt="" src="public/images/screenshots/ss07.png" />
          {
          // </Carousel>
          }

          {
          // <Carousel/>
          // <Album/>
          }

          {
          // <List>
          //   <ListItem button>
          //     <ListItemText primary="Phone ringtone" secondary="Titania" />
          //   </ListItem>
          //   <Divider />
          //   <ListItem button>
          //     <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          //   </ListItem>
          // </List>
          }

        </Dialog>
      </div>
    );
  }
}

SlideShow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SlideShow);