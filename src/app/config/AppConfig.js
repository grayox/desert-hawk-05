import React from 'react';
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Typography, } from '@material-ui/core'; // withStyles,

// firebase
// import { firestoreConnect } from 'react-redux-firebase';
// import firebase from 'firebase';
import firebase from 'firebase/app';

// fuse
// import { FuseLoadable, } from '@fuse';

// redux
// import { connect } from 'react-redux';
// import { compose } from 'redux';

// @material-ui/core
// import { Chip, } from '@material-ui/core'; // withStyles,

// utilities
import _ from '@lodash';
import moment from 'moment';
import numeral from 'numeral';
import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash

// custom components

import MaskedInput from 'react-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import CustomAlert from 'app/components/CustomAlert';
import ZipCodeInput from 'app/components/CustomFormFields/ZipCodeInput';
// import ReactPhoneInputContainer from 'app/containers/ReactPhoneInputContainer';

// end custom components

// creatable
// import UserMultiForm from 'app/components/forms/UserMultiForm';

// categoryItems
// import HomeIcon from '@material-ui/icons/Home';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// import AssessmentIcon from '@material-ui/icons/Assessment';
// import AssignmentIcon from '@material-ui/icons/Assignment';

// logout
// alt icons
// install https://www.npmjs.com/package/react-icons
// icons   https://react-icons.netlify.com/#/
import { IconContext, } from 'react-icons'; // my add
// MenuItem><FiLogOut /><span className='ml-12'>FiLogOut</span></MenuItem>
// MenuItem><IoMdLogOut /><span className='ml-12'>IoMdLogOut</span></MenuItem>
// MenuItem><FaSignOutAlt /><span className='ml-12'>FaSignOutAlt</span></MenuItem>
// MenuItem><IoIosLogOut /><span className='ml-12'>IoIosLogOut</span></MenuItem>
// MenuItem><GoSignOut /><span className='ml-12'>GoSignOut</span></MenuItem>
import { FaSignOutAlt, } from 'react-icons/fa'; // https://react-icons.netlify.com/#/
// import { FiLogOut } from 'react-icons/fi'; // https://react-icons.netlify.com/#/
// import { GoSignOut, } from 'react-icons/go'; // https://react-icons.netlify.com/#/
// import { IoIosLogOut, IoMdLogOut, } from 'react-icons/io'; // https://react-icons.netlify.com/#/

// utility components
// import ComponentRouter from 'app/config/ComponentRouter';
import { getDashboardInitialValues, } from 'app/config/DashboardGridConfig';

// usage
// import { getComponentsNavConfig, } from 'app/config/AppConfig';
// const componentsNavConfig = getComponentsNavConfig({ item, });

export const uiSpecs = {
  drawerWidth: 256, // https://material.io/design/components/navigation-drawer.html#specs
  // appBarHeight:  64, // 64 per MUI theme // 56 per spec: https://material.io/design/components/app-bars-top.html#specs
  // bottomNavHeight:  56,
  maxCharsForDetailItemField: 40,
}

// export const OVERWRITE_OLD_DATA = true; // .add() if false, .set() if true

// New project checklist:
// 1. create new project
// 2. activate database
// 3. set up sign-in method: authentication > sign-in method
// 4. [upper left] ⚙️ > Project settings > General > Project ID (projectId) | Web API Key (apiKey)
// 5. [upper left] ⚙️ > Project settings > Cloud Messaging > Sender ID (messagingSenderId)
// 6. Derive from projectId, the other firebaseConfig properties

// // production account
// // Epimetheus Emporium
// export const firebaseConfig = {
//   projectId: 'epimetheus-emporium',
//   apiKey: 'AIzaSyDC3RoirzgiX4jPHyVX6pRxWXzSiG79tzw',
//   messagingSenderId: '750093838768',
//   storageBucket: 'epimetheus-emporium.appspot.com',
//   authDomain: 'epimetheus-emporium.firebaseapp.com',
//   databaseURL: 'https://epimetheus-emporium.firebaseio.com',
// }

// test account
// Green Comet
export const firebaseConfig = {
  projectId: 'green-comet-e2c85',
  apiKey: 'AIzaSyAOEXILaYcxjmJsJ81_WfubS_h3AQ3lLdA',
  messagingSenderId: '682044250674',
  storageBucket: 'green-comet-e2c85.appspot.com',
  authDomain: 'green-comet-e2c85.firebaseapp.com',
  databaseURL: 'https://green-comet-e2c85.firebaseio.com',
}

// ref: https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
const getArrayUnion = data => firebase.firestore.FieldValue.arrayUnion(data); // Atomically add new data to an array
// const getArrayRemove = data => firebase.firestore.FieldValue.arrayRemove(data); // Atomically remove data from an array
// ref: https://firebase.google.com/docs/firestore/manage-data/add-data#increment_a_numeric_value
const getIncrement = amount => firebase.firestore.FieldValue.increment(amount); // // Atomically increment a field value

export const defaultSettings = {
  // default settings
  // default dashboard: src/app/config/DashboardGridConfig.js > getDashboardInitialValues
  // also see: FetchUserData.js > getInitialValues
  // placeholeder only for now
  // prevents import error at userDataReducer.js
  // experimenting with replacement by settingsConfig
}

export const getSettingsConfig = () => settingsConfig;

const settingsConfig = {
  // define default settings
  // name: undefined,
  // email: undefined,
  // mobile: undefined,
  // businessType: undefined,
  // geoNation: undefined,
  // geoRegion: undefined,
  // geoLocal: undefined,
  dashboard: getDashboardInitialValues(),
  autoClaimLeads: false,
  autoTextMe: false,
  // autoTextMeToNumber: undefined,
  autoEmailMe: false,
  // autoEmailMeToEmail: undefined,
  autoTextProspect: false,
  // autoTextProspectToNumber: undefined,
  autoEmailProspect: false,
  // autoEmailProspectToEmail: undefined,
  displayAvatar: 'Friendly',
}

// export const settingsConfig1 = {
//   structure: [
//     {
//       details: [
//         {
//           contact: [ 'name', 'email', 'mobile', ],
//         }, {
//           business: [ 'type', 'location', ],
//         },
//       ],
//     }, {
//       preferences: [
//         {
//           automation: [
//             'claimNewLeads',
//             {
//               'Notify me': [ 'notifyMeText', 'notifyMeEmail', ]
//             }, {
//               'Notify prospects' : [ 'notifyProspectsText', 'notifyProspectsEmail', ]
//             },
//           ],
//         }, {
//           display: [ 'avatar', 'background', ] ,
//         },
//       ],
//     },
//   ] ,
//   items: {
//     name: {
//       label: 'Name',
//       icon: 'perm_contact_calendar',
//       initialValue: null,
//       profileAlt: true,
//       type: 'dialog-text-field',
//       dialogTextFieldLabel: 'first and last',
//     },
//     email: {
//       label: 'Email',
//       icon: 'email',
//       initialValue: null,
//       profileAlt: true,
//       type: 'dialog-text-field',
//       dialogTextFieldLabel: 'address',
//     },
//     mobile: {
//       label: 'Mobile',
//       icon: 'smartphone',
//       initialValue: null,
//       profileAlt: true,
//       type: 'dialog-text-field',
//       dialogTextFieldLabel: 'number',
//     },
//     type: {
//       label: 'Type',
//       icon: 'extension',
//       initialValue: null,
//       profileAlt: false,
//       type: 'menu',
//     },
//     location: {
//       label: 'Location',
//       icon: 'location_on',
//       initialValue: null,
//       profileAlt: false,
//       type: 'custom-component',
//     },
//     claimNewLeads: {
//       label: 'Claim new leads',
//       icon: 'flash_on',
//       initialValue: false,
//       profileAlt: false,
//       type: 'switch',
//     },
//     notifyMeText: {
//       label: 'Claim new leads',
//       icon: 'flash_on',
//       initialValue: false,
//       profileAlt: false,
//       type: 'switch',
//     },
//     notifyMeEmail: {},
//     notifyProspectsText: {},
//     notifyProspectsEmail: {},
//     avatar: {},
//     background: {},
//   },
// }

export const avatarOptions = [
  { label : 'Friendly'  , value : 'wavatar'   , } ,
  { label : 'Kitty'     , value : 'robohash4' , } ,
  { label : 'Cuddly'    , value : 'adorable'  , } ,
  { label : 'Wacky'     , value : 'monsterid' , } ,
  // { label : 'Metalloid' , value : 'robohash'  , } ,
  { label : 'Metalloid' , value : 'robohash1' , } ,
  { label : 'Humanoid'  , value : 'robohash2' , } ,
  { label : 'Bot'       , value : 'robohash3' , } ,
  // { label : 'Random'    , value : 'robohashx' , } ,
  { label : 'Retro'     , value : 'retro'     , } ,
  { label : 'Pattern'   , value : 'identicon' , } ,
  { label : 'Coded'     , value : 'ui'        , } , // user initials greyscale
  { label : 'Colored'   , value : 'uic'       , } , // user initials with color
  { label : 'Generic'   , value : 'mp'        , } , // user icon (mystery person)
]

export const pickUserFromAuth = auth => {
  const picked = _.pick(auth, userFieldsToPick);
  picked.photoURL = picked.providerData[0].photoURL; // don't know how to get subproperties from _.pick()
  delete picked.providerData; // to prevent errors uploading to firebase
  // console.log('picked', picked);
  // debugger;
  return picked;
}
export const userFieldsToPick = [
  'uid', 'displayName', 'photoURL', 'email', 'emailVerified',
  'phoneNumber', 'isAnonymous', 'lastLoginAt', 'createdAt', 'providerData',
]

// export const fuseLoadableConfig = {
//   // import {fuseLoadableConfig} from 'app/config/AppConfig'
//   // const { delay, timeout } = fuseLoadableConfig;
//   // add src/@fuse/components/FuseLoadable/FuseLoadable.js to xfer.txt
//   delay  : 300,
//   timeout: 10000,
// }

// start app-specific parameters

export const brand = {
  logoPath: 'assets/images/logos/fuse.svg', // public/assets/images/logos/fuse.svg
  appName: 'Swap',
  tagLine: 'Give leads. Get leads.',
  description: 'Real estate agents, mortgage brokers, insurance agents and financial planners need leads. Referrals are a good way to get them. Swap lets you turn your clients into referrals and get back referrals in exchange.',
}
export const CHALLENGES_LIMIT = 3
// [ 'made', 'received', ]
// [ 'won', 'lost', 'pending', ]
// challenges
//   made
//     won
//     lost
//     pending
//   received
//     won
//     lost
//     pending

export const bizCategoryItems = [
  { value : 'home'      , label : 'Home'      , icon : 'home'            } ,
  { value : 'mortgage'  , label : 'Mortgage'  , icon : 'account_balance' } ,
  { value : 'financial' , label : 'Financial' , icon : 'assessment'      } ,
  { value : 'insurance' , label : 'Insurance' , icon : 'assignment'      } ,
]

