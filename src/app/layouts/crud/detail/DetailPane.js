import React from 'react';
import classNames from 'classnames';

import {
  withStyles, Slide, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction,
  // Chip, Badge, Avatar,
} from '@material-ui/core';

import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,
// import _ from '@lodash';

import MediaWidth from 'app/layouts/MediaWidth';
import {
  uiSpecs, getFormFieldsConfig, getFormFields, getCreatableFields,
} from 'app/config/AppConfig'; // getCleanFieldNames,
import Dashboard from 'app/views/dashboard/Dashboard';
import SimpleExpansionPanel from 'app/components/SimpleExpansionPanel';
import ButtonsTierDetail from './ButtonsTierDetail'; // CRUDButtons,
import ViewEmpty from '../ViewEmpty';
import ItemSummary from '../ItemSummary';

const styles = theme => ({
  paper: {
    // temp-border
    // border: 'solid blue 4px',
    color: theme.palette.text.secondary,
  },
});

// getHeader = () => (
//   <Hidden xsDown>
//     <FuseAnimate
//       // className="px-0"
//       // key={row.name}
//       delay={200}
//       // animation="transition.slideLeftIn"
//       // enter={{ animation: 'transition.perspectiveLeft' }}
//       // leave={{ animation: 'transition.perspectiveRight' }}
//       enter={{ animation: 'transition.slideDownBigIn' }}
//       leave={{ animation: 'transition.slideLeftOut' }}
//     >
//       <AppBar
//         className="m-0"
//         position="static"
//         elevation={0}
//       >
//         <Toolbar className="px-16">
//           <Typography variant="subtitle1" color="inherit" className="flex-1">
//             Items
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </FuseAnimate>
//   </Hidden>
// )

// getDetailListItem = ( keyName, keyIndex, item, condensed, ) =>
  
//   // Prevent React from throwing an error if the 'update' field is an object
//   (
//     // keyName === 'update'
//     // // because 'update' is constructed as object in src/app/layouts/crud/store/actions/item.actions.js
//     // ||
//     // Error guards against returning objects as fields
//     typeof item[keyName] === 'string'
//     ||
//     typeof item[keyName] === 'number'
//   )

//   &&

//   // skip empty fields
//   item[keyName].length
  
//   &&

//   // keyName // success
//   // `${keyName}: ${item[keyName]}` // success
//   // // success
//   // <Typography className="text-left">
//   //   {keyName}: {item[keyName]}
//   // </Typography>
//   // attempt
//   <ListItem
//     // key={keyName.createdAt}
//     key={keyIndex}
//     divider
//     // light
//     // button
//     // onClick={() => handleToggle(item)}
//   >
//     {
//     // <Avatar>
//     //   <BeachAccessIcon />
//     // </Avatar>
//     }
//     <ListItemText
//       primary={keyName}
//       secondary={ condensed ? null : item[keyName] }
//     />
//     {
//       condensed
//       ?
//       <ListItemSecondaryAction>
//         <Typography className="mr-16">{item[keyName]}</Typography>
//       </ListItemSecondaryAction>
//       :
//       null
//     }
//   </ListItem>

const appendObjectToArray = ( a, o, formFieldConfig, ) => {
  // a: arrayOfObjects: [ {id: [string], value: [string], displayMask: [string], required: [bool], ... } ]
  // o: object: {city: [string], county: [string], state: [string], zip: [string], ...}
  // formFieldConfig: object: computed from imported getFormFieldsConfig()
  // return: arrayOfObjects: [{ label: [string], value: [string], [optional] displayMask: [string],}, ...]
  // console.log('a\n', a,);
  const out = a.map( item => ({label: formFieldConfig[item].label, value: o[item],}));
  // keys.forEach( key => newArray.push({id: key, value: value[key],}));
  // console.log('out\n', out,);
  return out;
}

