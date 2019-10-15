import React from 'react';

// @material-ui/core
import {
  // Typography, 
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Icon,
} from '@material-ui/core';

// import GeoStepper from 'app/components/steppers/GeoStepper';

// usage
// import { DashboardGridConfig } from 'app/config/DashboardGridConfig';

// const marketDescription = (
//   <span>
//     To specify the location of your market, you must identify all three levels:
//     <ul>
//       <li>country</li>
//       <li>state or region</li>
//       <li>location</li>
//     </ul>
//   </span>
// );

// To convert JS descriptions to JSX:
// // https://github.com/lovell/farmhash/blob/master/README.md
// import farmhash from 'farmhash';
// const hash = farmhash.hash32('test');
// console.log(typeof hash); // 'number'
// // https://www.freecodecamp.org/forum/t/newline-in-react-string-solved/68484/10
// let newText = text.split ('\n').map( (item, index,) => <div key={farmhash.hash32(item+index)}>{item}</div>);

const getCategoryDescription = () => {
  const config = [
    { icon: 'home', primary: 'Home', secondary: 'Select this if you are a real estate broker or agent selling homes to residential buyers', },
    { icon: 'account_balance', primary: 'Mortgage', secondary: 'Select this if you are a real estate mortgage broker or agent selling financing to home buyers', },
    { icon: 'assessment', primary: 'Insurance', secondary: 'Select this if you are an insurance broker or agent selling property and casualty policies', },
    { icon: 'assignment', primary: 'Financial', secondary: 'Select this if you are a financial planner and advise clients on their personal finances', },
  ];
  const getListItems = () =>
    config.map( ({ icon, primary, secondary, }) =>
      <ListItem key={primary}>
        <ListItemAvatar>
          <Avatar>
            <Icon>{icon}</Icon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={primary}
          secondary={secondary}
        />
      </ListItem>   
    );
  const getOut = () =>
    <div className="text-white">
      <div>Select the type of leads you want.</div>
      <List>{getListItems()}</List>
    </div>
  const out = getOut();
  return out;
}

export const getDashboardInitialValues = () => {
  const { cells, } = DashboardGridConfig;
  const out = {};
  cells.forEach( cell => {
    // skips cells without initial values; they are initialized via settings;
    // otherwise, they would throw exception for writing undefined value to firebase;
    if(!!cell.initialValue || (cell.initialValue===0)) out[cell.id] = cell.initialValue;
  })
  return out;
}