export const getValueMaskSelectOrMenuOptions = ( optionItems, value, ) => {
  // optionItems: object: { value, label, }: {value: 'home', label: 'Home',}
  // return: string: label

  const ready1 = optionItems && value;
  if(!ready1) return null;

  const matches = _.filter(bizCategoryItems, { value, },);
  // console.log('matches\n', matches,);
  const match = matches[0];
  // console.log('match\n', match,);
  const out = match.label;
  // console.log('out\n', out,);
  return out; // Home

}

export const getDisplayMaskBizCategory = value => { // home
  // console.log('value\n', value,);
  // console.log('bizCategoryItems\n', bizCategoryItems,);
  
  const ready1 = bizCategoryItems && value;
  if(!ready1) return null;
  
  const out = getValueMaskSelectOrMenuOptions(bizCategoryItems, value,);
  // console.log( 'out\n', out, );
  return out;
}

// end app-specific parameters

// const getMaskedInput = props => {
//   // ref: src/app/containers/ReactPhoneInputContainer.js
//   const { inputRef, ...other } = props;
//   return (
//     <MaskedInput
//       // showMask
//       {...other}
//       placeholderChar={'\u2000'}
//       ref={ref => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//     />
//   );
// }

// Begin mask project

// const getArrayOfCharsFromStr = word => {
//   const emptyString = '';
//   const out = word.split(emptyString);
//   return out;
// }
// const getLastCharOfStr = word => {
//   const allLetters = getArrayOfCharsFromStr(word);
//   const lastLetter = allLetters.pop();
//   return lastLetter;
// }

// const getTitleMask = ( rawValue, {currentCaretPosition=0, placeholderChar='', previousConformedValue=''}, ) => {
//   // console.log('Hello world');
//   // console.log('rawValue\n', rawValue,);
//   const capitalRe = /[A-Z]/;
//   const lowercaseRe = /[a-z]/;
//   const whitespaceRe = /\s/;
//   const whitespace = ' ';
   
//   let out = [];
//   const arrayOfWords = rawValue.split(whitespace); // [ 'John', 'Doe', ]
//   let i = 0;
//   arrayOfWords.forEach( (word, wordIndex,) => {
//     const arrayOfLetters = getArrayOfCharsFromStr(word); // [ 'D', 'o', 'e', ]
//     arrayOfLetters.forEach( (letter, letterIndex,) => {
//       out[i++] = !!letterIndex ? lowercaseRe : capitalRe;
//     })
//   })
//   // const lastLetter = getLastCharOfStr(rawValue);
//   // if(lastLetter === whitespace) out.push(whitespaceRe);
//   out.push(whitespaceRe);
//   console.log('currentCaretPosition\n', currentCaretPosition,);
//   return out;
// }

// const getTitlePipe = (
//   conformingValue, // params,
//   {
//     rawValue = "",
//     previousConformedValue = null,
//     guide = false,
//     placeholder = "",
//     placeholderChar = " ",
//     currentCaretPosition = 0,
//     keepCharPositions = false,
//   },
// ) => {
//   // console.log( 'params\n', params, );
//   console.log( 'rawValue\n', rawValue, );
//   console.log( 'conformingValue\n', conformingValue, );
//   console.log( 'currentCaretPosition\n', currentCaretPosition, );
//   console.log( 'previousConformedValue\n', previousConformedValue, );
//   const emptyString = '';
//   const whitespace = ' ';
//   const stem = _.startCase(_.toLower(rawValue));
//   const lastRawChar = getLastCharOfStr(rawValue);
//   const lastChar = (lastRawChar === whitespace) ? whitespace : emptyString;
//   const out = `${stem}${lastChar}`;
//   console.log( 'currentCaretPosition\n', currentCaretPosition, );
//   return out;
//   // // test // https://lodash.com/docs/4.17.15#startCase
//   // const a = [
//   //   "jolly roGER", "JOLLY ROger", "GERALD P. HENDON", "MacAfee", "McAfee", "Martin Luther King, Jr.",
//   //   "Betty d'Angelo", " One space", "  Two spaces ",
//   //   "Alice Worthington-Smythe", "Betty D'Angelo", "Charlie Van der Humpton", "Ben & Jerry", "Sierra O'Neil",
//   //   '--foo-bar--', 'fooBar', '__FOO_BAR__', 'FOO BAR', 'This string ShouLD be ALL in title CASe',
//   //   'myString', 'my_string', 'MY_STRING', 'my string', 'My string', "a Simple string",
//   //   "I’m a little tea pot", "I’m a little tea pot", "I’m A Little Tea Pot", "sHoRt AnD sToUt", "Short And Stout", "HERE IS MY HANDLE HERE IS MY SPOUT", "Here Is My Handle Here Is My Spout",  
//   // ];
//   // const result1 = a.map( s => _.startCase(_.camelCase(s)));
//   // const result2 = a.map( s => _.startCase(_.toLower(s)));
//   // [result1, result2,]
// }

const numberMask = createNumberMask(); // use all defaults (see below for default values and link to source code)
// or we can use below if we need to modify any parameters: prefix, suffix, includeThousandsSeparator, thousandsSeparatorSymbol, allowDecimal, decimalSymbol, decimalLimit, requireDecimal, allowNegative, allowLeadingZeroes, integerLimit
// const numberMask = createNumberMask({
//   // ref: https://github.com/text-mask/text-mask/tree/master/addons#usage
//   // ref: parameters and defaults >
//   // https://github.com/text-mask/text-mask/blob/master/addons/src/createNumberMask.js
//   // prefix = dollarSign, suffix = emptyString, includeThousandsSeparator = true, thousandsSeparatorSymbol = comma, allowDecimal = false, decimalSymbol = period, decimalLimit = 2, requireDecimal = false, allowNegative = false, allowLeadingZeroes = false, integerLimit = null
//   prefix: '$', // default
//   suffix: '', // default
// })

const dash = '-';
const leftParen = '(';
const rightParen = ')';
const whitespace = ' ';
const digitRe = /\d/;
const zipRe = /^\d{5}$/;
const nonZeroDigitRe = /[1-9]/;
const phoneRe = /^\([1-9]\d{2}\)\s\d{3}-\d{4}$/; // https://regex101.com/r/mrvZZC/1
const emailRe = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/; // modified: w{2,3} -> w{2,} (top-level domains can have more than three characters)// https://www.w3resource.com/javascript/form/email-validation.php // https://regex101.com/r/sKxhYp/2
const lettersOnlyRe = /^[a-zA-Z\s]+$/; // https://www.w3resource.com/javascript/form/letters-numbers-field.php // https://regex101.com/r/fCsBHm/1
const matchAllRe = /^.*$/; // matches all characters (.) zero or more times (*) 
const phoneMask = [
  leftParen, nonZeroDigitRe, digitRe, digitRe, rightParen, whitespace, // '(212) '
  digitRe, digitRe, digitRe, dash, digitRe, digitRe, digitRe, digitRe, // '555-1212'
]
const getZipInputValidation = data => !!data.isValid
// {
//   console.log('data\n', data,);
//   const TARGET_TYPE = 'object';
//   const TARGET_KEYS_LENGTH = 9;
//   const typeOfData = typeof data;
//   console.log('typeOfData\n', typeOfData,);
//   const bool1 = (typeOfData === TARGET_TYPE);
//   const keys = Object.keys(data);
//   console.log('keys\n', keys,);
//   const keysLength = keys.length;
//   console.log('keysLength\n', keysLength,);
//   const bool2 = (keysLength === TARGET_KEYS_LENGTH);
//   const out = bool1 && bool2;
//   return out;
// }


const getValidation = ( target=matchAllRe, data, ) => {
  // validate field input
  if(target instanceof RegExp) return target.test(data); // test regular expression
  if(typeof target === 'function') return target(data); // run validator function
}

const validationConfig = {
  zip         : zipRe                 ,
  zipInput    : getZipInputValidation ,
  lettersOnly : lettersOnlyRe         ,
  phone       : phoneRe               ,
  email       : emailRe               ,
  title       : matchAllRe            ,
  number      : matchAllRe            ,
  matchAll    : matchAllRe            ,
}

const masksConfig = {
  // ref: https://www.npmjs.com/package/react-text-mask | https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
  // title: getTitleMask, // deprecated. causes cursor jumping bug; mask display on read with: _.startCase(_.toLower(rawValue)); // https://www.mutuallyhuman.com/blog/the-curious-case-of-cursor-jumping/ // http://dimafeldman.com/js/maintain-cursor-position-after-changing-an-input-value-programatically/
  // title: null,
  textOnly: null,
  // phone: [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ],
  phone: phoneMask,
  // add-ons ref: https://github.com/text-mask/text-mask/tree/master/addons/#readme
  email: emailMask,
  number: numberMask,
}

// const pipesConfig = {
//   // ref: https://www.npmjs.com/package/react-text-mask | https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
//   title: getTitlePipe,
//   phone: null,
//   // add-ons ref: https://github.com/text-mask/text-mask/tree/master/addons/#readme
//   email: null,
//   number: null,
// }

