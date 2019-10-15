// inspired by src/main/content/pages/faq/FaqPage.js

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import {
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
  Icon, Input, Paper, Typography
} from '@material-ui/core';
import classNames from 'classnames';
import axios from 'axios/index';
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

class FaqPage extends Component {
  state = {
    data: [],
    expanded: null,
    searchText: ''
  };

  componentDidMount() {
    // data source: src/fake-db/faq-db.js // text search on faq page leads there // my add
    axios.get('/api/faq').then(res => {
      this.setState({ data: res.data });
    });
  }

  toggleExpansion = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleSearch = event => {
    this.setState({ searchText: event.target.value });
  };

  getFilteredArray = (arr, searchText) => {
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  render() {
    const { classes } = this.props;
    const { data, expanded, searchText } = this.state;
    const faqs = this.getFilteredArray(data, searchText);

    return (
      <div className={classNames(classes.root, classes.wrapper, "")}>

        <div className={classNames(classes.header, "flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")}>

          <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
            <Typography color="inherit" className="text-36 sm:text-56 font-light">
              We&rsquo;re here to help
            </Typography>
          </FuseAnimate>

          <FuseAnimate duration={400} delay={600}>
            <Typography variant="subtitle1" color="inherit" className="opacity-75 mt-8 sm:mt-16 mx-auto max-w-512">
              Frequently asked questions
            </Typography>
          </FuseAnimate>

          <Paper className={"flex items-center h-56 w-full max-w-md mt-16 sm:mt-32"} elevation={1}>
            <Icon color="action" className="ml-16">search</Icon>
            <Input
              placeholder="Search in faqs..."
              className="px-16"
              disableUnderline
              fullWidth
              inputProps={{
                'aria-label': 'Search'
              }}
              value={searchText}
              onChange={this.handleSearch}
            />
          </Paper>
        </div>

        <div className={classNames(classes.content)}>

          <div className="max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
            <FuseAnimateGroup
              enter={{
                animation: "transition.slideUpBigIn"
              }}
            >
              {faqs.map(faq => (
                <ExpansionPanel className={classes.panel} key={faq.id} expanded={expanded === faq.id} onChange={this.toggleExpansion(faq.id)} elevation={0}>

                  <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                    <div className="flex items-center">
                      <Icon className="mr-8" color="action">help_outline</Icon>
                      <Typography className="">{faq.question}</Typography>
                    </div>
                  </ExpansionPanelSummary>

                  <ExpansionPanelDetails>
                    <Typography className="">{faq.answer}</Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </FuseAnimateGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FaqPage);
