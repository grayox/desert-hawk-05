import React, { Component } from 'react'
// import { Link, withRouter } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
// begin my add
import { withRouter } from 'react-router-dom';
// import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// end my add
import { withStyles } from '@material-ui/core/styles/index';
// import { Card, CardContent, Typography, Icon, Tabs, Tab } from '@material-ui/core';
import { Card, CardContent, Typography, } from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimate } from '@fuse';
// import RegularLoginTab from './tabs/RegularLoginTab';
// import FirebaseLoginTab from './tabs/FirebaseLoginTab';
// import Auth0LoginTab from './tabs/Auth0LoginTab';

import SlideShow from 'app/components/SlideShow';
// TODO: import react-responsive-carousel https://codesandbox.io/s/lp602ljjj7

import AuthProviders from 'app/auth/Providers';
import { brand, } from 'app/config/AppConfig';

const styles = theme => ({
  root: {
    background: "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover'
  },
  intro: {
    color: '#ffffff'
  },
  card: {
    width: '100%',
    maxWidth: 400
  },
});

class Login extends Component {
  state = {
    tabValue: 0
  };

  handleTabChange = (event, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes } = this.props;
    // const { classes, user } = this.props;
    // const { tabValue } = this.state;
 
    // console.log('user\n', user);
    // if(user.uid) return <Redirect to='/' />

    return (
      <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

        <div
          className={classNames(classes.intro, "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left")}>

          <FuseAnimate animation="transition.expandIn">
            {
              ( brand && brand.logoPath )
              ?
              <img className="w-128 mb-32" src={brand.logoPath} alt="logo" />
              :
              <Typography variant="h1" className="mb-32" color="inherit">
                {(brand && brand.appName) || 'Photos'}
              </Typography>
            }
            {
            // <img className="w-128 mb-32" src={brand.logoPath} alt="logo" />
            // <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo" />
            }
          </FuseAnimate>

          <FuseAnimate animation="transition.slideUpIn" delay={300}>
            {
            // <Typography variant="h2" color="inherit" className="font-light">
            }
            <Typography color="inherit" className="font-light text-3xl">
              {brand.tagLine}
              {
              // Give leads. Get leads.
              }
            </Typography>
          </FuseAnimate>

          <FuseAnimate delay={400}>
            {
            // <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
            }
            <Typography color="inherit" className="max-w-512 mt-16 text-base">
              {brand.desc}
              {
              // Elit incididunt aute aliquip sit aliquip aliquip nisi laboris tempor do ullamco deserunt consectetur eiusmod.
              // Aliquip duis esse elit sint cillum. Eu cupidatat nisi eu ex in esse aute fugiat adipisicing ullamco quis labore ipsum.
              // Ad sit qui incididunt et anim enim voluptate officia. Mollit minim sint consequat est velit amet.
              // Mollit incididunt duis qui minim cillum et proident velit ipsum exercitation ex.
              // Fugiat aliquip ipsum consectetur ipsum consequat magna proident anim in ad pariatur.
              }
            </Typography>
          </FuseAnimate>

          <FuseAnimate animation="transition.slideDownIn">
            <div className="my-16">
              <SlideShow />
            </div>
          </FuseAnimate>
        </div>

        <FuseAnimate animation={{ translateX: [0, '100%'] }}>

          <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>

            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

              <AuthProviders/>

              {
              // <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO YOUR ACCOUNT</Typography>

              // <Tabs
              //   value={tabValue}
              //   onChange={this.handleTabChange}
              //   fullWidth={true}
              //   className="mb-32"
              // >
              //   <Tab
              //     icon={<img className="h-40" src="assets/images/logos/firebase.svg" alt="firebase" />}
              //     className="min-w-0"
              //     label="Firebase"
              //   />
              //   <Tab
              //     icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0" />}
              //     className="min-w-0"
              //     label="Auth0"
              //   />
              //   <Tab
              //     icon={<Icon className="h-40 text-40">security</Icon>}
              //     className="min-w-0"
              //     label="Regular"
              //   />
              // </Tabs>

              // {tabValue === 0 && <FirebaseLoginTab />}
              // {tabValue === 1 && <Auth0LoginTab />}
              // {tabValue === 2 && <RegularLoginTab />}

              // <div className="flex flex-col items-center justify-center pt-32">
              //   <span className="font-medium">Don't have an account?</span>
              //   <Link className="font-medium" to="/register">Create an account</Link>
              //   <Link className="font-medium mt-8" to="/">Back to Dashboard</Link>
              // </div>
              }

            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    )
  }
}

// begin my add
function mapStateToProps({ auth = {}, }) {
  // const ready1 = auth && auth.user;
  // if(!ready1) return null;
  const { user, } = auth;
  return { user, };
}
// end my add

// export default withStyles(styles, { withTheme: true })(withRouter(Login));
export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, null)(Login))); // my add
