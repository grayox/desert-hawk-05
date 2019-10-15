// inspired by // https://material-ui.com/demos/chips/#chip | https://material-ui.com/demos/dialogs/

import React from 'react'; // useState, useEffect,

// import {
//   // Chip, // Button, Slide, Typography, // withStyles
//   // Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
// } from '@material-ui/core';

// import Skeleton from 'app/components/Skeleton';
import Skeleton from '@material-ui/lab/Skeleton';
import WidgetKernel from './WidgetKernel';

import _ from '@lodash';
import numeral from 'numeral';

const getTypeIsObject = () =>
  <Skeleton variant="circle" width={30} height={30} />
  // <Skeleton type='circle' radius={30} />
  // <Skeleton className="block" type='rect' height={30} width={70} />

const getFontSize = ( data = '' ) => {
  // console.log('data\n', data,);
  
  const typeOfData = typeof data;
  // console.log('typeOfData\n', typeOfData,);

  // if(typeOfData === 'object') return 'text-72';
  if(typeOfData === 'string') return 'text-18';

  // minimum white space
  const fontSizeLookupTable = () => {
    // some values of 'text-x' work, some don't
    // work: text-72 70 68 64 56 48 40 36 32 28 24 20 18 16
    // don't work: text-30
    let a = [];
    a.length = 32;
    a.fill( 'text-72'        ); // alt
    a.fill( 'text-68' ,  4 , ); // 70
    a.fill( 'text-64' ,  5 , ); // 68
    a.fill( 'text-48' ,  6 , ); // 64 // too big for 'Canada'
    a.fill( 'text-40' ,  7 , ); // 56
    a.fill( 'text-36' ,  8 , ); // 48
    a.fill( 'text-32' ,  9 , ); // 36
  //a.fill( 'text-32' , 10 , ); // used to be 'text-30', but 'text-30' didn't render as expected (it was too small -- same as undefined)
    a.fill( 'text-28' , 12 , );
    a.fill( 'text-24' , 14 , );
    a.fill( 'text-20' , 16 , );
    a.fill( 'text-18' , 24 , );
    // console.log('a\n', a,);
    return a;
  }

  // // minimum font-size differential in text fields
  // const fontSizeLookupTable = () => {
  //   let a = [];
  //   a.length = 32;
  //   a.fill( 'text-72'        );
  //   a.fill( 'text-68' ,  4 , );
  //   a.fill( 'text-64' ,  5 , );
  //   a.fill( 'text-48' ,  6 , );
  //   a.fill( 'text-40' ,  7 , );
  //   a.fill( 'text-18' ,  8 , );
  //   // a.fill( 'text-18' ,  9 , );
  //   // a.fill( 'text-18' , 12 , );
  //   // a.fill( 'text-18' , 14 , );
  //   // a.fill( 'text-18' , 16 , );
  //   // a.fill( 'text-18' , 24 , );
  //   // console.log('a\n', a,);
  //   return a;
  // }

  const lookupTable = fontSizeLookupTable();
  const lookupTableLength = lookupTable.length;

  const newString = _.toString(data);
  const stringLength = newString.length;

  // account for commas
  const numberOfCommas = newString.split(',').length - 1; // count number of commas
  const adjLength = stringLength - numberOfCommas;
  
  // console.log('data\n', data,);
  // console.log('newString\n', newString,);
  // console.log('adjLength\n', adjLength,);
  // console.log('lookupTableLength\n', lookupTableLength,);
  const out = (adjLength < lookupTableLength) ? lookupTable[adjLength] : 'text-16' ;
  // console.log('out\n', out,);
  return out;
}

// const Transition = props => <Slide direction="up" {...props} />

// const handleClick = () => alert('You clicked the Chip.') // eslint-disable-line no-alert
// const handleClick = msg => alert(msg)

