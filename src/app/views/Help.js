// inspired by src/main/content/pages/faq/FaqPage.js

import React, { useState, } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import {
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
  Icon, IconButton, Input, Paper, Typography
} from '@material-ui/core';
import classNames from 'classnames';
import { faqDB } from 'app/config/AppConfig';
import { FuseUtils, FuseAnimate, FuseAnimateGroup } from '@fuse';

const styles = theme => ({
  root: {
    width: '100%'
  },
  wrapper: {
    verticalAlign: 'top', // overcomes default
    // paddingTop: '56px', // clears <AppBar />
  },
  card: {},
  cardHeader: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.getContrastText(theme.palette.grey[800])
  },
  header: {
    background: "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
    color: '#fff'
  },
  content: {},
  panel: {
    margin: 0,
    borderWidth: '1px 1px 0 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    '&:first-child': {
      borderRadius: '16px 16px 0 0'
    },
    '&:last-child': {
      borderRadius: '0 0 16px 16px',
      borderWidth: '0 1px 1px 1px'
    }
  }
});

const HEADER = 'We’re here to help';
const SUBHEADER = 'Frequently asked questions';
const PLACEHOLDER = 'Search in faqs...';
const INITIAL_SEARCH_TEXT = '';

const FaqPage = props => {
  const { classes, } = props;

  const [ data       ,                 ] = useState(faqDB); // setData,
  const [ expanded   , setExpanded   , ] = useState(null);
  const [ searchText , setSearchText , ] = useState(INITIAL_SEARCH_TEXT);

  const getFilteredArray = ( a, searchText, ) => {
    const { length, } = searchText;
    if(!length) return a;
    return FuseUtils.filterArrayByString(a, searchText,);
  };

  const faqs = getFilteredArray(data, searchText,);

  const toggleExpansion = panel => (event, expanded,) => {
    const newExp = expanded ? panel : false;
    setExpanded(newExp);
  };

  const handleSearch = event => {
    const ready = event && event.target;
    if(!ready) return;
    const { value, } = event.target;
    setSearchText(value);
  };

  const handleClear = () => {
    setSearchText(INITIAL_SEARCH_TEXT);
  }

  return (
    <div className={classNames(classes.root, classes.wrapper, "")}>

      <div className={classNames(classes.header, "flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")}>

        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
          <Typography color="inherit" className="text-36 sm:text-56 font-light">
            {HEADER}
          </Typography>
        </FuseAnimate>

        <FuseAnimate duration={400} delay={600}>
          <Typography variant="subtitle1" color="inherit" className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512">
            {SUBHEADER}
          </Typography>
        </FuseAnimate>

        <Paper className={"flex items-center h-56 w-full max-w-md mt-16 sm:mt-32"} elevation={1}>
          <Icon color="action" className="ml-16">search</Icon>
          <Input
            placeholder={PLACEHOLDER}
            className="px-16"
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search'
            }}
            value={searchText}
            onChange={handleSearch}
          />
          <IconButton className="mr-16" onClick={handleClear}>
            <Icon color="action">clear</Icon>
          </IconButton>
        </Paper>
      </div>

      <div className={classNames(classes.content)}>

        <div className="max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            {faqs.map((faq, index,) => (
              <ExpansionPanel
                className={classes.panel}
                key={faq.id}
                expanded={expanded === faq.id}
                onChange={toggleExpansion(faq.id)}
                elevation={0}
              >
                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                  <div className="flex items-center">
                    <Icon className="mr-8" color="action">help_outline</Icon>
                    <Typography className="">{index+1}. {faq.question}</Typography>
                  </div>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                  <Typography className="mx-32">{faq.answer}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </FuseAnimateGroup>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(FaqPage);