// const getDetailListItem = data => {
//   let display, label;
//   // data: can be one of two formats:
//   // 1st format: { label: [string], value: [string | number], displayMask: [string], }
//   // 2nd format: { [string]: [string | number] }
//   // case: 1st format
//   if( data.label && (data.value || data.displayMask)) {
//     display = data.displayMask || data.value;
//     label = data.label;
//   } else {
//     // case: 2nd format
//     const keys = Object.keys(data);
//     const key = label = keys[0];
//     display = data[key];
//   }
// below only considers 1st format as above defined
const getDetailListItem = ({ label, value, displayMask, }, condensed,) => {
  const display = displayMask || value;
  return (
    // Prevent React from throwing an error if the 'update' field is an object
    (
      // field.id === 'update'
      // // because 'update' is constructed as object in src/app/layouts/crud/store/actions/item.actions.js
      // ||
      // Error guards against returning objects as fields
      typeof display === 'string'
      ||
      typeof display === 'number'
    )

    &&

    // skip empty fields
    display.length

    &&

    // keyName // success
    // `${keyName}: ${item[keyName]}` // success
    // // success
    // <Typography className="text-left">
    //   {keyName}: {item[keyName]}
    // </Typography>
    // attempt
    <ListItem
      // key={keyName.createdAt}
      key={label}
      divider
      // light
      // button
      // onClick={() => handleToggle(item)}
    >
      {
      // <Avatar>
      //   <BeachAccessIcon />
      // </Avatar>
      }
      <ListItemText
        primary={label}
        secondary={ condensed ? null : display }
      />
      {
        condensed
        ?
        <ListItemSecondaryAction>
          <Typography className="mr-16">{display}</Typography>
        </ListItemSecondaryAction>
        :
        null
      }
    </ListItem>
  )
}

