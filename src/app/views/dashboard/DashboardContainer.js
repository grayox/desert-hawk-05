// inspired by:
// src/app/layouts/crud/DashboardContainer.js

import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import { Tooltip, Zoom, IconButton, Icon, } from '@material-ui/core'; // withStyles, Paper,
// import { saveUserDataToFirestore, } from 'app/store/actions/my-actions/userDataActions'; // updateUserData, 
// import _ from '@lodash';

import Dashboard from './Dashboard';
import Loading from 'app/components/Loading';
import Error500Page from 'app/components/Error500Page';

const INITIAL_STATE_ITEMS = {
  items: [],
}

const INITIAL_STATE_LOADING = {
  isError: false,
  isLoading: true,
  // show: 'step', // 'main' | 'step' | 'greet'
}

const INITIAL_STATE = {
  ...INITIAL_STATE_ITEMS,
  ...INITIAL_STATE_LOADING,
};

class DashboardContainer extends Component {
  state = INITIAL_STATE;

  // forceRender = () => {
  //   // force render: https://davidwalsh.name/react-force-render
  //   // this.forceUpdate();
  //   this.setState({state: this.state});
  // }

  // handleChange = () => {} // this.forceRender();

  // componentWillReceiveProps(newProps) {
  //   console.log('newProps\n', newProps,);
  // }

  componentDidMount = () => this.setState({show: this.getShow(),})

  getShow = () => {
    const { profile, settings, } = this.props; // dashboard, // dashboard is now a subset of settings
    // console.log('profile\n', profile,);
    // console.log('settings\n', settings,);
    // console.log('dashboard\n', dashboard,);
    // const ready1 = !!(dashboard && settings && profile);
    const ready1 = !!(settings && profile);
    if(!ready1) return null;
    const ready2 = !!( settings.geoNation   && settings.geoNation.length   );
    const ready3 = !!( settings.geoRegion   && settings.geoRegion.length   );
    const ready4 = !!( settings.geoLocal    && settings.geoLocal.length    );
    const ready5 = !!( settings.bizCategory && settings.bizCategory.length );
    const ready6 = !!( ready1 && ready2 && ready3 && ready4 && ready5        );
    const show = ready6 ? 'main' : 'step';
    // console.log('ready1\n', ready1,);
    // console.log('ready2\n', ready2,);
    // console.log('ready3\n', ready3,);
    // console.log('ready4\n', ready4,);
    // console.log('ready5\n', ready5,);
    // console.log('ready6\n', ready6,);
    // console.log('show\n', show,);
    // this.setState({ show, });

    // NOTE: When setState() is called inside componentDidUpdate(),
    // it throws an error because React enters what behaves like an inifinite feedback loop.
    // The solution might be to separate the data fetching from rendering
    // by fetching the data inside a container that has as it's child, the presentational component.
    // The container-to-presentation-child barrier will act as a loop circuit-interrupter to prevent data
    // from flowing from the presentation child back upstream to the container. Unlike in the orginal
    // setup where the componentDidUpdate() lifecycle got called inside the infinite loop everytime
    // the state changed which was caused by calling componentDidUpdate() whenever the state changed.
    // Read more: https://medium.com/@learnreact/container-components-c0e67432e005
    // Edit: update: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

    return show;
  }

  render() {
    // const { handleChange, } = this;
    const { getShow, } = this;
    const { isError, } = this.state; // isLoading, show,
    const { dashboard, settings, profile, config, type, } = this.props; // isLoading, dataHasLoaded,

    const dataHasLoaded = !!profile && !!dashboard && !!settings; // && !!leads && !!user &&
    const isLoading = !dataHasLoaded;  

    // console.log('profile\n', profile,);
    // console.log('settings\n', settings,);
    // console.log('dashboard\n', dashboard,);
    // console.log('isLoading\n', isLoading,);
    // debugger;

    const show = getShow();
    
    const getRefreshButton = () => null;
      // <Tooltip TransitionComponent={Zoom} title="Refresh data">
      //   <IconButton className={classes.refresh} onClick={() => null} color="inherit">
      //     <Icon>refresh</Icon>
      //   </IconButton>
      // </Tooltip>

    const getDashboard = () =>
      <Dashboard
        dashboard={dashboard} settings={settings} profile={profile}
        config={config} type={type} show={show}
        // onChange={handleChange} // search "old data structure"; see changes to === 3 and pathArray[2] in src/app/store/actions/my-actions/userDataActions.js
      />

    const getMainContent = () => <React.Fragment> {getRefreshButton()} {getDashboard()} </React.Fragment>
    const getIsError = () => <div className="h-full"><Error500Page /></div>
    const getHasLoaded = () => isError ? getIsError() : getMainContent()
    const getIsLoading = () => <div className="h-screen w-full"><Loading /></div>
    const getDashboardContainer = () => ( isLoading ? getIsLoading() : getHasLoaded() )
    
    // return getHasLoaded();
    return getDashboardContainer();
  }
}