// const WidgetNugget = props => <Chip className={classes.chip} />
// const WidgetNugget = ({ label, message, }) => <Chip label={label} onClick={() => handleClick(message)} />
const WidgetNugget = ({
  // message, type, onOpenDialog,
  mobile=false, settings, data, dataSource, label, onDataChanged,
}) => {
  console.log('label\n', label,);
  // if(dataSource) console.log('dataSource\n', dataSource,);

  // const [ dialogIsOpen    , setDialogIsOpen    , ] = useState(false);
  // // const [ formattedResult , setFormattedResult , ] = useState('');
  // // const [ fontSize        , setFontSize        , ] = useState('text-72');

  // useEffect( () => {
  //   const newFontSize = computeFontSize(formattedResult);
  //   console.log('formattedResult\n', formattedResult,);
  //   console.log('fontSize\n', fontSize,);
  //   console.log('newFontSize\n', newFontSize,);
  //   debugger;
  //   if(newFontSize !== fontSize) setFontSize(newFontSize);
  // }, [ formattedResult, ]);

  const getFormat = rawValue => {
    // console.log( 'rawValue\n', rawValue, );
    let out;
    const typeOfData = typeof rawValue;
    // console.log( 'typeOfData\n', typeOfData, );
    switch (typeOfData) {
      case 'number':
        out = numeral(rawValue).format('0,0');
        break;
      case 'string':
        out = rawValue.toUpperCase();
        break;
      case 'object':
        out = getTypeIsObject();
        break;
      default:
        out = rawValue;
    }
    return out;
  }

  const getWidgetKernel = () =>
    <WidgetKernel
      onDataChanged={onDataChanged}
      settings={settings} dataSource={dataSource}
      handleFontSize={mobile ? () => {} : getFontSize}
    />

  // const getWidgetKernel = () => {
  const getWidgetNugget = () => {
    let result;
    const dataExists = ( !!data || data===0 );
    if(dataExists) {
      result = data;
    } else {
      result = getWidgetKernel();
      // console.log('result\n', result,);
    }
    // console.log('result\n', result,);
    const formattedResult = getFormat(result);
    // console.log('formattedResult\n', formattedResult,);
    // setFormattedResult(formattedResult);
    const fontSize = getFontSize(result); // formattedResult converts all to text
    // console.log('computedFontSize\n', computedFontSize,);
    // console.log('fontSize\n', fontSize,);

    const getLaptop = () =>
      <div
        className="flex flex-col h-116 text-center cursor-pointer" // direction: 'right', text-16 text-72
      // onClick={() => handleOpenDialog()}
      >
        <div className={`${fontSize} h-72 flex items-end m-auto leading-none text-blue`}> {/* m-auto: horizontal margin */}
          <span className="flex-1 object-center m-auto border border-red">{formattedResult}</span> {/* m-auto: vertical margin */}
        </div>
        <div className="text-xs uppercase mt-8" color="textSecondary">{label}</div>
      </div>

    return ( mobile ? formattedResult : getLaptop() )
  }

  // const config = {
  //   chip: getChip(),
  //   kernel: getWidgetKernel(),
  // };

  // const getConfig = type => config[type];

  // const getDialog = () =>
  //   <Dialog
  //     keepMounted
  //     open={dialogIsOpen}
  //     onClose={handleCloseDialog}
  //     TransitionComponent={Transition}
  //     aria-labelledby="alert-dialog-slide-title"
  //     aria-describedby="alert-dialog-slide-description"
  //   >
  //     <DialogTitle id="alert-dialog-slide-title">{label}</DialogTitle>
  //     <DialogContent>
  //       <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
  //     </DialogContent>
  //     <DialogActions>
  //       {
  //       // <Button onClick={handleCloseDialog} color="primary">Disagree</Button>
  //       // <Button onClick={handleCloseDialog} color="primary">Agree</Button>
  //       }
  //       <Button onClick={handleCloseDialog} color="primary">Okay, got it</Button>
  //     </DialogActions>
  //   </Dialog>
  
  // const handleOpenDialog = () => setDialogIsOpen(true);
  // const handleCloseDialog = () => setDialogIsOpen(false);
  // const Transition = props => (<Slide direction={config[type].direction} {...props} />);

  // const getWidgetNugget = () => <div> {getConfig(type)} {getDialog()} </div>
  // const getWidgetNugget = () => mobile ? (data ? getFormat(data) : null) : getConfig(type)
  // const getWidgetNugget = () => getConfig(type)

  return getWidgetNugget();
}

export default WidgetNugget;