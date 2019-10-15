import React, { Component } from 'react';
import { matchRoutes } from 'react-router-config';
import { bindActionCreators } from 'redux';
// import {withRouter} from 'react-router-dom';
// begin my add
import { withRouter, Route, } from 'react-router-dom';
// import { withRouter, Route, Redirect, } from 'react-router-dom';
// import { withRouter, Route, Redirect, Switch, } from "react-router-dom";
// import Error404Page from 'main/content/pages/errors/404/Error404Page'
// end my add
import { connect } from 'react-redux';
import _ from '@lodash';

import Login from 'app/auth/login/Login'; // my add
// import Login from 'main/content/login/Login'; // my add
// import { FuseLayout, FuseTheme } from '@fuse'; // my add

// fetch settings, etc.
// import { FetchFirestore } from 'app/config/AppConfig'; // fails
// import FetchFirestore from 'app/config/AppConfig'; // success

let redirect = false;

class FuseAuthorization extends Component {

  constructor(props) {
    super(props);
    this.checkAuth();
  }

  componentDidUpdate(prevProps) {
    /**
     * If route is changed
     * Update auths
     */
    if (!_.isEqual(this.props.location.pathname, prevProps.location.pathname)) {
      this.checkAuth();
    }
  }

  checkAuth() {

    const ready1 = this && this.props;
    if(!ready1) return;

    const { routes, location, user, history, } = this.props; // profile, loggedIn,
    const ready2 = routes && location && user && history; // && profile && loggedIn
    if(!ready2) return;

    const { pathname, } = location;
    const ready3 =  pathname;
    if(!ready3) return;
    
    const matched = matchRoutes(routes, pathname,)[0];
    const { auth, } = matched && matched.route;
    const ready4 = auth && auth.length;
    if(!ready4) return;

    const ready5 = user && user.role;
    if(!ready5) return;
    const { role, } = user;

    if (!auth.includes(role)) {
      redirect = true;
      if (role === 'guest') {
      // if (!loggedIn) { // my add
        history.push({
          pathname: '/login',
          state: { redirectUrl: pathname }
        });
      }
      else {
        history.push({
          pathname: '/'
        });
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (redirect) {
      redirect = false;
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    // begin my add
    // const timestamp = Date.now();
    
    // uid forwards to dashboard,
    // loggedIn makes you login before forwarding after every reload
    const { children, uid, } = this.props; // loggedIn, uid: my add
    // const { children, uid, loggedIn, } = this.props; // loggedIn, uid: my add
    // console.log('children\n', children);
    // console.log('uid\n', uid);
    // console.log('loggedIn\n', loggedIn);
    // debugger;

    // if (loggedIn) return <Redirect to='/' />

    // end my add

    return (

      // original
      // <React.Fragment>
      //   {children}
      // </React.Fragment>

      // begin my add

      // // https://reacttraining.com/react-router/web/api/Redirect/to-string
      // <Route exact path="/" render={() => (
      //   loggedIn ? (
      //     <Redirect to="/dashboard" />
      //   ) : (
      //       <PublicHomePage />
      //     )
      // )}/>

      // works partially
      // <React.Fragment>
      // {
      //   loggedIn ? 
      //     <React.Fragment>
      //       {children}
      //     </React.Fragment>
      //     :
      //     <Login />
      // } 
      // </React.Fragment>

      // router-react-dom router react dom
      // ref: https://reacttraining.com/react-router/web/guides/basic-components/route-matching
      // <Switch>
      //   <Route exact path="/" children={children} />
      //   <Route path="/login" component={Login} />
      //   <Route component={Error404Page} />
      // </Switch>

      // refs:
      // code: https://github.com/techsithgit/react-router/blob/master/src/App.js
      // video: https://www.youtube.com/watch?v=XRfD8xIOroA
      // <Route path="/" exact render={()=>(
      //   loggedIn ? (<Redirect to='/dashboard' />) : (<Login />)
      // )}/>

      // works!
      // ref: https://reacttraining.com/react-router/web/api/Route/children-func
      
      <Route children={() => (
        // loggedIn ? children : <Login />
        uid
        ?
        children
        // <FetchFirestore key={timestamp}>{children}</FetchFirestore>
        :
        <Login />
      )} />
      
      // end my add
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// function mapStateToProps({ fuse, auth, firestore, }) {
function mapStateToProps({ fuse, auth, }) {
  // begin my add
  // console.log('fuse\n', fuse);
  // console.log('auth\n', auth);
  const ready1 = auth;
  if(!ready1) return null;
  // console.log('firestore\n', firestore); // we have firestore data here from the store
  // debugger;
  // const { user: { data: { uid } }, login: { success: loggedIn }, } = auth;
  const { user: { uid }, } = auth;
  // console.log('uid\n', uid);
  // console.log('loggedIn\n', loggedIn);
  return {
    uid, // loggedIn,
  }
// end my add
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseAuthorization));