DashboardContainer.propTypes = {
  dashboard: PropTypes.object,
  dataHasLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf([ 'standard', 'mini', 'micro', ]),
};

DashboardContainer.defaultProps = {
  type: 'standard',
};

// export default DashboardContainer;
// export default withStyles( styles, {withTheme: true,}, )(DashboardContainer);

const mapStateToProps = state => {
  // console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  // const settings = state.settings;

  const settings = state
                && state.myApp
                && state.myApp.reducers
             // && state.myApp.reducers.settingsReducer
             // && state.myApp.reducers.settingsReducer.settings;
                && state.myApp.reducers.userDataReducer
                && state.myApp.reducers.userDataReducer.settings;
  // const dashboard = state
  //                && state.myApp
  //                && state.myApp.reducers
  //                && state.myApp.reducers.userDataReducer
  //                && state.myApp.reducers.userDataReducer.dashboard;
  const { dashboard, } = settings; // fold-in dashboard to subset of settings
  const profile = state
               && state.firebase
               && state.firebase.profile;
  // replace user with profile; user contains default settings
  // const user = state.auth.user;
  // const leads = state.firestore.ordered.leads;
  const dataHasLoaded = !!profile && !!dashboard && !!settings; // && !!leads && !!user &&
  const isLoading = !dataHasLoaded;
  
  // // console.log('user\n', user,);
  // // console.log('leads\n', leads,);

  // console.log('profile\n', profile,);
  // console.log('settings\n', settings,);
  // console.log('dashboard\n', dashboard,);
  // console.log('dataHasLoaded\n', dataHasLoaded,);
  // console.log('isLoading\n', isLoading,);
  // debugger;
  
  // //       YES   YES      YES       NO     NO
  // return { user, profile, settings, leads, dataHasLoaded, }
  // return { profile, settings, dataHasLoaded, }
  // return { profile, dashboard, dataHasLoaded, }
  return { profile, dashboard, settings, isLoading, } // dataHasLoaded,
}

// const mapDispatchToProps = dispatch => ({
//   // common mistakes: 1. forget to use this.props... when calling function in class 2. copy/paste forget to change function name in mapStateToProps => dispatch
//   // updateSettings: settings => dispatch(updateSettings(settings)),
//   // updateUserData          : (path, newData,) => dispatch(updateUserData         (path, newData,)),
//   saveUserDataToFirestore : (path, newData,) => dispatch(saveUserDataToFirestore(path, newData,)),
// })

// export default DashboardContainer;
// export default withStyles(styles, {withTheme: true})(DashboardContainer);
export default compose(
  // withStyles(styles, { withTheme: true }),
  // connect(mapStateToProps, mapDispatchToProps,),
  connect(mapStateToProps, null,),
  // withRouter(connect(mapStateToProps, mapDispatchToProps),
  // firestoreConnect(props => {
  //   return [
  //     { collection: 'leads', orderBy: ['createdAt', 'desc'] },
  //     {
  //       collection: 'users',
  //       doc: props.profile.uid,
  //       subcollections: [
  //         {
  //           collection: 'settings',
  //           limit: 1,
  //           orderBy: ['createdAt', 'desc',],
  //           storeAs: 'settings',
  //         },
  //       ],
  //     },
  //   ];
  // }),
)(DashboardContainer)