const getMaskedInput = mask => ({ inputRef, onChange, ...other, }) =>
// const getMaskedInput = ( mask, pipe, ) => ({ inputRef, onChange, ...other, }) =>
  // ref: src/app/containers/ReactPhoneInputContainer.js
  <MaskedInput
    {...other}
    // showMask
    mask={mask}
    // pipe={pipe}
    guide={false}
    // keepCharPositions
    placeholderChar={'\u2000'}
    ref={ ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    // className="form-control"
    // placeholder="Enter a phone number"
    // id="my-input-id"
    onBlur={() => {}}
    // onChange={() => {}}
    onChange={onChange}
  />

const getDisplayMaskTitle = rawValue => _.startCase(_.toLower(rawValue)) // _.camelCase
const getDisplayMaskPrice = rawValue => numeral(rawValue).format('$0,0[.]00') // http://numeraljs.com

// const displayMasksConfig = {
//   name: getDisplayMaskTitle,
//   price: getDisplayMaskPrice,
//   bizCategory: getDisplayMaskBizCategory,
// }

export const getDisplayMask = ( id, rawValue, ) => {
  // console.log('id\n', id,);
  // console.log('rawValue\n', rawValue,);
  const out = formFieldsConfig[id].display ? formFieldsConfig[id].display(rawValue) : rawValue;
  return out;
}

const formFieldsConfig = {  // notice the 's' at the end of formFields, makes it "unique"
  // Deprecated: type must be an HTML5 input type | https://www.w3schools.com/html/html_form_input_types.asp | https://material-ui.com/api/text-field/
  // Deprecated: button|checkbox|color|date|datetime-local|email|file|hidden|image|month|number|password|radio|range|reset|search|submit|tel|text|time|url|week
  // Add new field types to src/app/components/forms/FormTemplate.js > FormTemplate > getConfig()
  // Add new components by importing to this file AppConfig and adding a components property tothe below config object
  name        : { type : 'text'      , label : 'Name'         , icon : 'account_circle' , mask : 'title'       , display : getDisplayMaskTitle       , } ,
  firstName   : { type : 'text'      , label : 'First name'   , icon : 'account_circle' , mask : 'title'       , display : getDisplayMaskTitle       , } ,
  lastName    : { type : 'text'      , label : 'Last name'    , icon : 'account_circle' , mask : 'title'       , display : getDisplayMaskTitle       , } ,
  nickname    : { type : 'text'      , label : 'Nickname'     , icon : 'star'           , mask : 'title'       , display : getDisplayMaskTitle       , } ,
  address     : { type : 'text'      , label : 'Address'      , icon : 'home'           , mask : 'title'       , display : getDisplayMaskTitle       , } ,
  price       : { type : 'text'      , label : 'Price'        , icon : 'attach_money'   , mask : 'number'      , display : getDisplayMaskPrice       , } ,
  ask         : { type : 'text'      , label : 'Ask'          , icon : 'attach_money'   , mask : 'number'      , display : getDisplayMaskPrice       , } ,
  bid         : { type : 'text'      , label : 'Bid'          , icon : 'attach_money'   , mask : 'number'      , display : getDisplayMaskPrice       , } ,
  askingPrice : { type : 'text'      , label : 'Asking price' , icon : 'attach_money'   , mask : 'number'      , display : getDisplayMaskPrice       , } ,
  offer       : { type : 'text'      , label : 'Offer'        , icon : 'attach_money'   , mask : 'number'      , display : getDisplayMaskPrice       , } ,
  bizCategory : { type : 'select'    , label : 'Type'         , icon : 'extension'      , mask : 'lettersOnly' , display : getDisplayMaskBizCategory , options: bizCategoryItems, }, // getDisplayMask: value => getDisplayMaskBizCategory(value), // curry first attempt -- does not work: getDisplayMask: value => bizCategoryItems => getValueMaskSelectOrMenuOptions(bizCategoryItems, value,), },
  zipInput    : { type : 'component' , label : 'Zip code'     , icon : 'place'          , mask : 'zipInput'    , display : null                      , component: <ZipCodeInput />, fields: ['city', 'state', 'zip', 'county',],},
  zip         : { type : 'text'      , label : 'Zip'          , icon : 'place'          , mask : 'zip'         , display : null                      , } ,
  city        : { type : 'text'      , label : 'City'         , icon : 'place'          , mask : 'lettersOnly' , display : null                      , } ,
  state       : { type : 'text'      , label : 'State'        , icon : 'place'          , mask : 'lettersOnly' , display : null                      , } ,
  county      : { type : 'text'      , label : 'County'       , icon : 'place'          , mask : 'lettersOnly' , display : null                      , } ,
  lat         : { type : 'text'      , label : 'Latitude'     , icon : 'place'          , mask : 'matchAll'    , display : null                      , } ,
  lon         : { type : 'text'      , label : 'Longitude'    , icon : 'place'          , mask : 'matchAll'    , display : null                      , } ,
  phone       : { type : 'text'      , label : 'Phone'        , icon : 'phone'          , mask : 'phone'       , display : null                      , } ,
  email       : { type : 'text'      , label : 'Email'        , icon : 'email'          , mask : 'email'       , display : null                      , } ,
  company     : { type : 'text'      , label : 'Company'      , icon : 'domain'         , mask : 'lettersOnly' , display : getDisplayMaskTitle       , } ,
  jobTitle    : { type : 'text'      , label : 'Job title'    , icon : 'work'           , mask : 'lettersOnly' , display : getDisplayMaskTitle       , } ,
  birthday    : { type : 'date'      , label : 'Birthday'     , icon : 'cake'           , mask : 'date'        , display : null                      , InputLabelProps: {shrink: true,},},
  notes       : { type : 'text'      , label : 'Notes'        , icon : 'note'           , mask : 'matchAll'    , display : null                      , multiline: true, rows: 5,},
}

export const getFormFieldsConfig = () => {
  const out = formFieldsConfig; // notice the 's' at the end of formFields, makes it "unique"
  for( let x in out ) {
    // out[x].InputProps = { inputComponent: getMaskedInput, };
    
    const mask = out[x].mask;
    const maskConfig = masksConfig[mask];
    // const pipeConfig = pipesConfig[mask];

    const ready1 = !!maskConfig;
    if(!ready1) continue;

    // const ready2 = !!pipeConfig;
    // if(!ready2) continue;

    out[x].InputProps = { inputComponent: getMaskedInput(maskConfig,), };
    // out[x].InputProps = { inputComponent: getMaskedInput(maskConfig, pipeConfig,), };
  }
  // console.log('out\n', out,);
  return out;
}

// // Begin mask project (deprecated)

// // The purpose of the mask project is to add some degree of quality control to the input variables of a form
// // Also change handleChangeForm at:
// //   1. src/app/layouts/crud/CRUDView.js
// //   2. src/app/containers/CreateDialogContainer.js
// //   3. src/app/views/feedback/NarrativeForm.js (handleChangeContent)

// const getMaskNone = s => s;

// const getMaskName = s => {
//   // console.log('s\n', s,);
//   if(s === '') return s;
//   const a = s.replace( /\d/g, '', );
//   const b = _.startCase(_.trim(_.toLower(_.deburr(a))));
//   return b;
// }

// const getMaskTitle = s => {
//   // console.log('s\n', s,);
//   if(s === '') return s;
//   const a = getMaskName(s);
//   const b = _.endsWith( s, ' ', ) ? `${a} ` : a; // could also use _.padEnd(a, 1,)
//   return b;
// }

// const getMaskEmail = s => {
//   // // test
//   // const email1 = 'thisIsAtestEmail';
//   // const email2 = 'thisIsAtestEmail@';
//   // const email3 = 'thisIsAtestEmail@example.com';
//   // console.log([
//   //   getMaskEmail(email1),
//   //   getMaskEmail(email2),
//   //   getMaskEmail(email3),
//   // ]);
//   // // end test
//   const a = _.trim(_.deburr(s));
//   const b = _.endsWith( s, '@', ) ? `${a}@` : a; // could also use _.padEnd(a, 1,)
//   let c, d, e;
//   if( b.indexOf('@') > -1 ) {
//     c = b.split('@');
//     d = _.toLower(c[1]);
//     e = [ c[0], d, ].join('@');
//     return e;
//   }
//   return b;
// }

// // const getMaskZip = s => _.  
// // const getMaskPhone = s => _.
// // const getMaskDate = s => _. 

// const maskConfig = ({
//   none  : getMaskNone  ,
//   name  : getMaskName  , // for single proper (first or last) name: e.g., John
//   title : getMaskTitle , // for full name: e.g., John Doe
//   email : getMaskEmail , // foe email: e.g., JohnDoe@example.com
//   // phone : getMaskPhone , // custom component
//   // zip   : getMaskZip   , // custom component
//   // date  : getMaskDate  ,
// })

// export const getMaskedValue = ( value, mask, ) => maskConfig[mask](value)

// // // Convert a string to title case
// // // titleCase
// // // https://codepen.io/cferdinandi/pen/aXzNbe
// // // https://vanillajstoolkit.com/helpers/totitlecase/
// // // source: https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
// // // @param  {String} str The string to convert to title case
// // // @return {String}     The converted string
// // const toTitleCase = s => {
// //  str = str.toLowerCase().split(' ');
// //  for (var i = 0; i < str.length; i++) {
// //    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
// //  }
// //  return str.join(' ');
// // };

// // End mask project

// GLOBAL UTILITY FUNCTIONS
// These are utility, helper functions stored here as a centralized location

// used as .map() key for list
export const getIdHash = (uid, timestamp,) => hash([uid, timestamp,]) // uid == createdBy, timestamp == createdAt,

// Deprecate the following method getMatchHash() and use a series of .where() filters in the call to firestore.
// That is actually how this app is designed to be built. Below might be a case of over-engineering.
// export const getMatchHash = ({ bizCategory, geoNation, geoRegion, geoLocal, }) => {
//   const ready1 = !!bizCategory && !!geoNation && !!geoRegion && !!geoLocal;
//   if(!ready1) throw new Error('Attempted to hash incomplete object');
//   const out = hash([ bizCategory, geoNation, geoRegion, geoLocal, ]);
//   console.log('out\n', out,);
//   return out;
// }

export const handleKeyPress = (event, targetKey, handlerFunction,) => {
// example usage:
// import { handleKeyPress, } from 'app/config/AppConfig';
// <TextField onKeyPress={(e) => handleKeyPress(e, 'Enter', onClickSearchButton,)}
if (event.key === targetKey) handlerFunction();
}

// end global utility functions

// export const getPath = ( uid, path, ) => [ path , uid , ].join('/')
// export const getPath = ( uid, path, ) => {
//   // const uid = profile.uid;
//   // old data structure: subcollections: https://firebase.google.com/docs/firestore/manage-data/structure-data#nested_data_in_documents
//   // const out = [ 'users' , uid , path , ].join('/');
//   // new data structure: root-level collections: https://firebase.google.com/docs/firestore/manage-data/structure-data#root-level_collections
//   const out = [ path , uid , ].join('/');
//   return out;
// }

export const replaceFormFieldsArrayWithLabels = form =>
  form.map(({ label, }) => label); // form: array, output of: getForm(searchableFieldIds);

export const replaceFormFieldLabelWithKeyId = formFieldLabel =>
  _.findKey(formFieldsConfig, {label: formFieldLabel,},) // formFieldLabel: string, 'Name'

export const replaceFormFieldsLabelArrayWithKeyIds = formFieldLabels =>
  formFieldLabels.map( label => replaceFormFieldLabelWithKeyId(label,) )

const getOnlyNumbers = ( s, convertStringToNumber=false, ) => {
  // const convertStringToNumber = false;
  // const s = 'SJQF5DzIVzgIAYZsWXNKc8i83BxKTb2bBM98ha5zIJkORJZLyAOTNXHO4q8Gn03WQmFwdLuinkO8VVaXKtv7eZ35FBfzrCJtubStzwvkl1vSPaylHAD7baCYZwFOPzGsXTV7FgfzYdCTJNVD2GgmJUWbzoNcHLNceOcwg0gyUYRtaz9CsOq2V2022Mo1vKgM3xNNd1TjgNxnWya4FGTOsdjeFL6th7HrHd4DmIgF5uRjA6VbE1Aq0eja6zr3MIk2NTsMvoH1fRKDodkyb995zYoSpw4cBKUpjQ4PoqSk2T9oxGm3c2msleeOF4aCe7fxM32KSdPSxjH3fdLEbFFFRZhzu3wsmiA6Twi3aVcXrjfRIjZmlSln4J6YCaCxv5ygDjFJ6tVHCOOjMNJy';
  const nonDigitRe = /\D/;
  const emptyString = '';
  const a = s.split(nonDigitRe);
  let out = a.join(emptyString);
  if(convertStringToNumber) out = parseInt(out);
  // console.log('out\n', out,);
  return out;
}

const getOnlyAlpha = s => {
  // s: string: 'name*'
  const p = /(^[a-zA-Z]+)[*]?$/;
  const r = p.exec(s); // expected result: ["name*", "name"]
  const out = r[1]; // expected result: 'name'
  // console.log('out\n', out,); // 'name'
  return out; // 'name'
}

const getRequiredField = s => {
  // s: string: 'name*'
  const re = /\*/gm;
  const test = re.test(s); // expected result: true|false
  return test; // true
}

const getFormFieldProps = (s, n,) => {
  // s: string: 'name*', field ID before removing non-alpha
  // n: number: >= 0, index of array element when iterating
  // console.log('s\n', s);
  // console.log('n\n', n);
  const str = getOnlyAlpha(s); // 'name*' => 'name'
  const formFieldConfig = getFormFieldsConfig();
  const out = {...formFieldConfig[str]}; // form field
  // console.log('out\n', out);
  if(!out) return;

  const required = getRequiredField(s);
  out.required = required;
  out.autoFocus = !n; // autofocus on first item (index === 0) only
  out.id = str;
  // console.log('out\n', out);
  return out; // adorned form field
}

// use case 1
// select subset of items from cells array where
// value of 'id' property is contained in config array
// use case 2
// select subset of items from componentsNavConfig array where
// value of 'id' property is contained in bottomNavConfig or overheadConfig, array
export const getFilterArrayOfObjectsByPropValueContainedInArray =
  ( superset, propToMatch, subsetTarget, ) =>
  // superset: array of objects: to be filtered: cells, componentsNavConfig,
  // propToMatch: string: property name commont to all objects in superset array: 'id'
  // subsetTarget: array of strings: if subsetTarget contains value of propToMatch,
  // then object is included in output result: config, bottomNavConfig, overheadConfig,
    _.filter( superset, // examples: cells, componentsNavConfig,
      _.conforms({ [propToMatch]: value => // examples: 'id'
        _.indexOf( subsetTarget, value, ) > -1 // examples: config, bottomNavConfig, overheadConfig,
    }));

// function to create a nice, single level structure
// ref: https://stackoverflow.com/a/57714910
const getFlatten = ( a, trigger='children', ) => {
  // a: array: flattens sub arrays containing trigger property
  // trigger: string: recursively flattens when encountering this critical property: 'children'
  return a.reduce( ( accum, e, ) => {
    accum.push(e,);
    if (e[trigger]) accum = accum.concat(getFlatten(e[trigger]));
    return accum;
  }, []);
};

// returns all found // ref: https://stackoverflow.com/a/57714910
export const getFilterNested = ( searchable , key , value , trigger='children', ) => {
  // searchable: array: array contains elements to iterate search over;
  // !imoportant: must contain property named 'children' to recursively search deeper nested levels
  // key: string: the property name of the element to target with value matching argument
  // value: string | number | boolean: the value to match
  // trigger: string: 'children': recursively flattens when encountering this critical property
  // return: array
  const flattenedArray = getFlatten( searchable, trigger, );
  // const out = flattenedArray.filter( e => e[key]=== value );
  const out = flattenedArray.filter( e => _.get(e, key,) === value );
  return out;
}

// returns first found // ref: https://stackoverflow.com/a/57714572
// use this one (over getFilterNested()) to replace the following pattern:
// const matches = _.filter(componentsNavConfig, {id: navComponentId,},);
// const component = matches[0];
export const getFindNested = ( searchable , key , value , ) => {
  // searchable: array: array contains elements to iterate search over;
  // !imoportant: must contain property named 'children' to recursively search deeper nested levels
  // key: string: the property name of the element to target with value matching argument
  // value: string | number | boolean: the value to match
  // return: object
  let out = null;
  searchable.some( e => {
    // if ( e[key] === value ) {
    if ( _.get(e, key,) === value ) {
      out = e;
      return out;
    }
    if (!out && e.children) out = getFindNested(e.children, key, value,);
    return out;
  })
  return out;
}

export const getForm = arrayOfIds =>
  // arrayOfIds: array of strings: ['name', 'phone', 'email',]
  arrayOfIds.map((id, index,) => getFormFieldProps(id, index,));

export const getCleanFieldNames = arrayOfIds => arrayOfIds.map(s => getOnlyAlpha(s)); // a: arrayOfStrings: ['name*', 'phone', 'email*']

export const getCreatableFields = readablePath => {
  // readablePath: string: 'leads'
  // console.log('readablePath\n', readablePath,); // 'leads'
  const componentsNavConfig = getComponentsNavConfig();
  // console.log('componentsNavConfig\n', componentsNavConfig,);
  // const filteredArray = _.filter(componentsNavConfig, {crudConfig: {creatable: {path: readablePath,}}});
  // console.log('componentsNavConfig\n', componentsNavConfig,);
  // console.log('readable\n', readable,);
  // console.log('filteredArray\n', filteredArray,); // array // crudConfig element where id === 'outbox'
  // const target = filteredArray[0];
  const target = getFindNested(componentsNavConfig, 'crudConfig.creatable.path', readablePath,);
  // console.log('target\n', target,); // single item // crudConfig element where id === 'outbox'
  if(typeof target != 'object') throw new Error('Target value is not an object');
  const { fields, } = target && target.crudConfig && target.crudConfig.creatable;
  const out = getCleanFieldNames(fields);
  // console.log('out\n', out,); // [ 'name', 'bizCategory', 'email', 'phone', 'zipInput', 'notes', ]
  return out;
}

export const getFormFields = ( type='loadNewData', fields=[], detail={}, ) => {
  // type: string: enum: 'loadSavedData' | 'loadNewData'
  // fields: arrayOfStrings: example: ['name*', 'phone*', 'email*', 'zip*', 'notes', ]
  // detail: object: { docId, item=items[newSelectedIndex] > field.id, }: 
  // console.log('type\n', type);
  // console.log('fields\n', fields);
  // console.log('state\n', this.state);

  const ready1 = fields && typeof fields === 'object';
  if(!ready1) return;

  // const { detail, } = this.state;
  // console.log('detail\n', detail);
  const formFields = getForm(fields);
  // console.log('formFields\n', formFields); // debugger;
  formFields.forEach( field => {
    // console.log('field\n', field); // debugger;
    switch(type) {
      case 'loadNewData':
        field.value = '';
        break;
      case 'loadSavedData':
        field.value = detail && detail[field.id];
        // if(field.getDisplayMask) field.displayMask = field.getDisplayMask(field.value);
        field.displayMask = getDisplayMask(field.id, field.value,);
        // console.log('displayMask\n', field.displayMask);
        break;
      default:
        // console.error('Type must be one of: "loadSavedData" or "loadNewData"');
        throw new Error('Type must be one of: "loadSavedData" or "loadNewData"');
    }
    // console.log(`field: ${field.id}\n`, field,);
    // for non-text fields, include a mask to deal with capitalization, formatting, etc.
  });
  // console.log('formFields\n', formFields);
  // console.log('state\n', this.state);
  return formFields;
}

// begin SEARCH section

export const getSearchableFields = ( searchable, readable, ) => {
  // return: array: either one of 
  // 1. manually listed array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ]
  // 2. otherwise, if true, uses all fields in 1. readable.path => creatable.fields
  // TODO: Save 'notes' (and other similar) fields as array of words and search by .where('notes', 'array_contains', 'foo') // ref: https://firebase.google.com/docs/firestore/query-data/queries#array_membership
  // console.log('searchable\n', searchable,);
  // console.log('readable\n', readable,);
  const getBoolean = () => {
    const ready1 = searchable;
    if(!ready1) return;
    // searchable === true
    // find property in crudConfig where readable is created, then return those field names with alpha characters only
    const readablePath = readable && readable.path;
    // console.log('readablePath\n', readablePath,); // 'leads
    const out = getCreatableFields(readablePath);
    // console.log('out\n', out,); // [ 'name', 'bizCategory', 'email', 'phone', 'zipInput', 'notes', ]
    return out;
  }
  const config = {
    boolean: getBoolean(),
    object: searchable,
  };
  const type = typeof searchable; // 'boolean' | 'object'
  const out = config[type];
  return out;
}

// // use example
// handleFilterSearchItems = () => {
//   // server-side search is limited to no logical OR filters, must join multiple searches on client-side
//   // so we are opting in to doing the search string filter on the client-side instead of the server
//   // console.log('state\n', this.state,);
//   const { searchable, readable, } = this.props; // items,
//   const { items, searchString, } = this.state;
//   // console.log('searchString\n', searchString,);
//   // console.log('items\n', items,);
//   // const searchableFields = [ 'name', 'email', 'phone', 'zip', 'notes', ];
//   const searchableFields = getSearchableFields(searchable, readable,);
//   const filteredItems = this.getItemsFilteredBySearch(items, searchString, searchableFields,);
//   // console.log('filteredItems\n', filteredItems,);
//   this.setState({ items: filteredItems, }
//     // , () => console.log('state\n', this.state,)
//   );
// }

// https://jsbin.com/puzenekomi/edit?js,console
export const getItemsFilteredBySearch = (items, searchString, searchableFields,) => {
  // returns subset array of items containing searchString in searchableFields
  // might be obsolete because searches will be done server side using query.where() method // ref: https://firebase.google.com/docs/firestore/query-data/queries
  // searchableFields: array of strings: [ 'name', 'email', 'phone', 'zip', 'notes', ]
  const isSubstring = s => _.includes(s, searchString,); // returns true if search string is substring of arg string
  const isInObjectValues = r => Object.values(r).filter(isSubstring); // returns all values of arg object containing search string
  const isInObject = r => { // passed any object, r, returns true if search string is in any value of r
    // reduce search fields by opting-in list of specific fields // eliminate extra fields like docId, etc. for example
    const reducedObjectToSearch = _.pick(r, searchableFields,);
    const result = !(_.isEmpty(isInObjectValues(reducedObjectToSearch)));
    return result;
  }
  const out = items.filter(isInObject); // returns all array elements containing search string in any values of the object element
  // console.log(out);
  return out;
}

// end SEARCH section

// To convert JS descriptions to JSX:
// // https://github.com/lovell/farmhash/blob/master/README.md
// import farmhash from 'farmhash';
// const hash = farmhash.hash32('test');
// console.log(typeof hash); // 'number'
// // https://www.freecodecamp.org/forum/t/newline-in-react-string-solved/68484/10
// let newText = text.split ('\n').map( (item, index,) => <p key={farmhash.hash32(item+index)}>{item}</p>);

export const getAlert = ( dashboard, content, ) => {
  // console.log('dashboard\n', dashboard,);
  const { net, } = dashboard;
  const ready1 = typeof net === 'number';
  const ready2 = net > 0;
  const hideAlert = !!ready1 && !!ready2;
  const showAlert = !hideAlert;
  return (
    showAlert
    ?
    <CustomAlert
      // className="m-2"
      // shadow
      variant="traditional"
      heading="Your lead balance is zero" // ⚠️
      body="You must refer a new lead before you claim another."
      actionButtonLabel="Refer lead"
      actionButtonHref="/outbox"
      dialog={
        <React.Fragment>
          <p className="mb-6">
            This is our accountability system.
            It helps keep a supply of leads available for everyone as much as possible.
          </p>
          <p>
            It is very important to keep your net lead balance above zero.
            Your net lead balance is the number of lead referrals you deposited
            into your Outbox minus the number of leads you withdrew from your Inbox.
            By keeping a positive net lead balance, you can claim new leads
            whenever they become available for your market.
          </p>
          <p>
            In order to deposit a lead, navigate to the Outbox and click the blue button in the upper left.
            That will open a form where you can add the contact information of your lead referral.
            From there, users can see the leads you and others refer by navigating to the Inbox.
            In the Inbox, you can claim new leads (as long as your lead balance is above zero).
            After you claim a lead, we move it to your Archive.
          </p>
        </React.Fragment>
      }
    />
    :
    content
  )
}

export const getCreateItem = ({
  e, crudForm, crudFormTimestamp, crudFormIdHash, createItem, creatable,
}) => {
  const errors = {};
  const REQUIRED = 'REQUIRED';
  const VALIDATE = 'VALIDATE';

  const getRequired = value => {
    let out;
    const typeOfValue = typeof value;
    switch(typeOfValue) {
      case 'string':
        out = !!value.length;
        break;
      case 'object':
        out = !_.isEmpty(value);
        break;
      default:
        // code goes here
    }
    return out;
  }

  const mergeArray = (o, prop, data,) => {
    if(!Array.isArray(o[prop])) o[prop] = [];
    return o[prop].push(data);
  }
  
  // inspired by: src/app/components/forms/CreateLead.js
  e.preventDefault();
  // console.log(this.state);
  // this.props.createItem('leads', crudForm,);

  const newItem = {
    idHash: crudFormIdHash,
    createdAt: crudFormTimestamp,
  };

  crudForm.forEach( item => {
    // console.log('item\n', item,);
    const { value: rawValue, mask, id, required, } = item;
    let value = rawValue;
    if (value === undefined || value === null) return; // value = null; //

    // validate
    const target = validationConfig[mask];
    // console.log('value\n', value,);
    // console.log('target\n', target,);
    const validated = getValidation(target, value,);
    // console.log('validated\n', validated,);
    if(!validated) mergeArray( errors, id, VALIDATE, );

    // required
    if(required && !getRequired(value)) mergeArray( errors, id, REQUIRED, );

    // extract numbers where appropriate
    if(mask === 'number') value = getOnlyNumbers(value, true,);

    newItem[id] = value;
  });

  // console.log('errors\n', errors,);
  if(!_.isEmpty(errors)) return errors;

  // // console.log('path\n', path,);
  // // console.log('profile\n', profile,);
  // // console.log('uid\n', uid,);
  // // console.log('dashboard\n', dashboard,);
  // // console.log('settings\n', settings,);
  // console.log('newItem\n', newItem,);
  // console.log('creatable\n', creatable,);
  createItem(newItem, creatable,); // uid, settings, path, dashboard,
  // this.props.history.push('/');
  return false;
}

export const bottomNavConfig = [ 'dashboard', 'inbox', 'archive', ]
export const overheadConfig = [ 'settings', 'feedback', 'help', 'logout', ]

// syncronization: changes in either of the following files must be hard coded in the other
// src/fuse-configs/fuseNavigationConfig.js // abbreviated
// src/main/content/components/ComponentsConfig.js
export const getComponentsNavConfig = props => {
  // console.log('React version: ', React.version,); // 16.8.6
  // console.log('props\n', props,);

  const item     = ( props && props.item     ) || {} ;
  // const docId    = 'aZZsxdvfv3o6ZGfj5mIt';
  // const docId    = ( props && props.docId    ) || ( props && props.item && props.item.docId ); // || '' ;
  const profile  = ( props && props.profile  ) || {} ;
  const settings = ( props && props.settings ) || {} ;
  const uid      = ( props && props.uid )      || ( profile && profile.uid ) ;
  
  const { bizCategory, geoNation, geoRegion, geoLocal, } = settings;

  // console.log('item\n', item,);
  // console.log('docId\n', docId,);
  // console.log('profile\n', profile,);
  // console.log('settings\n', settings,);
  // console.log('uid\n', uid,);
  // console.log('bizCategory\n', bizCategory,);
  // console.log('geoNation\n', geoNation,);
  // console.log('geoRegion\n', geoRegion,);
  // console.log('geoLocal\n', geoLocal,);

  // const ready1 = settings && geoNation && geoRegion && geoLocal && bizCategory;
  // if(!ready1) return null; // throw new Error('Insufficient data');

  const geoLocationKey = [ geoNation, geoRegion, geoLocal, ].join(' | ');
  const geoLocationTypeKey = [ geoLocationKey, bizCategory, ].join(' | ');
  const valueMaskBizCategory = getDisplayMaskBizCategory(bizCategory);
  const valueMaskBizCategoryItem = item && item.bizCategory && getDisplayMaskBizCategory(item.bizCategory);
  const valueMaskName = item && item.name && getDisplayMaskTitle(item.name);
    
    // import { componentsNavConfig, } from 'app/config/AppConfig';
    // * Note: It is currently not possible to use expressions like `loader : () => import(item.path)`
    // The path must be hard coded in src/app/config/Routes.js. See https://github.com/jamiebuilds/react-loadable

    // item.path = '/' + item.id
    // We eliminated .path as a separate property and made it a derivative of .id by refactoring the following files
    // 1. src/@fuse/components/FuseNavigation/vertical/FuseNavVerticalItem.js > FuseNavVerticalItem.ListItem.to
    // 2. src/app/components/RoutePageTitle.js > getItem > .filter()
    // 3. src/app/config/Routes.js > getItems > .filter()
    
    // Modify items numbered 2 and 3 in above list to recursively flatten the config object to filter by .id at any arbitrarily deep level
    // Also the following files:
    // 1. getCreatableFields.filteredArray
    // 2. src/app/config/ComponentRouter.js
    // 3. src/app/layouts/crud/ItemSummary.js
    // 4. src/app/layouts/appBars/MyBottomNav.js
    // 5. src/app/layouts/appBars/OverflowMenu.js
    // 6. src/app/views/dashboard/WidgetMenu.js
    // search: `/${id}
    // How to recursively filter for nested .id: https://stackoverflow.com/a/57714572

  const out = [
    {
      // eslint-disable-next-line
      description: '\
        This is your overview of metrics summarizing your use of this app.\
      ',
      title: 'Dashboard',
      id: 'dashboard',
      icon: 'dashboard',
      // bottomNav : true,
      // type      : 'item', // 'item' | 'group' | 'collapse' | 'divider' // see: src/@fuse/components/FuseNavigation/FuseNavigation.js
      // deprecated: 'collapse' | 'group' // use dashboards to achieve nesting; recursively if necessary
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'dashboard', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js
      },
      // see: src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/views/dashboard/Dashboard')}),
      // getComponent: () => FuseLoadable({loader: () => import('app/views/dashboard/DashboardContainer')}),
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      dashboardConfig: [
        'net', 'deposits', 'withdrawals', 'challenges', 'inbox', 'archive',
        'outbox', 'contacts', 'bizCategory', 'geoLocal', 'geoRegion', 'geoNation',
      ],
    },
    {
      // eslint-disable-next-line
      description: '\
        This is the list of leads that are available for you to move to your archive.\
        These leads match your service type and location as you indicated in your settings.\
        You must have a positive net lead balance in order for any leads to show in this list.\
        Your net lead balance is calculated by subtracting the number of leads you have claimed\
        into your archive from the number of lead referrals you have made in your outbox.\
        And after all approprite adjustments for disputed leads have be settled.\
      ',
      title: 'Inbox',
      id: 'inbox',
      icon: 'cloud_download',
      // bottomNav : true,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [ 'net', 'deposits', 'withdrawals', ],
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false,
        taggable: false,
        alertable: true,
        creatable: false, // false only makes button not appear on CRUD view
        readable: {
          // src/app/containers/LoadAsync.js
          path: 'leads',
          orderBy: [ 'createdAt', 'desc', ],
          where: [
            [ 'archivedBy'      , '==' , null , ] ,
            [ 'archivedAt'      , '==' , 0    , ] ,
            [ 'rejectedAt'      , '==' , 0    , ] , // eliminates settled challenges
            [ 'deletedAt'       , '==' , 0    , ] ,
            // [ 'challengesCount' , '<=' , CHALLENGES_LIMIT     , ] , // Unhandled Rejection (FirebaseError): Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field 'challengesCount' and so you must also use 'challengesCount' as your first Query.orderBy(), but your first Query.orderBy() is on field 'createdAt' instead.
            [ 'geoNation'       , '==' , geoNation   , ] , // 'Asia, Pacific, and Middle East' | 'Latin America and Caribbean'
            [ 'geoRegion'       , '==' , geoRegion   , ] , // 'Kazakhstan' | 'Chile'
            [ 'geoLocal'        , '==' , geoLocal    , ] , // 'Almaty' | 'Santiago'
            [ 'bizCategory'     , '==' , bizCategory , ] , // 'Home'      
          ],
          visibleFields: [ 'bizCategory', 'zipInput', ], // 'name', 'notes', 'email', 'phone',
          // listPaneHeaderText: '',
          listPaneHeaderChips: [ valueMaskBizCategory, geoLocal, geoRegion, geoNation, ],
          itemSummary: {
            // primaryText: valueMaskBizCategoryItem, // || item.geoLocal,
            // primaryText: <Chip label={item && item.zip && item.zip.city} />,
            // primaryChips: [ (item && item.zip && item.zip.city), ],
            primaryText: moment(item.createdAt).fromNow(),
            // secondaryText: moment(item.createdAt).fromNow(),
            secondaryChips: [ (item && item.zipInput && item.zipInput.city), ],
          },
        },
        updatable: false,
        deletable: false,
        actionable: {
          icon: 'send', // 'outlined_flag',
          label: 'Claim this lead and send it to your archive',
          dialogHeader: 'Claim lead',
          dialogBody: 'Do you want to claim this lead and send it to your archive?',
          buttonLabel: 'Claim it now!',
          getActionable: item => { // { getIncrement, uid, settings, }
            const { docId, createdBy, } = item; // createdBy,
            const timestamp = Date.now();
            const out = [
              {
                // comment: 'update key fields of subject doc',
                collection: 'leads',
                doc: docId,
                data: {
                  archivedBy: uid,
                  archivedAt: timestamp,
                },
              },
              {
                // comment: 'update dashboard of local user',
                collection: 'settings',
                doc: uid,
                data: {
                  dashboard: {
                    net: getIncrement(-1),
                    // inbox: getIncrement(-1), // covered in seperate element of this array
                    archive: getIncrement(1),
                    withdrawals: getIncrement(1),
                  },
                },
              },
              {
                // comment: 'update dashboard of remote user',
                collection: 'settings',
                doc: createdBy,
                data: {
                  dashboard: {
                    reputation: getIncrement(1),
                  },
                },
              },
              {
                // comment: 'decrease count when lead is claimed',
                collection: 'stats',
                doc: 'level_1',
                data: {
                  leads: {
                    geoLocationTypes: {
                      // [settings.geoNation]: {
                      //   [settings.geoRegion]: {
                      //     [settings.geoLocal]: {
                      //       [newData.bizCategory]: getIncrement(1),
                      //     },
                      //   },
                      // },
                      [geoLocationTypeKey]: getIncrement(-1),
                    },
                  },
                },
              },
              // {
              //   comment: 'no need to collect',
              //   collection: 'stats',
              //   doc: 'level_2',
              //   data: {
              //     leads: {
              //       deposited: getIncrement(1),
              //     },
              //     zipCodes: {
              //       [newData.zipInput.zip]: {
              //         [geoLocationKey]: getIncrement(1),
              //       },
              //     },
              //   },
              // },
            ];
            return out;
          },
        },
      },
    },
    {
      // eslint-disable-next-line
      description: '\
        This is the list of leads you have claimed which you now own in the sense they are now\
        exclusive to you only. The total leads in this list are subtracted from the amount of\
        lead referrals you have made, after all dispute adjustments are settled, in order to\
        determine your net lead balance.\
      ',
      title: 'Archive',
      id: 'archive',
      icon: 'folder',
      // bottomNav : true,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        condensed: true,
        searchable: true, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: true,
        sortable: true, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: false,
        readable: {
          path: 'leads', // src/app/containers/LoadAsync.js
          orderBy: [ 'archivedAt', 'desc', ] ,
          where: [
            [ 'deletedAt'  , '==' , 0   , ] ,
            // [ 'archivedAt' , '>'  , 0   , ] ,
            [ 'archivedBy' , '==' , uid , ] ,
          ],
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
        },
        updatable: false,
        deletable: true,
        actionable: {
          icon: 'thumb_down', // 'priority_high', // 'warning', // 'report',
          label: 'Challenge this lead for poor quality',
          dialogHeader: 'Challenge lead',
          dialogBody: 'Do you want to return this lead and challenge it for poor quality?',
          buttonLabel: 'Challenge',
          getActionable: item => { // { getIncrement, uid, settings, }
            const { docId, createdBy, name, bizCategory, } = item;
            const timestamp = Date.now();
            const out = [
              {
                // comment: 'update key fields of subject doc',
                collection: 'leads',
                doc: docId,
                data: {
                  archivedBy: null,
                  archivedAt: 0,
                  challengesCount: getIncrement(1),
                  challenges: getArrayUnion({
                    challengedBy: uid,
                    challengedAt: timestamp,
                  }),
                },
              },
              {
                // comment: 'create pending outbound challenge record for the local user',
                collection: 'challenges',
                doc: uid,
                data: {
                  docId, name, bizCategory,
                  createdAt: timestamp,
                  direction: 'outbound',
                  status: 'pending',
                },
              },
              {
                // comment: 'create pending inbound challenge record for the remote user',
                collection: 'challenges',
                doc: createdBy,
                data: {
                  docId, name, bizCategory,
                  updatedAt: timestamp,
                  direction: 'inbound',
                  status: 'pending',
                },
              },
              {
                // comment: 'update dashboard of local user',
                collection: 'settings',
                doc: uid,
                data: {
                  dashboard: {
                    archive: getIncrement(-1),
                    reputation: getIncrement(-1),
                    challenges: {
                      outbound: {
                        pending: getIncrement(-1),
                      },
                    },
                  },
                },
              },
              {
                // comment: 'update dashboard of remote user who created lead',
                collection: 'settings',
                doc: createdBy,
                data: {
                  dashboard: {
                    net: getIncrement(-1),
                    deposits: getIncrement(-1),
                    challenges: {
                      net: getIncrement(-1),
                      outbound: {
                        total: getIncrement(1),
                        pending: getIncrement(1),
                      },
                    },
                  },
                },
              },
              {
                // comment: 'return lead to unclaimed pile, reverse stats impact when archived
                collection: 'stats',
                doc: 'level_1',
                data: {
                  leads: {
                    geoLocationTypes: {
                      [geoLocationTypeKey]: getIncrement(-1),
                    },
                  },
                },
              },
            ];
            return out;
          },
          // getTransaction = db => {
          //   // ref: https://firebase.google.com/docs/firestore/manage-data/transactions#passing_information_out_of_transactions
          //   // Create a reference to the SF doc.
          //   const sfDocRef = db.collection('cities').doc('SF');
          //   db.runTransaction( transaction =>
          //     transaction.get(sfDocRef).then( sfDoc => {
          //       if (!sfDoc.exists) throw new Error('Document does not exist!');
          //       const newPopulation = sfDoc.data().population + 1;
          //       if (newPopulation <= 1000000) {
          //         transaction.update(sfDocRef, { population: newPopulation, },);
          //         return newPopulation;
          //       } else {
          //         return Promise.reject('Sorry! Population is too big.');
          //       }
          //     })
          //   ).then( newPopulation =>
          //     console.log('Population increased to ', newPopulation,)
          //   ).catch( err => console.error(err)) // This will be an "population is too big" error.
          // },
          getTransaction: ( item, getFirestore, ) => {
            const { docId, createdBy, } = item;
            const timestamp = Date.now();
            const db = getFirestore();
            const getDocRef = ( collection, doc, ) => db.collection(collection).doc(doc)
            // multiple updates:
            // ref: https://stackoverflow.com/a/47546657/1640892
            // ref: https://firebase.google.com/docs/firestore/manage-data/transactions#passing_information_out_of_transactions
            // Create a reference to the doc.
            const dbDocRef = getDocRef('leads', docId,);
            db.runTransaction( transaction =>
              transaction.get(dbDocRef).then( dbDoc => {
                if (!dbDoc.exists) throw new Error('Document does not exist!');
                // start logic here
                const challengesCount = dbDoc.data().challengesCount;
                // console.log('challengesCount\n', challengesCount,);
                if(challengesCount >= CHALLENGES_LIMIT) {
                  const result = {
                    rejectedAt: timestamp,
                  };
                  // settle incoming and outgoing challenges
                  // settle other challengers reputation via refund
                  // decrement creator reputation
                  transaction.update( dbDoc, result, );

                  const docRef_challengesUid = getDocRef('challenges', uid,);
                  transaction.update( docRef_challengesUid, {
                    status: 'rejected',
                  });

                  const docRef_challengesCreatedBy = getDocRef('challenges', createdBy,);
                  transaction.update( docRef_challengesCreatedBy, {
                    status: 'rejected',
                  });

                  const docRef_settingsUid = getDocRef('settings', uid,);
                  transaction.update( docRef_settingsUid, {
                    dashboard: {
                      reputation: getIncrement(1),
                      challenges: {
                        outbound: {
                          pending: getIncrement(-1),
                          rejected: getIncrement(1),
                        },
                      },
                    },
                  });

                  const docRef_settingsCreatedBy = getDocRef('settings', createdBy,);
                  transaction.update( docRef_settingsCreatedBy, {
                    dashboard: {
                      reputation: getIncrement(-1),
                      challenges: {
                        inbound: {
                          pending: getIncrement(-1),
                          rejected: getIncrement(1),
                        },
                      },
                    },
                  });

                  return result;
                } else return Promise.reject(false)
              })
            ).then( result =>
              // null
              console.log('bad lead', result,)
            ).catch( e => console.error(e)) // This will be 'bad lead' error.
          },
        },
      },
    },
    {
      // eslint-disable-next-line
      description: '\
        These are all the leads you have submitted as a referral. The more leads you refer to others,\
        the more leads are available to you in your inbox. You must have a positive net lead balance\
        in order to have leads available for you to claim.\
      ',
      title: 'Outbox',
      id: 'outbox',
      icon: 'cloud_upload',
      // bottomNav : false,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [ 'net', 'deposits', 'withdrawals', ],
        condensed: true,
        searchable: true, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: true,
        sortable: true, // see searchable
        starrable: false,
        taggable: false,
        alertable: false,
        creatable: {
          title: 'Send new referral', // form: <UserMultiForm />,
          path: 'leads',
          fields: [ 'name*', 'bizCategory*', 'email*', 'phone*', 'zipInput*', 'price*', 'notes', ], // 'name*', 'lastName', 'nickname', 'phone', 'company', 'email*', 'jobTitle', 'birthday', 'address', 'notes',
          addOns: {
            // createdAt: 'timestamp', // added in cred.actions at save time
            createdBy: uid,
            archivedBy: null,
            archivedAt: 0,
            rejectedAt: 0,
            deletedAt: 0,
            geoNation,
            geoRegion,
            geoLocal,
            // bizCategory,
          },
          getCreatable: newData => { // { getIncrement, uid, settings, }
            const zip = newData.zipInput && newData.zipInput.zip;
            const ready1 = newData && zip;
            if(!ready1) return null;
            const out = [
              {
                collection: 'settings',
                doc: uid,
                data: {
                  dashboard: {
                    net: getIncrement(1), 
                    deposits: getIncrement(1),
                    outbox: getIncrement(1),
                  },
                },
              },
              {
                collection: 'stats',
                doc: 'level_1',
                data: {
                  leads: {
                    geoLocationTypes: {
                      // [settings.geoNation]: {
                      //   [settings.geoRegion]: {
                      //     [settings.geoLocal]: {
                      //       [newData.bizCategory]: getIncrement(1),
                      //     },
                      //   },
                      // },
                      [geoLocationTypeKey]: getIncrement(1),
                    },
                  },
                },
              },
              {
                collection: 'stats',
                doc: 'level_2',
                data: {
                  leads: {
                    deposited: getIncrement(1),
                  },
                  zipCodes: {
                    [zip]: {
                      [geoLocationKey]: getIncrement(1),
                    },
                  },
                  geoLocations: {
                    [geoLocationKey]: {
                      [zip]: getIncrement(1),
                    },
                  },
                },
              },
            ];
            return out;
          },
        },
        readable: {
          path: 'leads',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'deletedAt', '==' , 0   , ] ,  
            [ 'createdBy', '==' , uid , ] ,
            // [ 'challengesCount' , '<=' , CHALLENGES_LIMIT , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ],
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
        },
        updatable: {
          title: 'Edit referral',
          path: 'leads',
          fields: [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ],
        },
        deletable: true,
        actionable: false,
      },
      // dashboardConfig:{onCreate:{net:1,deposits:1,outbox:1,},onDelete:{net:-1,deposits:-1,outbox:-1,},},
    },
    {
      // eslint-disable-next-line
      description: '\
        This is the list of your contacts. The people whom you can feel comfortable sending your referrals to.\
        They will ultimately be matched to your referrals, just as you are, based on location and service field.\
      ',
      title: 'Contacts',
      id: 'contacts',
      icon: 'account_box', // 'contacts',
      // bottomNav : false,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [ 'contacts', ],
        condensed: true,
        searchable: true, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: true,
        sortable: true, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: {
          title: 'Create new contact', // form: <UserMultiForm />,
          path: 'contacts',
          fields: [ 'name*', 'email*', 'bizCategory', 'phone', 'zipInput', 'notes', ], // 'name*', 'lastName', 'nickname', 'phone', 'company', 'email*', 'jobTitle', 'birthday', 'address', 'notes',
          addOns: {
            createdBy: uid,
            deletedAt: 0,
          },
          // dashboard: {
          //   local: {
          //     contacts: 1,
          //   },
          // },
          // replace above dashboard property with getCreatable()
          getCreatable: newData => { // { getIncrement, uid, settings, }
            const out = [
              {
                collection: 'settings',
                doc: uid,
                data: {
                  dashboard: {
                    contacts: getIncrement(1), 
                  },
                },
              },
            ];
            return out;
          },
        },
        readable: {
          path: 'contacts',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'createdBy' , '==' , uid , ] ,
            [ 'deletedAt' , '==' , 0   , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              // (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
        },
        updatable: {
          title: 'Edit contact',
          path: 'contacts',
          fields: [ 'name*', 'phone*', 'email*', 'zip*', 'notes', ],
        },
        deletable: true,
        actionable: false,
      },
    },
    {
      // eslint-disable-next-line
      description: '\
        This is where you can see all the challenges you made and that were made against you for poor lead quality.\
      ',
      title: 'Challenges',
      id: 'challenges',
      icon: 'security', // policy // after material-ui/icons 4.x upgrade
      // bottomNav : false,
      // type      : 'item', // 'collapse', // deprecated: 'collapse' | 'group' // use dashboards to achieve nesting; recursively if necessary
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'dashboard', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // getComponent: () => FuseLoadable({loader: () => import('app/views/dashboard/DashboardContainer')}),
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      dashboardConfig: [
        'challenges-net',
        'challenges-inbound', 'challenges-inbound-pending',
        'challenges-inbound-won', 'challenges-inbound-lost',
        'challenges-outbound', 'challenges-outbound-pending',
        'challenges-outbound-won', 'challenges-outbound-lost',
      ],
      // indentLevel can be used in the future to programmatically set the indentation level at:
      //   src/@fuse/components/FuseNavigation/vertical/FuseNavVerticalItem.js
      //   src/@fuse/components/FuseNavigation/vertical/FuseNavVerticalCollapse.js
      // the latter, FuseNavVerticalCollapse, already uses a variable called: nestedLevel,
      // but that variable doesn't seem to be in operation at present.
      // indentLevel : 0,
    },
    {
      title: 'Challenges',
      id: 'challenges-inbound-pending',
      icon: false,
      // bottomNav : false,
      type: {
        navList: 'nested', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [
          'challenges-inbound', 'challenges-inbound-pending',
          'challenges-inbound-won', 'challenges-inbound-lost',
          // 'challenges-outbound', 'challenges-outbound-pending',
          // 'challenges-outbound-won', 'challenges-outbound-lost',
        ],
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: false,
        readable: {
          path: 'leads',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'createdBy' , '==' , uid , ] ,
            [ 'deletedAt' , '==' , 0   , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              // (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
          listPaneHeaderChips: [ 'challenges', 'inbound', 'pending', ],
        },
        updatable: false,
        deletable: false,
        actionable: false,
      },              
    },
    {
      title: 'Won',
      id: 'challenges-inbound-won',
      icon: false,
      // bottomNav : false,
      type: {
        navList: 'nested', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [
          'challenges-inbound', 'challenges-inbound-pending',
          'challenges-inbound-won', 'challenges-inbound-lost',
          // 'challenges-outbound', 'challenges-outbound-pending',
          // 'challenges-outbound-won', 'challenges-outbound-lost',
        ],
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: false,
        readable: {
          path: 'leads',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'createdBy' , '==' , uid , ] ,
            [ 'deletedAt' , '==' , 0   , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              // (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
          listPaneHeaderChips: [ 'challenges', 'inbound', 'won', ],
        },
        updatable: false,
        deletable: false,
        actionable: false,
      },
    },
    {
      title: 'Lost',
      id: 'challenges-inbound-lost',
      icon: false,
      // bottomNav : false,
      type: {
        navList: 'nested', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [
          'challenges-inbound', 'challenges-inbound-pending',
          'challenges-inbound-won', 'challenges-inbound-lost',
          // 'challenges-outbound', 'challenges-outbound-pending',
          // 'challenges-outbound-won', 'challenges-outbound-lost',
        ],
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: false,
        readable: {
          path: 'leads',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'createdBy' , '==' , uid , ] ,
            [ 'deletedAt' , '==' , 0   , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              // (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
          listPaneHeaderChips: [ 'challenges', 'inbound', 'lost', ],
        },
        updatable: false,
        deletable: false,
        actionable: false,
      },
    },
    {
      title: 'Challenges',
      id: 'challenges-outbound-pending',
      icon: false,
      // bottomNav : false,
      type: {
        navList: 'nested', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [
          // 'challenges-inbound', 'challenges-inbound-pending',
          // 'challenges-inbound-won', 'challenges-inbound-lost',
          'challenges-outbound', 'challenges-outbound-pending',
          'challenges-outbound-won', 'challenges-outbound-lost',
        ],
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: false,
        readable: {
          path: 'leads',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'createdBy' , '==' , uid , ] ,
            [ 'deletedAt' , '==' , 0   , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              // (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
          listPaneHeaderChips: [ 'challenges', 'outbound', 'pending', ],
        },
        updatable: false,
        deletable: false,
        actionable: false,
      },
    },
    {
      title: 'Won',
      id: 'challenges-outbound-won',
      icon: false,
      // bottomNav : false,
      type: {
        navList: 'nested', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [
          // 'challenges-inbound', 'challenges-inbound-pending',
          // 'challenges-inbound-won', 'challenges-inbound-lost',
          'challenges-outbound', 'challenges-outbound-pending',
          'challenges-outbound-won', 'challenges-outbound-lost',
        ],
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: false,
        readable: {
          path: 'leads',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'createdBy' , '==' , uid , ] ,
            [ 'deletedAt' , '==' , 0   , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              // (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
          listPaneHeaderChips: [ 'challenges', 'outbound', 'won', ],
        },
        updatable: false,
        deletable: false,
        actionable: false,
      },
    },
    {
      title: 'Lost',
      id: 'challenges-outbound-lost',
      icon: false,
      // bottomNav : false,
      type: {
        navList: 'nested', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: 'crud', // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/config/ComponentRouter')}),
      getComponent: () => React.lazy(() => import('app/config/ComponentRouter')),
      crudConfig: {
        miniDashboard: [
          // 'challenges-inbound', 'challenges-inbound-pending',
          // 'challenges-inbound-won', 'challenges-inbound-lost',
          'challenges-outbound', 'challenges-outbound-pending',
          'challenges-outbound-won', 'challenges-outbound-lost',
        ],
        condensed: true,
        searchable: false, // manually list array of searchable fields, i.e., [ 'name', 'phone', 'email', 'zip', 'notes', ] // otherwise, if true, getSearchableFields() uses all fields in 1. readable.path => creatable.fields
        filterable: false,
        sortable: false, // see searchable
        starrable: false, // true,
        taggable: false,
        alertable: false,
        creatable: false,
        readable: {
          path: 'leads',
          // src/app/containers/LoadAsync.js
          where: [
            [ 'createdBy' , '==' , uid , ] ,
            [ 'deletedAt' , '==' , 0   , ] ,
          ],
          orderBy: [ 'createdAt', 'desc', ] ,
          itemSummary: {
            primaryText: valueMaskName, // item.bizCategory && _.filter(bizCategoryItems, {value:item.bizCategory,},)[0].label, // || item.geoLocal,
            // secondaryText: `${valueMaskBizCategoryItem} in ${item && item.local}` // moment(item.createdAt).fromNow(),
            secondaryChips: [
              valueMaskBizCategoryItem,
              // (item && item.zipInput && item.zipInput.city),
              // moment(item.createdAt).fromNow(),
            ],
          },
          listPaneHeaderChips: [ 'challenges', 'outbound', 'lost', ],
        },
        updatable: false,
        deletable: false,
        actionable: false,
      },
    },

    // divider
    {id:'div1', type:'divider',}, // id is necessary to meet unique key requirement in src/@fuse/components/FuseNavigation/FuseNavigation.js
    
    // overhead views
    // see specs here: https://material.io/design/communication/help-feedback.html#use-placement
    {
      // eslint-disable-next-line
      description: '\
        These are the settings we use to control how the app looks and functions for you.\
        For example, this is where you tell us your service field and your location so we\
        can properly match you to the leads that are referred by other members.\
      ',
      title: 'Settings',
      id: 'settings',
      icon: 'settings',
      // bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      // overhead  : true,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: null, // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/views/settings/Settings')}),
      getComponent: () => React.lazy(() => import('app/views/settings/Settings')),
    },
    {
      // eslint-disable-next-line
      description: '\
        Here you can tell us how the app is working for you and suggest ways we can improve it.\
      ',
      title: 'Send feedback',
      id: 'feedback', 
      icon: 'feedback',
      // bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      // overhead  : true,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: null, // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/views/feedback/Feedback')}),
      getComponent: () => React.lazy(() => import('app/views/feedback/Feedback')),
    },
    {
      // eslint-disable-next-line
      description: '\
        Here are some questions users commonly ask us. You can read the questions and there answers here.\
      ',
      title: 'Help',
      id: 'help',
      icon: 'help',
      // bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      // overhead  : true,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: null, // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/views/Help')}),
      getComponent: () => React.lazy(() => import('app/views/Help')),
    },
    {
      // eslint-disable-next-line
      description: '\
        Click here to log out of the app.\
      ',
      title: 'Logout',
      id: 'logout',
      altIcon   : (
        <IconContext.Provider value={{ color: 'white', className: 'text-20 flex-no-shrink' }}>
          <span><FaSignOutAlt /></span>
        </IconContext.Provider>
      ),
      // bottomNav : false, // per spec: https://material.io/design/components/bottom-navigation.html#usage
      // overhead  : true,
      // type      : 'item',
      type: {
        navList: 'item', // [ 'item', 'nested', ] => src/@fuse/components/FuseNavigation/FuseNavigation.js
        component: null, // [ 'dashboard', 'crud', null, ] 'overhead' (deprecated), ] => src/app/config/ComponentRouter.js // should match dashboardConfig and crudConfig
      },
      // see src/app/config/Routes.js
      // also update in: src/main/content/components/ComponentsConfig.js
      // getComponent: () => FuseLoadable({loader: () => import('app/views/Logout')}),
      getComponent: () => React.lazy(() => import('app/views/Logout')),
    },
  ];

  return out;
}