const DetailPane = ({
  classes, detail, condensed, itemsLength, selectedIndex, navComponentId,
  creatable, readable, updatable, deletable, actionable, starrable, dashboard, miniDashboard,
  onAction, onClickStar, onToggle, onUpdate, onDelete, onNavBack, onNavNext, // getFormFields,
}) => {

  // console.log('detail\n', detail,);
  // console.log('miniDashboard\n', miniDashboard,);

  const getDetailListItemObject = fields => {
    // implement recursive field listings
    // console.log('fields\n', fields,);
  
    const ready1 = fields && (typeof fields === 'object');
    // console.log('ready1\n', ready1,);
    if(!ready1) return null;
  
    // const { value: { formFieldConfigKey: key, }, } = fields;
    const { value, } = fields;
    // console.log('value\n', value,);
    const formFieldConfigKey = value && value.formFieldConfigKey; // 'zipInput'
    
    const ready2 = formFieldConfigKey;
    // console.log('ready2\n', ready2,);
    if(!ready2) return null;
  
    // turn object into array
    // console.log('value\n', value,);
    const formFieldConfig = getFormFieldsConfig();
    const keys = formFieldConfig[formFieldConfigKey].fields; // Object.keys(value);
    // console.log('keys\n', keys,); // ['city', 'state', 'zip', 'county',]
    // const newArray = getFormFields('loadSavedData', keys,);
    const newArray = appendObjectToArray(keys, value, formFieldConfig,);
    // console.log('newArray\n', newArray,);
    const out = getFormFieldsMap(newArray);
    // console.log('out\n', out,);
    return out;
    // return null;
  }

  const configFormFieldsMap = {
    string : field => getDetailListItemString( field ) ,
    number : field => getDetailListItemString( field ) ,
    object : field => getDetailListItemObject( field ) ,
    // object: getDetailListItemObject(field.value),
    // object: getFormFieldsMap(field.value), // recursion
  };

  const getConfigFormFieldsMap = (type, field,) => {
    // console.log('type\n', type,);
    // console.log('field\n', field,);
    return configFormFieldsMap[type](field);
  }

  const getFormFieldsMap = formFields => {
    // formFields: array of objects: [ {label: [string], value: [string | object]} ,... ] 
    // console.log('formFields\n', formFields,);
    // const flattened = _.flatten(formFields);
    // console.log('flattened\n', flattened,); debugger;
    const out = [];
    formFields.forEach( field => {
      const ready1 = field.value;
      if(!ready1) return null;

      const type = typeof (field.value); // || field);
      // console.log('type\n', type,);
      // console.log('field\n', field,);
      // console.log('label\n', field.label,);
      // console.log('value\n', field.displayMask || field.Value,);
      // console.log('field-core\n', `${field.label}: ${field.displayMask || field.value}`,);
      const outInner = getConfigFormFieldsMap(type, field,);
      // console.log('outInner\n', outInner,);
      if(outInner) out.push(outInner); // setGetFormFieldsMap(outInner) // 
    });
    // console.log('out\n', out,);
    return out;
  }

  const getDetailListItemString = field =>
    ( field.value && field.value.length ) > uiSpecs.maxCharsForDetailItemField // MAX_LENGTH
    ?
    <SimpleExpansionPanel key={field.label} heading={field.label} content={field.displayMask || field.value} />
    :
    getDetailListItem(field, condensed,)
  
  const getDetail = () => {
    // const MAX_LENGTH = 40;
    // console.log('condensed\n', condensed);
    
    // const keys = Object.keys(item);

    // const dataFields = getForm(keys);
    // console.log('dataFields\n', dataFields);

    // const ready1 = creatable && creatable.fields;
    // if(!ready1) return null;

    const getVisibleFields = () => ((readable && readable.visibleFields) || null );

    const getTargetFields = () =>  {
      const readablePath = readable && readable.path; // 'leads'
      // see AppConfig > getSearchableFields(creatable, readable,);
      const creatableFields = getCreatableFields(readablePath);
      const visibleFields = getVisibleFields();
      const out = visibleFields || creatableFields;
      return out;
    }

    const targetFields = (creatable && creatable.fields) || getTargetFields();

    const formFields = getFormFields('loadSavedData', targetFields, detail,);
    // console.log('formFields\n', formFields);
    
    return (
      // <FuseAnimate
      //   // className="px-0"
      //   // key={row.name}
      //   delay={200}
      //   // animation="transition.slideLeftIn"
      //   // enter={{ animation: 'transition.perspectiveLeft' }}
      //   // leave={{ animation: 'transition.perspectiveRight' }}
      //   enter={{ animation: 'transition.slideLeftIn' }}
      //   leave={{ animation: 'transition.slideLeftOut' }}
      // >
      <Paper className={classNames(classes.paper, "z-0",)}>
        <List className="m-0 p-0" component="nav"> {/* subheader={<ListSubheader className="text-left">Detail</ListSubheader>} */}
          <FuseAnimateGroup
            delay={500}
            enter={{ animation: "transition.slideDownBigIn" }}
            leave={{ animation: "transition.slideLeftOut" }}
          >
          {
            // keys.map((keyName, keyIndex,) =>
            //   item[keyName].length > uiSpecs.maxCharsForDetailItemField // MAX_LENGTH
            //   ?
            //   <SimpleExpansionPanel key={keyIndex} heading={keyName} content={item[keyName]} />
            //   :
            //   getDetailListItem( keyName, keyIndex, item, condensed, )
            // )
            getFormFieldsMap(formFields)
          }
          </FuseAnimateGroup>
        </List>
      </Paper>
      // </FuseAnimate>
    )
  }
    
  const getSummaryTier = () => 
    <List component="nav">
      {/* {getSummary(detail, false,)} */}
      <ItemSummary
        side="detail"
        navComponentId={navComponentId}
        item={detail}
        readable={readable}
        actionable={actionable}
        starrable={starrable}
        selectedIndex={selectedIndex}
        onAction={onAction}
        onToggle={onToggle}
        onClickStar={onClickStar}
        // index={index} // never select summary on detail side
      />
    </List>

  const getButtonsTier = () => {
    const limit = itemsLength - 2;
    // console.log('limit\n', limit,);
    // console.log('actionable\n', actionable,);
    return (
      <ButtonsTierDetail
        limit={limit} selectedIndex={selectedIndex}
        updatable={updatable} deletable={deletable} // actionable={actionable} starrable={starrable}
        onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} onNavBack={onNavBack} onNavNext={onNavNext}
      />
    );
  }

  const getDashboard = () =>
    <MediaWidth
      mobile={<Dashboard dashboard={dashboard} type="micro" />}
      tablet={<Dashboard dashboard={dashboard} type="mini"  />}
      laptop={<Dashboard dashboard={dashboard} type="mini"  />}
    />

  const getHeader = () =>
    <Paper className={classNames(classes.paper, "z-0",)}>
      {getButtonsTier()}
      {getSummaryTier()}
    </Paper>

  const getContent = () => <React.Fragment>{getHeader()}{getDetail()}</React.Fragment>
  const getViewEmpty = () => <ViewEmpty side="detail" />

  const getDetailPane = () =>
    <React.Fragment>
      { miniDashboard && !!miniDashboard.length && getDashboard() } 
      <Slide // <Zoom // <Grow 
        in //={detail}
        direction="right"
        mountOnEnter
        unmountOnExit
        // timeout={3000}
      >
        { detail ? getContent() : getViewEmpty() }
      </Slide>
      {/* // </Grow> // </Zoom> // */}
    </React.Fragment>

  // console.log('detail\n', detail);
  return getDetailPane();
}
 
// export default DetailPane;
export default withStyles(styles)(DetailPane);