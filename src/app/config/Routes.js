import React, { Component, } from 'react';
import { withStyles, } from '@material-ui/core';
import {
  Switch, Route, // Redirect,
} from 'react-router-dom';
// import { FuseLoadable, } from '@fuse';

import _ from '@lodash';

import { getComponentsNavConfig, } from 'app/config/AppConfig'; // getFilterNested,

// import Error404 from 'app/views/Error404';
// import DashboardContainer from 'app/views/dashboard/DashboardContainer';
// import Dashboard from 'app/views/dashboard/Dashboard';
// import Inbox from 'app/views/app/inbox/Inbox';
// import Inbox from 'app/containers/Inbox';
// import Archive from 'app/views/app/archive/Archive';
// import Outbox from 'app/views/app/outbox/Outbox';
// import Contacts from 'app/views/app/contacts/Contacts';

// import Settings from 'app/views/settings/Settings';
// import Feedback from 'app/views/feedback/Feedback';
// import Help from 'app/views/Help';
// import Logout from 'app/views/Logout';

const styles = theme => ({
  wrapper: {
    height: '100vh',
  },
})

const getItems = () => {
  const componentsNavConfig = getComponentsNavConfig();
  // const items = componentsNavConfig.filter(r => (r.type==='item' || r.type==='route'));
  // const items = componentsNavConfig.filter(r => (r.type==='item'));
  // const items = getFilterNested( componentsNavConfig, 'type', 'item', );
  // const items = getFilterNested( componentsNavConfig, 'type.navList', 'item', );
  
  const item = _.filter( componentsNavConfig, ['type.navList' , 'item'   ,], );
  const nest = _.filter( componentsNavConfig, ['type.navList' , 'nested' ,], );
  const items = [ ...item, ...nest, ];

  // console.log('items\n', items,);
  return items;
}

class Routes extends Component {
  
  componentWillMount() {
    window.scrollTo( 0, 0, );
  }