export const faqDB = [
  {
    'id'       : '1',
    'question' : 'Who uses Swap?',
    // eslint-disable-next-line
    'answer'   : 'Sales professionals.\
                  Especially those selling mortgages, real estate, insurance and financial advisory services\
                  who want to decrease their marketing costs and increase their sales volume by leveraging\
                  the power of their referral network to generate a steady supply of leads.',
  },
  {
    'id'       : '2',
    'question' : 'What central problem does Swap solve?',
    // eslint-disable-next-line
    'answer'   : 'Swap is the best way to generate sales lead referrals. Other similar systems of leveraging\
                  referral networks to generate sales leads, like BNI for example, fail to\
                  adequately motivate all the members to contribute leads to the network.\
                  Members are often frustrated because they contribute a volume of leads to the system,\
                  but don’t receive in turn an adequate supply of leads back out of the system sufficient\
                  to justify their time investment.',
  },
  {
    'id'       : '3',
    'question' : 'How does Swap solve this problem?',
    // eslint-disable-next-line
    'answer'   : 'Swap solves this problem by adding a layer of speed and accountability.\
                  Speed because everything is online and you can do all your referral networking by the press\
                  of a button on your laptop or smart phone. We add accountability by enforcing our primary\
                  rule: All members must maintain a net positive contribution balance of leads at all times\
                  in order to receive leads from the system.',
  },
  {
    'id'       : '4',
    'question' : 'What if I receive bad or bogus leads? Will they count against me?',
    // eslint-disable-next-line
    'answer'   : 'No. At least that’s our goal. Our first release will not have our technology in this area\
                  fully refined so we might just have to ban users who abuse the system. However, in future\
                  versions we will implement a system of fair resolution and settlement of bad leads.\
                  Until we roll out this technology, it will remain a high priority item fo us to solve.',
  },
  {
    'id'       : '5',
    'question' : 'Where do I get new leads being referred to me?',
    // eslint-disable-next-line
    'answer'   : 'Inbox.\n\
                  Navigate there, then "claim" a lead to view it.',
  },
  {
    'id'       : '6',
    'question' : 'Where to I see all the leads Ive claimed?',
    // eslint-disable-next-line
    'answer'   : 'Archive.',
  },
  {
    'id'       : '7',
    'question' : 'How do I refer a new lead?',
    // eslint-disable-next-line
    'answer'   : 'Outbox.',
  },
  {
    'id'       : '8',
    'question' : 'How do I invite people I want to refer leads to?',
    // eslint-disable-next-line
    'answer'   : 'Contacts.',
  },
  {
    'id'       : '9',
    'question' : 'What if I receive bad or bogus leads? Will they count against me?',
    // eslint-disable-next-line
    'answer'   : 'No. At least that’s our goal. Our first release will not have our technology in this area\
                  fully refined so we might just have to ban users who abuse the system. However, in future\
                  versions we will implement a system of fair resolution and settlement of bad leads.\
                  Until we roll out this technology, it will remain a high priority item fo us to solve.',
  },
  {
    'id'       : '10',
    'question' : 'How does your pricing work?',
    // eslint-disable-next-line
    'answer'   : 'We are a free service during our initial phase. We reserve the right to charge a very small\
                  fee in the future. After we have most of the bugs worked out and you are doing so much\
                  extra business from our service, we will have earned every penny and then some in your eyes.',
  },
  {
    'id'       : '11',
    'question' : 'Will I get to meet the members whom I send and receive leads?',
    // eslint-disable-next-line
    'answer'   : 'We leave that decision in your capable hands. Swap does not require personal meetings\
                  with your network referral partners. But we do facilitate you working with,\
                  sending leads to and receiving leads from network partners whom you already\
                  know or meet via Swap.',
  },
  {
    'id'       : '12',
    'question' : 'How do you ensure the lead referrals are of good quality?',
    // eslint-disable-next-line
    'answer'   : 'We have a challenge system that allows the network to self-police\
                  the lead quality of the system.',
  },
  {
    'id'       : '13',
    'question' : 'What happens if I get a bad lead?',
    // eslint-disable-next-line
    'answer'   : 'You can dispute it by clicking a button that creates a “challenge.”',
  },
  {
    'id'       : '14',
    'question' : 'How many challenges am I allowed?',
    // eslint-disable-next-line
    'answer'   : 'You have an unlimited number of challenges. And we encourage you to challenge any leads\
                  you consider problematic. However, we also monitor all challenges for abuse.',
  },
  {
    'id'       : '15',
    'question' : 'What happens if I get flagged as a “challenge abuser?”',
    // eslint-disable-next-line
    'answer'   : 'If we verify you have abuses the process in bad faith, you could have your account\
                  restricted or you could be banned.\
                  This is done to protect the integrity of the network to maintain a high standard of\
                  quality to make the network as valuable as possible to all our members.',
  },
  {
    'id'       : '16',
    'question' : 'What if I submit a bad lead?',
    // eslint-disable-next-line
    'answer'   : 'If you receive a challenge and you agree it was a bad lead, you should correct it or\
                  settle the challenge by crediting the challenger. We will keep records of how many times\
                  this happens and those who abuse the system will have their account\
                  limited or restricted to protect the integrity of the network and the value it delivers\
                  to our members.',
  },
  {
    'id'       : '17',
    'question' : 'How exactly are challenges resolved?',
    // eslint-disable-next-line
    'answer'   : 'First we notify the referrer and they have an opportunity to concede the issue immediately.\
                  Then we review the lead and determine to determine the outcome.',
  },
  {
    'id'       : '18',
    'question' : 'Can I send referrals to a specific member?',
    // eslint-disable-next-line
    'answer'   : 'Yes. We let you invite that person to the network and then select that person to receive\
                  all your referrals of a specific type provided the lead is within the geographic territory\
                  your target member serves.',
  },
  {
    'id'       : '19',
    'question' : 'What do I need to do before I can get my first referral?',
    // eslint-disable-next-line
    'answer'   : 'After you sign in with your Google, Facebook or Twitter account, we will need two pieces\
                  of information from you. Firstly, we need you to tell us what line of business you are in.\
                  Secondly, we need you to tell us the city or area of your physical geographic location.\
                  And lastly, we need you to earn a positive net lead balance by submitting your first\
                  qualified referral. Then we can show you the lead referrals that you qualify to receive.',
  },
  {
    'id'       : '20',
    'question' : 'Why do you need me to sign in with my Google, Facebook or Twitter account?',
    // eslint-disable-next-line
    'answer'   : 'We need to verify you are a real person.',
  },
  {
    'id'       : '21',
    'question' : 'Why do you need my line of business and geographical location?',
    // eslint-disable-next-line
    'answer'   : 'Because that is the way we match you to the lead referrals in the network.\
                  We only show you the leads you can serve based on your line of business and physical\
                  geographic location.',
  },
]

