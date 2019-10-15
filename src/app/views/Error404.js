import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Icon, Input, Paper, Typography, Button, } from '@material-ui/core'; 
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FuseAnimate } from '@fuse';

const styles = theme => ({
  root: {},
  searchWrapper: {
    width: '100%',
    height: 56,
    padding: 18,
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    paddingLeft: 16
  },

  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Error404Page extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.root, "flex flex-col flex-1 items-center justify-center p-16")}>

        <div className="max-w-512 text-center">

          <FuseAnimate animation="transition.expandIn" delay={100}>
            <Typography variant="h1" color="inherit" className="font-medium mb-16">
              404
            </Typography>
          </FuseAnimate>

          <FuseAnimate delay={500}>
            <Typography variant="h5" color="textSecondary" className="mb-16">
              Sorry but we could not find the page you are looking for
            </Typography>
          </FuseAnimate>

          <Paper className={classNames(classes.searchWrapper, "mt-48 mb-16")} elevation={1}>
            <Icon color="action">search</Icon>
            <Input
              placeholder="Search for anything"
              className={classes.search}
              disableUnderline
              fullWidth
              inputProps={{
                'aria-label': 'Search'
              }}
            />
          </Paper>

          <Link className="no-underline" to="/dashboard">
            <Button variant="contained" color="secondary" size="large" className={classes.button}>
              {
              // <Icon className={classes.leftIcon}>home</Icon>
              }
              Return to home page
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Error404Page);
