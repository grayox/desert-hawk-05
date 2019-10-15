import React from 'react'; // , { Component, }
import loadable from '@loadable/component'

// import Loading from "./Loading";
// import { FuseLoadable, } from '@fuse';

// import DashboardContainer from 'app/views/dashboard/DashboardContainer';

// const LoadableComponent = loadable(() => import('./Dashboard'), {
const LoadableComponent = loadable(() => import('app/views/dashboard/DashboardContainer'), {
  fallback: 'Loading...',
  // fallback: <Loading />,
  // fallback: <FuseLoadable />,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}