// export const standardNavConfig = []

// class FetchFirestore extends Component {
//   render() {
//     const { key, children, } = this.props;
//     // called wherever firestore data is needed by: <FetchFirestore>...</FetchFirestore>
//     return (
//       // <React.Fragment key={key}>
//       <span key={key}>
//         {key}
//         {children}
//       </span>
//       // </React.Fragment>
//     )
//   }
// }

// function mapStateToProps({ auth }) {
// function mapStateToProps( state ) {
//   console.log('state\n', state);
//   const settings = state.firestore.ordered.users
//                 && state.firestore.ordered.users[0]
//                 && state.firestore.ordered.users[0].settings
//                 && state.firestore.ordered.users[0].settings[0];
//   const user = state.auth.user;
//   const leads = state.firestore.ordered.leads;
//   const profile = state.firebase.profile;
//   const dataHasLoaded = user && leads && profile && settings;

//   if(dataHasLoaded) {
//     console.log('user\n', user);
//     console.log('leads\n', leads);
//     console.log('profile\n', profile);
//     console.log('settings\n', settings);
//     console.log('dataHasLoaded\n', dataHasLoaded);
//     console.log('all-settings\n', state.firestore.ordered.users[0].settings);
//   }
  
//   return {
//     // user: auth.user
//     user, //: state.auth.user, // {role, data: {uid, displayName, email, ...}}
//     // settings: state.settings,

