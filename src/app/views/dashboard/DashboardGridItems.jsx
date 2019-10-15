import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import withStyles from "@material-ui/core/styles/withStyles";

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AddIcon from '@material-ui/icons/Add';
// import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import ContactsIcon from '@material-ui/icons/Contacts';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import FlagIcon from '@material-ui/icons/Flag';
import FolderIcon from '@material-ui/icons/Folder';
import LabelIcon from '@material-ui/icons/Label';
import PlaceIcon from '@material-ui/icons/Place';
import RemoveIcon from '@material-ui/icons/Remove';
// import SaveIcon from '@material-ui/icons/Save';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import WarningIcon from '@material-ui/icons/Warning';

// import {FuseAnimateGroup, FuseHighlight, FusePageSimple} from '@fuse';
import { FuseAnimateGroup, } from '@fuse'; // FuseAnimate

// @material-ui/core
import {
  // Button, IconButton,
  // AppBar, Toolbar, ListItemIcon, 
  Typography, Avatar, Card, CardContent, Divider, Icon,
  List, ListItemAvatar, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core';

// core components
// import GridContainer from "app/vendors/creative-tim/components/Grid/GridContainer";

// custom components
import SelectControl from 'app/components/selects/SelectControl';
import DashboardGridItem from './DashboardGridItem';
// import { DashboardGridConfig } from 'app/config/DashboardGridConfig';

// CategorySelect
// import HomeIcon from '@material-ui/icons/Home';
// import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
// import AssessmentIcon from '@material-ui/icons/Assessment';
// import AssignmentIcon from '@material-ui/icons/Assignment';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  // container: {
  //   padding: '24px',
  // },
});

const DashboardGridItems = props => {
  const { onClickInfo, condensedDashboard, } = props; // classes,
  const rows = getRows(props);
  // console.log('props', props);
  return (
    <React.Fragment>
      {
        condensedDashboard
        ?
        // mobile
        (
          <Card className="w-full m-0 md:mb-16">
            <CardContent className="px-0">
              <FuseAnimateGroup
                // className="px-0"
                // key={row.name}
                delay={200}
                enter={{ animation: 'transition.slideUpBigIn' }}
                leave={{ animation: 'transition.slideDownBigOut' }}
              >
                {
                  rows.map(row => (
                    <List
                      key={row.name}
                      component="nav"
                      className="px-0 mb-4"
                      subheader={<ListSubheader>{row.name}</ListSubheader>}
                    >
                      <Divider />
                      <FuseAnimateGroup
                        // className="px-0"
                        // key={row.name}
                        delay={200}
                        enter={{ animation: 'transition.slideUpBigIn' }}
                        leave={{ animation: 'transition.slideDownBigOut' }}
                      >
                        {
                          row.cells.map(cell => (
                            <ListItem
                              key={cell.label}
                              button divider light
                              // aria-haspopup="false"
                              // aria-controls="username"
                              // aria-label="username"
                              // onClick={handleClickListItemDialog({
                              //   dialogTitle: 'Name',
                              //   isDialogTextField: true,
                              //   dialogTextFieldLabel: 'first and last',
                              //   dialogFieldName: 'name',
                              // })}
                              onClick={() => onClickInfo(cell)}
                            >
                            {
                            // <ListItemIcon>
                            //   {React.createElement(cell.icon)}
                            // </ListItemIcon>
                            }
                              <ListItemAvatar>
                                <Avatar>
                                  {/* {React.createElement(cell.icon)} */}
                                  <Icon>{cell.icon}</Icon>
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={cell.label}
                              // secondary={name}
                              // secondary={user.data.displayName}
                              />
                              <ListItemSecondaryAction className="pr-32">
                                {cell.data}
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))
                        }
                      </FuseAnimateGroup>
                    </List>
                  ))
                }
              </FuseAnimateGroup>
            </CardContent>
          </Card>
        )
        :
        // laptop
        ( 
          rows.map(row => (
            <div key={row.name}>
              <Typography variant="subtitle1" className="block pb-8 opacity-75 font-light">{row.name}</Typography>
              <FuseAnimateGroup
                className="flex flex-wrap"
                key={row.name}
                delay={200}
                enter={{ animation: 'transition.slideUpBigIn' }}
                leave={{ animation: 'transition.slideLeftBigOut' }}
              >
                {/* <GridContainer> */}
                  {
                    row.cells.map(cell => (
                      // <FuseAnimate animation="transition.slideLeftIn" duration={400} delay={100}>
                      // <div key={cell.label} className="w-1/2">
                      <DashboardGridItem
                        key={cell.label}
                        item={cell}
                        onClickInfo={() => onClickInfo(cell)}
                      />
                      // </div>
                      // </FuseAnimate>
                    ))
                  }
                {/* </GridContainer> */}
              </FuseAnimateGroup>
            </div>
        )))
      }
    </React.Fragment>
  );
}