export const DashboardGridConfig = {
  // import { DashboardGridConfig, } from 'app/config/DashboardGridConfig';
  groups: {
    balance: {
      label: 'Balances',
      // eslint-disable-next-line
      description: '\
        A running total count of how many times you have done important activities we need to track.\
        Your net balance is key. Because when it’s at zero, you will need to make more “deposits”\
        by making at least one referral. Then you can receive more leads when you have a positive net balance.\
      ',
    },
    inventory: {
      label: 'Inventories',
      // eslint-disable-next-line
      description: '\
        These are the count of individual items you have available or\
        have made available in the individual categories we are tracking.\
        When a new item is added to your inventory (like a new referral going to your inbox),\
        it increases your count. When you consume an item of inventory, (like claiming a lead\
        from your inbox and moving it to your archive), it decreases the count of your inbox\
        inventory and increases the count of your archive inventory.\
      ',
    },
    detail: {
      label: 'Details',
      // eslint-disable-next-line
      description: '\
        This is information about you that we require in order to match you with the correct leads.\
        We also use this information to help send leads from you to the correct geographical location.\
      ',
    },
    challenges: {
      label: 'Totals',
      // eslint-disable-next-line
      description: '\
        The net result of all your won and lost inbound and outbound challenges\
      ',
    },
    inbound: {
      label: 'Inbound',
      // eslint-disable-next-line
      description: '\
        Callenges made against you\
      ',
    },
    outbound: {
      label: 'Outbound',
      // eslint-disable-next-line
      description: '\
        Callenges you made against others\
      ',
    },
  },
  cells: [
    {
      id: 'net',
      label: 'Net',
      // data: 5,
      initialValue: 0,
      group: 'balance',
      // icon: 'drag_handle',
      // color: 'warning',
      // buttonLabel: 'Hai',
      links: [
        { label: 'Deposit new referral' , id: 'outbox' , },
        { label: 'Shop for new leads'   , id: 'inbox'  , },
      ],
      // eslint-disable-next-line
      description: '\
        Your net balance is the most important balance for you to maintain above zero.\
        It represents the difference between your deposits and withdrawals.\
        Or, in other words, how many leads you referred compared to how many you received.\
        \n\n\
        If you maintain a positive net balance, you will always be able to see your inbox\
        and claim new leads as they arrive. If your net balance reaches zero, your inbox\
        will lock and you won’t be able to view it until you deposit more leads.\
      ',
    },
    {
      id: 'deposits',
      label: 'Deposits',
      // data: 5,
      initialValue: 0,
      group: 'balance',
      // icon: 'add',
      // color: 'success',
      // buttonLabel: 'Deposit new',
      links: [
        { label: 'Deposit new referral', id: 'outbox', },
      ],
      // eslint-disable-next-line
      description: '\
        Here we keep track of all the valid leads you submitted and referred into the network.\
        To make a deposit, click the button then fill out the form. The form’s “save” button will\
        remain disabled until you complete all required fields.\
        \n\n\
        These are all your required fields.\n\
        • name\n\
        • phone number or email\n\
        • zip code\n\
        • lead type\n\
      ',
    },
    {
      id: 'withdrawals',
      label: 'Withdrawals',
      // data: 5,
      initialValue: 0,
      group: 'balance',
      // icon: 'remove',
      // color: 'danger',
      // buttonLabel: 'See available',
      links: [
        { label: 'Jump to lead archive' , id: 'archive' , },
        { label: 'Shop for new leads'   , id: 'inbox'   , },
      ],
      // eslint-disable-next-line
      description: '\
        This is the number of leads you claimed from your inbox and placed into your archive for your use.\
        To claim a lead from your inbox, just click it. Then we will automatically place that lead\
        in your archive and you will be able to see it continuously.\
        \n\n\
        Unlike new leads in your inbox, you will always be able to see your archived leads &mdash;\
        even if your net balance falls to zero.\
      ',
    },
    {
      id: 'challenges',
      label: 'Challenges',
      // data: <span>&minus;5</span>,
      initialValue: 0,
      group: 'balance',
      // icon: 'warning',
      // color: 'primary',
      // buttonLabel: 'See challenges',
      links: [
        { label: 'See chalenges detail', id: 'challenges', },
      ],
      // eslint-disable-next-line
      description: '\
        This is the net effect on your balance of lead challenges you have made and received against you.\
        Users can challenge leads they believe are a mistake or otherwise not legitimate.\
        \n\n\
        You can challenge any lead you think is of poor quality.\
        Those who make or receive too many challenges could have negative consequences as a result.\
        So strive to submit high quality leads and be judicious in your challenges of others.\
      ',
    },
    {
      id: 'inbox',
      label: 'Inbox',
      // data: 5,
      // initialValue: 0,
      dataSource: {
        path: 'stats/level_1/',
        getField: ({ geoNation, geoRegion, geoLocal, bizCategory, }) => {
          const geoLocationsTypeKey = [ geoNation, geoRegion, geoLocal, bizCategory, ].join(' | ');
          const out = [ 'leads', 'geoLocations', geoLocationsTypeKey, ].join('.');
          return out;
        },
      },
      group: 'inventory',
      // icon: 'cloud_download',
      // color: 'info',
      // buttonLabel: 'View inbox',
      links: [
        { label: 'Jump to inbox', id: 'inbox', },
      ],
      // eslint-disable-next-line
      description: '\
        List of all leads matching your type category and market location\
      ',
    },
    {
      id: 'archive',
      label: 'Archive',
      // data: 5,
      initialValue: 0,
      group: 'inventory',
      // icon: 'folder',
      // color: 'success',
      // buttonLabel: 'View archive',
      links: [
        { label: 'Jump to archive', id: 'archive', },
      ],
      // eslint-disable-next-line
      description: '\
        List of all previously available leads you claimed that are now exclusively yours\
      ',
    },
    {
      id: 'outbox',
      label: 'Outbox',
      // data: 5,
      initialValue: 0,
      group: 'inventory',
      // icon: 'cloud_upload',
      // color: 'primary',
      // buttonLabel: 'View outbox',
      links: [
        { label: 'Jump to outbox', id: 'outbox', },
      ],
      // eslint-disable-next-line
      description: '\
        List of all leads you submitted and referred to your peers on the network\
      ',
    },
    {
      id: 'contacts',
      label: 'Contacts',
      // data: 5,
      initialValue: 0,
      group: 'inventory',
      // icon: 'account_box',
      // color: 'success',
      // buttonLabel: 'Add contact',
      links: [
        { label: 'Edit contacts', id: 'contacts', },
      ],
      // eslint-disable-next-line
      description: '\
        List of everyone you invited to join the network\
      ',
    },
    {
      id: 'bizCategory',
      label: 'Category',
      // data: <span className="capitalize">{bizCategory}</span>,
      // data: 'Mortgage',
      // data: <Icon>warning</Icon>,
      // initialValue: '', // fetch from settings
      group: 'detail',
      // icon: 'label',
      // color: 'info',
      // typog: 'subtitle1',
      // buttonLabel: 'Edit',
      // btn:
      //   <SelectControl
      //     size='small'
      //     control='button'
      //     label='Change category'
      //     items={categoryItems}
      //     value={bizCategory}
      //     isOpen={categoryOpen}
      //     onOpen={onCategoryOpen}
      //     onClick={onCategoryOpen}
      //     onClose={onCategoryClose}
      //     onChange={onCategoryChange}
      //   />
      // ,
      links: [
        { label: 'Jump to settings', id: 'settings', },
      ],
      // eslint-disable-next-line
      description: getCategoryDescription(),
    },
    {
      id: 'geoLocal',
      label: 'Local',
      // data: 'Scholes',
      // data: geoLocal,
      //data: <Icon>done</Icon>,
      // initialValue: '', // fetch from settings
      group: 'detail',
      // icon: 'place',
      // color: 'primary',
      // typog: 'subtitle1',
      // buttonLabel: 'Edit',
      links: [
        { label: 'Jump to settings', id: 'settings', },
      ],
      // eslint-disable-next-line
      description: '\
        The third level of your location selection.\
        (In some small states or regions, it can be the only third level choice.\
        In that case, the third level choice is usually identical to the name of the state or region.)\
      ',
    },
    {
      id: 'geoRegion',
      label: 'State',
      // data: 'Mississippi',
      // data: geoRegion,
      // data: <Icon>done</Icon>,
      // initialValue: '', // fetch from settings
      group: 'detail',
      // icon: 'track_changes',
      // color: 'warning',
      // typog: 'subtitle1',
      // buttonLabel: 'Edit',
      links: [
        { label: 'Jump to settings', id: 'settings', },
      ],
      // eslint-disable-next-line
      description: '\
        The second level of your location selection.\
        (Also called “region” in certain countries.)\
      ',
    },
    {
      id: 'geoNation',
      label: 'Country',
      // data: 'United States',
      // data: geoNation,
      // data: <Icon>done</Icon>,
      // initialValue: '', // fetch from settings
      group: 'detail',
      // icon: 'flag',
      // color: 'primary',
      // typog: 'subtitle1',
      // buttonLabel: 'Edit',
      links: [
      //{ label: 'Edit location'    , id: <GeoStepper onChange={onChangeGeoStepper}/> , },
        { label: 'Jump to settings' , id: 'settings', },
      ],
      // eslint-disable-next-line
      description: '\
        The first level of your location selection\
      ',
    },
    {
      id: 'challenges-net',
      label: 'Net',
      initialValue: 0,
      group: 'challenges',
      links: [
        { label: 'See all outbound pending' , id: 'challenges-outbound-pending' , },
        { label: 'See all outbound won'     , id: 'challenges-outbound-won'     , },
        { label: 'See all outbound lost'    , id: 'challenges-outbound-lost'    , },
        { label: 'See all inbound pending'  , id: 'challenges-inbound-pending'  , },
        { label: 'See all inbound won'      , id: 'challenges-inbound-won'      , },
        { label: 'See all inbound lost'     , id: 'challenges-inbound-lost'     , },
      ],
      // eslint-disable-next-line
      description: '\
        Net result of all settled challenges\
      ',
    },
    {
      id: 'challenges-outbound',
      label: 'Outbound',
      initialValue: 0,
      group: 'challenges',
      links: [
        { label: 'See all outbound pending' , id: 'challenges-outbound-pending' , },
        { label: 'See all outbound won'     , id: 'challenges-outbound-won'     , },
        { label: 'See all outbound lost'    , id: 'challenges-outbound-lost'    , },
      ],
      // eslint-disable-next-line
      description: '\
        Outbound challenges includes all challenges you made against others\
      ',
    },
    {
      id: 'challenges-inbound',
      label: 'Inbound',
      initialValue: 0,
      group: 'challenges',
      links: [
        { label: 'See all inbound pending'  , id: 'challenges-inbound-pending'  , },
        { label: 'See all inbound won'      , id: 'challenges-inbound-won'      , },
        { label: 'See all inbound lost'     , id: 'challenges-inbound-lost'     , },
      ],
      // eslint-disable-next-line
      description: '\
        Inbound challenges includes all challenges made against you\
      ',
    },
    {
      id: 'challenges-outbound-pending',
      label: 'Pending',
      initialValue: 0,
      group: 'outbound',
      links: [
        { label: 'See all outbound pending', id: 'challenges-outbound-pending', },
      ],
      // eslint-disable-next-line
      description: '\
        Pending challenges includes all challenges in the process of resolving\
        but have not resolved yet\
      ',
    },
    {
      id: 'challenges-outbound-won',
      label: 'Won',
      initialValue: 0,
      group: 'outbound',
      links: [
        { label: 'See all outbound won', id: 'challenges-outbound-won', },
      ],
      // eslint-disable-next-line
      description: '\
        Won challenges includes all challenges resolved in your favor\
      ',
    },
    {
      id: 'challenges-outbound-lost',
      label: 'Lost',
      initialValue: 0,
      group: 'outbound',
      links: [
        { label: 'See all outbound lost', id: 'challenges-outbound-lost', },
      ],
      // eslint-disable-next-line
      description: '\
        Lost challenges includes all challenges resolved not in your favor\
      ',
    },
    {
      id: 'challenges-inbound-pending',
      label: 'Pending',
      initialValue: 0,
      group: 'inbound',
      links: [
        { label: 'See all inbound pending', id: 'challenges-inbound-pending', },
      ],
      // eslint-disable-next-line
      description: '\
        Pending challenges includes all challenges in the process of resolving\
        but have not resolved yet\
      ',
    },
    {
      id: 'challenges-inbound-won',
      label: 'Won',
      initialValue: 0,
      group: 'inbound',
      links: [
        { label: 'See all inbound won', id: 'challenges-inbound-won', },
      ],
      // eslint-disable-next-line
      description: '\
        Won challenges includes all challenges resolved in your favor\
      ',
    },
    {
      id: 'challenges-inbound-lost',
      label: 'Lost',
      initialValue: 0,
      group: 'inbound',
      links: [
        { label: 'See all inbound lost', id: 'challenges-inbound-lost', },
      ],
      // eslint-disable-next-line
      description: '\
        Lost challenges includes all challenges resolved not in your favor\
      ',
    },
  ],
}