//     // projects: state.firestore.ordered.projects,
//     // auth: state.firebase.auth,
//     // notifications: state.firestore.ordered.notifications,

//     // template for top-level stored objects from firebase using FirebaseConnect to fetch it
//     leads, //: state.firestore.ordered.leads,
//     // from docs: http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/profile.html#basic
//     profile, //: state.firebase.profile, // profile passed as props.profile

//     // trying
    
//     // success
//     settings,
//     // settings: state.firestore.ordered.users,//[0],//.settings[0],
//     dataHasLoaded,
    
//     // fail
//     // settings: state.firestore.ordered.users.0,//.settings[0], // does not compile, unextected token
//     // settings: state.firestore.ordered.users[0],//.settings[0], // can not find [0] of undefined
//     // settings: state.firestore.data.users[state.auth.user.data.uid].settings,
//     // settings: state.firestore.data.users.settings,
//     // settings: state.firestore.ordered.users.settings,
//   }
// }
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       // updateSettings: settings => dispatch(updateSettings(settings)),
//     }
//   }

// export const FetchFirestore = () => {return compose(
// export compose(
// export default compose(

//   // withStyles(styles, { withTheme: true }),
  
//   // connect(),
//   connect(mapStateToProps),
//   // connect(mapStateToProps, mapDispatchToProps),
//   // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//   // connect auth from redux state to the auth prop
//   // connect(({ firebase: { auth } }) => ({ auth })),
//   // show spinner while auth is loading
//   // spinnerWhileLoading(['auth']),