const marketDescription = (
  <div className="mt-12">
    To specify the location of your market, you must identify all three levels:
    <ul>
      <li>country</li>
      <li>state or region</li>
      <li>location</li>
    </ul>
  </div>
);

const getRows = props => {
  const {
    categoryOpen, categoryItems, bizCategory,
    onCategoryOpen, onCategoryClose, onCategoryChange,
    geoLocal, geoRegion, geoNation,
  } = props;
  return [
    {
      name: 'Balances',
      cells: [
        {
          label: 'Net',
          data: 5,
          icon: DragHandleIcon,
          color: 'warning',
          buttonLabel: 'Hai',
          desc:
            <React.Fragment>
              <div>
                Your net balance is the most important balance for you to maintain above zero.
                It represents the difference between your deposits and withdrawals.
                Or, in other words, how many leads you referred compared to how many you received.
              </div>
              <div className="mt-12">
                If you maintain a positive net balance, you will always be able to see your inbox
                and claim new leads as they arrive.
                If your net balance reaches zero, your inbox will lock and you won&rsquo;t be able
                to view it until you deposit more leads.
              </div>
            </React.Fragment>
          ,
        },
        {
          label: 'Deposits',
          data: 5,
          icon: AddIcon,
          color: 'success',
          buttonLabel: 'Deposit new',
          desc:
            <React.Fragment>
              <div>
                Here we keep track of all the valid leads you submitted and referred into the network.
                To make a deposit, click the button then fill out the form.
                The form&rsquo;s &ldquo;save&rdquo; button will remain disabled
                until you complete all required fields.
              </div>
              <div className="mt-12">
                These are all your required fields.
                  <ul>
                  <li>name</li>
                  <li>phone number or email</li>
                  <li>zip code</li>
                  <li>lead type</li>
                </ul>
              </div>
            </React.Fragment>
          ,
        },
        {
          label: 'Withdrawals',
          data: 5,
          icon: RemoveIcon,
          color: 'danger',
          buttonLabel: 'See available',
          desc:
            <React.Fragment>
              <div>
                This is the number of leads you claimed from your inbox and placed into your archive for your use.
                To claim a lead from your inbox, just click it.
                Then we will automatically place that lead in your archive and you will be able to see it continuously.
              </div>
              <div className="mt-12">
                Unlike new leads in your inbox, you will always be able to see your archived leads &mdash;
                even if your net balance falls to zero.
              </div>
            </React.Fragment>
          ,
        },
        {
          label: 'Challenges',
          data: <span>&minus;5</span>,
          icon: WarningIcon,
          color: 'primary',
          buttonLabel: 'See challenges',
          desc:
            <React.Fragment>
              <div>
                This is the number of net lead challenges you have won.
                Lost challenges are shown as a negative number.
                Users can challenge leads they believe are not legitimate.
              </div>
              <div className="mt-12">
                You can challenge any lead you think is of poor quality.
                Those who make or receive too many challenges could have negative consequences as a result.
                So strive to submit high quality leads and be judicious in your challenges of others.
              </div>
            </React.Fragment>
          ,
        },
      ]
    },
    {
      name: 'Inventories',
      cells: [
        {
          label: 'Inbox',
          data: 5,
          icon: CloudDownloadIcon,
          color: 'info',
          buttonLabel: 'View inbox',
          desc:
            <div>
              List of all leads matching your type category and market location
            </div>
          ,
        },
        {
          label: 'Archive',
          data: 5,
          icon: FolderIcon, // SaveIcon,
          color: 'success',
          buttonLabel: 'View archive',
          desc:
            <div>
              List of all previously available leads you claimed that are now exclusively yours
            </div>
          ,
        },
        {
          label: 'Outbox',
          data: 5,
          icon: CloudUploadIcon,
          color: 'primary',
          buttonLabel: 'View outbox',
          desc:
            <div>
              List of all leads you submitted and referred to your peers on the network
            </div>
          ,
        },
        {
          label: 'Contacts',
          data: 5,
          icon: AccountBoxIcon, // ContactsIcon,
          color: 'success',
          buttonLabel: 'Add contact',
          desc:
            <div>
              List of everyone you invited to join the network
            </div>
          ,
        },
      ]
    },
    {
      name: 'Details',
      cells: [
        {
          label: 'Category',
          data: <span className="capitalize">{bizCategory}</span>,
          icon: LabelIcon,
          color: 'info',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          btn:
            <SelectControl
              size='small'
              control='button'
              label='Change category'
              items={categoryItems}
              value={bizCategory}
              isOpen={categoryOpen}
              onOpen={onCategoryOpen}
              onClick={onCategoryOpen}
              onClose={onCategoryClose}
              onChange={onCategoryChange}
            />
          ,
          desc:
            <React.Fragment>
              Tell us the type of leads you want.
                <ul>
                <li>
                  <div className="mt-12">
                    <div className="mr-12">Home</div>
                    {/* {React.createElement(HomeIcon)} */}
                    <Icon>home</Icon>
                  </div>
                  <div>
                    Select this if you are a real estate broker or agent selling homes to residential buyers
                  </div>
                </li>
                <li>
                  <div className="mt-12">
                    <div className="mr-12">Mortgage</div>
                    {/* {React.createElement(AccountBalanceIcon)} */}
                    <Icon>account_balance</Icon>
                  </div>
                  <div>
                    Select this if you are a real estate mortgage broker or agent selling financing to home buyers
                  </div>
                </li>
                <li>
                  <div className="mt-12">
                    <div className="mr-12">Insurance</div>
                    {/* {React.createElement(AssessmentIcon)} */}
                    <Icon>assessment</Icon>
                  </div>
                  <div>
                    Select this if you are an insurance broker or agent selling property and casualty policies
                  </div>
                </li>
                <li>
                  <div className="mt-12">
                    <div className="mr-12">Financial</div>
                    {/* {React.createElement(AssignmentIcon)} */}
                    <Icon>assignment</Icon>
                  </div>
                  <div>
                    Select this if you are a financial planner and advise clients on their personal finances
                  </div>
                </li>
              </ul>
            </React.Fragment>
          ,
        },
        {
          label: 'Location',
          // data: 'Scholes',
          data: geoLocal,
          icon: PlaceIcon,
          color: 'primary',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          desc:
            <React.Fragment>
              <div>
                The third level of your location selection.
                (In some small states or regions, it can be the only third level choice.
                In that case, the third level choice is usually identical to the name of the state or region.)
              </div>
              {marketDescription}
            </React.Fragment>
          ,
        },
        {
          label: 'State',
          // data: 'Mississippi',
          data: geoRegion,
          icon: TrackChangesIcon,
          color: 'warning',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          desc:
            <React.Fragment>
              <div>
                The second level of your location selection. (Called &ldquo;region&rdquo; in certain countries.)
              </div>
              {marketDescription}
            </React.Fragment>
          ,
        },
        {
          label: 'Country',
          // data: 'United States',
          data: geoNation,
          icon: FlagIcon,
          color: 'primary',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          desc:
            <React.Fragment>
              <div>
                The first level of your location selection.
              </div>
              {marketDescription}
            </React.Fragment>
          ,
        },
      ]
    },
  ]
}

DashboardGridItems.propTypes = {
  // classes: PropTypes.object.isRequired,
  onCategoryOpen: PropTypes.func.isRequired,
  onCategoryClose: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
  categoryOpen: PropTypes.bool.isRequired,
  categoryItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  bizCategory: PropTypes.string,
  geoLocal: PropTypes.string,
  geoRegion: PropTypes.string,
  geoNation: PropTypes.string,
  onClickGeoLocal: PropTypes.func.isRequired,
  onClickGeoRegion: PropTypes.func.isRequired,
  onClickGeoNation: PropTypes.func.isRequired,
};

export default withStyles(styles)(DashboardGridItems);