  render() {
    const { classes, } = this.props;
    // const Settings = FuseLoadable({loader: () => import('app/views/settings/Settings')});

    const items = getItems();

    return (

      // // original starting point
      // // success
      // <Switch>
      //   <Redirect from='/'       to='/dashboard' />
      //   <Redirect from='/login'  to='/dashboard' />
      //   <Route path='/project/:id' component={ProjectDetails} />
      // <Switch>
        
      // // success
      // <Switch>
        // <Route path='/'    exact component={Dashboard} />
        // <Route path='/login'     component={Dashboard} />
        // <Route path='/dashboard' component={Dashboard} />
        // <Route path='/inbox'     component={Inbox}     />
        // <Route path='/archive'   component={Archive}   />
        // <Route path='/outbox'    component={Outbox}    />
        // <Route path='/contacts'  component={Contacts}  />
  
        // <Route path='/settings'  component={Settings}  />
        // <Route path='/feedback'  component={Feedback}  />
        // <Route path='/help'      component={Help}      />
        // <Route path='/logout'    component={Logout}    />
        // <Route                   component={Error404}  />
      // <Switch>
        
      // // fail
      // <Switch>
      //   <Route path='/'    exact component={FuseLoadable({loader: () => Dashboard})} />
      //   <Route path='/login'     component={FuseLoadable({loader: () => Dashboard})} />
      //   <Route path='/dashboard' component={FuseLoadable({loader: () => Dashboard})} />
      //   <Route path='/inbox'     component={FuseLoadable({loader: () => Inbox}    )} />
      //   <Route path='/archive'   component={FuseLoadable({loader: () => Archive}  )} />
      //   <Route path='/outbox'    component={FuseLoadable({loader: () => Outbox}   )} />
      //   <Route path='/contacts'  component={FuseLoadable({loader: () => Contacts} )} />
  
      //   <Route path='/settings'  component={FuseLoadable({loader: () => Settings} )} />
      //   <Route path='/feedback'  component={FuseLoadable({loader: () => Feedback} )} />
      //   <Route path='/help'      component={FuseLoadable({loader: () => Help}     )} />
      //   <Route path='/logout'    component={FuseLoadable({loader: () => Logout}   )} />
      //   <Route                   component={FuseLoadable({loader: () => Error404} )} />
      // </Switch>
        
      // // success
      // <Switch>
      //   <Route path='/'    exact component={FuseLoadable({loader: () => import('app/views/dashboard/Dashboard' )})} />
      //   <Route path='/login'     component={FuseLoadable({loader: () => import('app/views/dashboard/Dashboard' )})} />
      //   <Route path='/dashboard' component={FuseLoadable({loader: () => import('app/views/dashboard/Dashboard' )})} />
      //      <Route path='/xinbox'     component={FuseLoadable({loader: () => import('app/containers/Inbox'                )})} />
      //   <Route path='/inbox'     component={FuseLoadable({loader: () => import('app/layouts/crud/CRUDContainer'    )})} />
      //   <Route path='/archive'   component={FuseLoadable({loader: () => import('app/views/app/archive/Archive'     )})} />
      //   <Route path='/outbox'    component={FuseLoadable({loader: () => import('app/views/app/outbox/Outbox'       )})} />
      //   <Route path='/contacts'  component={FuseLoadable({loader: () => import('app/views/app/contacts/Contacts'   )})} />
      //     <Route path='/xsettings'  component={FuseLoadable({loader: () => import('app/views/settings/Settings')})} />
      //     <Route path='/xsettings'  component={Settings} />
      //   <Route path='/settings'  component={componentsNavConfig[6].getComponent()} />
      //   <Route path='/feedback'  component={FuseLoadable({loader: () => import('app/views/Feedback'       )})} />
      //   <Route path='/help'      component={FuseLoadable({loader: () => import('app/views/Help'           )})} />
      //   <Route path='/logout'    component={FuseLoadable({loader: () => import('app/views/Logout'         )})} />
      //   <Route                   component={FuseLoadable({loader: () => import('app/views/Error404'       )})} />
      // </Switch>
      
      // latest working
      // <Redirect from='/'      to='/dashboard' />
      // <Redirect from='/login' to='/dashboard' />
      <div className={classes.wrapper}>
        <Switch>
          {
          // <Route path='/'      component={DashboardContainer} />
          // <Route path='/login' component={DashboardContainer} />
          }
          {
          // <Route path='/' exact component={FuseLoadable({loader: () => import('app/views/dashboard/Dashboard')})} />
          // <Route path='/login'  component={FuseLoadable({loader: () => import('app/views/dashboard/Dashboard')})} />
          }
          {
          // <Redirect from='/'      to='/dashboard' />
          // <Redirect from='/login' to='/dashboard' />
          }
          {
          // <Route path='/' exact component={FuseLoadable({loader: () => import('app/views/dashboard/DashboardContainer')})} />
          // <Route path='/login'  component={FuseLoadable({loader: () => import('app/views/dashboard/DashboardContainer')})} />
          }
          
          <Route path='/' exact component={React.lazy(() => import('app/views/dashboard/DashboardContainer'))} />
          <Route path='/login'  component={React.lazy(() => import('app/views/dashboard/DashboardContainer'))} />
          
          {
          // items.map(({ id, path, component, }) => <Route key={id} path={path} component={getComponent()} />)
          items.map( ({ id, getComponent, }) => {
            console.log('id\n', id,);
            return <Route key={id} path={`/${id}`} component={getComponent()} />
          })
          }
          {
          // <Route path='/logout' component={FuseLoadable({loader: () => import('app/views/Logout'  )})} />
          // <Route                component={FuseLoadable({loader: () => import('app/views/Error404')})} />
          }
          <Route path='/logout' component={React.lazy(() => import('app/views/Logout'  ))} />
          <Route                component={React.lazy(() => import('app/views/Error404'))} />
        </Switch>
      </div>
    );
  }
}

// export default Routes;
export default withStyles(styles, { withTheme: true, })(Routes);