//   // connect(({ firestore }, props) => ({
//   //   // settings: /*getVal*/_.get(firestore, `users/${props.profile.uid}/settings/current`), // lodash's get can also be used
//   //   settings: /*getVal*/_.get(firestore, `users/3lq9cr3A3eNSehv4X35Q2HBtUty2/settings/current`), // lodash's get can also be used
//   // })),

//   firestoreConnect( props => {
//     console.log('props\n', props);
//     // const path = [ 'users', props.profile.uid, 'settings' ].join('/'); // fail
//     return [
//       // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//       // { collection: 'projects', orderBy: ['createdAt', 'description'] },
//       // { collection: 'notifications', limit: 3, orderBy: ['time', 'description'] },

//       // { path: users/${props.profile.uid}/current` }, // fails; used by old version

//       { collection: 'leads', orderBy: ['createdAt', 'description'] }, // success

//       // // fail
//       // { 
//       //   collection: path,
//       //   limit: 1,
//       //   orderBy: ['createdAt', 'description'],
//       //   storeAs: 'settings',
//       // },

//       {
//         collection: 'users',
//         // doc: props.auth.uid,
//         // doc: props.auth.user.data.uid,
//         // doc: '3lq9cr3A3eNSehv4X35Q2HBtUty2',
//         // doc: props.user.data.uid, // success
        
//         // where: ['id', '==', props.profile.uid],
        
//         // ref: https://github.com/prescottprue/redux-firestore/blob/master/README.md#document
//         // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//         doc: props.profile.uid, //props.store.firestore.get('cities/SF'/zipcodes),
        
//         // ref: https://github.com/prescottprue/redux-firestore/blob/master/README.md#sub-collections
//         // ref: https://github.com/prescottprue/react-redux-firebase/issues/344
//         subcollections: [
//           {
//             collection: 'settings',
//             // limit: 1,
//             // orderBy: ['createdAt', 'description',],
//             // storeAs: 'settings',
//             doc: 'current',
//           },
//         ],
//       },

//     ];
//   }),

// )(FetchFirestore)//}