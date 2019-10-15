// inspired by: https://github.com/withinpixels/fuse-react/blob/v2.2.3/src/app/main/apps/dashboards/project/widgets/Widget4.js

// import React, { Component } from 'react';
import React, { useState, } from 'react'; // useEffect,
import { Link, NavLink, } from 'react-router-dom'; // withRouter // see src/@fuse/components/FuseNavigation/vertical/FuseNavVerticalItem.js

import {
  // withStyles, Icon, Button, IconButton, Typography, Hidden,
  Slide, Paper, Tooltip, Zoom, Avatar, Chip, CircularProgress,
  ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core';

// import _ from '@lodash';
// import { loadUserData, } from 'app/containers/LoadAsync';
// import ErrorBoundary from 'app/containers/ErrorBoundary';

import WidgetMenu from './WidgetMenu';
import WidgetNugget from './WidgetNugget';
// import { DashboardGridConfig, } from 'app/config/DashboardGridConfig';

// import { FuseAnimate, } from '@fuse';

// import ReactFitText from 'react-fittext';

const TARGET = 850; // target in milliseconds of entry animation duration
const SCALAR = 1.5; // compensation for random factor; when combined with index, makes higher indexes trend differently than lower indexes

// const { groups, } = DashboardGridConfig;

const DashboardWidget = ({
  mobile=false, settings, data, index, count,
  chipLabel, chipDescription, onOpenDialog, // onClickChip,
  widget: {
    links, dataSource, label, description, // group,
  },
}) => { // data, classes,
  // count: number: total number of widgets on the dashboard (for purpose of calculating entry animation)
  // index: number: sequence number of this widget relative to all widgets on the dashboard (for purpose of calculating entry animation)
  // widget: object: data defining the widget content
  // console.log('group\n', group,);
  // console.log('label\n', label,);
  // console.log('chipLabel\n', chipLabel,);
  // console.log('chipDescription\n', chipDescription,);
  // console.log('dataSource\n', dataSource,);

  const [ kernelData, setKernelData, ] = useState('');

  // const { group, label, description, links, dataSource, } = widget; // data, desc, rowDesc,rowName,
  // if(dataSource) console.log('dataSource\n', dataSource,);

  // linear staggered sequencing
  // const timeout = TARGET * (index + 1) / count;

  // random staggered sequencing
  const forwardIndex = index + 1; // loads first index first
  const reverseIndex = count - forwardIndex; // loads first index last
  const timeout = Math.round(Math.random() * TARGET * SCALAR * reverseIndex / count);

  const topLink = (links && links[0] && `/${links[0].id}`) || null;
  // console.log('chipLabel\n', chipLabel,);

  const handleDataChanged = data => {
    setKernelData(data);
    // console.log('data\n', data,);
  }

  // transitions are buggish // makes pointer non-responsive after closing dialog
  // const Transition = props => <Slide direction="up" {...props} />
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const getTypeOfData = () => data && typeof data;

  const getWidgetChip = () =>
    <Chip label={chipLabel} onClick={() => onOpenDialog(chipLabel, chipDescription,)} />

  const getWidgetNugget = () =>
    <WidgetNugget
      data={data} dataSource={dataSource}
      label={label} message={description}
      mobile={mobile} settings={settings}
      onDataChanged={handleDataChanged}
      onOpenDialog={() => onOpenDialog(label, description,)}
    />

  // const getKernelData = async () => {
  //   // try {
  //     // console.log( 'dataSource\n', dataSource, ); // debugger;
  //     // console.log( 'kernelData\n', kernelData, );
  //     const ready1 = !!dataSource && !_.isEmpty(dataSource);
  //     if(!ready1) return null;
  //     const { path, getField, } = dataSource;
  //     const ready2 = !!path && path.length && getField;
  //     if(!ready2) return null;
  //     // console.log( 'dataSource\n', dataSource, ); debugger;
  //     const data = await loadUserData( path, );
  //     const field = getField(settings);
  //     const result = _.get(data, field, '',);
  //     const out = result || 0;
  //     console.log('out\n', out,); debugger;
  //     setKernelData(out);
  //     // return out;
  //   // } catch (e) {
  //   //   console.error(e);
  //   // } 
  // }

  const getWidgetNuggetAssembly = () =>
    ( typeof kernelData != 'object' && kernelData )
    || getWidgetNugget() || <CircularProgress /> || ''

  const getPrimary = () =>
    ( getTypeOfData() === 'string' )
    ?
    label
    :
    <React.Fragment>
      <span className="mr-8">{`${label}:`}</span>
      {getWidgetNuggetAssembly()}
    </React.Fragment>

  const getSecondary = () =>
    ( getTypeOfData() === 'string' )
    ?
    <span className="text-12">
      {getWidgetNuggetAssembly()}
    </span>
    :
    null

  const getDashboardWidgetMobile = () =>
    <ListItem
      button
      // divider light // use <Divider /> instead
      // key={idHash || createdAt}
      // selected={!!index && (selectedIndex === index)}
      // onClick={handleClick}
      component={NavLink}
      to={topLink}
    >
      <ListItemAvatar>
        <Avatar>{label.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        // primary={item.geoLocal}
        // secondary={moment(createdAt).fromNow()}
        // primary={getItemConfig('primary')}
        // secondary={getItemConfig('secondary')}
        // primary={data}
        primary={getPrimary()}
        secondary={getSecondary()}
      />
      <ListItemSecondaryAction className="mr-8">
        <WidgetMenu mobile links={links} onOpenDialog={() => onOpenDialog(label, description,)}/>
      </ListItemSecondaryAction>
    </ListItem>

  // variant 2: main feature: click main target, then automatically jump to most relevant link
  // const getDashboardWidgetVariant2 = () =>

  const getDashboardWidgetLaptop = () =>
    // <FuseAnimate
    //   animation="transition.slideUpIn"
    //   duration={Math.round(Math.random() * 500)}
    //   delay={Math.round(Math.random() * 500)}
    // >
    <Slide in direction="up" timeout={timeout}>
      <Paper className="w-full rounded-16 shadow-none border-1 border-grey">
        <div className="flex items-center justify-between pr-4 pl-16 pt-12">
          {
          // <div className="text-16">{rowName}</div>
          // <IconButton aria-label="more"><Icon>more_vert</Icon></IconButton>
          // substitutions: desc > description, rowName > chipLabel, rowDesc > chipDescription, rowName > group,
          }
          <Tooltip TransitionComponent={Zoom} title={chipDescription}>
            <div>{getWidgetChip()}</div>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Action links" placement="left-start">
            <div>
              <WidgetMenu links={links} onOpenDialog={() => onOpenDialog(label, description,)} />
            </div>
          </Tooltip>
        </div>
        <Tooltip TransitionComponent={Zoom} title={description}>
          <Link to={topLink} className="no-underline text-grey-darker">
            <div className="mb-24">{getWidgetNugget()}</div>
          </Link>
        </Tooltip>
        {
        // // "room to grow"
        // <div className="flex items-center px-16 h-52 border-t-1 border-grey-light">
        //   <div className="text-15 flex w-full" color="textSecondary">
        //     <span className="truncate">{label}</span>
        //     :
        //     <b className="pl-8">{data}</b>
        //   </div>
        // </div>
        }
      </Paper>
    </Slide>
    // </FuseAnimate>

  const getDashboardWidget = () =>
    mobile ? getDashboardWidgetMobile() : getDashboardWidgetLaptop()
    
  return getDashboardWidget();
}

export default DashboardWidget;
// export default withStyles(styles)(DashboardWidget);