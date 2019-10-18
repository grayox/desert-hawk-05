import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';

// font awesome
// https://github.com/FortAwesome/react-fontawesome#or-with-yarn
// https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faGooglePlus, faTwitter, faYoutube, } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core'
// library.add(faFacebook).add(faGoogle).add(faGooglePlus).add(faTwitter).add(faYoutube);

// import firebaseService from 'firebaseService';

import {bindActionCreators} from 'redux';
import * as Actions from 'app/auth/store/actions';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const items = [
  { label : 'Google'     , icon : faGoogle     , } ,
  { label : 'Twitter'    , icon : faTwitter    , } ,
  { label : 'Gmail'      , icon : faEnvelope   , } ,
  { label : 'Facebook'   , icon : faFacebook   , } ,
  { label : 'Youtube'    , icon : faYoutube    , } ,
  { label : 'GooglePlus' , icon : faGooglePlus , } ,
]

class AuthProviders extends Component {

  handleClick = () => {
    console.log('clicked!');
    console.log('props', this.props,);
    // firebaseService.init();
    // this.props.loginWithFireBase({username: 'username', password: 'password',});
    this.props.googleAuthProvider();
  }

  // // begin copypaste from FirebaseLoginTab.js
  // componentDidUpdate(prevProps, prevState) {    
  //   // if (this.props.user.role !== 'guest') {
  //     const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : '/';
  //     this.props.history.push({pathname});
  //   // }
  //   // return null;
  // }
  // // end copypaste from FirebaseLoginTab.js

  render() {
    const { handleClick } = this;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className='ml-24 mb-8 text-12 font-light opacity-75 uppercase'>Login with</Typography>
        <List component='nav'>
          {
            items.map( ({ label, icon, }) => (
              <ListItem
                key={label}
                // className="cursor-pointer hover:bg-grey"
                button
                onClick={handleClick}
              >
                <ListItemIcon className="w-24">
                  <FontAwesomeIcon className="text-4xl" icon={icon} />
                </ListItemIcon>
                {/* <ListItemText className="text-4xl" primary={label}/> */}
                <Typography className="text-base ml-12">{label}</Typography>
              </ListItem>
            ))
          }
        </List>
      </div>
    );
  }

}

AuthProviders.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  console.log('dispatch', dispatch,);
  console.log('googleAuthProvider', Actions.googleAuthProvider,);
  return bindActionCreators({
    // loginWithFireBase: Actions.loginWithFireBase,
    googleAuthProvider: Actions.googleAuthProvider,
  }, dispatch);
}

function mapStateToProps({ auth = {}, }) {
  const { user, login, } = auth;
  return { login, user, };
}

// export default withStyles(styles)(AuthProviders);
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthProviders)));